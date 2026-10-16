import Foundation
import AVFoundation
// usage: stitch-video out.mp4 mode clip1.mp4 clip2.mp4 ...        mode: trim | square | none
// Joins clips in order and copies ONLY the video tracks (the Veo audio is dropped, owner rule: no audio).
//   trim   (default for Veo clips): removes the 4 black pixel rows Veo leaves at the top and the bottom of every 720p frame (1280x720 -> 1280x712)
//          and re-encodes H.264 at about 2.5 Mbps (a 14 s video is about 4 MB).
//   square: same, then center-crops to 1:1.
//   none:   no re-encode (passthrough), keeps the black rows.
let a = CommandLine.arguments
let out = URL(fileURLWithPath: a[1]); let mode = a[2]
let comp = AVMutableComposition()
let track = comp.addMutableTrack(withMediaType: .video, preferredTrackID: kCMPersistentTrackID_Invalid)!
var t = CMTime.zero; var size = CGSize.zero
for p in a[3...] {
  let asset = AVURLAsset(url: URL(fileURLWithPath: p))
  let sem = DispatchSemaphore(value: 0)
  var vt: AVAssetTrack?; var dur = CMTime.zero
  Task { vt = try? await asset.loadTracks(withMediaType: .video).first; dur = (try? await asset.load(.duration)) ?? .zero; if let v = vt { size = (try? await v.load(.naturalSize)) ?? size }; sem.signal() }
  sem.wait()
  guard let v = vt else { print("no video in \(p)"); exit(1) }
  try! track.insertTimeRange(CMTimeRange(start: .zero, duration: dur), of: v, at: t)
  t = CMTimeAdd(t, dur)
}
try? FileManager.default.removeItem(at: out)
if mode == "none" {
  let ex = AVAssetExportSession(asset: comp, presetName: AVAssetExportPresetPassthrough)!
  ex.outputURL = out; ex.outputFileType = .mp4
  let sem = DispatchSemaphore(value: 0); ex.exportAsynchronously { sem.signal() }; sem.wait()
  print(ex.status == .completed ? "saved \(out.path) \(CMTimeGetSeconds(t))s" : "export failed"); exit(0)
}
let bar: CGFloat = 4
var w = size.width, h = size.height - 2 * bar, dx: CGFloat = 0, dy: CGFloat = -bar
if mode == "square" { let s = min(w, h); dx = -(size.width - s) / 2; dy = -(size.height - s) / 2; w = s; h = s }
let vc = AVMutableVideoComposition()
vc.frameDuration = CMTime(value: 1, timescale: 24)
vc.renderSize = CGSize(width: w, height: h)
let ins = AVMutableVideoCompositionInstruction(); ins.timeRange = CMTimeRange(start: .zero, duration: t)
let li = AVMutableVideoCompositionLayerInstruction(assetTrack: track)
li.setTransform(CGAffineTransform(translationX: dx, y: dy), at: .zero)
ins.layerInstructions = [li]; vc.instructions = [ins]
let reader = try! AVAssetReader(asset: comp)
let ro = AVAssetReaderVideoCompositionOutput(videoTracks: [track], videoSettings: [kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA])
ro.videoComposition = vc; reader.add(ro)
let writer = try! AVAssetWriter(outputURL: out, fileType: .mp4)
let wi = AVAssetWriterInput(mediaType: .video, outputSettings: [AVVideoCodecKey: AVVideoCodecType.h264, AVVideoWidthKey: Int(w), AVVideoHeightKey: Int(h), AVVideoCompressionPropertiesKey: [AVVideoAverageBitRateKey: 2_500_000, AVVideoProfileLevelKey: AVVideoProfileLevelH264HighAutoLevel]])
wi.expectsMediaDataInRealTime = false; writer.add(wi)
reader.startReading(); writer.startWriting(); writer.startSession(atSourceTime: .zero)
let q = DispatchQueue(label: "w"); let done = DispatchSemaphore(value: 0)
wi.requestMediaDataWhenReady(on: q) {
  while wi.isReadyForMoreMediaData {
    if let sb = ro.copyNextSampleBuffer() { wi.append(sb) } else { wi.markAsFinished(); writer.finishWriting { done.signal() }; break }
  }
}
done.wait()
print(writer.status == .completed ? "saved \(out.path) \(CMTimeGetSeconds(t))s \(Int(w))x\(Int(h))" : "export failed: \(String(describing: writer.error))")

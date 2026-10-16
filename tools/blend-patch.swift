import Foundation
import CoreGraphics
import ImageIO
import UniformTypeIdentifiers
// usage: blend base patch out x y w h fullTop fadeEnd featherX   (all ints; y offsets are relative to the patch top)
let a = CommandLine.arguments
func load(_ p: String) -> CGImage { let s = CGImageSourceCreateWithURL(URL(fileURLWithPath: p) as CFURL, nil)!; return CGImageSourceCreateImageAtIndex(s, 0, nil)! }
func rgba(_ img: CGImage, _ w: Int, _ h: Int) -> [UInt8] {
  var d = [UInt8](repeating: 0, count: w*h*4)
  let c = CGContext(data: &d, width: w, height: h, bitsPerComponent: 8, bytesPerRow: w*4, space: CGColorSpaceCreateDeviceRGB(), bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!
  c.interpolationQuality = .high
  c.draw(img, in: CGRect(x: 0, y: 0, width: w, height: h)); return d }
let base = load(a[1]), patch = load(a[2])
let bw = base.width, bh = base.height
let x0 = Int(a[4])!, y0 = Int(a[5])!, pw = Int(a[6])!, ph = Int(a[7])!, fullTop = Int(a[8])!, fadeEnd = Int(a[9])!, fx = Int(a[10])!
var B = rgba(base, bw, bh); let P = rgba(patch, pw, ph)
for py in 0..<ph { for px in 0..<pw {
  var m = 1.0
  if py > fullTop { m = max(0, 1.0 - Double(py - fullTop) / Double(max(1, fadeEnd - fullTop))) }
  if px < fx { m = min(m, Double(px) / Double(fx)) }
  if px > pw - fx { m = min(m, Double(pw - px) / Double(fx)) }
  if py < 8 { m = min(m, Double(py) / 8.0) }
  let bx = x0 + px, by = y0 + py; if bx < 0 || by < 0 || bx >= bw || by >= bh { continue }
  let bi = (by*bw + bx)*4, pi = (py*pw + px)*4
  for k in 0..<3 { B[bi+k] = UInt8(max(0, min(255, Double(B[bi+k])*(1-m) + Double(P[pi+k])*m))) }
} }
let ctx = CGContext(data: &B, width: bw, height: bh, bitsPerComponent: 8, bytesPerRow: bw*4, space: CGColorSpaceCreateDeviceRGB(), bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!
let out = ctx.makeImage()!
let dest = CGImageDestinationCreateWithURL(URL(fileURLWithPath: a[3]) as CFURL, UTType.jpeg.identifier as CFString, 1, nil)!
CGImageDestinationAddImage(dest, out, [kCGImageDestinationLossyCompressionQuality: 0.93] as CFDictionary)
CGImageDestinationFinalize(dest)

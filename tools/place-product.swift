import Foundation
import CoreGraphics
import ImageIO
import UniformTypeIdentifiers
// usage: place-product base.jpg product.png out.jpg cx cy productHeight circleDiameter circleHex
// Draws a flat soft circle (circleHex) centered at (cx, cy) and the real product cutout (transparent PNG) on top, scaled so its visible
// height is productHeight and centered on the circle. All numbers are pixels of the base image, y from the top. The label stays pixel exact.
let a = CommandLine.arguments
func load(_ p: String) -> CGImage { let s = CGImageSourceCreateWithURL(URL(fileURLWithPath: p) as CFURL, nil)!; return CGImageSourceCreateImageAtIndex(s, 0, nil)! }
let base = load(a[1]), prod = load(a[2])
let cx = Double(a[4])!, cy = Double(a[5])!, ph = Double(a[6])!, cd = Double(a[7])!
var rgb: [Double] = [0.9, 0.95, 1]
let hex = a[8].replacingOccurrences(of: "#", with: "")
if hex != "auto" { rgb = stride(from: 0, to: 6, by: 2).map { Double(Int(hex.dropFirst($0).prefix(2), radix: 16)!) / 255 } }
// visible bbox of the cutout
let pw = prod.width, phh = prod.height
var d = [UInt8](repeating: 0, count: pw*phh*4)
let pc = CGContext(data: &d, width: pw, height: phh, bitsPerComponent: 8, bytesPerRow: pw*4, space: CGColorSpaceCreateDeviceRGB(), bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!
pc.draw(prod, in: CGRect(x: 0, y: 0, width: pw, height: phh))
var minX = pw, maxX = 0, minY = phh, maxY = 0
for y in 0..<phh { for x in 0..<pw { if d[(y*pw+x)*4+3] > 20 { minX = min(minX, x); maxX = max(maxX, x); minY = min(minY, y); maxY = max(maxY, y) } } }
if hex == "auto" {
  // circle tint: the dominant saturated hue of the label band (middle rows of the visible product), mixed 75% with white
  var buckets = [[Double]](repeating: [0, 0, 0, 0], count: 12)
  let r0 = minY + Int(Double(maxY - minY) * 0.40), r1 = minY + Int(Double(maxY - minY) * 0.62)
  for y in r0..<r1 { for x in minX...maxX {
    let i = (y*pw+x)*4; if d[i+3] < 250 { continue }
    let r = Double(d[i])/255, g = Double(d[i+1])/255, b = Double(d[i+2])/255
    let mx = max(r, g, b), mn = min(r, g, b); if mx < 0.55 || (mx - mn) / mx < 0.45 { continue }
    var h = 0.0; let c = mx - mn
    if mx == r { h = (g - b) / c } else if mx == g { h = 2 + (b - r) / c } else { h = 4 + (r - g) / c }
    h = (h * 60 + 360).truncatingRemainder(dividingBy: 360)
    let k = min(11, Int(h / 30)); buckets[k][0] += r; buckets[k][1] += g; buckets[k][2] += b; buckets[k][3] += 1
  } }
  if let best = buckets.max(by: { $0[3] < $1[3] }), best[3] > 0 { rgb = (0..<3).map { 0.25 * best[$0] / best[3] + 0.75 } }
}
let bw = base.width, bh = base.height
let ctx = CGContext(data: nil, width: bw, height: bh, bitsPerComponent: 8, bytesPerRow: 0, space: CGColorSpaceCreateDeviceRGB(), bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!
ctx.interpolationQuality = .high
ctx.draw(base, in: CGRect(x: 0, y: 0, width: bw, height: bh))
let flipCy = Double(bh) - cy
ctx.setFillColor(CGColor(red: rgb[0], green: rgb[1], blue: rgb[2], alpha: 1))
ctx.fillEllipse(in: CGRect(x: cx - cd/2, y: flipCy - cd/2, width: cd, height: cd))
let vis = Double(maxY - minY + 1), s = ph / vis
let visW = Double(maxX - minX + 1) * s
// cutout rows are top-down; CGContext draws the image upright, so compute the draw rect from the visible bbox center
let midX = Double(minX + maxX) / 2, midYtop = Double(minY + maxY) / 2
let drawW = Double(pw) * s, drawH = Double(phh) * s
let x0 = cx - midX * s
let y0 = flipCy - (Double(phh) - midYtop) * s   // bottom-left origin
ctx.draw(prod, in: CGRect(x: x0, y: y0, width: drawW, height: drawH))
print("bottle visible size: \(Int(visW)) x \(Int(ph)) px")
let out = ctx.makeImage()!
let dest = CGImageDestinationCreateWithURL(URL(fileURLWithPath: a[3]) as CFURL, UTType.jpeg.identifier as CFString, 1, nil)!
CGImageDestinationAddImage(dest, out, [kCGImageDestinationLossyCompressionQuality: 0.93] as CFDictionary)
CGImageDestinationFinalize(dest)

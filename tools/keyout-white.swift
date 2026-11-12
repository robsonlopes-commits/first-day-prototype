import Foundation
import CoreGraphics
import ImageIO
import UniformTypeIdentifiers
// usage: keyout-white in.png out.png [tolerance 0-255 (default 10)]
// Makes the white background of a product photo transparent: a flood fill from the 4 borders over pixels that are within `tolerance` of pure white (so the white parts INSIDE the
// product stay), then a 1 px soft edge. Written 2026-11-11 to cut the Sesame Toddlers' Multi bottle the owner sent on a white background.
let a = CommandLine.arguments
let tol = a.count > 3 ? Int(a[3])! : 10
let src = CGImageSourceCreateWithURL(URL(fileURLWithPath: a[1]) as CFURL, nil)!
let img = CGImageSourceCreateImageAtIndex(src, 0, nil)!
let w = img.width, h = img.height
var d = [UInt8](repeating: 0, count: w * h * 4)
let ctx = CGContext(data: &d, width: w, height: h, bitsPerComponent: 8, bytesPerRow: w * 4, space: CGColorSpaceCreateDeviceRGB(), bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!
ctx.draw(img, in: CGRect(x: 0, y: 0, width: w, height: h))
func isBg(_ i: Int) -> Bool { 255 - Int(d[i*4]) <= tol && 255 - Int(d[i*4+1]) <= tol && 255 - Int(d[i*4+2]) <= tol }
var bg = [Bool](repeating: false, count: w * h)
var stack = [Int]()
for x in 0..<w { stack.append(x); stack.append((h-1)*w + x) }
for y in 0..<h { stack.append(y*w); stack.append(y*w + w - 1) }
while let p = stack.popLast() {
  if bg[p] || !isBg(p) { continue }
  bg[p] = true
  let x = p % w, y = p / w
  if x > 0 { stack.append(p-1) }; if x < w-1 { stack.append(p+1) }
  if y > 0 { stack.append(p-w) }; if y < h-1 { stack.append(p+w) }
}
// alpha: 0 on the background, 1 px soft edge on pixels next to it
for i in 0..<(w*h) {
  if bg[i] { d[i*4] = 0; d[i*4+1] = 0; d[i*4+2] = 0; d[i*4+3] = 0 }
}
var out = d
for y in 1..<(h-1) { for x in 1..<(w-1) {
  let i = y*w + x
  if bg[i] { continue }
  if bg[i-1] || bg[i+1] || bg[i-w] || bg[i+w] {
    let al = 150
    out[i*4] = UInt8(Int(d[i*4]) * al / 255); out[i*4+1] = UInt8(Int(d[i*4+1]) * al / 255); out[i*4+2] = UInt8(Int(d[i*4+2]) * al / 255); out[i*4+3] = UInt8(al)
  }
} }
let oc = CGContext(data: &out, width: w, height: h, bitsPerComponent: 8, bytesPerRow: w * 4, space: CGColorSpaceCreateDeviceRGB(), bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!
let dest = CGImageDestinationCreateWithURL(URL(fileURLWithPath: a[2]) as CFURL, UTType.png.identifier as CFString, 1, nil)!
CGImageDestinationAddImage(dest, oc.makeImage()!, nil)
CGImageDestinationFinalize(dest)
print("keyed \(w)x\(h)")

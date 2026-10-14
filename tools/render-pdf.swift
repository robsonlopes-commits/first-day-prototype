import Foundation
import PDFKit
import AppKit
let a = CommandLine.arguments
let doc = PDFDocument(url: URL(fileURLWithPath: a[1]))!
let out = a[2]
let pages = a.dropFirst(3).map { Int($0)! }
for p in pages {
  guard p-1 < doc.pageCount, let page = doc.page(at: p-1) else { continue }
  let r = page.bounds(for: .mediaBox)
  let scale: CGFloat = 1.5
  let img = NSImage(size: NSSize(width: r.width*scale, height: r.height*scale))
  img.lockFocus()
  NSColor.white.set(); NSRect(x:0,y:0,width:r.width*scale,height:r.height*scale).fill()
  let ctx = NSGraphicsContext.current!.cgContext
  ctx.scaleBy(x: scale, y: scale)
  page.draw(with: .mediaBox, to: ctx)
  img.unlockFocus()
  let tiff = img.tiffRepresentation!
  let rep = NSBitmapImageRep(data: tiff)!
  try! rep.representation(using: .png, properties: [:])!.write(to: URL(fileURLWithPath: "\(out)_p\(p).png"))
}
print("pages:", doc.pageCount)

#!/usr/bin/env python3
"""Crops a pdftocairo-style SVG (flat paths, clipPath groups, a few <use> images) to a box and drops every element outside it, so one panel of an artboard
becomes a small standalone SVG. Written 2026-11-10 to extract Version B art from the Sesame House Style library (each artboard holds Versions A, B and C side by side).
Usage: tools/svg-crop.py in.svg out.svg x y w h        (the box is in the SVG's own units, the viewBox of the input)
The paths of such files only use absolute M, L, C and Z, so the bounding box of an element is the box of its numbers."""
import re, sys
import xml.etree.ElementTree as ET

SVG = 'http://www.w3.org/2000/svg'
XL = 'http://www.w3.org/1999/xlink'
ET.register_namespace('', SVG)
ET.register_namespace('xlink', XL)
NUM = re.compile(r'-?\d+\.?\d*(?:e-?\d+)?')


def tag(e): return e.tag.split('}')[-1]


def path_box(d):
    n = [float(x) for x in NUM.findall(d)]
    if len(n) < 2: return None
    xs, ys = n[0::2], n[1::2]
    return min(xs), min(ys), max(xs), max(ys)


def union(a, b):
    if a is None: return b
    if b is None: return a
    return min(a[0], b[0]), min(a[1], b[1]), max(a[2], b[2]), max(a[3], b[3])


def main(src, out, x, y, w, h):
    tree = ET.parse(src)
    root = tree.getroot()
    defs = next(c for c in root if tag(c) == 'defs')
    clips = {c.get('id'): c for c in defs if tag(c) == 'clipPath'}
    images = {c.get('id'): c for c in defs if tag(c) == 'image'}
    img_wh = {k: (float(v.get('width', 0)), float(v.get('height', 0))) for k, v in images.items()}

    def box(e):
        t = tag(e)
        if t == 'path': return path_box(e.get('d', ''))
        if t == 'use':
            ref = (e.get('{%s}href' % XL) or e.get('href') or '').lstrip('#')
            iw, ih = img_wh.get(ref, (0, 0))
            m = re.search(r'matrix\(([^)]*)\)', e.get('transform', ''))
            a, b, c, d, tx, ty = [float(v) for v in m.group(1).split(',')] if m else (1, 0, 0, 1, 0, 0)
            pts = [(a * px + c * py + tx, b * px + d * py + ty) for px, py in ((0, 0), (iw, 0), (0, ih), (iw, ih))]
            return min(p[0] for p in pts), min(p[1] for p in pts), max(p[0] for p in pts), max(p[1] for p in pts)
        r = None
        for ch in e: r = union(r, box(ch))
        return r

    x0, y0, x1, y1 = x, y, x + w, y + h
    for el in list(root):
        if el is defs: continue
        b = box(el)
        if b is None or b[2] < x0 or b[0] > x1 or b[3] < y0 or b[1] > y1:
            root.remove(el)
    # keep only the defs that remain referenced
    text = ET.tostring(root, encoding='unicode')
    used = set(re.findall(r'url\(#([^)]+)\)', text)) | set(re.findall(r'href="#([^"]+)"', text))
    changed = True
    while changed:  # a clipPath may reference another one, an image may be used by a kept use
        changed = False
        for d in list(defs):
            i = d.get('id')
            if i in used:
                refs = set(re.findall(r'url\(#([^)]+)\)', ET.tostring(d, encoding='unicode')))
                if not refs <= used: used |= refs; changed = True
    for d in list(defs):
        if d.get('id') not in used: defs.remove(d)
    for k in ('width', 'height'): root.attrib.pop(k, None)
    root.set('width', '%d' % round(w)); root.set('height', '%d' % round(h))
    root.set('viewBox', '%g %g %g %g' % (x, y, w, h))
    tree.write(out, encoding='unicode', xml_declaration=True)


if __name__ == '__main__':
    a = sys.argv
    main(a[1], a[2], *[float(v) for v in a[3:7]])

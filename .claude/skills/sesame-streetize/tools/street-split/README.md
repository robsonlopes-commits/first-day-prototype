# street-split

Cuts the owner's `street.svg` / `street2.svg` (641 x 290 or 314 units, 17 MB, one flat z order, no ids) into the raster layers of `StreetScroll.jsx`
(`public/assets/sesame/street/s2-*.webp` (renamed from street-* so that browsers do not keep the old files)). Needs `rsvg-convert` and `cwebp` (Homebrew), python 3.

- `lib.py`: path bounding boxes, `SRC` is the path of the SVG (edit it).
- `build.py`: `LAYERS` maps a layer name to a range of children (`bg` = the children of the first big group, `top` = the children of the main group without the `mask` tags). `make_svg(name, viewBox, px_per_unit)` writes a standalone SVG with every mask and gradient copied, then render it with `rsvg-convert` and `cwebp -q 82 -alpha_q 92`.
- Ranges found on 2026-11-19: sky bg 0, clouds bg 1-4, far (skyline and far trees) bg 5-43, street (ground, building, Oscar) bg 44-228, Abby top 207-375, Cookie top 376-451, Zoe top 452-561, Elmo top 562-635, Tango top 652-695, fgback top 1-206, fgfront top 636-651 and 696-914.
- Resolutions used: street, clouds, far, foregrounds 6 px per unit, characters 8, the window detail (x 95 y 63 w 36 h 48) 60, the sky 2.
- Always look at every layer before using it (sheet of PNGs), a wrong range puts a piece of a character in another layer.

## street2.svg (2026-11-19, the one in use)
Same art, 641 x 314 (24 units of sky and building top added, everything else moved down by 24). The characters keep the same ranges. In the first big group (now 262 children) the clouds are bg 1-4 plus **50**, and the street is bg 44-261 without 50. Pick the file with the `STREET_SVG` environment variable. The window glass is at x 103 y 97 w 19 h 30; the window detail crop is x 95 y 87 w 36 h 48 at 60 px per unit.

## Park.svg (2026-11-19, the park parallax of the v2 probiotic page)
`bpark.py` is the same idea for `Park.svg` (958 x 327, the first group `top[1]` has 2095 children and holds the sky, clouds, trees, the bridge, Grover, Cookie, Abby and the foreground). Ranges found: clouds g 1-6, background g 7-1639, Grover g 1640-1703, Cookie g 1704-1758, Abby g 1759-1898, Abby's sparkles g 1899-1929 (stars 1899-1902, 1903-1906, 1907-1910, 1927; dots the rest), foreground g 1930-2094; top level items: orange flower 2-10, ladybug 11-34, butterfly 35-110, Big Bird 111-219, ball 220-239, caterpillar 240-259, Elmo 260-304. The sky is a gradient (paint0) rendered as its own very tall layer so the camera can tilt above the scene. Output: `public/assets/sesame/park/p-*.webp`, used by `ParkScroll.jsx`.

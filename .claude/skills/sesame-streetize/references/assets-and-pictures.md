# Assets and pictures

## Where things are
- Art (licensed, **untracked until the owner approves**): `public/assets/sesame/` with `characters/*.svg`, `props/*.svg`, `sesame-street-logo.svg` (official logo `svg/USA_CMYK_main.svg` of the owner), `bottle-sesame-toddlers-probiotic.png` (the owner's bottle, 1110x1300, Elmo plush on the label) and `bottle-sesame-square.jpg`.
- Generated pictures (mockups): `public/assets/custom/ss-kitchen|bath|essentials|berries|boy|compare|why|lifestyle.jpg`, prompts in `public/assets/custom/PROMPTS.md`.
- Source library outside the repo: `~/Downloads/House Art Style - SVG/` (`svg/` the artboards, `previews/`, `inventory.csv`, `index.html`). Converted from the owner's EPS and PDF zips; flat SVGs of 2 to 80 MB. Never convert inside the project.

## Extracting a character (Version B)
1. Every artboard holds Versions A, B, C side by side, the **middle panel is B** (a green "Version B" bar under it). Render the artboard to PNG (`rsvg-convert -w 600`), find the B panel (the non-white pixels above the green bar) and the box in the SVG's own units.
2. `python3 tools/svg-crop.py in.svg out.svg x y w h` keeps only paths and images inside the box (2 to 200 KB result). The paths use only absolute M, L, C, Z so the box is the box of the numbers.
3. **Look at every crop**: some come with a second figure, a floating head, a prop or a caption (Big Bird's note). Pick the pose without extras or tighten the box.
4. To take part of a character (Big Bird's head for the button): crop to the head box, then open the SVG and remove the neck and body `<path>` elements by their bounding boxes (script with ElementTree); nothing is faded or redrawn.
5. Library has crop guides (legs cut in banners): respect them; read the scaling note of a sheet before resizing groups. Names: HS and HS2 = House Style 1 and 2, EL Elmo, CM Cookie Monster, GR Grover, OG Oscar, AC Abby, CT the Count, ZO Zoe, BB Big Bird, PROPS, BKG backgrounds, PTN patterns, ICN icons.
6. Curated set already extracted: elmo-* (wave, hello, cheer, dance, point, think, jump, peek, sit, stand, ball, blocks, run, lie, shy, tablet), count-1/2, grover-1/2/3/wave, abby/abby-2, oscar-1/2/3, bigbird, bigbird-head, cookie-wave/cross/eat, zoe-1/2, ernie, rosita, slimey, tango-run, grp-elmo-tango-1/2/3/hug, grp-bigbird-tango, grp-grover-elmo-tango; props duck-front/side, lamp-post (the right post of the artboard, whole bulb; the left one is cut at the top in the art), lamp-posts, num-0 to 9. Kermit is not Sesame Workshop: never use. Not extracted yet: Bert, Telly, Mr. Snuffleupagus, Baby Bear, Prairie Dawn, Julia, Rudy, Gabrielle and others in the library.

## Generated pictures
Follow `firstday-imagegen` (the exact-size method, label patch, lid checks, Sofia Pro only in text). Specific to this page:
- The scene pictures are edits of the live image of each section: pouch removed (default model 2.1, "keep the exact same framing"), the real Sesame bottle pasted with `tools/place-product.swift` at the size given by a reference object, one integration pass, `tools/label-patch.sh`. Final bottle size as % of the image height: kitchen 30, bath 18, essentials 26, berries 36, boy 31.
- The comparison infographic and the "Why First Day" slide: remove the old bottle, paste the real cutout (pixel exact label).
- The first gallery slide is the owner's PNG on `#e7f4fe`, padded to a square with `rsvg-convert` (the PNG embedded as a data URI; an external href is not loaded). A non square image gets cropped by the gallery.
- Model test: Pro (`gemini-3-pro-image`) was not better for sizes (and costs 4 to 5 times more). Total spend of the page: about 9 dollars of images.
- All generated images are MOCKUPS: say so in the summary.

## Stickers
Container units (`cqw`) so they scale with the picture; positioned by `right/left/top/bottom` in `cqw`, height in `cqw`. A sticker with `say` is a button (tap or hover shows the bubble, 3.2 seconds). Bubble position relative to the sticker: above the head for stickers in the lower right, to the side when the head is near the top. Bubbles wrap at 42cqw. No sparkles or tiny squares.

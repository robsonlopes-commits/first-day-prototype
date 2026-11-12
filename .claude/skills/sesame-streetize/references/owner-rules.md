# Owner rules and decisions, in order (Toddlers' Probiotic exploration, 2026-11-09 to 11-11)

Each item: the rule, the reason (when the owner gave one or it was obvious), what to do on a new page. "Owner" is Robson, who talks in Portuguese; files and commits are in English.

## Brief
- Duplicate the PDP into `/explorations/sesame-<page>`; **header and footer are the only things untouched**; the rest is free. New sections allowed, text content mostly unchanged, every asset "sesame streetizado", use the SVGs wherever possible, fun interactions and animations welcome.
- Mobile first (95 percent of the traffic is mobile): design at 375px, desktop second but tidy.

## Pictures (the most important rule)
1. **A picture or video slot of the Shopify theme is an image field, not HTML.** So every slot holds a FILE: the live image, or an image generated with the image API. SVGs can sit on top of a file as stickers, and can live freely in new sections and in HTML and CSS changes of existing sections. **Never replace a photo with a montage of SVGs built in HTML.** The first version of the page did that and was rejected; every drawn slide and scene was deleted.
2. Image generation was allowed only with the library SVGs or the owner's Sesame bottle as references, never to invent a character from words. In the final page the characters are SVG stickers on top of generated pictures.
3. **Pictures the owner approved are not touched again**: the gallery infographics, supplement facts, back panel, social proof collage, the 97 percent guarantee collage, the comparison infographic (the real bottle cutout pasted on the live layout), the main bottle slide ("essas da galeria estao otimas").
4. Pictures have **16px radius**; the main gallery frame has **no white border** (transparent card). Stickers may overflow the picture of an image-with-text section (`overflow: visible` on the media wrapper) but are clipped inside the gallery carousel (it must hide neighbor slides).
5. The first gallery slide is the owner's Sesame bottle on a square canvas, flat color `#e7f4fe` (a sample the owner took from his own reference), with **no stickers, logo, confetti or characters on top** ("ta too much no inicio"). The gallery image first had white, blue, lavender, cream, green backgrounds tried; the owner chose the light sky blue sample.
6. Closing CTA: use the **original Home hero asset and its Benefits marquee unchanged**, one CTA only, only copy changes, plus the Sesame Street logo. Do not edit that image.

## Bottles in generated scenes
7. Bottle size: 4.72 x 2.95 in (12 x 7.5 cm), taller than wide (ratio 8:5), flat thin lid in the same pale band, no tall white cap, perspective, light and shadow of the scene. Sizes are set by **compositing from a reference object with a researched real size** (copo, mamadeira, patinho, tigela), then one integration pass and a label patch. Owner confirmed the sizes were good. Full method: `firstday-imagegen`.

## Typography
8. **Only Sofia Pro on the whole page**, including the third party iframe (FrontrowMD) and the cart drawer. The owner thought a serif was Gelica, then found Fredoka and rejected it too. Titles are **Sofia Pro Bold (700)**. The product title (vanity) keeps the original size and colors (the blue highlight, not red).
9. Verify by listing the computed `font-family` of every text element, in the document and in iframes (`qa-checklist.md`).

## Shadows, radius, color
10. **No `box-shadow` and no `drop-shadow` anywhere.** First hard offset shadows were softened, then all were removed (a global `.ss-page * { box-shadow: none !important }`). The selected gallery thumbnail returned to the original blue 2px border with 4px radius; the quantity block returned to its original purple (#776CB1) colors.
11. Palette: pastel sections (sky, sun, mint, lilac, rose, peach), strong accents red, yellow, green, orange, purple, pink, ink `#1f3a70`. **These colors were chosen by eye by the assistant, not extracted from the guide or the packaging** (owner asked where they came from). Still an open question: use First Day packaging colors for backgrounds and Sesame colors for accents?
12. Page sky: the buy box has a light blue gradient (#d6eeff to white) with 4 white clouds (own drawing, SVG as CSS variable) at fixed positions; clouds may go behind the white gallery image since the first slide now has a blue background.

## Waves and spacing
13. **Replace the tall theme waves by the flat modern wave** (`components/ModernWave.jsx`, 1512x99 path of the homepage "Our Food Is Not What It Used to Be" band and the All-in-1 plate band), 99px on desktop and 52px on phones, opt-in `modern_waves`. A 1px overlap hides the seam between the wave and its section. The color under the wave must be the real neighbor color; no white strip between two colored sections.
14. Two image sections in a row draw the wave once (bottom wave off).
15. The dotted background of Real Wholesome shows through the transparent part of the wave above it.
16. **One vertical rhythm**: `--ss-pad` 75px (48px on phones) between a wave strip and the content, top and bottom, in every section; Meet The Gang is the exception tuned by eye (36px on top of the title, grass 112px, 48px under).
17. Where a section has its own inner padding (advisors 32px, FAQ 36px, rich text 32px) the page padding subtracts it so the total is the same.

## Characters
18. Cookie Monster is used much (kitchen sticker, Real Wholesome card, Meet The Gang). Poses with a cookie are NOT used next to the bottle or the gummy (cookie is a "sometimes food"); `cookie-eat` (walking with a cookie) only in Meet The Gang with the sometimes-food line.
19. Tango (the puppy) does not talk: he was removed from the main bottle slide, the tote bag picture and the closing; he only runs across the page as a motion element.
20. Meet The Gang has **six** friends (Elmo, Big Bird, Grover, Abby, The Count, Cookie Monster). Oscar and Zoe were cut ("menos importantes"); Oscar stays in the comparison picture and the FAQ corner, Zoe in Real Wholesome. One lamp post, whole, behind the grass; bubbles open ABOVE the head.
21. A character's lines must be tied to the product or the section being shown (see `copy-and-voice.md`).
22. Real Wholesome: keep the original icon of each item AND add a character, no inner square of another color, original order of the live section, colors distributed so an icon never sits on its own color.
23. The Count section: four stats that mean something alone (3 strains named, 2 gummies a day, ONLY 2g of sugar, 1,000,000+ parents). The "ONLY" is in the flow above the number with the same gap as the label under it. No counting animation (it looked odd, 0 to a million); cards just rise in, one after another. Contained box (max 1280px), not full width.
24. The Sesame Street strip above the title: no shadow, 8px radius, full width, big logo, on desktop the "Tap the sign" text at the right end.
25. The quantity counter (the Count): in the header row of the quantity block, left aligned, 66px, bubble with a left pointing tail next to him; on narrow columns it goes to its own row.
26. The Add To Cart button: 66px high, original text, the cart icon is **Big Bird's head only** (head cut out of the library figure with `svg-crop` and the neck paths removed from the file, nothing faded), half outside the top edge of the button, bobbing.
27. Speech bubbles: triangle tail made with two clip-path triangles (ink and white), never a rotated square. The bubbles of stickers appear on tap or hover only.
28. Ducks (tap the Sesame Street sign) and confetti fall ABOVE the header (z-index above the header). Decorative colored little squares over pictures were removed.

## CTAs and copy
29. **CTAs are title case** ("Order Today", "Add To Cart", "Write A Review"), never ALL CAPS. Third party widget buttons are fixed with `text-transform: capitalize`.
30. Headings: see `copy-and-voice.md` (a play on the show in every marketing heading, the character name only where it reads better, the colon exception).
31. FAQ section: white background, cards `#f2fbff`.
32. Advisors: round photo with a round colored ring (the ring was a square before).

## Process rules
33. No commit or push until the owner says "commit e push". Before a commit warn about `public/assets/sesame/` (licensed art in a public repo) and the untracked generated pictures.
34. Report in Portuguese, say what is invented, flag the production copy error (below), and never claim something was verified when it was not.

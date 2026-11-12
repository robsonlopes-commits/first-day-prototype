# Page recipe: section by section (as built on the Toddlers' Probiotic PDP)

Order of the page and what each part got. Section ids are those of the legacy PDP (`src/data/pdp/toddlersProbiotic.js`); on another page map them by type. Palette constants of the page file: SKY `#d6efff`, SUN `#fff1a8`, MINT `#d4f5df`, LILAC `#e8dcfa`, ROSE `#ffe0ec`, PEACH `#ffe2bf`, INK `#1f3a70`, light blue `#f2fbff`.

## Buy box (main product section)
- **Sky**: gradient `#d6eeff` to white over 560px with four white clouds (`::before`, the cloud is an SVG data URI in `--ss-cloud`; positions `-4% 14px, 104% -12px, 42% -18px, 76% 6px`, sizes clamp 24vw/27vw/14vw/12vw). The right cloud is lifted so it does not touch the title. No extra top padding.
- **Gallery**: slide 1 the Sesame bottle (`bottle-sesame-square.jpg`, flat `#e7f4fe`, 1600x1600), no stickers; slide 6 (strains infographic) Count sticker, slide 7 (flavor) Zoe sticker, slide 9 (why First Day) the live layout with the real bottle pasted and a Count sticker, slide 11 (lifestyle) generated with the Sesame bottle and an Elmo sticker; other slides are live files. Main frame 16px, no border, no shadow; thumbnails keep their original style.
- **Strip** `SignBadge` in `SLOT_INFO_TOP` (Sesame Street logo, "Sesame Street Edition", "Tap the sign for a surprise": ducks fall).
- Title, vanity, price, frequency and quantity blocks: original look. Quantity header gets the Count counter (`SLOT_QTY_HEADER`). Add To Cart: red, 66px, Big Bird head.
- `onAddToCart` triggers celebration (confetti, Elmo jump, Tango runs).
- Clinicians' Choice (FrontrowMD iframe): fonts forced to Sofia Pro (copy the page's `@font-face` rules into the iframe, repeat every second).

## Sections after the buy box (type, picture, colors, waves, sticker)
| # | Section | Picture (file) | Sticker | Colors and waves |
|---|---|---|---|---|
| 1 | image-with-text "Potty Time Feeling Stuck" | `ss-kitchen.jpg` | Cookie Monster waving | SKY, top wave white, bottom wave transparent (the dots show) |
| 2 | **new** Real Wholesome | none | 8 characters + original icons | white with dots; goes up under the wave |
| 3 | wave join | | | flat wave `#f2fbff` with transparent container |
| 4 | rich-text "What Is Going On..." | none | none | `#f2fbff`, text green `#00ab4e` kept |
| 5 | **new** The Count Counts It | none | 2 Count figures | `#f2fbff` around a contained yellow box |
| 6 | image-with-text bath | `ss-bath.jpg` | Ernie | MINT, only the top wave |
| 7 | image-with-text essentials | `ss-essentials.jpg` | Grover | LILAC, top wave only |
| 8 | image-with-text berries | `ss-berries.jpg` | Count | ROSE, top wave only |
| 9 | image-with-text boy | `ss-boy.jpg` | Abby | SKY, top wave only |
| 10 | comparison (image-with-text) | `ss-compare.jpg` (live layout + real bottle) | Oscar in his can | SUN, bottom wave to `#f2fbff` |
| 11 | multicolumn advisors | live photos, round ring | none | `#f2fbff` |
| 12 | **new** Meet The Gang | none | 6 characters, 1 lamp post | sky gradient, grass 112px, flat wave top |
| 13 | guarantee (image-with-text) | live 97 percent collage (untouched) | none | PEACH, top wave from the grass `#86cf84`, bottom to white |
| 14 | FAQ (collapsible) | none | Oscar can in the corner | white, cards `#f2fbff` |
| 15 | closing | Home hero image unchanged | none | TempHero + logo + Benefits marquee |
| 16 | reviews (Judge.me) | | | buttons capitalized |

## New sections (components in `Sections.jsx`)
- **Real Wholesome**: 8 cards in the order of the live section (`real_results`, `no_fillers`, `eco_friendly`, `clinically_tested`, `non_gmo`, `tested_and_loved`, `quality_and_safety`, `potency_and_purity`). The icon is the live SVG (`essentialEightIcons.js`, scaled by the height of its viewBox so every glyph is 60px), the character stands under it, the live text under that. Cards 28px radius, no shadow.
- **The Count Counts It**: see rule 23. Wrapper `.ss-count-wrap` (`#f2fbff`) so the box is contained; the colored strip at the bottom of the box.
- **Meet The Gang**: tap a friend, a bubble with a product line opens above the head, the character hops. Row is one line on desktop (max 185px high), wraps on phones (130px, 170px for the tall one).

## Motion (`Fx.jsx`)
Elmo mascot fixed at the bottom left (tap: new pose and a product line), Tango runs across (load, every 4th tap, add to cart), confetti, a rain of rubber duckies (z-index above the header), `.ss-reveal` pop-in when a character scrolls into view, the Count counting the bottles in the quantity block, cards of The Count rising in. Everything is disabled by `prefers-reduced-motion`.

## Spacing and mobile
`--ss-pad` 75px (48px under 750px); `--ss-wave-h` 99px (52px under 750px). Phones: clouds still shown, stats 2x2, Gang in a wrapping row, lamp hidden, mascot smaller, counter on its own row.

## Phone layout of the new and stuck-on pieces (decided 2026-11-11 after the owner saw them at 375px)
- **Meet The Gang**: one row on the grass that you swipe (scroll-snap, no scrollbar), not a wrapping grid floating over the sky; the lamp post is hidden (use `.ss-page .ss-gang__lamp`, a plain class loses to `.ss-page .ss-char`); the row has top padding for the bubbles because an `overflow-x: auto` box clips them.
- **Closing CTA (TempHero)**: the logo is absolute on top, so give the hero `padding_mobile: 84` and hide the rating line (it ran over the original picture).
- **FAQ Oscar**: 84 x 66px inside the wave strip (`top: -46px`), never over the heading.
- Rule of thumb: any absolutely positioned sticker or logo needs the neighbor's padding checked at 375px.


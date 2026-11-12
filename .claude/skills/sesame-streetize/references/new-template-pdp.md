# Second page: a PDP on the NEW template (Toddlers' Multi, 2026-11-11)

Page: `/explorations/sesame-toddlers-multi`, file `src/pages/explorations/SesameToddlersMulti.jsx`, stickers `src/sections/explorations/sesame/StickersMulti.jsx`. Source page: `/products/the-no-junk-toddlers-multivitamin` (`ProductNew.jsx`, data `src/data/pdp/toddlersMultivitamin.js`). Same owner rules as the first page (`owner-rules.md`); only the build differs, because the new template is made of different sections.

## What is different from the Probiotic (legacy template) page
- `ProductNew.jsx` renders its sections inside `PdpNewContext.Provider value={page.main}`. The exploration copies that structure and overrides data (`BASE = page`), it does not edit the data file. Section ids come from the data (`sid(id)` = `#shopify-section-<id>`).
- There is no `tint/custom/MEDIA` helper. Each section is an override object (helper `set(sec, settings)`) and the Sesame layer is one extra `Stick` after the section.
- **`Stick` (ss.jsx)**: generic sticker host. `<Stick sec={sid(ID)} target=".fd-bn__media" index={0} parent>` portals an `.ss-ov` layer into the picture element of a shared section (found by selector and index; `parent` puts the layer on the parent of a `<video>` and sizes it to the video, because a portal into a `<video>` is invisible). Used on `.fd-bn__media`, `.fd-psc-card__media` (0, 1, 2), `.pdp-v2-two-up__media`, `.pdp-v2-hero`. The shared section is never edited.
- **Opt-in hooks in `MainProductV2.jsx`** (backward compatible, read from `main`): `SLOT_INFO_TOP` (the Sesame sign badge above the title), `SLOT_QTY_HEADER({qty})` (the Count counter), `onAddToCart` (confetti and Big Bird), `PRODUCT.cartImage`, and gallery `images[i].overlay`. The product title keeps its original look (`vanityTitle` with the highlighted phrase in brackets).
- **Section tints** are settings of the sections: `section_bg_color`, `wave_color`, `modern_waves`; they already use flat waves, so only the colors are overridden (BRAND image, SIGNS SKY, ROOT LILAC, DOSED wave MINT, QUALITY MINT).
- New sections reuse `CountSection` (props: bg, stats) and `MeetTheGang` (props: `gang`, `waveFrom`) from `Sections.jsx`; `SesameFx` takes `lines`. The closing is `.ss-cta` (TempHero with the original Home hero settings + the SS logo + `CustomLiquid`).
- Fonts: the shared hook `useSofiaInIframes()` (ss.jsx) copies Sofia Pro into the FrontrowMD iframe; use it instead of the inline effect of the first page.
- CSS: the selectors of the first page were generalized (`.ss-page--multi` wrapper class, `.ss-cta` instead of only `#shopify-section-ss-closing`). Careful: TempHero's own rules use `#temp_hero_xxx .temp-hero__rating`, so hiding the rating on phones needs `!important` (done).

## Pictures made for this page (all by the exact-size method)
- Gallery slide 0: the owner's bottle photo of the Sesame Multi, cut out with the new `tools/keyout-white.swift` (compile `swiftc -O tools/keyout-white.swift -o /tmp/keyout`; `/tmp/keyout in.png out.png 10` removes a white background, tolerance 10 worked first try) and placed on `#e7f4fe` (`bottle-multi-square.jpg`). Nothing on top.
- Slides 5 (why), 7 (nutrition), 8 (lifestyle) and the brand banner: `ssm-why.jpg`, `ssm-nutrition.jpg`, `ssm-lifestyle.jpg`, `ssm-banner.jpg` (flat-lay scenes: one 2K Gemini edit with 6 refs, then `label-patch.sh`; prompts in `public/assets/custom/PROMPTS.md`). Cutouts: `public/assets/sesame/bottle-sesame-toddlers-multi.png` and `...-wrap.png` (the criteria column image).
- Untracked, like the first page.

## Mobile QA done (375px, 2026-11-11)
Gallery slides (bottle, infographic, comparison with Oscar, lifestyle with Elmo), Sesame sign badge, product title (no break), brand narrative and signs cards with Big Bird sticker, Count (contained, MINT), Meet The Gang (swipe row), closing (rating hidden, SS logo, one CTA). Desktop: fonts all Sofia Pro, 0 box-shadows, no widows, CTAs title case.

## Lessons for the next new-template page
1. List the sections of `ProductNew` first and decide per section: picture slot (sticker through `Stick`), text (tint only), widget (fonts, CTA case), new section (Count, Gang, closing).
2. Do the bottle cutout from the owner's photo first (keyout tool), then the gallery, then the scenes.
3. Check every `Stick` target with `document.querySelectorAll(selector)` before blaming the sticker; a wrong index puts it on the wrong card.
4. Expect specificity fights with per-section ids (`#temp_hero_xxx`, `#shopify-section-...`): use `!important` sparingly and only for the Sesame override.
5. Copy for headings and lines is invented, pending review (see `copy-and-voice.md`); CTA "Start Your Risk-Free Journey" kept the live hyphen, owner to confirm.

## Waves on the new template (owner: "tem varios quebrados", 2026-11-11)
The sections of the new template draw their own tall theme waves (`wave_top` and `wave_bottom` in FdProblemSigns, PdpV2TwoUp, PdpV2DosedFormula) and several neighbors had the same or near colors (sky next to sky), so the seams showed a thin white wave, a hard edge or a white gap. Fix:
- Turn the theme waves off on tinted sections (`wave_top: false, wave_bottom: false`) and put a `<Seam from to />` (the flat `ModernWave`, in the page file) BETWEEN two sections. `from` = color of the section above, `to` = color below (`flip` + `ss-seam--up`/`ss-seam--over` lay it over a picture: the grass of the Gang over the hero and white over the hero's bottom; give the hero padding for it).
- Alternate the colors so no two neighbors match: white (brand), sky (signs), white (dosage), lilac (root causes), blue (formula), white (dosed), mint (quality), sky (count), white (trust). Sections that were light blue in the live data (`#d7effa`) are set to white.
- Vertical rhythm: `PAD` = 75 desktop and 48 mobile top and bottom on every tinted section (`padding_top_desktop`, `padding_top_mobile`...). Wave heights come from `--ss-wave-h` (99px, 52px on phones).
- Kept as is: the wave behind the benefits marquee of PdpV2DosedFormula (`wave_color` set to the next section's color).
- Always scroll with `behavior: 'instant'` when checking seams (the page has smooth scroll and screenshots catch the page in motion). Check each seam at desktop and at 375px.
- **Ingredients band (PdpV2DosedFormula)**: the theme draws a mint band with a wavy top AND a wavy bottom behind the marquee only, which leaves a white sliver when the next section has the same mint. Owner wants the wave to cut through the MIDDLE of the dose cards. Done in CSS (`.pdv-df::before`, flat wave on top, solid mint below, no bottom wave) with `--ss-band` measured in the page (middle of `.pdv-df__cards-wrap` to the section bottom, ResizeObserver), `wave_bottom: false`, the inner background transparent, and the quality section below in the same mint.
- **Full width stickers**: a sticker on a full width layer (the hero) must be sized in px, never cqw (a giant Big Bird and a giant bubble covered the child, owner: "ridiculo"). Character about 15vw (104 to 190px) next to the subject, bubble 15px text, max 200px wide, above and left, tap only.

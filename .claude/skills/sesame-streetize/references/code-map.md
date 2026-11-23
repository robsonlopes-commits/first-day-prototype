# Code map

## Files
- Page: `src/pages/explorations/SesameToddlersProbiotic.jsx` (the model to copy; route in `src/App.jsx`, entry in `src/pages/PrototypeIndex.jsx`).
- `src/sections/explorations/sesame/`: `sesame.css` (all styles, scoped by `.ss-page`, and `body.sesame-street` for the cart drawer), `Sections.jsx` (SignBadge, CountBubble, Wholesome, CountSection, MeetTheGang, `celebrate`, `duckRain`), `Stickers.jsx` (Ov* overlays, Sticker), `Fx.jsx` (SesameFx: mascot, Tango, confetti, ducks, `useReveal`), `ss.jsx` (CH, PR, BOTTLE, BOTTLE_SQ, LOGO, Char, Bubble, Digits, PALETTE, Sparkles).
- Shared, opt-in and backward compatible: `components/ModernWave.jsx` + `Waves` prop `modern`; `ImageWithText`, `Multicolumn`, `RichText` read `settings.modern_waves`; `MainProductLegacy.jsx`: `SLOT_INFO_TOP`, `SLOT_MEDIA`, `SLOT_AFTER_QTY`, `SLOT_QTY_HEADER`, `onAddToCart`, gallery `media[i].overlay`; `ImageWithText` prop `overlay`; `ProductLegacy` section `type: 'custom'` with `render` and `overlay`.

- `StreetScroll.jsx` + `street.css` (2026-11-19): the full screen street scene section under the buy box (sticky stage in a 5.2 screen runway, camera pan with parallax, characters hop, zoom into the window, inside picture clipped to the glass of the window; placeholder `house-inside-placeholder.webp`). Layers are cut from `street.svg` with `tools/street-split/`.

## Page building blocks (in the page file)
- `byId(id)` finds a base section. `tint(id, color, above, below, overlay, image, extra)` colors an image-with-text section, sets its waves (`modern_waves: true`), replaces the picture by a file path and adds the sticker overlay; `extra = { bottom_waves: false }` for a section followed by another wave section.
- `head(section, text)` replaces the heading (block `heading` or `settings.heading`).
- `custom(id, render)` adds a new section. `MEDIA` maps the gallery (index to file and overlay). `CLOSING` is the TempHero settings of the closing (spread of `TEMP_HERO_HOME.settings`). `main` carries the slots.
- The page wrapper `<div className="ss-page">` and `SesameFx`; fonts fix for iframes in an effect.

## CSS tokens and rules (sesame.css)
- `--ss-font` and `--ss-body` are both `'sofia-pro'`; palette variables `--ss-ink --ss-blue --ss-sky --ss-red --ss-yellow --ss-green --ss-orange --ss-purple --ss-pink`; `--ss-wave-h` (99px, 52px), `--ss-pad` (75px, 48px).
- Global: `.ss-page * { box-shadow: none !important }`; headings `font-weight: 700 !important`; `text-wrap: balance` on headings; `.ss-page use-animate.media-wrapper { overflow: visible }` so stickers may leave the picture; `.jm-button` capitalized.
- Overlays: `.ss-ov` (container-type inline-size, z-index 3), `.ss-st` stickers, `.ss-st--talk` buttons, `.ss-bubble` with the two-triangle tail (`--tail`, `--bw`).
- Fonts third party: the FrontrowMD iframe gets the page's Sofia Pro `@font-face` text and `* { font-family: sofia-pro !important }`; cart drawer and count number are forced under `body.sesame-street`.
- Reduced motion: one rule at the top disables animation and transitions.

## Reusing on another page
1. Copy the page file; change the base import (`BASE`), the section ids, the picture paths, the headings, the stickers and lines; keep `tint/head/custom`.
2. Reuse `Sections.jsx` components as they are (Wholesome only if the page has the 8 icons; CountSection needs four true stats of that product; MeetTheGang lines mention the product).
3. Add new stickers in `Stickers.jsx` (one `Ov*` per picture) and the gallery overlays in `MEDIA`.
4. If the page uses other section types, add `modern_waves` and `overlay` support to them the same opt-in way.
5. Do not edit the live data files of the product pages: all changes are overrides in the exploration.

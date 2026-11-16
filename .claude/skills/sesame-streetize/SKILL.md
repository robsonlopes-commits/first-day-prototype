---
name: sesame-streetize
description: Playbook to turn a First Day page (PDP, landing page, bundle page) into a Sesame Street edition ("sesame streetizar"), built from everything decided on the first one, the Toddlers' Probiotic exploration (/explorations/sesame-toddlers-probiotic, 2026-11-09 to 11-11), plus the second one on the new PDP template, Toddlers' Multi (/explorations/sesame-toddlers-multi, see references/new-template-pdp.md). The owner rules (what may and may not be done with pictures, fonts, shadows, waves, spacing, CTAs), the section by section recipe, the art and image pipeline, the copy and voice decisions, the code map (components, hooks, CSS), the QA scripts and the open points. Use whenever a page must get the Sesame Street look, characters, tone or stickers, together with `sesame-street` (the world, characters, licensing) and `firstday-imagegen` (bottles in scenes).
---

# Sesame Streetize a page

Written 2026-11-11 after the owner approved the first page ("a pagina ta otima"). This skill is the **how**. The `sesame-street` skill is the **what** (the show, the characters, the voice, the licensing). Read both before starting; use `firstday-copy` for every word and `firstday-imagegen` for every picture with a bottle.

## The idea in one paragraph
A Sesame Street edition is the **same page** (same sections, same live words, same product facts) with a new layer on top: a pastel sky palette with flat modern waves, round friendly shapes, Version B art of the Sesame House Style library as **stickers on top of real or generated pictures** and as **new sections**, characters that talk in short lines tied to the product, a few playful motions, and headings with a small play on the show. The header and the footer are never touched. Nothing that is a picture, photo or video slot in the Shopify theme is ever drawn with HTML or SVG: it stays a file.

## Sesame Workshop license guidelines: they override the rules below when they conflict (received 2026-11-13)
Full text in `sesame-street/references/license-guidelines.md`. The four pages built before the guidelines (probiotic, multi, bundle, Behind the Science) break several of these rules; **the next page must follow them from the start, and the old ones should be fixed (list in `references/guidelines-audit.md`).**
1. **Characters do not do business.** No character line, bubble, heading, button or picture may endorse the product, name First Day or the product, claim or promote a benefit, hold, wear or touch the product, or ask the reader to buy (CTA). Allowed in a bubble: catchphrases and generic, true-to-character phrases only ("Elmo loves you!", the Count counting "One, two, three! Ah ah ah!", Cookie "Me love cookies!", "Hello!", "Thank you!"). Headlines with a play on the show are fine as long as the CHARACTER is not the speaker of a product claim or CTA.
2. **Never flip** Cookie Monster, the Count or Rosita; never change colors; keep the **scale** between characters that share a scene (pupils the same size); never crop a pupil; crop at the widest part of the body; characters stand on a surface, right side up, not floating.
3. **One art style**: do not mix the House Style illustrations with Photography in the same project (the packaging photo of the bottle is a given, so keep the rest of the page photographic or keep stickers few and flat, and ask Sesame).
4. **Clean and modern**: fewer characters per section (one lead), no crowded groupings, no confetti or clutter.
5. **Logo**: the 2D logo only, unaltered, clear space of half its height on all sides, at least 50px wide, never beside a character line that sounds like an endorsement, never recreate the 123 sign as a set piece (video, photo).
6. **Legal notice** on every page: "TM and © 2026 Sesame Workshop." (short) or the medium or long form in the footer legal block.
7. **No songs, no voices, no original audio**; no Sesame Street set; models diverse, dressed, no other brand logos.
8. **Approval first**: concepts before execution, finished materials before posting (3 to 5 business days). A public Vercel link is a posting: protect it or `noindex` it, and share only internally until approved.

## The non-negotiable rules (all from the owner, details in `references/owner-rules.md`)
1. **Picture and video slots are files** (the live image, or one generated with the image API from the live image plus the Sesame bottle). SVGs go ON TOP as stickers, or live in new sections and in HTML and CSS changes. Never replace a photo with a montage of SVGs.
2. **Only Sofia Pro**, everywhere, including third party iframes and widgets. Never Gelica, never Fredoka or any other font. **Titles are Sofia Pro Bold (700).** The product title keeps its original colors and sizes.
3. **No box-shadow and no drop-shadow anywhere** on the page. Soft shadows were tried and then removed too.
4. **Pictures have 16px rounded corners** (the main gallery frame has no white border). The selected thumbnail and the quantity block keep their ORIGINAL colors and radius.
5. **Art: Version B only**, only from the owner's library, never redrawn, traced, recolored or generated from words. Characters in generated pictures come from the SVG stickers on top.
6. **Bottle in a scene: exact size by compositing**, sized from a reference object of known real size (see `firstday-imagegen`). The bottle is 4.72 x 2.95 in, taller than wide, flat white lid.
7. **Waves are the flat modern wave** (99px, 52px on phones), one vertical rhythm for all sections (75px, 48px on phones).
8. **CTAs are title case** ("Order Today"), one CTA in the closing, original Home hero asset unchanged.
9. **Copy**: the live words stay; headings get a small play on the show; character lines are tied to the product or the section; no claim in a character's mouth beyond what First Day may say; the gummy is a supplement, never a treat.
10. **Do not commit or push** until the owner says so. The licensed art in `public/assets/sesame/` must not go to the public repo without the owner confirming the license.

## Process (what to do on a new page)
1. **Ask the owner** which audiences and which page (memory rule: always ask which demos). Confirm the page is a duplicate under `/explorations/` and the header and footer stay real.
2. **Plan the sections**: list every section, mark which have a picture slot (they get a generated picture and a sticker overlay), which are text (they get color, waves, heading), which are third party widgets (fix fonts and CTA case) and which new sections the page needs (see `references/page-recipe.md`).
3. **Make the art** you need: crop the characters (Version B) with `tools/svg-crop.py`, check every crop by eye (`references/assets-and-pictures.md`).
4. **Make the pictures**: the Sesame bottle (or the product of the page) into each picture slot with the exact-size method, label patch, lid and ratio checks. Do not touch pictures the owner already approved (infographics, supplement facts, social proof collage).
5. **Build** with the page template in `references/code-map.md` (`SesameToddlersProbiotic.jsx` is the model): `tint()` for the colors and waves, `head()` for headings, overlays for stickers, `custom()` for new sections, the closing TempHero.
6. **Write the copy** with `references/copy-and-voice.md`: headings, character lines, new section texts, CTAs. Everything new is flagged "invented, pending owner review".
7. **QA** with `references/qa-checklist.md` (fonts, shadows, widows, CTA case, wave seams, spacing, mobile at 375px, console).
8. **Report in Portuguese**, list what is invented, what needs approval (partnership is confidential, art license, copy), and what was not verified.

## Mistakes made on the second page (Toddlers' Multi) that the owner had to correct: do not repeat (2026-11-11)
1. **Headings that only prefix an interjection and repeat the live sentence** ("Hmph! Most Vitamins Give..."). Rewrite the sentence so the play is part of it (see `firstday-copy` log items 14 and 15, and `references/copy-and-voice.md`). Ask yourself: if I cover the interjection, is what remains the live heading? Then it is not a rewrite. "Ah Ah Ah" is the Count's: name him or let his sticker say it.
2. **Section waves left as the theme draws them.** Tall theme waves, sky next to sky, a white sliver or a hard edge between sections. Decide the color of EVERY section first, alternate them so no two neighbors match, turn the theme waves off and use the flat `Seam` between sections (`references/new-template-pdp.md`). Then look at EVERY seam at desktop and at 375px (scroll with `behavior: 'instant'`, the page smooth-scrolls and the screenshot catches it moving). Special bands (the ingredients band of the dosed formula) get their own check: the owner wants the wave through the middle of the cards.
3. **A sticker sized in `cqw` on a full width layer** (hero). The character and the bubble became giant and covered the child. Full width pictures get px sizes (character 15vw, bubble 15px text, max 200px wide), placed beside the subject, never over a face.
4. **Big text or big characters "because the template says so".** Before shipping a sticker, look at it next to the subject at 1024 and at 375: it must not cover a face, a bottle label or a button.
5. **Seeing only one viewport.** Check desktop AND 375 for every change, including the ones that look purely desktop (waves, hero).
6. **Guessing selectors/ids** (`#shopify-section-...`): list the real ones with `document.querySelectorAll` first; a wrong index puts a sticker on the wrong card.
7. **Specificity**: per-section ids in the theme beat class rules (`#temp_hero_xxx .temp-hero__rating`); verify the computed value after every override, use `!important` only for the Sesame override.
8. **Ask what is the page template** (legacy `ProductLegacy` like the Probiotic, or new `ProductNew` like the Multi) before building: the legacy recipe is `page-recipe.md`, the new one is `new-template-pdp.md`.

## Files
| Need | File |
|---|---|
| Every rule and decision of the owner, in order, with the reason | `references/owner-rules.md` |
| Section by section recipe (colors, waves, spacing, new sections, stickers, motion) | `references/page-recipe.md` |
| Art extraction, picture generation, files, sizes | `references/assets-and-pictures.md` |
| Headings, lines of the characters, stats, CTA, voice decisions | `references/copy-and-voice.md` |
| Components, hooks, CSS tokens, how to reuse them | `references/code-map.md` |
| Verification scripts and the final checklist | `references/qa-checklist.md` |
| A PDP on the NEW template (`ProductNew`): Stick host, MainProductV2 hooks, keyout, second page notes | `references/new-template-pdp.md` |
| The Behind the Science landing (hero wheel with a bottle, hand picture, StandaloneProduct hooks, capturing a live LP) | `references/landing-bts.md` |
| A bundle PDP on the legacy template (Toddlers' Starter Pack): reuse of pictures, the duo of bottles, section map | `references/bundle-starter-pack.md` |
| Audit of the four built pages against the Sesame license guidelines (what to change) | `references/guidelines-audit.md` |
| Open points, risks, what is not done | `references/open-points.md` |

# Third page: a bundle PDP on the LEGACY template (Toddlers' Starter Pack, 2026-11-11)

Page `/explorations/sesame-toddlers-bundle`, file `src/pages/explorations/SesameToddlersBundle.jsx`, stickers `StickersBundle.jsx`. Source: `/products/toddler-tlc-starter-pack` (`ProductLegacy`, data `src/data/pdp/toddlerTlcStarterPack.js`: The Multi with Big Bird + the Pre + Post Probiotic with Elmo, two bottles per pack). The owner said "toddler bundle"; this page was taken to be it (confirm if another bundle was meant). Built in one pass by following the recipe of the first page (`page-recipe.md`) and the lessons of the second (`SKILL.md`, "Mistakes made").

## What was reused (it made the page cheap: only ONE new picture)
- Pictures already generated: `ssm-banner.jpg` (the Multi flat-lay) for the Multi section, `ss-lifestyle.jpg` (Probiotic flat-lay) for the Probiotic section, `ssm-nutrition.jpg` for the gallery nutrition slide. Live files with stickers: sugar chart, comparison table, ingredients infographic, strains infographic.
- New picture: the duo of the two Sesame bottles as gallery slide 0: `public/assets/sesame/bottle-sesame-duo-square.jpg` = flat `#e7f4fe` 1600x1600 (a PNG written with a tiny python zlib script, no PIL) + `/tmp/place` twice with the real cutouts (probiotic behind: cx 1100, cy 815, height 930; multi in front: cx 505, cy 825, height 960). Keep the overlap under about 40px: with 140px the Elmo plush and the NO JUNK seal of the back bottle were hidden.
- Shared code: `tint/head/custom` copied from the first page (they should move to a shared file next time), `Wholesome` (new prop `first`: first section under the buy box, no section above to tuck under), `CountSection` (stats prop), `MeetTheGang` (gang prop), `CountBubble` (new prop `unit="pack"`), `SesameFx lines`, `useSofiaInIframes`, `StickersMulti` (OvDesigned, OvNutritionMulti) and `Stickers` (OvStrains).

## Section map (legacy ids of the starter pack)
Real Wholesome (new, first) -> flat wave -> The Count Counts It (new; stats 10 critical nutrients, 21 organic superfoods, 3 strains, only 2g sugar per serving: all on the live page) -> Multi (MINT, `05081b91`) -> Probiotic (ROSE, `2e1dde27`) -> Sugar chart (SKY, `9bb086b7`) -> Comparison table (SUN, `image_with_text_yraceP`) -> Advisors -> Meet The Gang -> Guarantee (PEACH) -> FAQ -> closing (Home hero + logo). Dropped: the empty rich text `c321e181`, the live closing `0afdae13`, the live Real Wholesome (replaced). Colors chain with only the top wave drawn in a row (`bottom_waves: false`).

## Headings (rewrites, a pair for the two bottles)
"Big Bird Is On The Bottle And 21 Organic Superfoods Are Inside" / "Elmo Is On The Bottle And Pre, Post And Probiotic Are Inside" / "The Count Counted The Sugar, Up To 75% Less Than Others" / "Smooth, Fruity, Sweet And Natural, Oscar Has Nothing To Grouch About" / "Curious Like Elmo? Ask Away About The TLC Starter Pack" / closing "Elmo And Big Bird Are Ready For A Happy Growing Journey, Are You?". When the live heading is only a product name, there is nothing to cover-test: write a statement about what the section says (the bottle character + the fact in its text).

## Small decisions
- Oscar on the comparison table (a dense picture): put him in the one empty cell (top left above the row names), small (12.5cqw), so he covers no word; the bubble only opens on tap.
- Mobile 375: no horizontal scroll, all seams checked, gallery thumbnails load lazily (blank until scrolled, as live).
- Everything new is invented and pending the owner's review; the partnership stays confidential; art and generated pictures stay untracked.

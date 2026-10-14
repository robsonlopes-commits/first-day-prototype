---
name: firstday-design
description: Design rules for the First Day prototype. Use for ANY visual change in this project (redesign a section, make alternatives, new layout, change spacing/typography/colors, mobile tweaks, new sections or pages). Keeps every result inside First Day's real design system (tokens, fonts, buttons, radius, outline shadows) instead of generic "AI taste".
---

# First Day design skill

This repo is a high-fidelity React sandbox of firstday.com for design ideation. The Shopify theme IS the design system.
Design work here means exploring NEW ideas that still look unmistakably like First Day. Never apply a generic style
(no purple gradients, no generic SaaS card rows, no new palettes, no Tailwind, no new fonts).

## Before designing
1. Read `PROTOTYPE_GUIDE.md` (routes, file map) and the section file you will change (`src/sections/<Name>.jsx` + its CSS).
2. Identify the page, the section and whether the request is desktop, mobile or both. If the user says only mobile, do not touch desktop rules (use the section's existing `@media` breakpoints).
3. Look at the current result in the browser (dev server `npm run dev`, http://localhost:5173) at 1440px and 375px before changing it.
4. Pick tokens from the lists below. If something is not covered, find how the theme already does it (`reference/theme`, `src/styles/theme/*.css`) before inventing.

## Design tokens (source: `src/styles/fd-ui-kit.css`, never hardcode when a token exists)
**Brand**: noon blue `--color-brand-noon-blue` #476DED (primary, links, CTAs); late noon blue `--color-brand-late-noon-blue` #5368C2 (hover, Men segment).
**Surfaces**: morning blue `--color-surface-morning-blue` #F2FBFF (default page background); late morning blue #E4F5FF; white. The Home hero band uses late noon blue #5368C2 with white text and the kids yellow #FFB511 as the highlight color.
**Text**: `--color-text-on-light-1` #2C3D50 (headings/body), `-2` #737373 (secondary), `--color-text-on-dark` #FFF.
**Product colors**: multi #64DAA1, tribiotic #DE4343, magnesium #776CB1, brain #008780. **Segment colors**: toddlers #00847C, kids #FFB511, women #F78684, teens #00B4E4, men #5368C2. 10% tints exist as `--color-helper-<name>-10`.
**Feedback**: success #078942 (sale prices are green), error #D24343, warning #F7B31A, info #71767E. Star color `--color-reviews` #FFB511. Sale orange `--color-sale-price` #FF6F4C.
**Radius**: sm 4, md 8, lg 12, xl 16, 2xl 20, full 50%; buttons pill (2000px) or box (10px); cards 20px.
**Spacing scale**: 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 56 / 64 / 72 / 80 (`--spacing-tiny … --spacing-giant`). Section vertical rhythm is usually 40 to 80px; mobile gutter 16px, tablet 32px, desktop body max 1280px (page width up to 1600px on full-bleed bands).
**Breakpoints**: 750px (legacy theme), 768, 992 (fd components flip mobile to desktop), 1280. Match the breakpoint family of the file you edit.
**Hard outline shadow** (signature accent): `.outline-primary|kids|teens|women|men|toddlers` give a solid border plus `5px 5px 0 0` offset shadow that shrinks to `3px 3px 0` on hover. Use it for emphasis cards and CTAs, sparingly (one family per view).

## Typography
- Headings: **Gelica** (serif, bold 700), `--font-title`. Body, UI, nav, buttons and prices: **sofia-pro**, `--font-body`. Hero headlines on Home/LP use sofia-pro bold with a highlighted rotating word; follow the existing section.
- Use the scale tokens: title xs..xxxl (mobile 14 to 40px, desktop 16 to 52px), paragraph xs..xl (mobile 12 to 20px, desktop 14 to 22px), via `.mob-title-*`, `.desk-title-*`, `.mob-para-*`, `.desk-para-*` or `var(--font-title-lg)` etc. (aliases flip at 992px). Line height 1.4 base, 1.3 tight. Weights 400/600/700 only.
- Keep letter spacing as the theme has it (`body` has 0.06rem). Do not add new font families or sizes outside the scale.

## Components to reuse (do not rebuild)
- Buttons `.fd-btn` with `--primary` (noon blue), `--secondary`, `--reversed`, `--morning-blue`, sizes `--small|medium|large`, shapes `fd-btn-shape--pill|box`, optional `outline-*`. Source: `fd-button.css`.
- Badges `.fd-badge` (`--sm|md|lg`, `--success|error|dark`); tabs `.fd-tabs-v3`; accordions (`AccordionTab`, theme `accordion` classes); product cards (`PbfcmProductCard`, `AltProductCard`); carousel (`PbfcmProductCarousel`); trust, comparison table, benefits marquee, wave dividers (`src/components/Waves.jsx`); `Img` for every image.
- Section structure: `<section>` with its own scoped CSS variables, content in a centered container, a heading (Gelica) with optional emphasis word, supporting paragraph, then the component. Keep wavy light-blue backgrounds, rounded 20px imagery and generous whitespace as the brand look.
- Illustration/imagery: real First Day assets only (`src/lib/assets.js`). Missing images use `<Img>` placeholders. Never add stock photos or invented product shots.

## Rules for new ideas (variants, redesigns)
1. **Be bold inside the system.** Change layout, hierarchy, scale, composition, imagery crops, motion. Do not change brand colors, fonts, logo, or tone.
2. **Never overwrite the original silently.** For "give me N alternatives": create `src/sections/<Name>VariantA.jsx`, `...VariantB.jsx` (copy of the section, restyled), and add a tiny prototype-only switcher (dashed chip, bottom-left, same style as the cart-state chip) to flip between Original, A, B, C on that page. Keep the original file untouched until the user picks one.
3. **Scope changes.** Edit only the section(s) named. Page-specific CSS stays in the section's file; do not edit `base.css`, `custom.css`, `fd-ui-kit.css` or theme CSS unless the user asks for a global change. Theme CSS is global; always scope new selectors with the section's class prefix.
4. **Desktop and mobile are designed separately.** State what you did for each, test both (1440 and 375), no horizontal scroll, tap targets at least 44px on mobile.
5. **One accent per view.** Use the brand blue for primary action; segment/product colors only where that product or audience is being referenced. Keep one corner radius family per component.
6. **Consistency lock.** Reuse the same spacing scale, radius, button style and heading scale already used on that page. If the redesign needs a new pattern, make it a token-based CSS class in the section file so it can be reused.
7. **Motion**: short and purposeful (150 to 400ms, ease/ease-out like the theme), always with a `prefers-reduced-motion` guard. No scroll listeners that set React state; use CSS, IntersectionObserver or the existing patterns.
8. **Accessibility baseline**: real headings order, `alt` text, `aria-*` on controls, visible focus, contrast AA (white text on #5368C2 is the existing hero pairing, do not go lighter).
9. No Tailwind, no CSS-in-JS libraries, no new dependencies. Plain CSS next to the component.

## Copy
Customer-facing copy follows the theme's own rule: short sentences, concrete and scannable, and no hyphens, dashes, semicolons or colons in NEW copy (existing production copy stays as is). Keep claims exactly as they appear in production (percentages, guarantees, review counts); do not invent medical or health claims. For brand voice questions use the `firstday-brand-guardian` skill if available.

## Verify before saying done
- `npm run build` passes.
- Screenshot the changed section at 1440px and 375px (use the browser tools), compare with the original and the references in `reference/screenshots-png/`.
- Confirm other sections on the page and other pages that share the component look unchanged (shared sections: trust, comparison table, product carousel, benefits, hero).
- Summarise what changed, desktop vs mobile, and which file to edit next time. Update `PROTOTYPE_GUIDE.md` only if structure changed.

## File map
Pages `src/pages/` | Sections `src/sections/` | Shell `src/layout/` | Shared UI `src/components/` | Data `src/data/` | Tokens `src/styles/fd-ui-kit.css`, `src/styles/theme-variables.css` | Theme source `reference/theme/` | Screenshots `reference/screenshots-png/`.

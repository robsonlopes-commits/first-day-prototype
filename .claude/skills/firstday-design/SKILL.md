---
name: firstday-design
description: Design rules for the First Day prototype. Use for ANY visual change in this project (redesign a section, make alternatives, new layout, new page or exploration, spacing/typography/color changes, mobile tweaks). Forces reuse of the existing production components and the current visual language of the Home and the new PDP, instead of inventing a new look.
---

# First Day design skill

This repo is a high-fidelity React sandbox of firstday.com for design ideation. The newest, most assertive visual language
is the one used by the **Home** (`src/pages/Home.jsx`) and the **new PDP** (`src/pages/ProductNew.jsx`). They are the reference.
New ideas must look like they were designed by the same team on the same day.

## Rule 0: reuse before you design
The production site already has a component for most things. Re-designing one of them from tokens is the most common mistake.
1. Before creating any UI element, search `src/sections/`, `src/components/` and `src/styles/theme/` for the production equivalent.
2. Reuse its **markup, class names and CSS** (import the same CSS file). Change content through props/data, not by restyling.
3. Only if nothing equivalent exists, compose a new element from the visual rules below, and name it clearly.
4. A new page should be assembled from existing sections (with new data) as much as possible, with new sections only where the concept needs them.

Component map (use these, do not recreate):
| Need | Reuse |
|---|---|
| Audience / variant switcher (Toddlers, Kids, Teens) | `pdp-demo-tabs` + `fd-tabs-v3` markup in `MainProductV2.jsx` (`DemographicTabs`): white pill container with hairline border, selected pill filled navy, bold labels, light grey banner line below ("This Product is For Kids Ages 4 - 12") |
| Product title block | `.pdp-vanity` (small grey product line, then h1 with a blue highlighted phrase) |
| Rating | `JudgeMePreviewBadge` |
| Gallery with thumbnails | `Gallery` (`PBFCM-PDP-product-gallery`) |
| Benefit rows with icon + expandable text | `.pdp-benefit-accordion-stats` (details/summary rows) |
| Delivery frequency (Monthly / One-Time) | `.PBFCM-PDP-frequency-selector` |
| Quantity tiles | `.PBFCM-PDP-quantity-selector` |
| Add to cart, subtotal, savings badge, free gift line | `fd-savings-display-attach--cta`, `.fd-savings-display`, `.PBFCM-PDP-cart-summary__line` |
| Trust badges row | `.usprow` / `.usp` |
| Buttons | `.fd-btn` (`--primary`, `--secondary`, `--reversed`, sizes, `fd-btn-shape--pill`) from `fd-button.css` |
| Badges, small chips | `.fd-badge`, the "Did You Know?" chip in `PdpV2TwoUp` |
| Image + text card sections | `PdpV2TwoUp`, `PdpV2DosedFormula`, `FdBrandNarrative`, `FdProblemSigns` |
| Saturated blue closing/promo band with wave + white pill | `PdpV2Hero`, `TempHero` |
| Testimonials / trust carousel | `HomepageTrustSection` |
| Product cards and carousels | `PbfcmProductCard`, `AltProductCard`, `PbfcmProductCarousel` |
| FAQ / accordions | `CollapsibleContent`, `AccordionTab`, `AccordionBlock` |
| Comparison tables | `PbfcmComparisonTable` |
| Reviews | `JudgeMeReviewWidget`, `FrontrowmdCliniciansReviews` |
| Cart | `useCart()` (`addLine(product, subscribed, opts)`, `openCart()`) |

## Visual language (measured from the Home and the new PDP)
**Backgrounds.** The page and most sections are **white**. Light blue (`#E4F5FF`, `#F2FBFF`) is only a contained band or tint (for example a band with a white rounded card inside), never the page background and never the default section background. Saturated blue bands (`#486CED`, rgb 72,108,237) are for emphasis: white text, white pill button, wave edge on top (`Waves`). The Home hero is `#5368C2` with a `#FFB511` highlight word.
**Type.** **sofia-pro only.** Never Gelica anywhere (the logo is an SVG wordmark). Do not use Gelica. `--font-title` now resolves to sofia-pro, never set a different font-family.
- Headlines: weight 400 to 500, Title Case, with the key phrase emphasized by **color** (noon blue `#476DED`, or the product accent) and/or **bold 700**. PDP h1 about 40px; section h2 32 to 38px, line height 1.3 to 1.4; block h2 20px, weight 700 (for example "Delivery Frequency").
- Body 16px, weight 400, color `#2C3E50`; secondary text `#737373`; buttons 16 to 18px weight 400 to 600. Keep the theme's letter spacing.
**Color roles.** Noon blue `#476DED`: primary button, links, emphasis. Navy `#2C3D50`: text and the selected segmented pill. Green `#078942`: sale prices, savings, "Saving $X" badges. Product accent (example magnesium purple `#776CB1`) with its 10% tint: selected radio card strip, selected quantity tile, small chips. Neutral card fill `#FAFAFA`. Yellow `#FFB511`: highlight words on blue only. Star color `#FFB511`.
**Shape.** Buttons are full pills (`border-radius: 2000px`, 48px tall, 0 32px padding). Cards: 12px radius for info cards, 16 to 20px for large media/cards, either a 1px hairline border `rgba(0,0,0,.1)` on white, or no border on `#FAFAFA`. Images 12 to 20px radius.
**Never.** Box shadows. The hard outline shadow (`.outline-*`, `--shadow-outline-*`). Gradients. Colored top borders on cards. Colored dots as decoration. Gelica. Baby blue page backgrounds. Emoji as decoration (except where production uses one in a chip). Hand-made SVG illustrations.
**Selection states** (the production pattern): radio card selected = 1px accent border plus an accent strip along the bottom with white text ("Guaranteed Lowest Price!"); quantity tile = white top, tinted bottom strip, selected strip filled with the accent; segmented tabs selected = filled navy pill. No shadow, no thick border.
**Layout.** `.page-width` container; PDP style hero is two columns (gallery left, sticky info right) from 750px; section vertical rhythm 56 to 80px; mobile gutter 16px. Breakpoints 750 / 990 / 992.

## Tokens
`src/styles/ui-kit.css` is the token kit (colors, type scale, spacing 4 to 80, radius, hairline). It was rebuilt from what the Home and the new PDP render; the old `fd-ui-kit.css` (Gelica titles, hard outline shadows, segment utilities) was deleted and must never come back. `theme-variables.css` holds the Shopify theme settings. Use tokens, never hardcode a value that has one. Some legacy production sections still render Gelica (for example the comparison table title) only to stay faithful to the screenshots: never copy that into new work.

## Process
1. Read `PROTOTYPE_GUIDE.md`, then the section you will change. Look at the current result in the browser at 1440px and 375px first (`npm run dev`).
2. Find the production components that already solve the need (map above). If the request resembles a page that exists (PDP, Home, Sale), open that page's source and copy its structure.
3. Desktop and mobile are designed separately; if the user says "only mobile", leave desktop rules untouched.
4. **Alternatives:** never overwrite the original. Create `<Name>VariantA.jsx`, `VariantB.jsx` (copies of the section, restyled within the visual language), plus a tiny prototype-only switcher (dashed chip, bottom left, like the cart state chip).
5. Scope CSS with the section's class prefix; theme CSS is global. Do not edit `base.css`, `custom.css`, `ui-kit.css` or `src/styles/theme/*` unless asked for a global change.
6. Motion: 150 to 400ms, ease or ease-out, with a `prefers-reduced-motion` guard. No scroll listeners that set React state.
7. Accessibility: real heading order, `alt`, `aria-*`, visible focus, AA contrast, 44px tap targets on mobile.
8. No Tailwind, no CSS-in-JS, no new dependencies, no new fonts or colors outside this document.

## Copy
Customer facing copy follows the theme rule: short sentences, concrete and scannable, and no hyphens, dashes, semicolons or colons in NEW copy (existing production copy stays as is). Keep claims exactly as production states them; never invent health claims. For brand voice use the `firstday-brand-guardian` skill if available.

## Verify before saying done
- `npm run build` passes.
- Screenshot at 1440px and 375px, compare with the Home / new PDP look (white background, sofia-pro only, hairline cards, pills, no shadows).
- Confirm shared components you touched still look unchanged on their original pages.
- Summarize what changed (desktop vs mobile) and which file to edit next time.

## File map
Pages `src/pages/` | Sections `src/sections/` | Shell `src/layout/` | Shared UI `src/components/` | Data `src/data/` | Tokens `src/styles/ui-kit.css`, `theme-variables.css` | Theme source `reference/theme/` | Screenshots `reference/screenshots-png/`.

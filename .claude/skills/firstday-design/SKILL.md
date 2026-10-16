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

## Mobile first (95% of the traffic is mobile)
Design for the phone first: 375px is the primary canvas, desktop must be clean and correct but is secondary. Start every design and every review at 375px (then 1440px). Mobile gets the real design effort: generous spacing (20px gutters, 24 to 32px between blocks), large readable type (16px body, headlines 32px and up), a clear order of elements (photo, badge, title, text, CTA), thumb friendly 44px+ targets, cards that read as separate blocks, and photos cropped for a short mobile frame (for example 16:11) without cutting the product. Never ship a desktop layout that merely stacks on mobile. When the owner gives feedback on a screenshot, it is almost always a mobile screenshot.

## Visual language (measured from the Home and the new PDP)
**Backgrounds.** The page and most sections are **white**. Light blue (`#E4F5FF`, `#F2FBFF`) is only a contained band or tint (for example a band with a white rounded card inside), never the page background and never the default section background. Saturated blue bands (`#486CED`, rgb 72,108,237) are for emphasis: white text, white pill button, wave edge on top (`Waves`). The Home hero is `#5368C2` with a `#FFB511` highlight word.
**Type.** **sofia-pro only.** Never Gelica anywhere (the logo is an SVG wordmark). Do not use Gelica. `--font-title` now resolves to sofia-pro, never set a different font-family.
- Headlines: weight 500 (Medium), Title Case; the highlighted phrase (purple or blue) is Bold 700, with the key phrase emphasized by **color** (noon blue `#476DED`, or the product accent) and/or **bold 700**. PDP h1 about 40px; section h2 32 to 38px, line height 1.3 to 1.4; block h2 20px, weight 700 (for example "Delivery Frequency").
- Body 16px, weight 400, color `#2C3E50`; secondary text `#737373`; buttons 16 to 18px weight 400 to 600. Keep the theme's letter spacing.
**Font weights that really exist.** The Adobe Fonts kit that production uses (and this prototype loads) only has sofia-pro 400, 700, 800 and 900 (plus italics). A requested 300, 400 or 500 renders as Regular (400) and a requested 600 or 700 renders as Bold (700); there is no true Medium or Semibold. Build hierarchy with Regular versus Bold, size and color, as production does (for example a regular headline with a bold highlighted phrase). Only ask for Medium or Semibold if the kit has been extended with those weights.
**Color roles.** Noon blue `#476DED`: primary button, links, emphasis. Navy `#2C3D50`: text and the selected segmented pill. Green `#078942`: sale prices, savings, "Saving $X" badges. Product accent (example magnesium purple `#776CB1`) with its 10% tint: selected radio card strip, selected quantity tile, small chips. Neutral card fill `#FAFAFA`. **Purple `#776CB1` (`--color-accent-purple`, tint `--color-accent-purple-10`, dashed border `--color-accent-purple-border`) is the second accent and should be used more**: selected pills and tabs (as on the bundle quiz page), chips and badges (tint fill, purple text), info notes (light purple fill with a dashed purple border, for example 'Order by Oct 15th for guaranteed FREE gifts.'), highlight boxes such as 'Our Solution', and accent words in story headings (bold 700). Buttons and links stay blue. Yellow `#FFB511`: highlight words on blue only. Star color `#FFB511`.
**Shape.** Buttons are full pills (`border-radius: 2000px`, 48px tall, 0 32px padding). Cards: 12px radius for info cards, 16 to 20px for large media/cards, either a 1px hairline border `rgba(0,0,0,.1)` on white, or no border on `#FAFAFA`. Images 12 to 20px radius.
**Never.** Box shadows. The hard outline shadow (`.outline-*`, `--shadow-outline-*`). Gradients. Colored top borders on cards. Colored dots as decoration. Gelica. Baby blue page backgrounds. Emoji as decoration (except in chips and badges, where production uses them and the owner asks for them, for example '☀️ Morning'; one emoji at the start of the chip). Hand-made SVG illustrations.
**Selection states** (the production pattern): radio card selected = 1px accent border plus an accent strip along the bottom with white text ("Guaranteed Lowest Price!"); quantity tile = white top, tinted bottom strip, selected strip filled with the accent; segmented tabs selected = filled navy pill. No shadow, no thick border.
**Layout.** `.page-width` container; PDP style hero is two columns (gallery left, sticky info right) from 750px; section vertical rhythm 56 to 80px; mobile gutter 16px. Breakpoints 750 / 990 / 992.

## Rules the owner has stated (apply them by default, do not make them repeat)
- **Audiences (demos):** never assume which audiences (Kids, Toddlers, Teens, Women, Men) a page or exploration supports. ASK the owner before building and before adding data, copy or images per audience; every extra audience multiplies the work and the image cost. The All-in-1 landing supports Kids and Teens now, Toddlers later (built from Kids and Teens).
- **Buttons:** every button is the `fd-btn` pill component (`fd-btn--primary|secondary|reversed|purple`, sizes small/medium/large, `fd-btn-shape--pill`). Mobile: full width. Desktop: hug the label (left aligned in text columns, centered only in centered sections). The main CTA of a page is bigger (about 64px tall, 20px label).
- **Borders:** clickable things with an outline (accordion rows, option cards, tab bars, small secondary buttons, round carousel buttons) use purple at 10% (`--color-border-interactive`). Every other outline (cards, tables, tiles, quote cards) uses black at 7% (`--color-border-subtle`). Info cards without a border use `#FAFAFA` (`--color-surface-card`), for example the subtotal and the hero quote.
- **Backgrounds:** the page is white. Never let the theme's baby blue body color show through gaps between sections.
- **Purple buy box:** selected frequency card, check icons, radio dot and the "Guaranteed Lowest Price!" strip are purple. **One-Time selected is destructive:** red border, red radio, red strip, X icons instead of checks, text colors unchanged. The One-Time price uses the same compare plus final price format as Monthly.
- **Audience switcher:** the buy box switcher keeps the navy selected pill; the bottom "Shopping For Someone Else?" switcher uses the purple pill.
- **Cards with a photo (desktop):** the photo is never shorter than the text column; it stretches to the row height (minimum 400px) and keeps the product in view with a per-photo `object-position`. Mobile: photo first, then badge, title, text; photo frame 16:11; each moment is its own bordered card.
- **Titles:** the first title of a run of cards is larger and has more space below; use title plus highlighted phrase (accent color, bold). Remember the font weight limits above (Regular or Bold only).
- **Accordions:** closed by default. Do not add decorative percent tiles or duplicate promo notes ("Order by ...") unless asked.
- **Photos:** AI photos are mockups. Rounded corners 16px where a photo sits in a card (hero photo only on desktop, full bleed on mobile).
- **Git:** never push or commit unless the owner asks.

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
All customer facing copy goes through the `firstday-copy` skill (emotional, direct response, science backed, coherent). Customer facing copy follows the theme rule: short sentences, concrete and scannable, and no hyphens, dashes, semicolons or colons in NEW copy (existing production copy stays as is). Keep claims exactly as production states them; never invent health claims. Brand facts, products, science and the copy style of the live landing pages are in the `firstday-brand-knowledge` skill; what is new, being tested and the October 2026 concepts (Bio-Matched etc., pending claims) are in `firstday-whats-new`. Read them before writing copy for a page.

## Verify before saying done
- `npm run build` passes.
- Screenshot at 1440px and 375px, compare with the Home / new PDP look (white background, sofia-pro only, hairline cards, pills, no shadows).
- Confirm shared components you touched still look unchanged on their original pages.
- Summarize what changed (desktop vs mobile) and which file to edit next time.

## File map
Pages `src/pages/` | Sections `src/sections/` | Shell `src/layout/` | Shared UI `src/components/` | Data `src/data/` | Tokens `src/styles/ui-kit.css`, `theme-variables.css` | Theme source `reference/theme/` | Screenshots `reference/screenshots-png/`.

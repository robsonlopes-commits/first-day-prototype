# First Day prototype guide

High-fidelity React sandbox of the First Day Shopify storefront, for **visual design ideation only**.
No backend, no Shopify APIs, no real cart. `npm install && npm run dev` → http://localhost:5173

## Routes
| Route | Shopify template | Page file |
|---|---|---|
| `/` | `index.hp01-v2` | `src/pages/Home.jsx` |
| `/products/kids-calming-magnesium` | `product.unified-default` (legacy PDP) | `src/pages/ProductLegacy.jsx` |
| `/products/kids-enrichment-vitamin` | `product.uniified-default-v2` (new PDP) | `src/pages/ProductNew.jsx` |
| `/pages/kde-behind-the-science-lp` (kids), `/pages/tdk-behind-the-science-lp` (teens) | `page.lp-BTS-master` | `src/pages/LandingBTS.jsx` |
| `/pages/bundle-builder-v2` | `page.lp-bundle-v2` | `src/pages/BundleBuilderV2.jsx` |
| `/pages/bundle-quiz` | `page.lp-bundle-v3` / quiz | `src/pages/BundleQuiz.jsx` |
| `/pages/sale` | `page.bfcm-categories` | `src/pages/Sale.jsx` |
| `/__prototype` | private index (not storefront-styled) | `src/pages/PrototypeIndex.jsx` |

The cart is a drawer opened from the header cart icon (any page).

## Where things live
- **Global styles** `src/styles/`: `theme-variables.css` (design tokens, static version of `css-variables.liquid`),
  `base.css`, `custom.css`, `new_custom.css` (converted from the theme snippets), `fonts.css` (Typekit sofia-pro + gelica).
- **Theme CSS** `src/styles/theme/*.css`: the theme's `assets/*.css`, copied untouched. Pages/sections import the ones they use.
- **Shell** `src/layout/` (AnnouncementBar, Header, Footer, CartDrawer, Shell). Header-group/footer-group/cart-drawer-group of the theme.
- **Sections** `src/sections/`: one JSX file per Shopify section, same name (e.g. `homepage-hero-new.liquid` → `HomepageHeroNew.jsx`) with its CSS next to it.
- **Reusable components** `src/components/`.
- **Mock data** `src/data/` (products, collections, navigation, cart, per-page content).
- **Reference material** `reference/` (theme export, screenshots as PDF and rendered PNG). Not part of the app.

## Images
Use `src/lib/assets.js`. Everything resolves to `/assets/...`; the dev server downloads from the public CDN on first
request and caches it in `public/assets/`, so the prototype works offline afterwards.
If an image cannot be retrieved, `<Img>` shows a "Missing asset - upload image" placeholder; click it and pick a local file
(lasts for the browser session).

## Body classes
Production sets `<body class="template-product unified-default …">` and theme CSS relies on it. Each page calls `usePageClass('…')`.

## Page sections (what to ask Claude to change)
Each Shopify section is one file in `src/sections/`, named like the theme section (`homepage-hero-new` → `HomepageHeroNew.jsx`),
with its CSS beside it (`*.css` or a generated `*Css.js`). Page files in `src/pages/` only list sections in template order.
Content for each page lives in `src/data/` (`home.js`, `pdpLegacy*.js`, `pdpNew*.js`, `landing.js` with `{ kde, tdk }`, `sale.js`,
`sharedSections.js`, `products.js`, `cart.js`, `navigation.js`). Examples: "redesign the hero" → `HomepageHeroNew.jsx`;
"change only the mobile PDP buy box" → `MainProductLegacy.jsx` or `MainProductV2.jsx` (the two PDPs share no main-product code).

## Cart
Open from the header cart icon. Mock items in `src/data/cart.js`. A small dashed "prototype · cart state" chip switches between
gift progress / gift unlocked / empty cart. Add To Cart buttons add a mock line and open the drawer.

## Page changes reload the browser
Theme CSS is global, so like Shopify every page change is a full load (see the click handler in `src/main.jsx`). Cart state resets on page change.

## How to add another Shopify template
1. Find the template in `reference/theme/templates/` (JSON lists sections + settings). 2. Build any missing section from `reference/theme/sections/<name>.liquid`
(keep class names; convert `{% style %}` with `tools/liquid-style-to-js.mjs`, css snippets with `tools/liquid-css.mjs`). 3. Put the template's settings in `src/data/`.
4. Add a page in `src/pages/` that calls `usePageClass('template-… <suffix>')` and add its route in `src/App.jsx` and `PrototypeIndex.jsx`.

## Converting more Liquid CSS
`node tools/liquid-css.mjs <in.css.liquid> <out.css>` resolves `{{ settings.x }}` and strips Liquid.

## Intentionally mocked
Cart (fixed items), add to cart, Judge.me reviews, FrontRowMD, subscriptions/selling plans, search, checkout, translation, A/B tests, Fall Sale popup.

## Reference screenshots vs live
Pages follow the owner's screenshots (captured 14 Oct 2026) where they differ from the live site today: product prices use 30% off and code
BUNDLEBUILDER ($27.30). Live now shows 40% / FALLDEALS. Change `DEFAULT_DISCOUNT` in `src/data/products.js` to switch. Home copy follows the live site/template.

## Known gaps
Teens/Toddlers links on PDPs point to routes that do not exist here. Gift tiers use the theme default ($75 / $25 gift).
Legacy PDP sticky add-to-cart only with `?fd_sticky_atc=v1|v2` (mobile). Section/KDE landing page mobile slices were checked less thoroughly than desktop.

## Differences from production
Typekit fonts load from adobe's CDN; Home is the `hp01-v2` variant without the Intelligems redirect; popups skipped.

## Bundle builder v2 (`/pages/bundle-builder-v2`, `src/pages/BundleBuilderV2.jsx`)
Countdown bar (`FdCountdownBar`, always counts down to local midnight, ticking live) + quiz buy box (`FdQuizBuyBox`) + the BTS landing sections.
Data: `src/data/bundleBuilder.js` (quiz copy, concerns, bundles, gifts, product modal data, reviews, page-metafield content) and `src/data/bundleBuilderTemplate.js` (template JSON).
Quiz logic (recommendation, pack naming, prices, gifts) is a 1:1 port of `assets/fd-quiz-buy-box.js` in `src/sections/fdQuizBuyBox/quizLogic.js`. Steps are separate components in `src/sections/fdQuizBuyBox/`:
`QuizStepConcerns` (step 1), `QuizStepResults` (step 2; exports QuizRecap, QuizBackLink, QuizPackPicker, QuizPackDetail, QuizMeetProducts, QuizGiftLadder, QuizAddToCart, QuizClaim, QuizSubscriptionBenefits, QuizOneTimePurchase), `QuizInfoModal`, `QuizGallery`.
The final CTAs ("Add My Pack", "One-Time Purchase") show a short busy state, then open the mock cart drawer. The theme has no loading/error screens.

Quiz states (dashed chip "prototype · quiz state", bottom-left, lists them all; defined in `QUIZ_STATES`):
1. Step 1: nothing picked (hint + disabled CTA) / one ticked (CTA on) / all six ticked
2. Step 2: recommendation for 1 concern (2 Pack), 3 concerns (3 Pack), 4 products (4 Pack, "Best deal", no upgrade nudge, all gifts)
3. Step 2: shopper picked 1 Pack / 4 Pack, "Meet the products" open, adding to cart (button busy), one-time purchase mode (`.is-otp`)
4. Modals: pack info (product tabs + "Choose the N Pack"), "Learn more" product modal (no tabs, no footer); bottom sheet on mobile
Also real interactions: tick/untick re-computes the recommended pack, "Change my answers" and browser back return to step 1, upgrade nudge and pack cards select a pack.
Not mounted (zero height on the live page because their page metafields are empty): temp-replo-hero, temp-benefits-split, frontrowmd-clinicians-reviews, faq (`FaqSection` renders null without blocks).

## Bundle quiz (`/pages/bundle-quiz`, `src/pages/BundleQuiz.jsx`, body `template-page lp-bundle-v3`)
Template `page.lp-bundle-v3.json` -> `src/data/bundleQuizTemplate.js` (generated with `node tools/template-json-to-js.mjs <template.json> <out.js>`); metafield / metaobject / Judge.me content in `src/data/bundleQuiz.js`.
Sections in template order: standalone-product (reused `StandaloneProduct`, extended with the build-box blocks), custom-liquid (FrontRowMD band), temp-science-module, timeline-section, accordion-block x2, homepage-trust-section, pbfcm-comparison-table, apps (Judge.me "all reviews" block).
Not mounted (zero height on the live page): fd-countdown-bar + main-page (disabled in the template), temp-replo-hero, temp-benefits-split, frontrowmd-clinicians-reviews, faq (empty metafields).
Build box (`src/sections/FdBuildBox.jsx`, port of snippets fd-build-box-qty / fd-build-box-popup + `assets/fd-build-box.js`; CSS = theme `fd-build-box.css`) states, all local React state:
1. Pack picker: 4/3/2/1 Pack (selected / hover / disabled styles), "% OFF" per pack, gift grid unlocks `N/4 Free Gifts` (lock overlay on locked gifts), "Order by {date}" tokens use today's date.
2. Subscribe <-> One-Time toggle (`.is-otp`: pack % switch to the OTP %, link text "Subscribe", OTP price hidden); the toggle also opens the popup like the theme.
3. "Build Your Box" popup (full-screen, Escape / back / scrim close, body scroll lock): category tabs with scroll-spy (Kids / Toddlers / Teens / Women / Men), product cards (Add -> stepper, Best Seller badge, price shown at the NEXT tier %), social-proof count-up, gifts banner.
4. Summary drawer: title "Select At Least N Bottles", head text ("Add first product to earn gifts" / "Add one more product to unlock 35% Off + Free ..." / top tier), rows with steppers, gift tiles unlocking by bottle count, subtotal + "Add 1 More Product" badges; pinned on desktop (>= 990px), collapsible on mobile.
5. Buying more bottles than the chosen pack upgrades the selected pack on the page (and the gift count); CTA label "Add Your First Product" -> "Add To Cart" (disabled until one bottle).
6. "Don't miss out!" bottom sheet when adding fewer bottles than the pack ("Add More Items" / "Not now"); "Add To Cart" adds the bottles to the mock cart (`useCart`) and opens the drawer.
7. Product info modal (`src/components/FdInfoModal.jsx`, port of snippets/info-modal.liquid: slide-in on desktop, slide-up on mobile, gallery with dots/thumbs/arrows, price at the tier offer, "Add to cart").
Other interactive bits: gallery (Swiper-like), benefit accordions (details), science tabs, accordions, trust carousel, Judge.me all-reviews mock (`JudgeMeAllReviewsWidget.jsx`: Product/Shop tabs, sort dropdown, star filter, Load More; first 25 reviews of each tab only).
Extensions made to shared sections (backward compatible): `StandaloneProduct` (build_box_* blocks, `templateSuffix`, `product.allReviewsText`, 0/0 spacing block hidden), `standaloneProductCss.js` (`v.templateSuffix`), `Apps` (`allReviews`), `AccordionBlock` (`image_alt`, `image_mobile_alt`, `image_mobile_pos`), `TempScienceModule` (`panel_image_alt/pos`), `FrontrowBrandBand` (`paddingTop/Bottom`).
Known gaps: FrontRowMD band is ~21px taller on mobile than live; the 52% vs 45% copy follows the template (page title "up to 52%", mobile title from the highest tier 45%); the owner's mobile screenshots were taken at a slightly wider viewport (mobile page title fits one line there).

## Explorations (new concepts, not production pages)
Explorations live under `/explorations/...`, in `src/pages/explorations/` and `src/sections/explorations/<name>/`, so they never mix with the production recreations. They follow the `firstday-design` skill (tokens, fonts, buttons only from the design system).

### All-in-1 Bundle: `/explorations/all-in-1-bundle`
Concept: the 4 hero products (Multivitamin, Probiotic+, Brain Support, Magnesium) in one bundle for holistic support, led by picky eating (Kids) and busy schedules (Teens). It is a landing page built only from production components and CSS (no custom look).
- **Requirements covered:** (1) every product can be added on its own at a higher price than inside the bundle ("What's Inside" rows show the struck base price, the price on its own and the in-bundle price, with an Add button); (2) switch between Kids / Teens / Women / Men with the `pdp-demo-tabs` pills in the buy box and again before the closing band. The choice is kept in the URL (`?demo=teens`) without reloading.
- **Pricing (concept):** individual item 30% off, bundle 52% off monthly and 40% off one-time. Change `INDIVIDUAL_DISCOUNT`, `BUNDLE_DISCOUNT_MONTHLY`, `BUNDLE_DISCOUNT_ONETIME` in `src/data/allInOneBundle.js`. The bundle is ONE cart line; a single item is its own line (cart `addLine(product, subscribed, opts)`, `opts` = { key, title, image, price, compare, delivery } in cents).
- **Structure (page file `src/pages/explorations/AllInOneBundle.jsx`, state: demo + frequency):**
  0. **Emotional storytelling above the buy box (added later, nothing below changed).** Data in `src/data/allInOneStoryTop.js`, keyed by demo and mounted with `key={...demoId}` in the page file. Modeled on the Behind the Science landing page and built only from production sections: `TempReploHero` (headline with blue phrase, description, pill CTA that scrolls to the buy box, "4.8 stars from 12,322+ reviewers", and on Kids the Dr. Adam Smith creator quote from the kids BTS hero), `FrontrowBrandBand` (Clinicians' Choice strip), `TimelineSection` used heading only ("A Day With A Picky Eater" / "A Day On A Busy Schedule"), four `PdpV2TwoUp` story blocks alternating image left and right (Morning, School Day or Work Day, Dinner or Evening, Bedtime or Night, each mapped to one product: Multivitamin, Brain Support, Probiotic+, Magnesium, shown with its bottle as a highlight row), `AccordionBlock` ("What Is Happening Behind The Plate", production claims: hidden hunger 80%, produce lost up to 73% of nutrients, Harvard and Yale scientists, pediatrician-approved (Kids), Clean Label Project, and for the other demos 1 in 3 families have a nutrient deficiency and 59% additives from the founder note) and a closing `PdpV2TwoUp` note with a CTA to the buy box. Kids = picky eater story, Teens / Women / Men = busy schedule version with their own photos. `bundle.css` got one rule (`scroll-margin-top: 100px` on the buy box section) so the CTAs land below the sticky header.
  A. Buy box `BundleMainProduct.jsx` (reuses the new PDP markup and CSS of `MainProductV2.jsx`: `Gallery` with a first slide of the four bottles lined up, `pdp-demo-tabs`, `.pdp-vanity`, `JudgeMePreviewBadge`, `pdp-benefit-accordion-stats` rows, frequency selector, add to cart + `fd-savings-display` + free gift line, USP row). `MainProductV2.jsx` got backward compatible edits only: `Gallery`, `CheckBenefit`, `RadioCheck`, `CartIcon` are exported and Gallery accepts `{ key, group: [...] }` slides.
  B. Storytelling, all existing sections fed by `src/data/allInOneStory.js` (`whyFourProps`, `fourJobsProps`, `scienceProps`, `timelineProps`, `trustProps`, `faqProps`, `closingProps`): `FdProblemSigns` (signs), `PdpV2TwoUp` (why one gummy is not enough), `FdBrandNarrative` (four jobs, bottle in the icon disc), `TempScienceModule` (one tab per product), `TimelineSection` (what to expect), then new `BundleCompare.jsx` (one at a time vs bundle table card).
  C. Proof and closing: `HomepageTrustSection` (TRUST_PDP_NEW), `CollapsibleContent` FAQ, "Shopping for someone else" demo tabs (`aio-switch`), blue wavy `PdpV2TwoUp` band with a white pill.
- **Storytelling images are AI-GENERATED MOCKUPS** (Gemini `gemini-nano-banana-2.1`, `npm run image`, 1K JPEG, about 0.7 to 0.8 MB each), not real photography. Files `public/assets/custom/aio-<demo>-<slot>.jpg` for demo = kids / teens and slot = `hero`, `morning`, `school`, `dinner`, `bedtime`, `plate` (1:1, used in the accordion, all others 4:5), `empathy`: 14 images (Women and Men were removed on request; Toddlers added later as a 2-in-1 bundle), used through `customImg()` in `src/data/allInOneStoryTop.js`. The exact prompt of every image is in `public/assets/custom/PROMPTS.md`. Replace them with real photos when available (same file names work). The `morning`, `school`, `dinner` and `bedtime` images (16 files, one per demo and slot) show the AI-generated First Day bottle (the real cutout from `public/assets/shop` is passed as `--ref`, so labels are close but can contain small text errors) and a person holding a gummy; `hero`, `plate` and `empathy` are people or food only. These are mockups to judge concepts before real photo shoots: have brand and legal review before publishing. `aio-kitchen-hero.jpg` is an earlier unused test image.
- **Scope: Kids and Teens only (Toddlers later).** The owner scoped this landing to Kids, Teens and later Toddlers. Women and Men support (data, copy, images, CSS) was deleted. Toddlers will be created from Kids and Teens once Kids is 100% done. The demo switchers read `DEMOS`, so they show only Kids and Teens for now. Ask the owner which audiences to support before starting any new page or exploration.
- **Where to edit:** audience copy and bottle images per demo `DEMOS` in `src/data/allInOneBundle.js` (vanity title, banner, intro); story copy per demo `src/data/allInOneStory.js` (below the buy box) and `src/data/allInOneStoryTop.js` (above it); the few bundle only rules (gallery lineup slide, "What's Inside" rows, compare table, switcher) in `src/sections/explorations/allInOneBundle/bundle.css` (scoped `aio-`; `.aio-page` forces sofia-pro on headings because the theme sets h1 to h6 in Gelica).
- **Claims:** only production copy (product descriptions, kids landing, bundle quiz science and timeline, new PDP). For Teens the ingredient lists and timeline wording are minimal audience rewrites of those texts. New copy has no dashes, colons or semicolons. The storytelling above the buy box reuses exact production texts (kids BTS accordion and hero, product descriptions and science tabs, new PDP two up, founder note).
- **Known gaps:** no sticky add to cart on mobile (the production new PDP has none); the closing band uses the production gummies image (no bottle lineup image exists as one file).

- **Buy box gallery (All-in-1):** slide 1 is an AI emotional photo with the four bottles (`aio-buybox-<audience>.jpg`), slides 2 to 5 are one AI benefit infographic per bottle (`aio-info-<audience>-<multi|gut|focus|sleep>.jpg`), styled like the PDP carousel infographics and using only wording already in production. All are mockups made with `npm run image` (prompts in `public/assets/custom/PROMPTS.md`); replace them with real photography and designed infographics later.
- **Before / after slider (All-in-1 day cards):** each "day" photo has a negative twin `aio-<audience>-<morning|school|dinner|bedtime>-before.jpg` (same people and scene without the bottle, AI mockup). `dayChapters()` passes it as `image_before`, and `PdpV2TwoUp` (opt-in, `has-compare`) draws it over the happy photo clipped by `--ptu-compare-pos`; a transparent range input on top handles mouse, touch and keyboard. Left = without First Day, right = with. Styles are in `bundle.css` (`ptu-compare__*`). On mobile these photos keep the full 4:5 frame so the faces show.
- **Page order (All-in-1):** story hero, clinicians band, "A Day With ..." cards (photo, badge, title, text, "Our Solution" box), plate accordion, buy box, **Four Jobs right below the buy box, then bundle vs single**, why four, science, timeline, trust, FAQ. The audience switcher at the bottom and the closing band were removed (the audience tabs live in the buy box only). The empathy note section was removed.
- **Rules that shape this page** (also in the `firstday-design` skill): fd-btn pill buttons everywhere (mobile full width, desktop hug); clickable outlines purple 10%, other outlines black 7%; white page background; buy box purple with a red One-Time state; on desktop the photo is never shorter than the text column. All page specific CSS is in `src/sections/explorations/allInOneBundle/bundle.css`.
- **Opt-in flags added to shared sections** (other pages are unchanged): `fd_button` in `TempReploHero`, `AccordionBlock`, `FdProblemSigns`, `PdpV2TwoUp` renders the `fd-btn` component; `PdpV2TwoUp` highlights accept `eyebrow` and `cta_text`/`cta_url`.

## Figma
The design team works in the file "Ideation - Brainstorming". How it is organized, which tokens and text styles are really used, which libraries to link and how to read it safely with the Figma MCP are in `.claude/skills/firstday-figma/` (read-only by organization rule). Figma values map to `src/styles/ui-kit.css` tokens through `references/tokens-and-styles.md`.

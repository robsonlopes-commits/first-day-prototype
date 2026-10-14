# Brief for page-building agents (internal, not part of the app)

You are building ONE page of a high-fidelity React design prototype of the First Day (firstday.com) Shopify storefront
in /Users/robsonlopes/projects/first-day-prototype (React + Vite, JS, react-router). VISUAL design ideation only: no backend, no real cart.
FIDELITY TO THE ORIGINAL IS THE PRIORITY over clean architecture.

Read first: PROTOTYPE_GUIDE.md, src/App.jsx, src/pages/SharedPreview.jsx, src/lib/*, src/components/Img.jsx, and skim how the already
finished shared sections are built (src/sections/HomepageTrustSection.jsx + its *Css.js, tools/liquid-style-to-js.mjs, tools/liquid-css.mjs)
and copy that pattern: sections take the same props as the template-JSON section settings/blocks; data instances live in src/data/*.

## Rules
- Reuse the Shopify theme markup/CSS, do NOT rewrite or restyle. No Tailwind/CSS frameworks/redesign. Keep original class names and DOM hierarchy in JSX.
  Theme export: reference/theme (templates/*.json = the section settings and blocks actually used; sections/, snippets/, blocks/, assets/).
  Theme assets/*.css are already in src/styles/theme/ (import what you need). snippets/*.css.liquid and section {% style %}/<style> blocks must be
  converted (tools/liquid-css.mjs for css; tools/liquid-style-to-js.mjs for {% style %} blocks), settings resolved from the template JSON.
  Theme JS (assets/*.js and inline <script>) is the reference for behaviour/timing: re-implement as small React state, don't ship the theme JS.
- Replace Liquid/Shopify objects with local mock data (src/data/<yourpage>.js). Real First Day copy/prices captured from the live site / template JSON.
  Shared catalog: src/data/products.js (getProduct etc.).
- Images: src/lib/assets.js (shopImg for shopify://shop_images/<name>, reploImg, themeAsset, extImg, plus src/lib/settingsImg.js helpers) and <Img>.
  Missing images degrade to the MissingAsset placeholder. Never substitute stock imagery. Product media: fetch https://firstday.com/products/<handle>.js via the browser.
- Live site https://firstday.com is READ-ONLY reference: use mcp__Claude_Browser__* (open your OWN tab with tabs_create, always pass tabId, other agents work in parallel),
  javascript_tool for DOM/computed styles. curl to firstday.com gets 429. NEVER add to the live cart, submit forms or change anything live.
- Interactions (accordions, galleries, variant/quantity selectors, tabs, sliders, sticky bars, modals) with local React state, matching theme timing/hover/focus.
  Desktop and mobile equally important; use the theme's own breakpoints.
- Visual references: reference/screenshots-png/<name>/page_pN.png (Read tool; consecutive vertical slices of one full-page capture, N=1..). Source-of-truth for look:
  screenshots > live site > theme. After building, compare section by section at desktop (~1440px wide) and mobile (375px) and fix spacing, type, image sizes, ordering.
  Do not call a page done just because all sections exist.
- Dev server: the main one on :5173 may show error overlays from other agents' unfinished files. Run YOUR OWN: `npx vite --port <yourPort>` (in background, kill it at the end) and
  use resize_window (mobile 375x812) then reset to desktop at the end. The header/footer/cart are built by another agent (src/layout/*): don't edit them.
- File ownership: you own your page file in src/pages/, your data file(s), and the new section files you create. Generic sections used by several pages
  (ImageWithText, RichText, CollapsibleContent, EssentialEight, ReviewCards, Multicolumn, FrontrowmdCliniciansReviews, Apps/JudgeMe widgets, FdProblemSigns, FaqSection, AccordionBlock ...)
  are created by whichever agent needs them first: before creating one, check that src/sections/<Name>.jsx does not exist; if it does, reuse it as-is
  (read it first). If you need a variation, add a backward-compatible prop with a minimal edit (re-read the file right before editing). Create with a no-clobber check.
  Do not edit src/App.jsx (routes already exist) or shared files owned by others.
- Call usePageClass('<body classes as production>') in your page (e.g. 'template-product unified-default').
- Finish with `npm run build` passing. Keep code concise, clear names, one JSX file per Shopify section (homepage-hero-new.liquid -> HomepageHeroNew.jsx) with its CSS beside it.
- Final answer: short summary (files, what is mocked, known gaps vs screenshots). No code dumps.

## Already built shared sections (src/sections) and configs
PbfcmProductCarousel (+ HOME_PRODUCT_CAROUSEL / SALE_PRODUCT_CAROUSELS in src/data/carouselConfigs.js), HomepageTrustSection (TRUST_HOME/TRUST_PDP_NEW/TRUST_LP),
PbfcmComparisonTable (COMPARISON_HOME/SALE/LP), PbfcmFeatureSplit, PbfcmGiftProgress, Benefits, TempHero (TEMP_HERO_HOME / TEMP_HERO_PDP_NEW) — all in src/data/sharedSections.js.
Mount e.g. <HomepageTrustSection {...TRUST_HOME} />. Products: src/data/products.js. Cart drawer opens with useCart().openCart() (src/layout/CartContext.jsx).

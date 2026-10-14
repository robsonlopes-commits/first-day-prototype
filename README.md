# First Day Prototype

A **React design sandbox** that recreates the [firstday.com](https://firstday.com) storefront in high fidelity, built from the production Shopify theme.

It exists for **fast visual exploration**: change a hero, compare three alternatives of a card, try another PDP layout or tweak only the mobile version, without touching Shopify and without any risk to the live store.

> **This is not the store.** There is no backend, checkout, payment, customer account or Shopify integration. The cart, reviews and subscriptions are mock data. Brand, copy and images belong to First Day.

---

## The idea

The Shopify theme **is** the design system, so the prototype does not reinvent anything:

- **The original theme CSS is reused**, with no Tailwind and no rewrite.
- **Original class names and HTML structure are kept** in the JSX, so every section in the prototype maps to a section in the theme.
- **Fidelity beats code elegance.** When in doubt between cleaner React and matching the site, it matches the site.
- **Desktop and mobile carry equal weight**, with the real interactions: menus, cart, galleries, accordions, selectors.

## Pages

| Route | Shopify template | What it is |
|---|---|---|
| `/` | `index.hp01-v2` | Home |
| `/products/kids-calming-magnesium` | `unified-default` | Legacy PDP |
| `/products/kids-enrichment-vitamin` | `uniified-default-v2` | New PDP (separate implementation) |
| `/pages/tdk-behind-the-science-lp` and `/pages/kde-behind-the-science-lp` | `lp-BTS-master` | "Behind the Science" landing page (teens and kids) |
| `/pages/sale` | `bfcm-categories` | Sale page |
| `/pages/bundle-builder-v2` | `lp-bundle-v2` | Bundle builder with quiz, all states |
| `/pages/bundle-quiz` | `lp-bundle-v3` | Bundle buy box with popup and summary drawer |
| `/__prototype` | | Private index of all pages |

The **cart** opens as a drawer from the header cart icon, with fixed items, a gift progress bar and a small prototype-only switch to toggle its states. **Every multivitamin product** links to the new PDP and **all other products** link to the legacy PDP.

## Running it

Requires [Node.js](https://nodejs.org) 18 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:5173 (the list of pages is at `/__prototype`).

Images and videos come from First Day's public CDN and are **downloaded automatically the first time** each page opens, then stored in `public/assets/`. The first visit to a page can be slower. If an image fails to load, a "Missing asset - upload image" placeholder appears where you can pick a local file (it lasts for the browser session only).

To produce a production build of the prototype: `npm run build`.

## Project structure

```
src/
  pages/       one page per route, only lists the sections in template order
  sections/    one section per file, named after the Shopify section
               (homepage-hero-new.liquid becomes HomepageHeroNew.jsx)
  layout/      header, footer, announcement bar and cart
  components/  reusable pieces (Img, accordion, waves...)
  data/        all mock content: products, cart, navigation, pages
  styles/      design tokens and the Shopify theme CSS
tools/         scripts that convert Liquid into CSS/JS
```

The full designer guide, covering where everything lives and how to add another template, is in [`PROTOTYPE_GUIDE.md`](PROTOTYPE_GUIDE.md).

## Working with Claude Code

The project is built to be edited with plain-language requests. Examples:

- "Redesign the Home hero"
- "Give me three alternatives for this product card"
- "Change only the mobile version of the legacy PDP"

Because every section is a clearly named file, a change stays isolated and does not affect the rest of the site. The `firstday-design` skill, in [`.claude/skills/firstday-design`](.claude/skills/firstday-design/SKILL.md), carries the design system rules (colors, typography, buttons, spacing) so new ideas still look like First Day. For alternatives, the original is never overwritten: each variant becomes a new file.

## What is mocked

Cart and add to cart, Judge.me reviews, the FrontRowMD block, subscriptions, search, checkout, translation, A/B tests and the sale popup. The bundle builder countdown runs to local midnight.

## Stack

React 18, Vite 5 and React Router 6. No backend, no database, no Tailwind.

## Deploying

The project deploys as a static site (for example on Vercel, config in `vercel.json`). In production, image and video requests to `/assets/shop`, `/assets/replo` and `/assets/ext/<host>` are proxied to First Day's public CDNs by rewrites, and any other path falls back to `index.html` so direct links to pages work. Locally, the dev server does the same job and caches the files in `public/assets/`.

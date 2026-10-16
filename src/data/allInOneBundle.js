import { shopImg } from '../lib/assets.js';
import { getProduct } from './products.js';
import { INFO_MODAL_PRODUCTS } from './bundleQuiz.js';

// EXPLORATION: All-in-1 Bundle (not a production page).
// Concept: the 4 hero products in one bundle for holistic support, led by picky eating (still the top reason families
// buy First Day). Pricing is concept pricing built from the catalog base prices:
//   individual item  = subscribe price, 30% off (same as the Sale cards)   e.g. $39 -> $27.30
//   All-in-1 bundle  = 52% off monthly ("Save up to 52%" is real production messaging), 40% off one-time
export const INDIVIDUAL_DISCOUNT = 30;
export const BUNDLE_DISCOUNT_MONTHLY = 52;
export const BUNDLE_DISCOUNT_ONETIME = 40;

// Product roles (order = order shown everywhere)
export const ROLES = [
  { key: 'multi', label: 'Nutrition', category: 'multivitamin' },
  { key: 'gut', label: 'Gut', category: 'probiotic' },
  { key: 'focus', label: 'Focus', category: 'brain' },
  { key: 'sleep', label: 'Sleep', category: 'magnesium' },
];

// Demos (audiences). Copy that changes per audience lives here: Kids = picky eaters, the others = busy schedules.
// vanity: [..] marks the blue highlighted phrase (same convention as the PDP vanity title). banner: age line under the tabs.
const bottle = (f) => shopImg(f);
export const DEMOS = [
  {
    id: 'kids', label: 'Kids', possessive: "Kids'", bundleName: 'All-in-1 Bundle', countWord: 'Four', banner: { prefix: 'This Bundle is For Kids Ages ', ages: '4 - 12' },
    vanity: 'Complete Daily Support For [Picky Eaters]',
    intro: '<p><strong>Four hero gummies in one bundle, built for ages 4 to 12.</strong> The multi uses methylfolate instead of folic acid and doses for a growing body, not an adult dose scaled down.</p>',
    handles: ['kids-enrichment-vitamin', 'kids-belly-biotic', 'kids-daily-focus', 'kids-calming-magnesium'],
    bottles: ['kids-multi.png', 'kids-prob_4b7651d5-86e6-4eb3-8d96-e6d26e57c0e4.png', 'kids-brain.png', 'kids-mag.png'],
  },
  {
    id: 'teens', label: 'Teens', possessive: "Teens'", bundleName: 'All-in-1 Bundle', countWord: 'Four', banner: { prefix: 'This Bundle is For Teens Ages ', ages: '13 - 17' },
    vanity: 'Complete Daily Support For [Growing Teens]',
    intro: '<p><strong>Four hero gummies in one bundle, built for ages 13 to 17.</strong> Nutrition, gut, focus and sleep support for a teen who is growing fast, in one simple daily routine.</p>',
    handles: ['teens-kickstart-vitamin', 'teens-gut-sustainer', 'teens-daily-focus', 'teens-calming-magnesium'],
    bottles: ['teens-multi.png', 'teens-prob.png', 'teens-brain.png', 'teens-mag.png'],
  },
  // Toddlers (ages 2 to 3): the line only has two products today (multivitamin and 3-in-1 probiotic), so this bundle is a 2-in-1.
  {
    id: 'toddlers', label: 'Toddlers', possessive: "Toddlers'", bundleName: '2-in-1 Bundle', countWord: 'Two', banner: { prefix: 'This Bundle is For Toddlers Ages ', ages: '2 - 3' },
    vanity: 'Complete Daily Support For [Growing Toddlers]',
    intro: '<p><strong>Two hero gummies in one bundle, built for ages 2 to 3.</strong> A multivitamin with choline and 21 organic superfoods plus a gentle 3-in-1 probiotic, in one simple daily routine.</p>',
    handles: ['the-no-junk-toddlers-multivitamin', 'toddlers-3-in-1-probiotic'],
    bottles: ['toddlers-multi.png', 'toddlers-prob.png'],
  },
];

// Fully resolved items for a demo (price math in dollars; cents for the cart)
export function getDemo(id) {
  const d = DEMOS.find((x) => x.id === id) || DEMOS[0];
  const items = d.handles.map((h, i) => {
    const p = getProduct(h);
    const base = p.price;
    return {
      ...ROLES[i],
      handle: h,
      title: p.title,
      pdpTitle: p.pdpTitle,
      blurb: p.blurb,
      description: INFO_MODAL_PRODUCTS[h]?.description || `<p>${p.blurb}</p>`, // production product description (shop product .js)
      rating: p.rating,
      reviews: p.reviews,
      base,
      individual: round2(base * (100 - INDIVIDUAL_DISCOUNT) / 100),
      inBundleMonthly: round2(base * (100 - BUNDLE_DISCOUNT_MONTHLY) / 100),
      inBundleOneTime: round2(base * (100 - BUNDLE_DISCOUNT_ONETIME) / 100),
      image: bottle(d.bottles[i]),
      url: p.url,
    };
  });
  const sum = (k) => round2(items.reduce((t, i) => t + i[k], 0));
  const reviews = items.reduce((t, i) => t + i.reviews, 0);
  const rating = Math.round((items.reduce((t, i) => t + i.rating * i.reviews, 0) / reviews) * 10) / 10; // review weighted average of the four products
  return {
    ...d,
    items, reviews, rating,
    totals: { base: sum('base'), individual: sum('individual'), monthly: sum('inBundleMonthly'), oneTime: sum('inBundleOneTime') },
  };
}
const round2 = (n) => Math.round(n * 100) / 100;
export const money = (n) => `$${n.toFixed(2)}`;

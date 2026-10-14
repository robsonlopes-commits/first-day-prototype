import { shopImg } from '../lib/assets.js';
import { getProduct } from './products.js';

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
  { key: 'multi', label: 'Nutrition', headline: 'Fills the gaps picky plates leave', category: 'multivitamin' },
  { key: 'gut', label: 'Gut', headline: 'Digestion and immunity, every day', category: 'probiotic' },
  { key: 'focus', label: 'Focus', headline: 'Support for focus, learning and memory', category: 'brain' },
  { key: 'sleep', label: 'Sleep', headline: 'Melatonin free support for sleep', category: 'magnesium' },
];

// Demos (audiences). "color" = segment color token value from fd-ui-kit.
const bottle = (f) => shopImg(f);
export const DEMOS = [
  {
    id: 'kids', label: 'Kids', possessive: "Kids'", color: '#FFB511', age: 'Ages 4 to 12',
    tagline: 'One daily ritual for picky eaters.',
    sub: 'Four gummies that cover nutrition, gut, focus and sleep, so one fussy plate does not decide the day.',
    handles: ['kids-enrichment-vitamin', 'kids-belly-biotic', 'kids-daily-focus', 'kids-calming-magnesium'],
    bottles: ['kids-multi.png', 'kids-prob_4b7651d5-86e6-4eb3-8d96-e6d26e57c0e4.png', 'kids-brain.png', 'kids-mag.png'],
  },
  {
    id: 'teens', label: 'Teens', possessive: "Teens'", color: '#00B4E4', age: 'Ages 13 to 17',
    tagline: 'One daily ritual for a full schedule.',
    sub: 'Four gummies for nutrition, gut, focus and sleep, built for teens who skip meals and stay up late.',
    handles: ['teens-kickstart-vitamin', 'teens-gut-sustainer', 'teens-daily-focus', 'teens-calming-magnesium'],
    bottles: ['teens-multi.png', 'teens-prob.png', 'teens-brain.png', 'teens-mag.png'],
  },
  {
    id: 'women', label: 'Women', possessive: "Women's", color: '#F78684', age: 'Ages 18 and up',
    tagline: 'One daily ritual for everything in a day.',
    sub: 'Four gummies that bring nutrition, gut, focus and sleep support into a single routine.',
    handles: ['womens-supercharge-vitamin', 'womens-good-gut', 'womens-daily-focus', 'womens-calming-magnesium'],
    bottles: ['woman-multi.png', 'woman-prob.png', 'woman-brain.png', 'woman-mag.png'],
  },
  {
    id: 'men', label: 'Men', possessive: "Men's", color: '#5368C2', age: 'Ages 18 and up',
    tagline: 'One daily ritual, four jobs done.',
    sub: 'Four gummies that bring nutrition, gut, focus and sleep support into a single routine.',
    handles: ['mens-provisions-vitamin', 'mens-gut-guardian', 'mens-daily-focus', 'mens-calming-magnesium'],
    bottles: ['men-multi.png', 'men-prob.png', 'men-brain.png', 'men-mag.png'],
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
  return {
    ...d,
    items,
    totals: { base: sum('base'), individual: sum('individual'), monthly: sum('inBundleMonthly'), oneTime: sum('inBundleOneTime') },
  };
}
const round2 = (n) => Math.round(n * 100) / 100;
export const money = (n) => `$${n.toFixed(2)}`;

export const FAQ = [
  ['What is in the All-in-1 Bundle?', 'One bottle each of the Multivitamin, the 3-in-1 Probiotic, Daily Focus Brain Support and Nighttime Reset Magnesium for the audience you pick. Every bottle is a 30 day supply.'],
  ['Can I buy the products one at a time?', 'Yes. Every product can be added on its own. The bundle price is lower than buying the same four separately.'],
  ['What is the difference between Monthly and One-Time?', 'Monthly delivers a new bundle every month at our best price and you can cancel anytime. One-Time is a single order at a smaller discount.'],
  ['Can I switch between Kids, Teens, Women and Men?', 'Yes. Use the tabs at the top of the page. The products, images and prices update right away.'],
  ['Are the gummies free from junk?', 'Yes. First Day gummies are made with no fake sugars, no artificial colors, no fillers and no fads.'],
];

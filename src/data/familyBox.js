import { BUNDLE_CATALOG, GIFTS } from './bundleQuiz.js';
import { SHORT_BLURBS } from './shortBlurbs.js';
import { customImg } from '../lib/assets.js';

// EXPLORATION Family Box Builder: data of the family box block (src/sections/explorations/familyBox).
// Members of the family, the products of each one (the bundle builder catalog of /pages/bundle-quiz), the discount tiers and the gifts of the live builder:
// 1 bottle 30% off, 2 bottles 35%, 3 bottles 40%, 4 or more 45% off and 4 free gifts (one more gift for each bottle, up to four).
// icon = the family icon of the header nav (src/layout/NavIcon.jsx), audience = the category of the catalog.
export const MEMBER_TYPES = [
  { key: 'kid', label: 'Kid', icon: 'kid', audience: 'kids', ages: '4 - 12' },
  { key: 'toddler', label: 'Toddler', icon: 'toddler', audience: 'toddlers', ages: '2 - 3' },
  { key: 'teen', label: 'Teen', icon: 'teen', audience: 'teens', ages: '13 - 17' },
  { key: 'mom', label: 'Mom', icon: 'woman', audience: 'women', ages: '18+' },
  { key: 'dad', label: 'Dad', icon: 'man', audience: 'men', ages: '18+' },
];
export const typeOf = (key) => MEMBER_TYPES.find((t) => t.key === key);
// these two always show a box: a "Start" card until the member is added. The other boxes only exist when the family has that member.
export const START_TYPES = ['teen', 'mom']; // Teens first (owner: prioritize Teens)

export const TIERS = [{ n: 1, pct: 30 }, { n: 2, pct: 35 }, { n: 3, pct: 40 }, { n: 4, pct: 45 }];
export const MAX_PCT = TIERS[TIERS.length - 1].pct;
export const pctFor = (bottles) => TIERS.reduce((pct, t) => (bottles >= t.n ? t.pct : pct), TIERS[0].pct);
export const nextTier = (bottles) => TIERS.find((t) => t.n > bottles) || null;

export const GIFT_LIST = ['reusable-bottle', 'digital-meal-planner', 'travel-pod-gift', 'hydration-sticks-gift'].map((k) => ({ key: k, ...GIFTS[k] }));

// bottle cutout of each product (the first photo of its gallery, resized to 560 px in public/assets/custom/family-box/<handle>.png)
export const bottleSrc = (handle) => customImg(`family-box/${handle}.png`);
export const productsFor = (audience) => (BUNDLE_CATALOG.find((c) => c.key === audience) || { products: [] }).products.map((p) => ({ ...p, blurb: SHORT_BLURBS[p.title] || p.description, bottle: bottleSrc(p.handle), multi: /Multivitamin/.test(p.title) }));

// "Kid 1", "Kid 2", "Mom 1": the number counts the members of the same type, in the order they were added
// the shopper can type a name for the person (m.name); without one the default is used
export const defaultName = (members, m) => `${typeOf(m.type).label} ${members.filter((x) => x.type === m.type).indexOf(m) + 1}`;
export const memberName = (members, m) => m.name || defaultName(members, m);

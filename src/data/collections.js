// Product groupings as shown on the live Home carousel (tabs) and /pages/sale carousels.
import { PRODUCTS } from './products.js';

const H = {
  kids: ['kids-enrichment-vitamin', 'kids-belly-biotic', 'kids-daily-focus', 'kids-calming-magnesium', 'kids-tlc-starter-pack'],
  teens: ['teens-kickstart-vitamin', 'teens-gut-sustainer', 'teens-daily-focus', 'teens-calming-magnesium', 'teens-defense-starter-pack', 'teens-dream-team-starter-pack'],
  women: ['womens-supercharge-vitamin', 'womens-good-gut', 'womens-daily-focus', 'womens-calming-magnesium', 'womens-wellness-starter-pack', 'womens-dream-team-starter-pack'],
  men: ['mens-provisions-vitamin', 'mens-gut-guardian', 'mens-daily-focus', 'mens-calming-magnesium', 'mens-power-up-starter-pack'],
  toddlers: ['the-no-junk-toddlers-multivitamin', 'toddlers-3-in-1-probiotic'],
};

// Home "Shop For Your Family's Health" carousel: tab label -> handles (order as on the live page)
export const HOME_CAROUSEL_TABS = [
  { key: "kids'", label: "Kids'", handles: H.kids },
  { key: "teens'", label: "Teens'", handles: H.teens },
  { key: "women's", label: "Women's", handles: H.women },
  { key: "men's", label: "Men's", handles: H.men },
  { key: "toddlers'", label: "Toddlers'", handles: H.toddlers },
];

// /pages/sale carousels (templates/page.bfcm-categories.json), same order as the blocks.
export const SALE_CAROUSELS = {
  starterpacks: ['kids-tlc-starter-pack', 'teens-defense-starter-pack', 'womens-wellness-starter-pack', 'kids-dream-team-starter-pack', 'teens-dream-team-starter-pack', 'womens-dream-team-starter-pack', 'mens-power-up-starter-pack'],
  vitamins: ['kids-enrichment-vitamin', 'teens-kickstart-vitamin', 'the-no-junk-toddlers-multivitamin', 'womens-supercharge-vitamin', 'mens-provisions-vitamin'],
  magnesium: ['kids-calming-magnesium', 'teens-calming-magnesium', 'womens-calming-magnesium', 'mens-calming-magnesium'],
  brain: ['kids-daily-focus', 'teens-daily-focus', 'womens-daily-focus', 'mens-daily-focus'],
  probiotics: ['kids-belly-biotic', 'teens-gut-sustainer', 'womens-good-gut', 'mens-gut-guardian'],
};

export const COLLECTIONS = {
  all: Object.keys(PRODUCTS),
  kids: H.kids, teens: H.teens, women: H.women, men: H.men, toddlers: H.toddlers,
  'starter-packs': SALE_CAROUSELS.starterpacks,
  multivitamins: SALE_CAROUSELS.vitamins,
  'calming-magnesium': SALE_CAROUSELS.magnesium,
  'brain-focus': SALE_CAROUSELS.brain,
  probiotics: SALE_CAROUSELS.probiotics,
};
export const getCollection = (handle) => (COLLECTIONS[handle] || []).map((h) => PRODUCTS[h]).filter(Boolean);

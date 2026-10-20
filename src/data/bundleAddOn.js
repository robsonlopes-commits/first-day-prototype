import { getProduct, salePrice } from './products.js';
import { INFO_MODAL_PRODUCTS } from './bundleQuiz.js';
import { PRODUCT_INFO } from './bundleBuilder.js';
import { customImg } from '../lib/assets.js';

// EXPLORATION /explorations/bundle-add-on: the new add-on modal ("Maximize Your Savings with These Deals").
// Design: Figma file "Internal Drafts" (key ZMjZEkGEfq5vCpfQMjFS8A), page "Add-on Popup" (node 1793:38), desktop modal 500 px wide and a mobile
// full page modal. Trigger: the buy box button "Add To Cart & View Gift", same as the current upsell dialog of the live page.
// The KIDS tab is the design (names, copy and badges as drawn). The prices of Focus, Magnesium and Probiotic follow the bundle prices (catalog base at 40% off:
// $29.40, $23.40, $29.40) so a product costs the same alone and inside a stack; the two 8-in-1 Protein cards keep the draft prices of the design. The other tabs are an assumption:
// real catalog products of that audience (the design only draws Kids), priced at the page's 30% off.
export const GIFT_THRESHOLD = 75; // dollars, same as the cart gift ("FREE $25 GIFT" over $75)
export const GIFT_VALUE = 25;

const A = (file) => customImg(`addon/${file}`);
const BADGE = {
  new: { text: 'New!', solid: '#64daa1', fg: '#117c49' }, // the global card badge shows 25% of `solid` behind `fg`
  best: { text: 'Best Price Ever', solid: '#ffb511', fg: '#906300' },
};

// info modal text for the products that are not in the catalog
const PROTEIN = '<p>Fiber, protein and collagen in one daily liquid. A 2 source protein and collagen peptide blend with a 4.5 g fiber blend, in a grab and go packet.</p>';

const KIDS = [
  { id: 'lemonade', title: 'Fresh Lemonade 8-in-1 Protein', desc: 'Fiber, protein & collagen in one daily liquid. Flavor: Fresh Lemonade', was: 29, now: 23.4, image: A('p-lemonade.jpg'), badge: BADGE.new, info: PROTEIN },
  { id: 'peach', title: 'Peach Mango 8-in-1 Protein', desc: 'Fiber, protein & collagen in one daily liquid. Flavor: Peach Mango', was: 29, now: 23.4, image: A('p-peach.jpg'), badge: BADGE.new, info: PROTEIN },
  { id: 'focus', title: "Kids' Focus Support", desc: 'Packed with naturally occurring nutrients that helps keep brain cells healthy for even more steady moods and focus.', was: 49, now: 29.4, image: A('p-focus.png'), badge: BADGE.best, handle: 'kids-daily-focus' },
  { id: 'magnesium', title: "Kids' Magnesium", desc: 'Magnesium supports calmer nights to round out their routine from morning to bedtime.', was: 39, now: 23.4, image: A('p-magnesium.png'), handle: 'kids-calming-magnesium' },
  { id: 'probiotic', title: 'Kids Probiotic', desc: 'A healthy gut helps your kid maximize absorption of essential nutrients.', was: 49, now: 29.4, handle: 'kids-belly-biotic' },
];

const fromCatalog = (handle, descOverride) => {
  const p = getProduct(handle);
  return { id: handle, title: p.title, desc: descOverride || p.blurb, was: p.price, now: salePrice(p), image: p.homeImage || p.saleImage, handle };
};

export const TABS = [
  { id: 'kids', label: 'Kids', items: KIDS },
  { id: 'toddlers', label: 'Toddlers', items: ['the-no-junk-toddlers-multivitamin', 'toddlers-3-in-1-probiotic'].map((h) => fromCatalog(h)) },
  { id: 'teens', label: 'Teens', items: ['teens-kickstart-vitamin', 'teens-daily-focus', 'teens-calming-magnesium', 'teens-gut-sustainer'].map((h) => fromCatalog(h)) },
  { id: 'parents', label: 'Parents', items: ['womens-supercharge-vitamin', 'womens-daily-focus', 'womens-calming-magnesium', 'womens-good-gut', 'mens-provisions-vitamin', 'mens-daily-focus', 'mens-calming-magnesium', 'mens-gut-guardian'].map((h) => fromCatalog(h)) },
];

// products that have no photo in the design resolve it from the catalog (the real product photo, not the placeholder the design reuses)
for (const t of TABS) for (const it of t.items) {
  if (!it.image && it.handle) { const p = getProduct(it.handle); it.image = p.homeImage || p.saleImage; }
  it.infoHtml = it.info || INFO_MODAL_PRODUCTS[it.handle]?.description || `<p>${it.desc}</p>`;
}

// ---- bundles ("stacks"): add-ons on top of the product in the buy box (the Kids' Multi). Prices are the sum of the item prices above. ----
// Copy uses the approved wording of the product pages (supports, helps) with the asterisk; nothing promises an outcome.
// the product the shopper is adding in the buy box (always part of every stack); a clean crop of the pack shot, not the infographic of the gallery
export const MULTI = { title: "Kids' Multivitamin", image: A('p-multi.png') };

// the tabs of the stack info modal (same data as the bundle builder quiz pack info): one tab per product, with the gallery and text of that product
const INFO_KEY = { multi: 'kids-enrichment-vitamin', focus: 'kids-daily-focus-brain-support-copy', magnesium: 'kids-calming-magnesium', probiotic: 'kids-3-in-1-probiotic' };
const TAB_LABEL = { multi: 'Multi', focus: 'Focus', magnesium: 'Magnesium', probiotic: 'Probiotic' };
export function bundleTabs(b) {
  const tab = (id, title, fallbackImage, offer) => {
    const info = PRODUCT_INFO[INFO_KEY[id]];
    return { id, label: TAB_LABEL[id], product: { title, description: info.description, images: info.images.length ? info.images : [fallbackImage] }, offer };
  };
  return [
    tab('multi', MULTI.title, MULTI.image, null), // already in the cart: no price here
    ...bundleItems(b).map((it) => tab(it.id, it.title, it.image, { price: Math.round(it.now * 100), compare: Math.round(it.was * 100) })),
  ];
}

// pitch = the two line text under the photos of a stack: what the add-on does TOGETHER with the Multi (functional claims, asterisk; facts from firstday-brand-knowledge)
export const BUNDLES = [
  { id: 'focus', name: 'Focus Stack', items: ['focus'], pitch: "The Multi fills the gaps, Focus Support adds citicoline for steadier focus and learning.*", body: "Daily Focus Brain Support next to the Multi, so the nutrients that help keep brain cells healthy are part of every day.*", supports: ['Focus', 'Memory', 'Learning'] },
  { id: 'calm', name: 'Calm Stack', items: ['magnesium'], pitch: "The Multi brings D3 and B6, Magnesium adds the calm for an easier wind down.*", body: 'Nighttime Reset Magnesium, melatonin free, to round out the routine from morning to bedtime.*', supports: ['Calm', 'Sleep', 'Relaxation'] },
  { id: 'picky', name: 'Picky Eater Stack', items: ['probiotic'], pitch: "The Multi fills gaps from foods they skip, the Probiotic helps their gut absorb more.*", body: 'The 3-in-1 Pre+ Post+ Probiotic helps a healthy gut take in more of the essential nutrients from what they do eat.*', supports: ['Gut health', 'Digestion', 'Immunity'] },
  { id: 'complete', name: 'Complete Routine', items: ['focus', 'magnesium', 'probiotic'], pitch: "The Multi fills the gaps, then focus, calm and gut support work with it all day.*", body: 'Every add-on with the Multi: brain, calm and gut support from morning to bedtime in one simple routine.*', supports: ['Focus', 'Sleep', 'Gut health'], badge: 'Best Value' },
];
export const CORE_IDS = ['focus', 'magnesium', 'probiotic'];
export const bundleItems = (b) => b.items.map((id) => TABS[0].items.find((it) => it.id === id));
export const bundlePrice = (b) => ({ now: bundleItems(b).reduce((t, it) => t + it.now, 0), was: bundleItems(b).reduce((t, it) => t + it.was, 0) });

// Mock product + buy box data for the legacy PDP (/products/kids-calming-magnesium, product.unified-default).
// Captured read-only from firstday.com (product .js, rendered DOM, block settings in templates/product.unified-default.json).
// Prices follow the reference screenshot: Monthly $27.30 vs $39 list, 2 bottles -> "Save $31.20", subtotal $54.60, gift FREE.
import { shopImg } from '../lib/assets.js';
import { getIngredients } from './ingredients.js';

const ING = getIngredients('kids-calming-magnesium');
export const INGREDIENTS_HTML = ING.html;

// product.media (first image on the live page is the clean-label-project variant of kids-mag.png).
const MEDIA = [
  ['kcm-clean-label-project.png', "Kids’ Nighttime Reset Magnesium"],
  ['kcm_10_-_Benefits_-_Kids_Magnesium_result.webp', 'kids magnesium benefits'],
  ['kcm_3_-_Benefits_-_Kids_Magnesium_result.webp', 'peaceful sleep with kids magnesium'],
  ['ingredients-kcm.webp', 'magnesium ingredients'],
  ['4_-_Gummies_Nutrients_-_Kids_Magnesium.png', "Kids’ Nighttime Reset Magnesium"],
  ['kcm_5_-_Benefits_-_Kids_Magnesium_result.webp', 'kids bedtimes struggles'],
  ['kcm_6_-_Nutrients_-_Kids_Magnesium_result.webp', 'no melatonin'],
  ['kcm_8_-_Why_First_Day__-_Kids_Magnesium_result.webp', 'best kids sleep support'],
  ['kcm_9_-_Social_Proof_-_Kids_Magnesium_result.webp', 'first day social proof'],
  ['kcm_2_-_Lifestyle_Image_-_Kids_Magnesium_result.webp', 'kids magnesium on a table'],
  ['kcm_11_-_Back_Panel_-_Kids_Magnesium_result.webp', 'back of kids magnesium bottle'],
];

export const PDP_PRODUCT = {
  id: 7394315763810,
  handle: 'kids-calming-magnesium',
  title: 'Kids’ Nighttime Reset Magnesium',
  vanityTitle: 'A Melatonin-Free Gummy For [Peaceful, Natural Sleep]', // product.metafields.custom.pdp_vanity_title (brackets = accent)
  vendor: 'First Day Life Inc.',
  rating: 4.71,
  reviewCount: 339,
  variants: [{ id: 42115495034978, title: '1 Bottle', price: 3900, compareAtPrice: 3900, sku: 'Kids Calming Magnesium - 1 bottle' }],
  media: MEDIA.map(([file, alt]) => ({ src: shopImg(file), alt, width: 1080, height: 1080 })),
  servingsPerBottle: '30 Servings Per Bottle',
  ingredients: { title: 'Kids’ Nighttime Reset Magnesium', image: ING.image, html: ING.html },
  supplementFactsImage: shopImg('kids_magnesium_supplement_facts.png'),
  clinicianCount: 615,
};

// Demographic tabs + crosslinks (metaobject related_products_by_demographic["...-kids"]).
export const DEMOGRAPHIC_TABS = {
  current: { label: 'Kids', ageLine: 'This Product is For Kids Ages <strong>4 - 12</strong>' },
  others: [{ label: 'Teens', sublabel: 'Ages 13 - 17', url: '/products/teens-calming-magnesium' }],
  crosslinkAge: 'This Product is For Kids Ages <b>4 - 12</b>',
};

// Intro copy of the benefit_accordion_stats block (metafield custom.benefit_accordian description). No accordion items on this product.
export const BENEFIT_INTRO_HTML = '<div class="metafield-rich_text_field"><p>Tired of bedtime battles? Meet the magnesium gummy that’s giving kids restful sleep, calmer moods, and mind and body relaxation. Made with calming ingredients and no melatonin hormones.<br><br><strong>Flavor: Strawberry</strong></p></div>';
export const BENEFIT_ACCORDION_STYLE = {
  '--bas-bg': 'rgba(0,0,0,0)', '--bas-text': '#2c3d50', '--bas-muted': '#2c3d50', '--bas-border': '#f1f0f7', '--bas-card-bg': '#ffffff',
  '--bas-icon-bg': '#776cb1', '--bas-icon-color': '#ffffff', '--bas-percent-bg': '#effaff', '--bas-percent-color': '#5a6fd6',
  '--bas-radius': '12px', '--bas-font-size': '16px', '--bas-heading-size': '16px', '--bas-percent-size': '31px',
};

// product_purchase_content block settings + the two buy_box_frequency_option blocks.
export const BUY_BOX = {
  frequencyTitle: 'Delivery Frequency',
  quantityTitle: 'Quantity',
  maxQuantity: 4,
  defaultQuantity: 2,
  buttonText: 'Add To Cart',
  giftButtonText: 'Add To Cart & View Gift',
  options: [
    { id: 'buy_box_frequency_option_QgGjz7', kind: 'subscription', label: 'Monthly', sellingPlanId: '3896967266', compare: 39, price: 27.3, perBottleSave: 15.6,
      benefits: ['FREE gift on orders $75+', 'FREE shipping on first order', 'Cancel anytime, no questions asked'] },
    { id: 'buy_box_frequency_option_w9qebM', kind: 'otp', label: 'One-Time', compare: 39, price: 27.3, perBottleSave: 11.7, code: 'BUNDLEBUILDER',
      benefits: ["You're missing out on free shipping!", "You're 87% less likely to build a healthy habit without subscribing. You can cancel anytime!"],
      badge: 'Higher Cost' },
  ],
  gift: { title: 'Rapid Hydration Electrolyte Support - Gift', compare: 25, minRetail: 75 }, // unlocks at $75 of list value (2+ bottles)
  savingsTemplate: 'Saving {amount}!',
  subtotalLabel: 'Subtotal',
};

export const TRUST_BADGES = [
  { src: 'https://cdn.shopify.com/s/files/1/0028/0533/4131/files/image_17.png', alt: 'money back guarantee' },
  { src: 'https://cdn.shopify.com/s/files/1/0028/0533/4131/files/image_18_23f2a83f-a228-4c73-be70-3ac38b5837dd.png', alt: '1 million customers' },
  { src: 'https://cdn.shopify.com/s/files/1/0028/0533/4131/files/image_23.png', alt: 'secure checkout' },
];

// collapsible_tab blocks. icon = snippets/icon-accordion.liquid name.
export const MAIN_ACCORDIONS = [
  { icon: 'apple', heading: 'Ingredients', html: `<div class="metafield-rich_text_field">${ING.html}</div>` },
  { icon: 'clipboard', heading: 'Supplement Facts', image: { src: shopImg('kids_magnesium_supplement_facts.png'), alt: 'Supplement Facts', width: 900, height: 900 } },
  { icon: 'return', heading: 'Subscription Details', html: '<div class="metafield-rich_text_field"><p>You\'ll receive a stylish refillable bottle on your first order, then receive our eco-friendly refill pouches every 30 days on a physician-recommended schedule.<br><br> Plus, you\'ll receive these benefits:</p><ul><li>Savings every single month.</li><li>Free shipping on your first order.</li><li>Easy management - skip or pause whenever you need.</li><li>VIP access to sales, gifts, early access &amp; more.</li><li>Cancel anytime.</li></ul></div>' },
];

// Judge.me (static mock of the review_widget + preview_badge blocks).
export const JUDGEME = {
  average: 4.71,
  count: 339,
  summary: 'Magnesium gummies designed to help children sleep better and relax at bedtime. Most customers said kids love the taste and experience improved sleep quality, easier bedtime routines, and calmer evenings. Some noted effectiveness varies, with mixed results for ADHD children. A few reported no improvement or disliked taste/smell.',
  highlights: [
    '“My son has always been a horrible sleeper. Since starting these he definitely seems to be waking up less.”',
    '“The magnesium gummies have been a game changer to my son\'s sleep, helping him calm down before bed.”',
    '“My kids are now requesting their gummies! They sleep through the night and do not wake up drowsy.”',
  ],
  reviews: [
    { rating: 5, name: 'Anonymous', date: '09/29/2026', title: 'Love these!', body: 'My kids love these!' },
    { rating: 5, name: 'Meg B', date: '09/24/2026', title: 'Definite sleep improvement', body: 'My son has always been a horrible sleeper. We tried melatonin with no success. Since starting these he definitely seems to be waking up less and coming to get in bed with us. He loves the taste and reminds us at bedtime when we forget to give them to him.' },
    { rating: 5, name: 'Anonymous', date: '09/19/2026', title: 'Makes getting ready for bedtime much easier', body: 'Makes getting ready for bedtime much easier' },
    { rating: 5, name: 'Anonymous', date: '09/17/2026', title: 'It has helped my kiddo sleep throughout the night', body: 'It has helped my kiddo sleep throughout the night now and it has helped with bowel movements as well' },
    { rating: 5, name: 'Lori Tinkle', date: '09/11/2026', title: 'Nightly help', body: 'Great product that helps my son calm before bed.' },
  ],
};

export const money = (n) => `$${n.toFixed(2)}`;

// Buy-box math (mirrors PBFCM-PDP-controller.js for this product): returns everything the summary rows display.
export function priceSummary(option, qty) {
  const o = BUY_BOX.options.find((x) => x.kind === option) || BUY_BOX.options[0];
  const list = Math.round(PDP_PRODUCT.variants[0].price) / 100; // 39
  const retail = list * qty;
  const giftUnlocked = retail >= BUY_BOX.gift.minRetail;
  const gift = giftUnlocked ? BUY_BOX.gift.compare : 0;
  const final = Math.round(o.price * qty * 100) / 100;
  const compare = retail + gift;
  return {
    tileSave: (q) => money(o.perBottleSave * q),
    compare, final, saving: Math.round((compare - final) * 100) / 100, giftUnlocked, retail,
    shippingFree: option === 'subscription' || final >= 50,
  };
}

import { KIDS_LEGACY_PAGE } from './defaults.js';
import { KIDS_PDP_LEGACY } from '../../lib/pdpData.jsx';
import { PDP_LEGACY_SECTIONS } from '../pdpLegacySections.js';
import { makePriceSummary } from '../pdpLegacy.js';
import { getIngredients } from '../ingredients.js';
import { shopImg, extImg } from '../../lib/assets.js';
import { overrideSections, imageWithText, richText, guaranteeSection, faqSection } from './sectionOverrides.js';

// /products/toddler-tlc-starter-pack (legacy PDP template, product.unified-default, with a starter pack main section). Starts as the Kids' Magnesium page;
// everything that is different on the live page is overridden here (captured read-only from firstday.com).
const ING = getIngredients('toddler-tlc-starter-pack');

// product .js media (9 images, in gallery order; real file names and alt texts)
const MEDIA = [
  ['First_Day_Toddlers_Supplement_Duo.png', "Two First Day dietary supplement containers for toddlers, shown on a clean white background. The left container is labeled 'THE MULTI' with a green and teal design, and the right container is labeled 'PRE + POST PROBIOTIC' with a red and coral design.", 1254, 1254],
  ['trmv_6_-_Benefits_-_Toddlers_Multi_result.webp', 'An informational marketing graphic with a photo of a toddler being fed on the left and large text and three benefit callouts on the right about toddlers not getting all nutrients from food alone, including daily nutrition support, brain & development support, and immunity support.', 1080, 1080],
  ['trmv_9_-_Nutrition_-_Toddlers_Multi_result.webp', "A blue tub labeled 'TODDLERS' SUPERFOOD MULTI' with floating fruit and vegetable illustrations and marketing text on a light blue background. Visible text includes 'REAL WHOLESOME Nutrition Never Tasted So Good' and product claims about bright, fruity gummies and high-quality ingredients.", 1080, 1080],
  ['trmv_4_-_Ingredients_-_Toddlers_Multi_result.webp', "An infographic-style product image on a light blue background with the headline 'Designed to support growing toddlers*' and four rounded text panels listing nutrient claims: more folate than 1/2 cup of spinach, more Vitamin B1 than 3 cups of broccoli, more Vitamin D than 200 mushrooms, and more Vitamin B12 than 1/2 cup of milk. Small broccoli, carrot, and leaf graphics appear along the bottom right.", 1080, 1080],
  ['trtb7_-_Benefits_-_Toddlers_Tribiotics_result.webp', 'no fillers', 1080, 1080],
  ['trtb5_-_Benefits_-_Toddlers_Tribiotics_result.webp', 'immunity support', 1080, 1080],
  ['trtb6_-_Nutrition_-_Toddlers_Tribiotics_result.webp', "An informational graphic for toddler gut health gummies. The light blue background features the headline 'Nourish Your Toddler's Gut with 3 Powerful Strains' in dark blue text.", 1080, 1080],
  ['trtb_12_-_Back_Panel_-_Toddlers_Tribiotics_result.webp', 'back of bottle', 1080, 1080],
  ['trmv_10_-_Back_Panel_-_Toddlers_Multi_result.webp', 'The back of a dietary supplement bottle showing the Supplement Facts label, with a blue and green camouflage-patterned base on a white background.', 1080, 1080],
];

const PDP_PRODUCT = {
  id: 10347373166690,
  handle: 'toddler-tlc-starter-pack',
  title: "Toddlers' Starter Pack",
  vanityTitle: 'Gummy Multivitamins & Probiotic For [Improved Immunity & Behavior]', // product.metafields.custom.pdp_vanity_title (brackets = accent)
  vendor: 'First Day Life Inc.',
  rating: 4.75,
  reviewCount: 255,
  // variants of the live product (1 to 4 starter packs: $88 / $150 / $219 / $280; the buy box prices follow the prototype convention, see BUY_BOX)
  variants: [{ id: 50730277666914, title: '1 Starter Pack', price: 8800, compareAtPrice: 8800, sku: 'KTLCSP' }],
  media: MEDIA.map(([file, alt, width, height]) => ({ src: shopImg(file), alt, width, height })),
  servingsPerBottle: '', // no servings badge on the starter pack
  ingredients: { title: "Toddlers' Starter Pack", image: ING.image, html: ING.html },
  supplementFactsImage: shopImg('toddler-tlc-starter-pack-ingredients.jpg'),
};

const BENEFIT_INTRO_HTML = '<div class="metafield-rich_text_field"><p>Give your kids the nutrition they need to fight the effects of Hidden Hunger - with 21 organic superfoods &amp; softer, easier to pass stools.</p></div>';

// Buy box: same convention as Kids' Magnesium (list price $88, 30% off monthly and one-time with code BUNDLEBUILDER, tile "Save $X" = 40% of the list price on Monthly and 30% on
// One-Time). Live today: the button always says "Add To Cart & View Gift", but there is NO gift line and the subtotal does not count the gift (Kids' Magnesium replica
// still shows the Oct 14 gift line); minRetail: 75 would bring that behaviour back.
const KIDS_BUY_BOX = KIDS_PDP_LEGACY.BUY_BOX;
const BUY_BOX = {
  ...KIDS_BUY_BOX,
  buttonText: 'Add To Cart & View Gift',
  gift: { ...KIDS_BUY_BOX.gift, minRetail: Infinity },
  unit: { one: 'Pack', many: 'Packs' },
  options: [
    { ...KIDS_BUY_BOX.options[0], compare: 88, price: 61.6, perBottleSave: 35.2, badgeHtml: 'Guaranteed<strong> Lowest Price!</strong>', badgeColor: '#776CB1' },
    { ...KIDS_BUY_BOX.options[1], compare: 88, price: 61.6, perBottleSave: 26.4 },
  ],
};

const MAIN_ACCORDIONS = [
  { icon: 'apple', heading: 'Ingredients', html: `<div class="metafield-rich_text_field">${ING.html}</div>` },
  { icon: 'clipboard', heading: 'Supplement Facts', image: { src: shopImg('toddler-tlc-starter-pack-ingredients.jpg'), alt: 'Supplement Facts', width: 900, height: 1747 } },
  KIDS_PDP_LEGACY.MAIN_ACCORDIONS[2], // Subscription Details (same text as Kids' Magnesium)
];

// Judge.me block: the starter pack shares the reviews of the 3-in-1 probiotic and the live widget has no AI summary / highlights for it
const JUDGEME = {
  average: 4.75,
  count: 255,
  summary: '',
  highlights: [],
  reviews: [
    { rating: 5, name: 'Tabby', date: '11/07/2026', title: 'Fixed gut of autistic grandchild', body: 'I buy the probiotics for my autistic grandson who was having problems with daily bowel movements. Within a week of starting these pre/probiotcs, his digestive system straightened out and he no longer has any issues! Definitely recommend this product!' },
    { rating: 5, name: 'Kayla Martin', date: '10/12/2026', title: 'Child enjoys the taste of the gummies & looks', body: 'Child enjoys the taste of the gummies & looks forward to taking them each day.' },
    { rating: 5, name: 'Anonymous', date: '10/10/2026', title: 'awesome! great wway to get in my kitchen', body: 'awesome! great way to get in my kitchen probiotic gut health', pictures: [extImg('review-images.judgeme.com/first-day-life-inc/1791668544__img_2941__original.jpeg')] },
    { rating: 5, name: 'Anonymous', date: '10/05/2026', title: 'No junk!', body: 'My kids love them! No junk vitamin that actually taste great!' },
    { rating: 5, name: 'Anonymous', date: '09/30/2026', title: 'Love this product for my kids!! I know the', body: 'Love this product for my kids!! I know the nutrition gaps (if any) will definitely be filled! Highly recommend!' },
  ],
};

const main = {
  ...KIDS_PDP_LEGACY,
  PDP_PRODUCT, BENEFIT_INTRO_HTML, BUY_BOX, MAIN_ACCORDIONS, JUDGEME,
  DEMOGRAPHIC_TABS: null, // no demographic tabs / crosslinks on the starter pack
  QUANT_WIDGET_HTML: false, // no FrontRowMD "Clinicians' Choice" badge
  BENEFIT_ITEMS: false, // live renders no (empty) .pdp-benefit-accordion-stats__items div
  INGREDIENTS_HTML: ING.html,
  priceSummary: makePriceSummary(BUY_BOX, PDP_PRODUCT),
};

// Sections under the main one. Same template as Kids' Magnesium; only the metafield-driven content changes. The live page renders nothing for
// image_with_text_6Q3NK6, image_with_text_iUBfca and the FrontRowMD clinician reviews (no content for this product), and does not render review_cards_rgiawV,
// custom_liquid_aiATrm, rich_text_rRwKiA at all. c321e181 renders an empty rich text (padding only, 84px).
const DROP = ['image_with_text_6Q3NK6', 'image_with_text_iUBfca', 'review_cards_rgiawV', 'custom_liquid_aiATrm', 'rich_text_rRwKiA', 'frontrowmd_clinicians_reviews_FNwGAN'];
const SECTIONS = overrideSections(PDP_LEGACY_SECTIONS, DROP, {
  'c321e181-639c-4980-9b70-3f399c6c3e96': richText({ heading: '', text: '' }),
  '05081b91-f5a2-42de-8aa2-42cac5756c94': imageWithText({
    image: 'toddlers-multi-flat.png', alt: "Container labeled 'first day' with vegetables in the background", heading: "The “No Junk”™ Toddlers' Multivitamin",
    text: '<p></p><div class="metafield-rich_text_field"><p>Fill your toddler’s nutrition gaps with 10 critical nutrients and a blend of 21 organic superfoods.&nbsp;</p></div><p></p>',
  }),
  '2e1dde27-b7de-463d-b1e5-6b4fddf0520f': imageWithText({
    image: 'trtb_2_-_Lifestyle_Image_-_Toddlers_Tribiotics_result.webp', alt: 'bottle on table', heading: '3-in-1 Pre, Post, and Probiotic',
    text: '<div class="metafield-rich_text_field"><p>Constipation in toddlers often becomes a cycle where hard, painful stools lead to withholding, causing stool to build up and softer stool to leak around it, resulting in messy accidents. Supporting a healthier gut can help soften stools, reduce discomfort, and break the constipation cycle over time.</p></div>',
  }),
  '9bb086b7-8e0b-4a49-8b79-f40e6c083942': imageWithText({
    image: 'download_32.webp', alt: 'Bar chart comparing sugar content in daily servings of four supplements: First Day (2g), Smartypants (5g), Nordic Naturals (8g), and Flintstones (8g, labeled as artificial).', heading: 'Up to 75% Less Sugar',
    text: '<div class="metafield-rich_text_field"><p>Other toddler\'s vitamins often have over double the amount of sugar.** They coat their vitamins with sugar but we prefer to give you vitamins that are healthy and rely on fruits rather than create sugar bombs disguised as vitamins. Our natural flavors are extracted from fruits like strawberries &amp; oranges, giving kids an irresistible treat!</p></div>',
  }),
  image_with_text_yraceP: imageWithText({
    image: 'e88888495f_1.png', alt: '', imageRatio: 1920 / 1440, heading: 'What Sets First Day Apart',
    text: '<div class="metafield-rich_text_field"><p>Over 1 million families have made the switch to First Day, and it is easy to see why when competitors take so many shortcuts.</p></div>',
  }),
  '1668ba59-402b-43aa-82e4-477c210704cd': guaranteeSection,
  'cbd9ad2b-f52f-4a45-9c26-7fd50e23bd41': faqSection({ heading: "Toddlers' TLC Starter Pack FAQs", ingredientsHtml: ING.html }),
});

export const TODDLER_TLC_STARTER_PACK_PAGE = { ...KIDS_LEGACY_PAGE, main, SECTIONS };

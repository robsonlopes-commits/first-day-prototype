import { KIDS_LEGACY_PAGE } from './defaults.js';
import { KIDS_PDP_LEGACY } from '../../lib/pdpData.jsx';
import { PDP_LEGACY_SECTIONS } from '../pdpLegacySections.js';
import { makePriceSummary } from '../pdpLegacy.js';
import { getIngredients } from '../ingredients.js';
import { shopImg, extImg } from '../../lib/assets.js';
import { overrideSections, imageWithText, richText, guaranteeSection, faqSection, toddlersComparison } from './sectionOverrides.js';
import quantWidgetHtml from './frontrowQuant4199.html?raw';

// /products/toddlers-3-in-1-probiotic (legacy PDP, product.unified-default). Starts as the Kids' Magnesium page; everything that is different on the live
// page is overridden here (captured read-only from firstday.com).
const ING = getIngredients('toddlers-3-in-1-probiotic');

// product .js media (11 images, in gallery order; real file names and alt texts)
const MEDIA = [
  ['toddlers-prob.png', 'A cylindrical container of First Day Toddlers Pre + Post Probiotic dietary supplement gummies, featuring a white label with red and green accents and a blue base.', 2431, 2464],
  ['trtb_3_-_Features_-_Toddlers_Tribiotics_result.webp', 'promote gut health', 1080, 1080],
  ['trtb4_-_Gummies_Nutrients_-_Toddlers_Tribiotics_result.webp', 'probiotics', 1000, 1000],
  ['ingredients-trtb.webp', 'supplement label', 1080, 1080],
  ['trtb5_-_Benefits_-_Toddlers_Tribiotics_result.webp', 'immunity support', 1080, 1080],
  ['trtb6_-_Nutrition_-_Toddlers_Tribiotics_result.webp', "An informational graphic for toddler gut health gummies. The light blue background features the headline 'Nourish Your Toddler's Gut with 3 Powerful Strains' in dark blue text.", 1080, 1080],
  ['trtb7_-_Benefits_-_Toddlers_Tribiotics_result.webp', 'no fillers', 1080, 1080],
  ['trtb8_-_3_features_-_Toddlers_Tribiotics_result.webp', 'healthier poops', 1080, 1080],
  ['trtb_10_-_Why_First_Day__-_Toddlers_Tribiotics_result.webp', "An infographic titled 'Why First Day?' compares a toddler supplement product labeled 'first day' with generic 'OTHERS' options, using a blue and white table with red checkmarks and crosses on a light blue background.", 1080, 1080],
  ['trtb11_-_Social_Proof_-_Toddlers_Tribiotics_result.webp', '1 million customers', 1080, 1080],
  ['trtb_2_-_Lifestyle_Image_-_Toddlers_Tribiotics_result.webp', 'bottle on table', 1080, 1080],
  ['trtb_12_-_Back_Panel_-_Toddlers_Tribiotics_result.webp', 'back of bottle', 1080, 1080],
];

const PDP_PRODUCT = {
  id: 7481027985506,
  handle: 'toddlers-3-in-1-probiotic',
  title: "Toddlers' 3-in-1 Pre+ Post+ Probiotic",
  vanityTitle: 'Gentle 3-in-1 Gummy For [Softer, Easier-To-Pass Stools]', // product.metafields.custom.pdp_vanity_title (brackets = accent)
  vendor: 'First Day Life Inc.',
  rating: 4.75,
  reviewCount: 256,
  variants: [{ id: 42380460294242, title: 'Default Title', price: 4900, compareAtPrice: null, sku: 'TRTBB' }],
  media: MEDIA.map(([file, alt, width, height]) => ({ src: shopImg(file), alt, width, height })),
  servingsPerBottle: '30 Servings Per Bottle',
  ingredients: { title: "Toddlers' 3-in-1 Pre+ Post+ Probiotic", image: ING.image, html: ING.html },
  supplementFactsImage: shopImg('ingredients-trtb.webp'),
  clinicianCount: 564,
};

const DEMOGRAPHIC_TABS = {
  current: { label: 'Toddlers', ageLine: 'This Product is For Toddlers Ages <strong>2 - 3</strong>' },
  others: [
    { label: 'Kids', sublabel: 'Ages 4 - 12', url: '/products/kids-belly-biotic' },
    { label: 'Teens', sublabel: 'Ages 13 - 17', url: '/products/teens-gut-sustainer' },
  ],
  crosslinkAge: 'This Product is For Toddlers Ages <b>2 - 3</b>',
};

const BENEFIT_INTRO_HTML = '<div class="metafield-rich_text_field"><p>Potty problems aren’t just a training issue, they’re often a gut issue. Helping your toddler’s gut grow healthy, strong, and balanced is one of the best things you can do for their digestion, behavior, immunity, and confidence.<br><br><strong>Flavor: Golden Kiwi</strong></p></div>';

// Buy box: same convention as Kids' Magnesium (list price $49, 30% off monthly and one-time with code BUNDLEBUILDER, tile "Save $X" = 40% of the list price on Monthly and 30% on
// One-Time). Live today: the button always says "Add To Cart & View Gift", but there is NO gift line and the subtotal does not count the gift (Kids' Magnesium replica
// still shows the Oct 14 gift line); minRetail: 75 would bring that behaviour back.
const KIDS_BUY_BOX = KIDS_PDP_LEGACY.BUY_BOX;
const BUY_BOX = {
  ...KIDS_BUY_BOX,
  buttonText: 'Add To Cart & View Gift',
  gift: { ...KIDS_BUY_BOX.gift, minRetail: Infinity },
  options: [
    { ...KIDS_BUY_BOX.options[0], compare: 49, price: 34.3, perBottleSave: 19.6, badgeHtml: 'Guaranteed<strong> Lowest Price!</strong>', badgeColor: '#776CB1' },
    { ...KIDS_BUY_BOX.options[1], compare: 49, price: 34.3, perBottleSave: 14.7 },
  ],
};

const MAIN_ACCORDIONS = [
  { icon: 'apple', heading: 'Ingredients', html: `<div class="metafield-rich_text_field">${ING.html}</div>` },
  { icon: 'clipboard', heading: 'Supplement Facts', image: { src: shopImg('ingredients-trtb.webp'), alt: 'Supplement Facts', width: 900, height: 900 } },
  { icon: 'return', heading: 'Subscription Details', html: '<div class="metafield-rich_text_field"><p>Receive our eco-friendly refill pouches every 30 days on a physician-recommended schedule.<br><br>Plus, you\'ll receive these benefits:</p><ul><li>Savings every single month.</li><li>Free shipping on your first order.</li><li>Easy management - skip or pause whenever you need.</li><li>VIP access to sales, gifts, early access &amp; more.</li><li>Cancel anytime.</li></ul></div>' },
];

// Judge.me block (the live widget also has a "Review for" product card per review, but it is display:none on the page, so it is not mirrored)
const JUDGEME = {
  average: 4.75,
  count: 256,
  summary: 'Customers praised this gummy probiotic for delivering impressive digestive health results. One parent reported their daughter is now "off all prescription medications" after struggling with constipation. Kids love the "delicious" taste and eagerly take them daily. Parents appreciate the easy administration and effectiveness.',
  highlights: [
    '“Off all prescription medications, able to pass stool regularly without any pain!”',
    '“She LOVES these and would eat more than two if she could!”',
    '“They are delicious. Really easy to take daily.”',
  ],
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
  PDP_PRODUCT, DEMOGRAPHIC_TABS, BENEFIT_INTRO_HTML, BUY_BOX, MAIN_ACCORDIONS, JUDGEME,
  INGREDIENTS_HTML: ING.html,
  BENEFIT_ITEMS: false, // live renders no (empty) .pdp-benefit-accordion-stats__items div here
  QUANT_WIDGET_HTML: quantWidgetHtml,
  priceSummary: makePriceSummary(BUY_BOX, PDP_PRODUCT),
};

// Sections under the main one. Same template as Kids' Magnesium; only the metafield-driven content changes. The live page does not render review_cards_rgiawV,
// custom_liquid_aiATrm, rich_text_rRwKiA (and no FrontRowMD "Clinician Reviews" widget: the section is empty for this product).
const DROP = ['review_cards_rgiawV', 'custom_liquid_aiATrm', 'rich_text_rRwKiA', 'frontrowmd_clinicians_reviews_FNwGAN'];
const SECTIONS = overrideSections(PDP_LEGACY_SECTIONS, DROP, {
  image_with_text_6Q3NK6: imageWithText({
    image: '5398cea2-05ca-4288-9924-7c95d1deb84b.avif', alt: '', heading: "Your Toddler Can't Poop, We Can Help",
    text: '<div class="metafield-rich_text_field"><p>Many toddler\'s constipation &amp; bathroom accidents are caused by poor gut health. Our 3-in-1 combination of prebiotics, postbiotics, and probiotics can help making pooping easy and natural.</p></div>',
  }),
  'c321e181-639c-4980-9b70-3f399c6c3e96': richText({
    heading: "The Truth About Why Today's Toddlers Struggle In The Bathroom",
    text: '<div class="metafield-rich_text_field"><p>Your child’s constipation isn’t just about their diet. It’s often the result of an imbalanced gut microbiome that lacks the prebiotics, probiotics, and postbiotics needed to support healthy, comfortable digestion.</p></div>',
  }),
  '05081b91-f5a2-42de-8aa2-42cac5756c94': imageWithText({
    image: '6_dcab81b5-2b73-4f1a-ac77-6fc56a8f2dd6.png', alt: 'First Day pre+post probiotic package on a bathroom shelf with towels and a rubber duck.', heading: 'Softer, Easier To Pass Stools',
    text: '<p></p><div class="metafield-rich_text_field"><p>Constipation in toddlers often becomes a cycle where hard, painful stools lead to withholding, causing stool to build up and softer stool to leak around it, resulting in messy accidents. Supporting a healthier gut can help soften stools, reduce discomfort, and break the constipation cycle over time.</p></div><p></p>',
  }),
  '2e1dde27-b7de-463d-b1e5-6b4fddf0520f': imageWithText({
    image: '7_352cdc12-6973-4bf6-b201-7df3c284dd88.png', alt: "Baby essentials including a bag with toys, a sippy cup, and a 'first day' probiotic package on a wooden surface.", heading: 'Combined 3-in-1 Solution',
    text: '<div class="metafield-rich_text_field"><p>Toddlers’ digestive systems are still developing, and their gut bacteria can easily become imbalanced, contributing to irregular or uncomfortable stools. Our 3-in-1 Pre+ Post+ Probiotic supports the gut in multiple ways, adding beneficial bacteria, feeding those bacteria, and providing calming compounds they produce. Together, this comprehensive support helps promote gentler digestion, better stool consistency, and more regular bowel habits.</p></div>',
  }),
  '9bb086b7-8e0b-4a49-8b79-f40e6c083942': imageWithText({
    image: '8_b9ccb8f2-51d7-40a3-befc-ac07beb9d3c0.png', alt: 'First Day pre + post probiotic package with strawberries and blueberries on a table.', heading: 'Safe For Daily Use',
    text: '<div class="metafield-rich_text_field"><p>Many parents turn to laxatives when their toddler is uncomfortable or backed up because they want fast relief. While laxatives can help short term, a yummy daily gummy designed for long-term gut support can be a gentler option that works with the digestive system instead of forcing a bowel movement. Over time, this kind of routine support may help promote more regular, comfortable stools without daily battles or stress.</p></div>',
  }),
  image_with_text_iUBfca: imageWithText({
    image: '59709d9b-f1e5-4859-b056-0a4e0afa1c37.avif', alt: '', heading: 'Benefits Of Taking Toddler Vitamins Daily',
    text: '<div class="metafield-rich_text_field"><p>93% of young kids don\'t eat enough vegetables. Filling in the gaps better supports...*</p><ul><li>Healthy Growth and development<br> </li><li>Brain Function<br> </li><li>Immunity Support<br> </li><li>Emotional Development</li></ul></div>',
  }),
  image_with_text_yraceP: toddlersComparison,
  '1668ba59-402b-43aa-82e4-477c210704cd': guaranteeSection,
  'cbd9ad2b-f52f-4a45-9c26-7fd50e23bd41': faqSection({ heading: "Toddlers' 3-in-1 Pre, Post, Probiotics FAQs", ingredientsHtml: ING.html }),
});

export const TODDLERS_PROBIOTIC_PAGE = { ...KIDS_LEGACY_PAGE, main, SECTIONS };

import { KIDS_NEW_PAGE } from './defaults.js';
import { KIDS_PDP_NEW } from '../../lib/pdpData.jsx';
import { shopImg, extImg } from '../../lib/assets.js';
import { INGREDIENTS } from '../ingredients.js';
import frontrowQuant4198 from './frontrowQuant4198.html?raw';

// /products/the-no-junk-toddlers-multivitamin (new PDP, product.uniified-default-v2). Starts as the Kids' Multi page; every section that is different on the live
// page is overridden here (captured read-only from firstday.com). Sections identical to Kids (jump nav, brand narrative, quality criteria texts, trust, rich texts,
// temp hero, custom liquid) are not repeated. Pricing follows the Kids replica convention (30% off monthly, $39 list), not the live promo price.
const HANDLE = 'the-no-junk-toddlers-multivitamin';
const TITLE = 'The "No Junk"™ Toddlers\' Multi';
const G = (file, alt) => ({ src: shopImg(file), alt });
const RTF = (html) => `<div class="metafield-rich_text_field">${html}</div>`;

// ---------- main section ----------
const PRODUCT = {
  ...KIDS_PDP_NEW.PRODUCT,
  handle: HANDLE,
  title: TITLE,
  vanityTitle: 'Yummy Gummies For [Supported Growth & Development]', // metafield custom.pdp_vanity_title: [..] = highlight
  variantId: 41869557334114,
  reviewsLabel: '5174 reviews',
  rating: 4.72,
  reviewCount: 5174,
  // media: first slide = metafield pdp_override_first_carousel_media (toddler-clean-label-badge.jpg), then product.images (minus the default featured image)
  images: [
    G('toddler-clean-label-badge.jpg', TITLE),
    G('trmv_3_-_Gummies_Nutrients_-_Toddlers_Multi_result.webp', 'Promotional graphic for two types of gummy candies: a red star-shaped gummy and an orange flower-shaped gummy. The graphic features text detailing the benefits of various vitamins (A, C, D3, K2, B vitamins) and highlights the natural orange and strawberry flavors with illustrations of an orange slice and a strawberry at the bottom.'),
    G('trmv_4_-_Ingredients_-_Toddlers_Multi_result.webp', "An infographic-style product image on a light blue background with the headline 'Designed to support growing toddlers*' and four rounded text panels listing nutrient claims: more folate than 1/2 cup of spinach, more Vitamin B1 than 3 cups of broccoli, more Vitamin D than 200 mushrooms, and more Vitamin B12 than 1/2 cup of milk. Small broccoli, carrot, and leaf graphics appear along the bottom right."),
    G('ingredients-trmv.webp', 'A product information graphic for Todders Multivitamin showing the Supplement Facts label, ingredient list, and feature callouts on a light blue background. The graphic includes a labeled supplement facts panel, a purectar award badge, and text stating it is made with premium global ingredients, vegan, non-GMO, and gluten-free.'),
    G('trmv_6_-_Benefits_-_Toddlers_Multi_result.webp', 'An informational marketing graphic with a photo of a toddler being fed on the left and large text and three benefit callouts on the right about toddlers not getting all nutrients from food alone, including daily nutrition support, brain & development support, and immunity support.'),
    G('trmv_7_-_Why_First_Day_-_Toddlers_Multi_result.webp', 'A promotional comparison graphic for First Day gummies, showing a product box and bottle at the top and a feature checklist below. The graphic highlights benefits such as organic fruits and veggies blend, modern science-based formulation, yummy gummies, no artificial sweeteners or dyes, and only 2g of sugar, comparing First Day favorably to others.'),
    G('trmv_8_-_Social_Proof_-_Toddlers_Multi_result.webp', "Promotional graphic for First Day Vitamin Mules featuring multiple lifestyle photos of children and parents holding the product, with large text stating 'Trusted by over 1,000,000+ parents!' and '97% of customers prefer First Day over other vitamin brands.'."),
    G('trmv_9_-_Nutrition_-_Toddlers_Multi_result.webp', "A blue tub labeled 'TODDLERS' SUPERFOOD MULTI' with floating fruit and vegetable illustrations and marketing text on a light blue background. Visible text includes 'REAL WHOLESOME Nutrition Never Tasted So Good' and product claims about bright, fruity gummies and high-quality ingredients."),
    G('trmv_2_-_Lifestyle_Image_-_Toddlers_Multi_result.webp', "A styled flat-lay of baby and toddler products on a white background, featuring a container of First Day Toddlers 'The Multi' dietary supplement, a bottle of Gentle Wash soap, a wooden baby brush, a ring stack toy, a pacifier, and a dinosaur teether."),
    G('trmv_10_-_Back_Panel_-_Toddlers_Multi_result.webp', 'The back of a dietary supplement bottle showing the Supplement Facts label, with a blue and green camouflage-patterned base on a white background.'),
  ],
};

const DEMOGRAPHIC_TABS = {
  ariaLabel: 'Shop by family member',
  items: [
    { label: "Toddlers'", sub: 'Ages 2 - 3', href: `/products/${HANDLE}`, current: true },
    { label: 'Kids', sub: 'Ages 4 - 12', href: '/products/kids-enrichment-vitamin' },
    { label: 'Teens', sub: 'Ages 13 - 17', href: '/products/teens-kickstart-vitamin' },
  ],
  banner: { prefix: 'This Product is For Toddlers Ages ', ages: '2 - 3' },
};

// benefit_accordion_stats block (metafield custom.benefit_accordian): same settings and icons as Kids, other intro and texts
const KIDS_ACC = KIDS_PDP_NEW.BENEFIT_ACCORDION;
const BENEFIT_ACCORDION = {
  ...KIDS_ACC,
  intro: '<p>Worried about your toddler’s eating habits? Meet the toddler multivitamin that’s giving little ones a nutrition boost! Made with 10 nutrients and a blend of 21 organic superfoods in a formula designed just for 2 &amp; 3 year olds.<br> <br> <strong>Flavor: Strawberry &amp; Orange</strong></p><p></p>',
  items: [
    { ...KIDS_ACC.items[0] },
    { ...KIDS_ACC.items[1], heading: 'Improved Behavior', text: "<p>of customers say First Day vitamins support their child's overall mood &amp; behavior.† </p>" },
    { ...KIDS_ACC.items[2], heading: 'Better Sleep Routines' },
  ],
};

const INGREDIENTS_HTML = RTF(INGREDIENTS[HANDLE].html);
const COLLAPSIBLE_TABS = [
  { icon: 'apple', heading: 'Ingredients', html: INGREDIENTS_HTML },
  { ...KIDS_PDP_NEW.COLLAPSIBLE_TABS[1], image: { src: shopImg('ingredients-trmv.webp'), alt: 'Supplement Facts', width: 900, height: 900 } },
  KIDS_PDP_NEW.COLLAPSIBLE_TABS[2],
];

const CROSSLINKS = {
  age: { prefix: 'This Product is For Toddlers Ages ', ages: '2 - 3' },
  cards: [
    { title: 'Kids', subtitle: 'Ages 4 - 12', href: '/products/kids-enrichment-vitamin' },
    { title: 'Teens', subtitle: 'Ages 13 - 17', href: '/products/teens-kickstart-vitamin' },
  ],
};

const main = {
  ...KIDS_PDP_NEW, PRODUCT, DEMOGRAPHIC_TABS, BENEFIT_ACCORDION, COLLAPSIBLE_TABS, CROSSLINKS,
  FRONTROW_BADGE: { html: frontrowQuant4198 }, // iframe document of the "Clinicians' Choice" widget (product 4198), captured read-only
};

// ---------- fd_brand_narrative_AzFhNn: same texts, but the live theme now renders the media at 420x420 (the Kids default still has the older 380x320) ----------
const BRAND_NARRATIVE = {
  ...KIDS_NEW_PAGE.BRAND_NARRATIVE,
  settings: { ...KIDS_NEW_PAGE.BRAND_NARRATIVE.settings, media_width: 420, media_height: 420 },
};

// ---------- fd_problem_signs_aLMBHN ----------
// image = poster, video = mp4 (literal paths so that `npm run assets:fetch` finds them)
const psCard = (n, image, video, s) => ({
  id: `fd_problem_sign_card_${n}`,
  type: 'fd-problem-sign-card',
  settings: { image, video, show_number: true, fact_label: '💡 Did You Know?', ...s },
});
const KIDS_PS = KIDS_NEW_PAGE.PROBLEM_SIGNS;
const PROBLEM_SIGNS = {
  ...KIDS_PS,
  settings: {
    ...KIDS_PS.settings,
    heading: '3 Signs Your Toddler Could Be Off Track Developmentally. [See Results in Just a Few Weeks.]',
    cta_text: "Don't Let Your Toddler Fall Behind",
  },
  blocks: [
    psCard(1, extImg('firstday.com/cdn/shop/files/preview_images/33324e69bd5841c583e62bccd1015234.thumbnail.0000000000.jpg'), extImg('firstday.com/cdn/shop/videos/c/vp/33324e69bd5841c583e62bccd1015234/33324e69bd5841c583e62bccd1015234.HD-1080p-7.2Mbps-91054182.mp4'), {
      title: "Their Words Aren't Coming ",
      description: RTF('<p>Speech and language delays often trace back to a <strong>folate</strong> gap, one of the most common nutrient deficiencies..</p>'),
      fact_text: RTF('<p>Up to <strong>40% of toddlers carry a gene variant</strong> that makes synthetic folic acid nearly impossible for their body to use. First Day uses methylfolate instead — an active form bodies can actually absorb.</p>'),
    }),
    psCard(2, extImg('firstday.com/cdn/shop/files/preview_images/d78d3c51888a43c0a6fb96a78cd8cd79.thumbnail.0000000000.jpg'), extImg('firstday.com/cdn/shop/videos/c/vp/d78d3c51888a43c0a6fb96a78cd8cd79/d78d3c51888a43c0a6fb96a78cd8cd79.HD-720p-4.5Mbps-90957197.mp4'), {
      title: 'They Constantly Meltdown',
      description: RTF('<p>Mood swings and irritability usually point to a <strong>B6</strong> deficiency.</p>'),
      fact_text: RTF('<p>Most brands push B6 <strong>past 100% daily value</strong>. First Day doses it to what a growing body needs, enough to support the serotonin and dopamine behind mood.</p>'),
    }),
    psCard(3, extImg('firstday.com/cdn/shop/files/preview_images/50529b8875b9445da0d2ea32cc72686d.thumbnail.0000000000.jpg'), extImg('firstday.com/cdn/shop/videos/c/vp/50529b8875b9445da0d2ea32cc72686d/50529b8875b9445da0d2ea32cc72686d.HD-1080p-7.2Mbps-91054240.mp4'), {
      title: "They're Behind Milestones",
      description: RTF('<p>Growth and developmental milestones <strong>depend on a foundation </strong>most toddler vitamins skip entirely.</p>'),
      fact_text: RTF("<p>Bone and physical development at this age needs Vitamin D3 and K2 working together. First Day pairs them intentionally — because at this stage, <strong>half the equation isn't enough.</strong></p>"),
    }),
  ],
};

// ---------- pdp_v2_two_up (zBFdcp dosage, 6WdHLX root causes, 9kHJJe formula) ----------
const TWO_UP_DOSAGE = {
  ...KIDS_NEW_PAGE.TWO_UP_DOSAGE,
  settings: {
    ...KIDS_NEW_PAGE.TWO_UP_DOSAGE.settings,
    media_width_desktop: 499, media_height_desktop: 500, // live theme values (the Kids default still has the older 616x348)
    heading: 'Most Vitamins Give A 2-Year-Old A 17-Year-Old Dose. [It’s not just lazy, it’s dangerous. ]',
    body: RTF("<p><strong>Here's something most parents don't know:</strong>  The FDA uses the same nutritional research for a 2-year-old and a 45-year-old, and that is based on 50-year old science.   Take vitamin B6, for example. The Daily Value is 1.7mg, even though a 2-year-old actually needs closer to 0.6mg. Over time, high intakes of vitamin B6 have been linked to neuropathy—a reminder that<strong> vitamins should be dosed specifically.</strong>  <br>\n<br>\nA toddler's body isn't a smaller version of an older kid's. It needs its own dose, calibrated to what a <strong>toddler-sized,</strong> still-forming system can actually handle — not scaled down from someone else's number.</p>"),
  },
};
const TWO_UP_ROOT_CAUSES = {
  ...KIDS_NEW_PAGE.TWO_UP_ROOT_CAUSES,
  settings: {
    ...KIDS_NEW_PAGE.TWO_UP_ROOT_CAUSES.settings,
    image: shopImg('Toddlersiceberg.png'),
    body: RTF("<p><strong>Tantrums. Speech delays. Missed milestones. </strong>They point to real deficiencies — but most brands only treat the symptom, never where it comes from. <br>\n<br>\nThe food you're offering your toddler isn't delivering what it used to.<strong> Fresh produce has lost up to 73% of its nutrients over the past 50 years, </strong>and microplastics and heavy metals make it even harder for a developing brain to get what it needs. <br>\n<br>\nThat's why First Day formulates for both sides of the problem: what's missing inside your toddler's body, and what's working against them outside it. <strong>We call it Bio-Matched.</strong></p>"),
  },
};
const TWO_UP_FORMULA = {
  ...KIDS_NEW_PAGE.TWO_UP_FORMULA,
  settings: {
    ...KIDS_NEW_PAGE.TWO_UP_FORMULA.settings,
    heading: "93% Of toddlers Don't Get Enough Nutrients. [So We Invented A New Formula That Addresses Their Biggest Gaps.]",
  },
};

// ---------- pdp_v2_quality_criterias_R4nT8p: same cards, other "First Day" column image ----------
const QUALITY_CRITERIAS = {
  ...KIDS_NEW_PAGE.QUALITY_CRITERIAS,
  blocks: KIDS_NEW_PAGE.QUALITY_CRITERIAS.blocks.map((b) => ({ ...b, settings: { ...b.settings, advantage_image: shopImg('trmv_wrap.webp') } })),
};

// ---------- pdp_v2_dosed_formula_K8mQ2n ----------
const KIDS_DOSED = KIDS_NEW_PAGE.DOSED_FORMULA;
// focal = the image focal point of the file (object-position of the thumbnail)
const dosedCard = (image, name, body, focal) => ({ image: `shopify://shop_images/${image}`, name, body, focal });
const DOSED_FORMULA = {
  ...KIDS_DOSED,
  settings: {
    ...KIDS_DOSED.settings,
    title: '21 Superfoods And 10 Essential Vitamins In [1 Powerful Formula Dosed Specifically For Toddlers]',
    subtext: RTF('<p>First Day starts with what real toddlers actually need. Then we match every nutrient to the <strong>right form</strong> and <strong>precise dosage</strong> for their adolescent bodies. Nothing extra. Nothing missing.</p>'),
    dose_label_center: 'Clinically Dosaged For toddlers',
  },
  // marquee order on this product: Vegan before Clean Label Certified, Research Backed before Non GMO
  blocks: [
    ['refillable.svg', 'Refillable Packaging'], ['gluten-free.svg', 'Gluten Free'], ['vegan_2c61bc64-e7e9-443e-8ab6-580fc1a40635.svg', 'Vegan'], ['g12.svg', 'Clean Label Certified'],
    ['research-backed.svg', 'Research Backed'], ['non-gmo_c24fb784-5d80-4fc6-8dc9-532da81a018d.svg', 'Non GMO'], ['non-gmo_c24fb784-5d80-4fc6-8dc9-532da81a018d.svg', 'No Fillers or Fake Ingredients'],
  ].map(([icon, text], i) => ({ id: `benefit_${i}`, type: 'benefit', settings: { icon: `shopify://shop_images/${icon}`, text } })),
  cards: [
    dosedCard('Ellipse_18.png', 'Vitamin A', 'Supports vision, immunity and healthy growth.', '49.121% 98.926%'),
    dosedCard('eggs.png', 'Choline', 'Supports brain and nervous system development.', '0.475% 15.387%'),
    dosedCard('bb7f3043-3ca7-423d-a59d-ea92ea996f1b.png', 'Vitamin C', 'Supports immune health and overall development.'),
    dosedCard('mushrooms.png', 'Vitamin D3', 'Supports bone development, immunity, and mood balance.', '20.508% 57.52%'),
    dosedCard('oats_grains.png', 'Vitamin B1', 'Supports energy production and healthy nervous system.', '20.508% 71.973%'),
    dosedCard('spinach.png', 'Vitamin B2', 'Supports growth and energy metabolism.', '25.684% 71.973%'),
    dosedCard('avocado.png', 'Vitamin B6', 'Supports brain development and mood regulation.', '21.387% 71.973%'),
    dosedCard('kale.png', 'Folate (B9)', 'Supports cell growth and DNA synthesis.', '25.977% 68.652%'),
    dosedCard('cheese.png', 'Vitamin B12', 'Supports red blood cell formation and brain development.', '38.281% 83.105%'),
    dosedCard('Untitled_design_47.png', 'Vitamin K2', 'Supports bone development and proper calcium use.', '16.016% 64.258%'),
  ],
};

// ---------- pdp_v2_hero_qw3EWc ----------
const KIDS_HERO = KIDS_NEW_PAGE.PDP_V2_HERO;
const PDP_V2_HERO = {
  ...KIDS_HERO,
  blocks: KIDS_HERO.blocks.map((b) => (b.id === 'fd_rich_text_JKPXDk'
    ? { ...b, settings: { ...b.settings, content: '<p>The Focus Gaps Unaddressed in Early Years Become the <strong>Grades That Slip in School</strong></p>' } }
    : b)),
  settings: {
    ...KIDS_HERO.settings,
    background_image_desktop: shopImg('before-problems-toddlers-multi-desktop.png'),
    background_image_mobile: shopImg('before-problems-toddlers-multi-mobile.png'),
  },
};

// ---------- collapsible cbd9ad2b (FAQ): only the first row (ingredients metafield) differs ----------
const KIDS_COLLAPSIBLE = KIDS_NEW_PAGE.COLLAPSIBLE;
const COLLAPSIBLE = {
  ...KIDS_COLLAPSIBLE,
  blocks: KIDS_COLLAPSIBLE.blocks.map((b, i) => (i === 0 ? { ...b, settings: { ...b.settings, row_content: INGREDIENTS_HTML } } : b)),
};

// ---------- apps 1686676858452369a6: Judge.me widget of the product (the live widget hides the "Review for" product card, so it is not captured) ----------
const JUDGEME_REVIEWS = {
  average: 4.72,
  count: '5,174',
  summary: 'Toddler multivitamin gummies with clean ingredients and organic superfoods. Customers said "my kids love them" and praised the taste and nutrition. Most children eagerly take them daily. Some concerns: price ($38+ monthly), taste rejection by few kids, non-child-resistant lid, subscription cancellation issues, and shipping delays.',
  highlights: [
    '“My 3 year old loves this and I think she grew 2 inches since starting to take them!”',
    '“packed with tons of supplements and vitamins that help them feel their best!”',
    '“This vitamin has truly been life changing for us and helped our sweet girl”',
  ],
  reviews: [
    { rating: 5, name: 'Brittney Ferguson', date: '11/08/2026', title: 'First day is great!', body: 'First day is great! I have noticed a change in my son and he thinks they taste good.' },
    { rating: 5, name: 'Anonymous', date: '11/08/2026', title: 'I love them , my daughter eats better and in a', body: 'I love them , my daughter eats better and in a better mood' },
    { rating: 5, name: 'Brynne', date: '11/07/2026', title: 'My son has been using first day kids multi for', body: 'My son has been using first day kids multi for over a year and I believe it’s been very beneficial for him. He’s been so healthy and it helps fill his nutritional gaps. I will continue to buy this for him since we’ve seen great results!!' },
    { rating: 5, name: 'ANNE A.', date: '11/07/2026', title: 'My daughter loves the taste!', body: "My daughter loves it and reminds us if she hasn't taken it yet. I know she is getting the vitamins she needs as she is a picky eater and doesn't always get what she needs from food." },
    { rating: 5, name: 'Shannah Simington', date: '11/06/2026', title: 'My kids have been using these multivitamins for', body: 'My kids have been using these multivitamins for well over a year. They enjoy the taste and I feel the are beneficial to their health.' },
  ],
};
const APPS = { ...KIDS_NEW_PAGE.APPS, productTitle: TITLE, reviews: JUDGEME_REVIEWS };

export const TODDLERS_MULTI_PAGE = {
  ...KIDS_NEW_PAGE,
  main, BRAND_NARRATIVE, PROBLEM_SIGNS, TWO_UP_DOSAGE, TWO_UP_ROOT_CAUSES, TWO_UP_FORMULA, DOSED_FORMULA, QUALITY_CRITERIAS, PDP_V2_HERO, COLLAPSIBLE, APPS,
  FRONTROWMD: null, // the live section renders nothing for this product (no qual widget iframe): the "Independent Clinician Evaluations" block is absent
};

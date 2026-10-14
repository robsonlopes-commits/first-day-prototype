// Mock data for /pages/bundle-builder-v2 (templates/page.lp-bundle-v2.json). Captured from https://firstday.com/pages/bundle-builder-v2 (14 Oct 2026):
//   - QUIZ_SETTINGS  = the fd-quiz-buy-box section settings of the template (copy, colours, CTA)
//   - CONCERNS / BUNDLES / CATALOG / GIFTS = the page's `data-fd-qbb-config` JSON (metaobjects quiz_concern / quiz_bundle, flattened)
//   - PRODUCT_INFO   = the product payloads (/products/<handle>.js) the "pack info" modal (FDInfoModal) fetches live
//   - REVIEWS        = first reviews of the Judge.me "all reviews" widget
// Prices are in cents. Images are file names in the shop CDN (shopImg).
import { shopImg } from '../lib/assets.js';

export const COUNTDOWN = { title: '🔥 Special Offer 🔥', subtitle: 'Up To 62% With Free Gifts' };

// ---- section settings (templates/page.lp-bundle-v2.json -> quiz_buy_box.settings) ----
export const QUIZ_SETTINGS = {
  anchor_id: 'fd-quiz-buy-box',
  padding_top_desktop: 32, padding_right_desktop: 32, padding_bottom_desktop: 48, padding_left_desktop: 32,
  padding_top_mobile: 24, padding_right_mobile: 16, padding_bottom_mobile: 32, padding_left_mobile: 16,
  section_bg_color: '#ffffff', container_max_width_desktop: 1344,
  heading: 'Holistic Wellness For Kids',
  title_font_family: "'sofia-pro', sans-serif", title_font_size_desktop: 36, title_font_size_mobile: 28, title_font_weight: 700, title_font_color: '#2c3d50',
  stars_text: '4.8 stars | 1,000,000+ Families',
  promo_text: '<p>Order by <strong>{date}</strong> for guaranteed FREE gifts.</p>',
  question: 'Which of these sounds like your kid?',
  question_lede: "Select all that apply. We'll build the pack around it.",
  question_font_family: "'sofia-pro', sans-serif", question_font_size_desktop: 26, question_font_size_mobile: 22, question_font_weight: 700, question_font_color: '#2c3d50',
  empty_hint: 'Pick at least one to continue.',
  continue_label: 'See My Recommendation',
  back_label: 'Change my answers',
  results_heading: "Here's what we recommend based on your answers",
  price_suffix: 'per bottle',
  miss_template: "You're missing out on {gift}. Get the {pack}.",
  renew_template: 'Renews every 4 weeks for {price}',
  gifts_status_template: '{n}/{total} free gifts',
  add_label: 'Add My Pack',
  meet_heading: 'Meet the products',
  meet_count_template: '{n} of {total} in your pack',
  in_pack_badge: 'In your pack',
  learn_more_label: 'Learn more',
  info_button_label: "What's in the {pack}",
  choose_pack_label: 'Choose the {pack}',
  price_plan_label: 'per bottle, delivered monthly',
  status_guarantee_text: '100% Money Back Guarantee',
  claim_text: '<p><strong>Less than 1%</strong> of First Day customers claim our Money-Back Guarantee!</p>',
  cta_bg_color: '#476ded', cta_font_color: '#ffffff', cta_font_family: "'sofia-pro', sans-serif",
  cta_font_size_desktop: 24, cta_font_size_mobile: 20, cta_font_weight: 400, cta_height: 64, cta_radius: 100,
  benefits_heading: 'First Day Subscription Benefits',
  benefit_1: 'Special discounts & early product access!',
  benefit_2: 'Renews every 4 weeks. Delay or cancel anytime.',
  benefit_3: 'Adjust your delivery frequency as needed in your account.',
  show_otp: true, otp_label: 'One-Time Purchase',
  otp_note: "We recommend a subscription so that you can experience a variety of First Day's clinician recommended products.",
  after_add: 'drawer',
};

// gallery_image blocks (17), left column carousel
export const QUIZ_GALLERY = [
  'Gemini_Generated_Image_plfnv8plfnv8plfn.jpg', '0fd459772147e948ade55694b22086a0f35aeb8c.webp', 'c4a52e4012513a60cddebca55cffdd5fb007cfb8.webp',
  'fa8db815cf106d47a832b64bef0c78beb778b0a0.webp', 'kdbf_2_-_Lifestyle_Image_-_Kids_Brain_Support_result.webp', 'kdbf_5_-_Benefits_-_Kids_Brain_Support_result.webp',
  'kdbf_6_-_Nutrition_-_Kids_Brain_Support_result.webp', 'kids-magnesium-bottle-2-gummies.jpg', 'kcm_10_-_Benefits_-_Kids_Magnesium_result.webp',
  'kcm_5_-_Benefits_-_Kids_Magnesium_result.webp', '12_-_Lifestyle_Image_-_Kids_Tribiotics_result.webp', 'ktb_5_-_Benefits_-_Kids_Tribiotics_result.webp',
  'ktb_6_-_Nutrition_-_Kids_Tribiotics_result.webp', 'ingredients-kde.webp', 'ingredients-kde.webp', 'ingredients-kdbf.webp', 'ingredients-kcm.webp',
].map((f) => ({ src: shopImg(f), alt: '' }));

// ---- the four quiz products (catalog = the longest bundle product list; order = pack contents order) ----
const FILES = 'https://cdn.shopify.com/s/files/1/0028/0533/4131/files/';
const imgs = (...names) => names.map((n) => shopImg(n));
export const CATALOG = [
  {
    handle: 'kids-enrichment-vitamin', productId: 4526304198754, title: "Kids' Multivitamin", description: 'Support for mood, behavior & picky eating.',
    price: 3900, compareAtPrice: 3900, image: shopImg('2.webp'), quizImage: shopImg('download_fbfd0948-02e9-4a1b-99ce-e11f7271c9a6.webp'),
    quizOutcome: 'steadier mood', quizRole: 'fills the everyday nutrient gaps that show up as mood swings and fussy eating', tabLabel: 'Multi',
  },
  {
    handle: 'kids-calming-magnesium', productId: 7394315763810, title: "Kids' Magnesium", description: 'Melatonin-free support for relaxation & sleep.',
    price: 3900, compareAtPrice: 3900, image: shopImg('1_19d423ed-4f0d-496c-9a77-d89110e2a119.png'), quizImage: shopImg('img3.webp'),
    quizOutcome: 'calmer evenings', quizRole: 'winds the nervous system down so bedtime stops being a fight', tabLabel: 'Magnesium',
  },
  {
    handle: 'kids-daily-focus-brain-support-copy', productId: 7785339584610, title: "Kids' Brain Support", description: 'Support for focus, learning, and behavior.',
    price: 3900, compareAtPrice: 3900, image: shopImg('Kids_Brain_Support.png'), quizImage: shopImg('img1.webp'), quizOutcome: '', quizRole: '', tabLabel: 'Brain',
  },
  {
    handle: 'kids-3-in-1-probiotic', productId: 7785337946210, title: "Kids' Probiotic+", description: 'To support immunity, digestion, and oral health.',
    price: 3900, compareAtPrice: 4900, image: shopImg('4.webp'), quizImage: shopImg('img2.webp'), quizOutcome: '', quizRole: '', tabLabel: 'Probiotic+',
  },
];
const P = Object.fromEntries(CATALOG.map((p) => [p.handle, p]));
const MULTI = 'kids-enrichment-vitamin', MAG = 'kids-calming-magnesium', BRAIN = 'kids-daily-focus-brain-support-copy', PROB = 'kids-3-in-1-probiotic';

// ---- concerns (step 1 checkboxes). Rendered in this order (live DOM order). ----
// product = the product that answers the concern; partner = pulled in when the answers only map to ONE product.
export const CONCERNS = [
  { handle: 'tummy-digestion-issues', label: 'Tummy & digestion issues', emphasis: 'Tummy', emoji: '🦠', sortOrder: 6, phrase: 'tummy troubles', domain: 'Digestion', product: PROB, partnerProduct: MULTI },
  { handle: 'hyperactive-or-hard-to-calm-down', label: 'Hyperactive or hard to calm down', emphasis: 'Hyperactive', emoji: '⚡', sortOrder: 4, phrase: 'restlessness', domain: 'Calm', product: MAG, partnerProduct: MULTI },
  { handle: 'struggles-to-focus-or-pay-attention', label: 'Struggles to focus or pay attention', emphasis: ' focus', emoji: '🧠', sortOrder: 5, phrase: 'focus', domain: 'Focus', product: BRAIN, partnerProduct: MAG },
  { handle: 'hard-to-fall-asleep-at-night', label: 'Hard to fall asleep at night', emphasis: 'asleep', emoji: '🌙', sortOrder: 3, phrase: 'trouble sleeping', domain: 'Sleep', product: MAG, partnerProduct: MULTI },
  { handle: 'picky-eater-who-wont-touch-vegetables', label: 'Picky eater who won’t touch vegetables', emphasis: ' Picky eater', emoji: '🥦', sortOrder: 2, phrase: 'picky eating', domain: 'Nutrition', product: MULTI, partnerProduct: PROB },
  { handle: 'mood-swings-meltdowns', label: 'Mood swings & meltdowns', emphasis: 'Mood', emoji: '😠', sortOrder: 1, phrase: 'mood swings', domain: 'Mood', product: MULTI, partnerProduct: MAG },
];

// ---- gift ladder (union of every bundle's gifts, in unlock order) ----
export const GIFTS = {
  'free-shipping': { handle: 'free-shipping', displayName: 'Tracked Shipping', label: 'Tracked Shipping', price: '$5', badgeLabel: 'FREE', image: shopImg('gift-free-shipping-box-transparent.png') },
  'reusable-bottle': { handle: 'reusable-bottle', displayName: 'Reusable Bottle', label: 'Reusable Bottle', price: '$5', badgeLabel: 'FREE', image: shopImg('gift-reusable-bottle-fitted-smaller.png') },
  'travel-pod-gift': { handle: 'travel-pod-gift', displayName: 'Exclusive Travel Pod', label: 'Exclusive Travel Pod', price: '$10', badgeLabel: 'FREE', image: shopImg('gift-travel-pod-cutout.png') },
  'hydration-sticks-gift': { handle: 'hydration-sticks-gift', displayName: '10pk Hydration Drink Mix', label: '10pk Hydration Drink Mix', price: '$25', badgeLabel: 'FREE', image: shopImg('gift-hydration-cutout.png') },
};
const G = (...handles) => handles.map((h) => GIFTS[h]);
const ALL = [MULTI, MAG, BRAIN, PROB];

// ---- bundles (quiz_bundle metaobjects). sortOrder 1 = shown first (4 Pack, 3 Pack, 2 Pack, 1 Pack). ----
export const BUNDLES = [
  {
    handle: 'nutrition-essential-pack-1-pack', title: '1 Pack', subtitle: 'Nutrition Essential Pack',
    description: 'One thing to fix, one product doing it: fills the everyday nutrient gaps that show up as mood swings and fussy eating. That covers the picky eating you told us about. This pack includes our Kids’ Multivitamin.',
    badge: null, displayPrice: '$27.30', displayComparePrice: '$39.00', displayOtpPrice: '$39.00 / each', displaySavings: '$39.00', sortOrder: 4, giftUnlockCount: 1,
    giftBenefitInfo: 'Valued at $5, our gift to you',
    advantages: 'FREE shipping on first order • $5 worth of exclusive extras • Cancel anytime, no questions asked',
    flaws: "You're missing out on Reusable Bottle — try our 2 Pack for even better results", products: ALL, gifts: G('free-shipping'),
  },
  {
    handle: '2-pack', title: '2 Pack', subtitle: 'Nutrition + Digestion Pack — ',
    description: 'Steadier mood plus a settled stomach — the two reinforce each other, so sorting one out makes the other easier. That covers the picky eating you told us about. This pack includes our Kids’ Multivitamin and Kids’ Probiotic+.',
    badge: 'Recommended', displayPrice: '$24.57', displayComparePrice: '$39.00', displayOtpPrice: '$35.10 / each', displaySavings: '$28.86', sortOrder: 3, giftUnlockCount: 2,
    giftBenefitInfo: 'Valued at $10, our gift to you',
    advantages: 'FREE shipping on first order • $10 worth of exclusive extras • Cancel anytime, no questions asked',
    flaws: "You're missing out on Exclusive Travel Pod — try our 3 Pack for even better results", products: ALL, gifts: G('free-shipping', 'reusable-bottle'),
  },
  {
    handle: '3-pack', title: '3 Pack', subtitle: 'Nutrition + Digestion + Sleep Pack — ',
    description: 'Steadier mood, a settled stomach and calmer evenings — handled together instead of one symptom at a time, because the same daily gaps sit behind all of them. That covers the picky eating you told us about. This pack includes our Kids’ Multivitamin, Kids’ Probiotic+ and Kids’ Magnesium.',
    badge: null, displayPrice: '$21.84', displayComparePrice: '$39.00', displayOtpPrice: '$31.20 / each', displaySavings: '$51.48', sortOrder: 2, giftUnlockCount: 3,
    giftBenefitInfo: 'Valued at $20, our gift to you',
    advantages: 'FREE shipping on first order • $20 worth of exclusive extras • Cancel anytime, no questions asked',
    flaws: "You're missing out on Hydration Sticks Gift — try our 4 Pack for even better results", products: ALL, gifts: G('free-shipping', 'reusable-bottle', 'travel-pod-gift'),
  },
  {
    handle: '4-pack', title: '4 Pack', subtitle: 'Complete Kids Health Pack',
    description: 'Steadier mood, a settled stomach, calmer evenings and sharper focus — handled together instead of one symptom at a time, because the same daily gaps sit behind all of them. That covers the picky eating you told us about. This pack includes our Kids’ Multivitamin, Kids’ Probiotic+, Kids’ Magnesium and Kids’ Brain Support.',
    badge: 'Best deal', displayPrice: '$19.11', displayComparePrice: '$39', displayOtpPrice: '$27.30 / each', displaySavings: '$79.56', sortOrder: 1, giftUnlockCount: 4,
    giftBenefitInfo: 'Valued at $35, our gift to you',
    advantages: 'FREE shipping on first order • $35 worth of exclusive extras • Cancel anytime, no questions asked',
    flaws: '', products: ALL, gifts: G('free-shipping', 'reusable-bottle', 'travel-pod-gift', 'hydration-sticks-gift'),
  },
];

// ---- "pack info" / "Learn more" modal: what /products/<handle>.js returns (first 6 images, description) ----
export const PRODUCT_INFO = {
  [MULTI]: {
    price: 3900, compare: 0,
    description: '<p>Give your kids the nutrition they need to fight the effects of Hidden Hunger - with 21 organic superfoods &amp; just 2 delicious gummies a day!<br><br>Contains no fake sugars, no artificial colors, and no fillers. That’s why we call it the “No Junk”™ Multi!</p>',
    images: imgs('kids-multi.png', 'kde_3_-_Gummies_Nutrients_-_Kids_Multi_result.webp', 'ingredients-kde.webp', 'kde_6_-_Benefits_-_Kids_Multi_result.webp', 'kde_9_-_Nutrition_-_Kids_Multi_result.webp', 'kde-facts.webp'),
  },
  [MAG]: {
    price: 3900, compare: 3900,
    description: '<p>Tired of bedtime battles? Meet the magnesium gummy that’s giving kids restful sleep, calmer moods, and mind and body relaxation. Made with calming ingredients and no melatonin hormones in a delicious strawberry flavor.</p>',
    images: imgs('kids-mag.png', 'kcm_10_-_Benefits_-_Kids_Magnesium_result.webp', 'kcm_3_-_Benefits_-_Kids_Magnesium_result.webp', 'ingredients-kcm.webp', '4_-_Gummies_Nutrients_-_Kids_Magnesium.png', 'kcm_5_-_Benefits_-_Kids_Magnesium_result.webp'),
  },
  [BRAIN]: {
    price: 3900, compare: 0,
    description: '<p>Daily brain nutrition for children ages 4+. Supports focus, memory, learning, hyperactivity support, and brain energy with Cognizin™, sunflower Phosphatidylserine, and Vitamin B3 — in a peach gummy kids love.</p>',
    images: imgs('kdbf_1_-_Hero_Image_-_Kids_Brain_Support_-_Bottle_Gummies_Flavor-1_result.webp', 'kdbf_10_-_Social_Proof_-_Kids_Brain_Support_result.webp', 'kdbf_3_-_Benefits_-_Kids_Brain_Support_result.webp', 'kdbf_4_-_Gummies_Nutrients_-_Kids_Brain_Support_result.webp', 'kdbf_5_-_Benefits_-_Kids_Brain_Support_result.webp', 'kdbf_6_-_Nutrition_-_Kids_Brain_Support_result.webp'),
  },
  [PROB]: {
    price: 3900, compare: 4900,
    description: '<p>A unique 3-in-1 pre, post, and probiotic designed to promote gut health, support oral health, fortify immunity and improve overall wellness. 25 day supply of kiwi-flavored gummies for kids ages 4+.</p>',
    images: imgs('swap-kids-tribiotic.jpg', 'BenefitsList_1ac4fd90-9bbe-4a5e-b88e-727cdb15937c.jpg', 'Directionswithproduct-in-useimage_67ff7ac4-799e-41fe-bae1-a2d849725a10.jpg', 'Product3corefeatures_102b6f08-3d7d-4408-820f-4001c5b5b1ee.jpg', 'Socialmission_b8ae9fae-4b9c-4432-ac28-98897a4a4876.jpg', 'Testimonials_996fa6cd-824c-40ad-b438-42254f2b420f.jpg'),
  },
};

// ---- prototype state jumper presets: each = a full quiz state ----
// answers = concern handles ticked in step 1, step = 1|2, pack = chosen bundle (default = recommended), flags for the other sub-states.
const C = Object.fromEntries(CONCERNS.map((c) => [c.handle.split('-')[0], c.handle]));
export const QUIZ_STATES = [
  { key: 'step1-empty', label: '1 · Step 1: nothing picked (CTA disabled)', answers: [], step: 1 },
  { key: 'step1-one', label: '1 · Step 1: one concern ticked (CTA enabled)', answers: [C.hyperactive], step: 1 },
  { key: 'step1-all', label: '1 · Step 1: all six ticked', answers: CONCERNS.map((c) => c.handle), step: 1 },
  { key: 'step2-rec2', label: '2 · Step 2: 1 concern → 2 Pack recommended', answers: [C.hyperactive], step: 2 },
  { key: 'step2-rec3', label: '2 · Step 2: 3 concerns → 3 Pack recommended', answers: [C.mood, C.hard, C.tummy], step: 2 },
  { key: 'step2-rec4', label: '2 · Step 2: 4 products → 4 Pack recommended', answers: [C.mood, C.hard, C.tummy, C.struggles], step: 2 },
  { key: 'step2-pick1', label: '2 · Step 2: shopper picked the 1 Pack', answers: [C.hyperactive], step: 2, pack: 'nutrition-essential-pack-1-pack' },
  { key: 'step2-pick4', label: '2 · Step 2: shopper picked the 4 Pack (all gifts)', answers: [C.hyperactive], step: 2, pack: '4-pack' },
  { key: 'step2-meet', label: '2 · Step 2: "Meet the products" open', answers: [C.hyperactive], step: 2, meetOpen: true },
  { key: 'step2-adding', label: '2 · Step 2: adding to cart (busy)', answers: [C.hyperactive], step: 2, busy: true },
  { key: 'step2-otp', label: '2 · Step 2: one-time purchase mode', answers: [C.hyperactive], step: 2, subscribe: false },
  { key: 'modal-pack', label: '3 · Pack info modal (tabs + choose button)', answers: [C.hyperactive], step: 2, modal: { type: 'pack', bundle: '2-pack' } },
  { key: 'modal-product', label: '3 · "Learn more" product modal (no tabs)', answers: [C.hyperactive], step: 2, meetOpen: true, modal: { type: 'product', handle: BRAIN } },
];

// ---- Judge.me "all reviews" widget (legacy jdgm markup), first ten reviews ----
const REV_PROD = {
  mag: ['Kids’ Nighttime Reset Magnesium - Limited Edition Kiwi Flavor', 'magnesium-kiwi-pouch.png?v=1784576112'],
  prob: ["First Day - Kids' 3-in-1 Pre+ Post+ Probiotic", 'kids-prob_4b7651d5-86e6-4eb3-8d96-e6d26e57c0e4.png?v=1791551940'],
  multiRefill: ['The "No Junk"™ Kids’ Multi - Refill Pouch', ''],
  women: ["Women's Daily Focus Brain Support", ''],
  probRefill: ["Kids' 3-in-1 Pre+ Post+ Probiotic Pouch Refills", ''],
  teens: ['The "No Junk"™ Teens’ Multi', ''],
};
const rv = (k, date, author, title, body) => ({ product: REV_PROD[k][0], pic: REV_PROD[k][1] ? FILES + REV_PROD[k][1] : '', rating: 5, date, author, title, body });
export const REVIEWS = {
  average: 4.72, count: 11524, productCount: 10984, shopCount: 540,
  histogram: [[5, 9991, 87], [4, 740, 6], [3, 249, 2], [2, 141, 1], [1, 407, 4]], // [stars, reviews, % bar width]
  items: [
    rv('mag', '10/13/2026', 'Joseph Brubaker', 'My son said it had a really sweet taste', 'My son said it had a really sweet taste. And so I tried it! We both liked it!'),
    rv('prob', '10/12/2026', 'Kayla Martin', 'Child enjoys the taste of the gummies & looks', 'Child enjoys the taste of the gummies & looks forward to taking them each day.'),
    rv('multiRefill', '10/11/2026', 'Alyxandrah White', 'Has most of what my kids don’t have from food', 'it has a lot ,but not everything , my kids brains and bodies need! it’s low in sugar but has good taste and texture'),
    rv('women', '10/11/2026', 'Anonymous', 'Definitely feel a difference', 'Definitely feel a difference.  More awake and alert. I do not feel as scatterbrained.'),
    rv('probRefill', '10/10/2026', 'Anonymous', 'awesome! great wway to get in my kitchen', 'awesome! great way to get in my kitchen probiotic gut health'),
    rv('mag', '10/10/2026', 'Lena & Ray', 'Best Nights', 'We  have tried many different sleep aids, and this one here did wonders for my husband. I know it says kids, however, he is the one who has restless nights. He felt like his mind stopped turning and his body calmed. So I got him the mens adult version. Hoping those work just as well.'),
    rv('teens', '10/09/2026', 'Yvette R', 'Tastes great!', 'My sons’ sleep and skin improved. They did not complain about taking these vitamins.'),
    rv('multiRefill', '10/08/2026', 'Jessica Terrell', 'My son loves them!', 'My son loves them! I really like that they have real folate in them instead of Folic Acid.'),
    rv('mag', '10/07/2026', 'Krista Lanager', "My son gets a full night's rest with this product", "My son gets a full night's rest with this product."),
    rv('teens', '10/06/2026', 'Anonymous', "Almost immediate change in my son's mood, and", "My 16 yr olds mood and temper was getting out of hand. Just asking simple, basic questions would set him off. I saw almost an immediate change for the better in my son's mood, and skin's condition. I had explained to him adding this multi vitamin could help you with your temperment. He must feel the difference himself, because he has willingly added this to his routine."),
  ],
};

// ---- page-metafield content (the template reads these from page metafields; values captured from the live page) ----
const sh = (name) => (name ? `shopify://shop_images/${name}` : '');
export const PAGE = {
  timeline: {
    items: [
      { image: 'kids-multi-lifestyle.jpg', badge: '7 Days', title: 'Stronger Daily Nutrition', body: '<p>Supports essential nutrients for growth, energy, and everyday wellness—helping kids feel their best from the start.</p>' },
      { image: '12_046620e6-093c-446a-a7bc-ee7495aba799.png', pos: '41.504% 15.625%', badge: '30 Days', title: 'Steadier Mood', body: '<p>With added nutrients such as B12 and B6, kids have their energy levels balanced, making them more comfortable and on track every day.</p>' },
      { image: 'kde-verggies-fruits.jpg', pos: '50.488% 49.121%', badge: '60 Days', title: 'Healthier Eating Habits', body: '<p>When your child feels better after having their nutrition gaps filled, they start to make healthier eating choices.</p>' },
    ],
  },
  accordion1: {
    heading: 'Target The Most Common Symptoms Plaguing Modern Families', image: sh('kde-bts-growth-hero.png'),
    items: [
      { icon: '5_ff67ff98-ed7a-4682-b249-303fa10d0235.png', title: 'Stunted Growth', body: '<p>Vitamin D3 and Vitamin K2 work together to support bone development, while essential nutrients like B vitamins help the body turn food into growth-fueling energy.</p>' },
      { icon: 'f0bda30c-5ea4-4918-96d6-e6cf8b192766.png', title: 'Difficulty Staying Focused', body: '<p>Your child starts homework and instantly gets distracted. Simple tasks take forever. It’s like their brain just <em>won’t stay put</em>.</p>' },
      { icon: 'icon-stress-moody.webp', pos: '49.121% 52.148%', title: 'Stress & Mood Swings', body: '<p>With Vitamin B6 for mood regulation and Vitamin B12 for energy balance, these gummies help support emotional stability.*</p>' },
      { icon: 'icon-pencil.png', pos: '2.93% 95.605%', title: 'Lack of Motivation', body: '<p>Packed with Vitamin B1 for brain health and Vitamin B2 for cognitive support - to help your teen stay on track while they balance school, sports, and everything in between.*</p>' },
      { icon: 'icon-moon.avif', pos: '37.012% 18.164%', title: 'Trouble Sleeping', body: '<p>Vitamin D3 helps regulate melatonin, the hormone that controls sleep cycles. Combined with B6, it supports calmer bedtimes and better rest for growing toddlers.*</p>' },
      { icon: 'icon-immunity.avif', pos: '50.098% 47.656%', title: 'Weakened Immunity', body: '<p>With immune-supporting Vitamin C and D3, plus key B vitamins that help keep their systems running smoothly. Our formula helps build a strong foundation to tackle whatever the day throws at them.</p>' },
    ],
  },
  science: {
    heading: '<p>Solving Common Problems From 4 Different Angles</p>',
    tabs: [
      { label: 'Daily Multivitamin', image: 'kde-multi-with-benefits.jpg', desc: '<p>Missing nutrients and Hidden Hunger can cause behavior outbursts, picky eating, and unsteady mood. Give your kids the nutrition they need to fight the effects of Hidden Hunger - with 21 organic superfoods &amp; just 2 delicious gummies a day!</p>', list: '<p>🫐 <strong>21 organic superfoods</strong>&nbsp;— delivers whole-food nutrients that support healthy brain development*</p><p>🍎 <strong>9 nutrients most kids lack</strong>&nbsp;— supplying kids with what they need during important years of growth*</p><p>🧠 <strong>Methylfolate (not folic acid)&nbsp;</strong>— the bioavailable form that supports neurotransmitter production regardless of genetic variation*</p><p>⚡ <strong>Vitamin B6</strong>&nbsp;— plays a direct role in how the brain produces serotonin and dopamine*</p>' },
      { label: 'Daily Brain Support', image: 'kdbf_2_-_Lifestyle_Image_-_Kids_Brain_Support_result.webp', desc: '<p>Daily brain nutrition for children for focus, memory, learning, hyperactivity support, and brain energy with Cognizin™, sunflower Phosphatidylserine, and Vitamin B3.</p>', list: '<p>🎯<strong>Cognizin® Citicoline</strong> - Supports focus, memory and attention in children.<br> <br> 🧠 <strong>Phosphatidylserine (PS) - </strong>Supports brain cell communication, learning, and memory.<br> <br> 💡<strong>Vitamin B3 (Niacinamide) </strong>- Supports energy production in the brain and metabolic balance.</p>' },
      { label: 'Calming Magnesium', image: 'kcm-sales-hero-spotlight-clean-label.png', desc: '<p>Tired of bedtime battles? Meet the magnesium gummy that’s giving kids restful sleep, calmer moods, and mind and body relaxation. Made with calming ingredients and no melatonin hormones.</p>', list: '<p>🌙 <strong>Chelated Magnesium - </strong>A highly absorbable form of magnesium that supports restful sleep and calm without interfering with the body’s natural processes.*</p><p>🪷 <strong>Suntheanine® - </strong>A patented, clinically studied form of L-theanine that helps reduce stress and promote relaxation — without drowsiness or dependency.*</p>' },
      { label: '3-in-1 Pre+ Post+ Probiotic', image: 'ktb_2_-_Lifestyle_Image_-_Kids_Tribiotics_result.webp', desc: '<p>A unique 3-in-1 pre, post, and probiotic designed to promote gut health, support oral health, fortify immunity and improve overall wellness.</p>', list: '<p>⛨ <strong>Livaux® (Prebiotic)</strong> - Supports gut health, regular digestion, and a healthy microbiome.<br> <br> 🦷 <strong>Bacillus coagulans SNZ 1969® (Probiotic)</strong> - Survives stomach acid to support gut microbiome, immunity, and oral health.<br> <br> 🛡️ <strong>Heat-treated Lactobacillus paracasei MCC1849 (Postbiotic) </strong>- Helps maintain a healthy immune response and gut balance.</p>' },
    ],
  },
  accordion2: {
    image: sh('mdp_9_-_Nutrition_-_Men_s_Multi_result.webp'), imageMobile: sh('kids-multi-holding-kde.avif'),
    items: [
      { icon: 'icon-broccoli.avif', pos: '49.121% 56.445%', title: 'Fights Hidden Hunger', body: "<p>80% of children don't eat enough fruits and veggies, contributing to a nutrient deficiency known as hidden hunger. Our gummies fight hidden hunger with essential nutrients critical to development.</p>" },
      { icon: 'old-icon-microscope.avif', pos: '49.121% 49.121%', title: 'Developed Alongside Harvard & Yale Scientists', body: '<p>Our product was crafted with input from leading scientists at Harvard and Yale, combining the latest research with high-quality ingredients to deliver a multivitamin parents can trust.</p>' },
      { icon: 'old-icon-atom-chemistry.avif', pos: '50.684% 51.66%', title: 'Backed by Modern Science', body: '<p>Vitamin B6 supports natural energy regulation, promoting healthier sleep patterns and making it easier for kids to get restful sleep.*</p>' },
      { icon: 'old-icon-stethoscope.avif', pos: '49.121% 49.121%', title: 'Pediatrician-Approved', body: '<p>Recommended by pediatricians, our multivitamin is designed to meet the unique needs of your family ensuring they get the support they need from a trusted source.</p>' },
      { icon: 'Rivo-Icon-Checkmark.svg', alt: 'A blue circle with a white check mark in the center, surrounded by a scalloped edge, resembling a verification badge.', title: 'Clean Label Project® Purity Award', body: '<p>Our products were independently tested by Clean Label Project® for harmful chemicals like heavy metals, pesticides, and plasticizers, exceeding typical industry practices.</p>' },
      { icon: 'icon-list-ingredients-sourcing.avif', pos: '6.152% 70.605%', title: 'Ingredients Sourcing and Dosage', body: '<p>We source each ingredient with care, choosing only the highest quality vitamins and minerals. Our dosage is tailored for teens, providing safe and effective support without risking overuse or unwanted additives.</p>' },
    ],
  },
};

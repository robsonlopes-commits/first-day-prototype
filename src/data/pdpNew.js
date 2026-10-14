import { shopImg } from '../lib/assets.js';

// Mock product + main-product section settings for the new PDP (/products/kids-enrichment-vitamin,
// template product.uniified-default-v2). Product facts captured read-only from firstday.com/products/kids-enrichment-vitamin(.js);
// prices follow the reference screenshots (30% off subscription, BUNDLEBUILDER code).
export const SECTION_ID = 'template--19276846825570__main';

const G = (file, alt) => ({ src: shopImg(file), alt });
export const PRODUCT = {
  handle: 'kids-enrichment-vitamin',
  title: 'The "No Junk"™ Kids’ Multi',
  vanityTitle: 'Daily Gummies For [Improved Mood & Behavior]', // metafield custom.pdp_vanity_title: [..] = highlight
  vendor: 'First Day Life Inc.',
  price: 39, // dollars
  variantId: 32050881855586,
  optionName: 'Number of Bottles',
  reviewsLabel: '5106 reviews',
  rating: 4.7,
  reviewCount: 5106,
  // media: first slide = metafield pdp_override_first_carousel_media, then product.images (minus the default featured image)
  images: [
    G('KDE-CLEAN-LABEL-FRONT-ROW.jpg', 'The "No Junk"™ Kids’ Multi'),
    G('kde_3_-_Gummies_Nutrients_-_Kids_Multi_result.webp', "An infographic-style product image for gummy candies. The top text reads 'In Just 2 Yummy Gummies' and the bottom text says 'Natural Orange & Strawberry Flavor."),
    G('ingredients-kde.webp', "A supplement facts label for Kids' Multivitamin gummies, showing a serving size of 2 gummies and a daily value of 15. The label includes a nutrition panel, ingredient list, and marketing badges such as 'Made with premium global ingredients,' 'Vegan,' 'Non-GMO,' 'GF Gluten-Free,' and a 'Clean Label' 'Purity Award."),
    G('kde_6_-_Benefits_-_Kids_Multi_result.webp', 'An informational graphic with a child eating from a clear cup on the left and text on the right stating that kids may not get enough essential vitamins from food alone, with three support areas listed: daily nutrition support, brain and focus support, and immunity support.'),
    G('kde_9_-_Nutrition_-_Kids_Multi_result.webp', "A blue kids' gummy jar labeled 'Kids Superfood Multi' with tropical parrot artwork, shown on a light blue background with floating fruits and vegetables including broccoli, apple, carrot, blueberry, and colorful star-shaped gummies. Text reads 'Real Wholesome Nutrition Never Tasted So Good' with three benefit callouts."),
    G('kde-facts.webp', "An infographic with a light blue background stating '93% of kids don't eat enough fruits or vegetables' and listing four bullet points about vitamin and nutrient benefits, including mushrooms, milk, leafy greens, and an orange slice, with broccoli and carrots in the lower right corner."),
    G('kde_7_-_Why_First_Day_-_Kids_Multi_result.webp', 'A promotional comparison graphic for First Day gummies, showing a product jar and bottle at the top and a feature checklist below. The graphic highlights that First Day is designed with modern nutrition in mind, with a blue vertical banner comparing the product to others across five points: blend of organic fruits and veggies, based on modern science, yummy gummies, no artificial sweeteners or dyes, and only 2g of sugar.'),
    G('kde_8_-_Social_Proof_-_Kids_Multi_result.webp', "Promotional graphic for First Day Vitamin D with multiple family photos showing children holding the product, large text stating 'Trusted by over 1,000,000+ parents!' and '97% of customers prefer First Day over other vitamin brands,' plus red heart icons with white hearts."),
    G('kde_2_-_Lifestyle_Image_-_Kids_Multi_result.webp', "A First Day Kids 'The Multi' dietary supplement canister is displayed in a styled flat-lay on a white surface, surrounded by school and snack props including a blue lunch bag, utensils, and a fruit container."),
    G('10_-_Back_Panel_-_Kids_Multi_result.webp', 'A cylindrical container of gummies showing the Supplement Facts label, with a white label, blue base, and orange and green graphic accents on a white background.'),
  ],
};

// pdp_demographic_tabs (shop.metaobjects.related_products_by_demographic)
export const DEMOGRAPHIC_TABS = {
  ariaLabel: 'Shop by family member',
  items: [
    { label: 'Toddlers', sub: 'Ages 2 - 3', href: '/products/the-no-junk-toddlers-multivitamin' },
    { label: 'Kids', sub: 'Ages 4 - 12', href: '/products/kids-enrichment-vitamin', current: true },
    { label: 'Teens', sub: 'Ages 13 - 17', href: '/products/teens-kickstart-vitamin' },
  ],
  banner: { prefix: 'This Product is For Kids Ages ', ages: '4 - 12' },
};

// benefit_accordion_stats block (metafield custom.benefit_accordian)
export const BENEFIT_ACCORDION = {
  settings: {
    background_color: 'rgba(0,0,0,0)', card_background_color: '#ffffff', border_color: '#f1f0f7', text_color: '#2c3d50', body_text_color: '#2c3d50',
    icon_background_color: '#776cb1', icon_color: '#ffffff', percent_background_color: '#effaff', percent_color: '#5a6fd6',
    body_font_size: 16, heading_font_size: 16, percent_font_size: 31, corner_radius: 12,
  },
  intro: '<p><strong>The #1 Fastest Growing Teens &amp; Kids Vitamin! </strong>Give your kids the nutrition they need to fight the effects of Hidden Hunger - with 21 organic superfoods &amp; just 2 delicious gummies a day!</p>',
  items: [
    { open: false, icon: shopImg('Untitled_design_6_c5d8fdab-5f5c-4e08-80e0-45b7de988e78.png'), iconW: 64, iconH: 64, heading: 'Enhanced Nutrition & Immunity', percent: '95%', text: "<p>of parents say First Day vitamins support their child's overall health &amp; immunity.† </p>" },
    { open: false, icon: shopImg('Vector_6.png'), iconW: 64, iconH: 64, heading: 'Boost Mood & Motivation', percent: '83%', text: "<p>of customers say First Day vitamins support their kids' overall mood &amp; behavior, and saw improved motivation for school.† </p>" },
    { open: false, icon: shopImg('Group_1_2_c9058c0e-c38b-4b19-b4b5-60cb21c06b06.png'), iconW: 64, iconH: 67, heading: 'Improved Sleep Routines', percent: '82%', text: "<p>said these vitamins are improving their child's overall bedtime routines &amp; sleep quality.† </p>" },
  ],
};

// product_purchase_content block settings (template) + values captured from the reference screenshots
export const PURCHASE = {
  frequencyTitle: 'Delivery Frequency',
  monthlyLabel: 'Monthly',
  onetimeLabel: 'One-Time',
  monthlyPrice: 27.3, // screenshot: $39 struck, $27.30
  monthlyCompare: 39,
  otpPrice: 39, // screenshot: "$39.00 with code BUNDLEBUILDER"
  coupon: 'BUNDLEBUILDER',
  monthlyBenefits: ['FREE Gift on orders +$75', 'FREE Shipping on first order', 'Cancel anytime, no questions asked'],
  onetimeBenefits: ["You're missing out on free shipping!", "You're 87% less likely to build a healthy habit without subscribing. You can cancel anytime!"],
  freqBadge: 'Guaranteed<strong> Lowest Price!</strong>',
  onetimeBadge: 'Higher Cost',
  badgeColor: '#776CB1',
  onetimeBadgeColor: '#2c3e50',
  quantityTitle: 'Quantity',
  servingsBadge: '30 Servings Per Bottle',
  maxQuantity: 4,
  defaultQuantity: 2,
  savingsPerBottle: 15.6, // "Save $15.60" tile badge x quantity
  buttonText: 'Add To Cart & View Gift',
  gift: { title: 'Rapid Hydration Electrolyte Support - Gift', value: 25, threshold: 75, salePrice: 'FREE' },
  successColor: '#078942',
};

export const SAVINGS_DISPLAY = { label: 'Subtotal', template: 'Saving {amount}!', fontScale: 90, paddingHorizontal: 10, successColor: '#078942' };

export const USP_IMAGES = [
  { src: shopImg('image_17.png'), alt: 'money back guarantee' },
  { src: shopImg('image_18_23f2a83f-a228-4c73-be70-3ac38b5837dd.png'), alt: '1 million customers' },
  { src: shopImg('image_23.png'), alt: 'secure checkout' },
];

const ALLERGENS = '<strong>Free From The Top 9 Allergens:</strong> We are dairy-free, soy-free, egg-free, gluten-free, peanut-free, tree nut-free, fish-free, shellfish-free, and sesame-free.';
const SUPERFOODS = "Apple, Kale, Broccoli, Spinach, Carrot, Parsley, Beet, Green Cabbage, Raspberry, Blueberry, Strawberry, Tomato, Aronia Berry, Chlorella, Maca, Moringa, Reishi Mushroom, Cordyceps Mushroom, Lion's Mane Mushroom, Turmeric, Ginger";
const ORGANIC = SUPERFOODS.split(', ').map((s) => `${s}‡`).join(', ');
export const COLLAPSIBLE_TABS = [
  {
    icon: 'apple', heading: 'Ingredients',
    html: `<p>We are thoughtful about the ingredients we select, use REAL organic fruits &amp; vegetables, and keep out long lists of ingredients that can't even be pronounced.<br> <br> <strong>Organic Superfoods Blend:</strong> ${SUPERFOODS}.<br> <br> <br> <strong>Other Ingredients:</strong> Tapioca Syrup‡, Cane Sugar‡, Water, Pectin, Citric Acid, Natural Flavors, Superfood Powdered Blend‡ (${ORGANIC}), Carrot and Blackcurrant and Red Bell Pepper Juice for Color.<br> ‡Organic<br> <br> ${ALLERGENS}</p>`,
  },
  { icon: 'clipboard', heading: 'Supplement Facts', image: { src: shopImg('ingredients-kde.webp'), alt: 'Supplement Facts', width: 900, height: 900 } },
  {
    icon: 'return', heading: 'Subscription Details',
    html: "<p>You'll receive a stylish refillable bottle on your first order, then receive our eco-friendly refill pouches every 30 days on a physician-recommended schedule.<br> <br> Plus, you'll receive these benefits:</p><ul><li>Savings every single month.</li><li>Free shipping on your first order.</li><li>Easy management - skip or pause whenever you need.</li><li>VIP access to sales, gifts, early access &amp; more.</li><li>Cancel anytime.</li></ul>",
  },
];

export const CROSSLINKS = {
  age: { prefix: 'This Product is For Kids Ages ', ages: '4 - 12' },
  cards: [
    { title: 'Toddlers', subtitle: 'Ages 2 - 3', href: '/products/the-no-junk-toddlers-multivitamin' },
    { title: 'Teens', subtitle: 'Ages 13 - 17', href: '/products/teens-kickstart-vitamin' },
  ],
};

// custom-liquid section 'custom_liquid_aiATrm' (footnotes under the page); custom_css is scoped to the section
export const CUSTOM_LIQUID_PDP_NEW = {
  id: 'template--19276846825570__custom_liquid_aiATrm',
  customCss: ['p {font-size: 8px; text-align: center;}'],
  settings: {
    anchor_id: '', full_width: false, show_divider: false, padding_top: 20, padding_bottom: 0,
    custom_liquid: "<p><sup>1</sup>\nWe offer a 45-day satisfaction guarantee for returns. It covers 45 days starting from the day that you place an order and includes only the very first purchase of any product so that families can try our gummies - for any reason you aren't happy with your vitamins. Please note that we will refund up to $100 so that you can try up to 3 bottles of our gummies risk free. If you would like to order more than 3 bottles in your first order, we recommend that you ordering less so that your family can try them first. Thanks so much for your understanding!\n</p>\n<p> Packaging May Vary. </p>\n<p>** Compared with: Flintstones Vitamins Chewable Kids Vitamins; Nordic Naturals Nordic Berries; SmartyPants Kids Formula\n</p>",
  },
};

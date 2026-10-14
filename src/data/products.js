// First Day product catalog, captured read-only from firstday.com (sale page + home carousel).
// Prices are the base (compare-at) price in dollars; the carousel cards show a discounted price
// (DEFAULT_DISCOUNT % off, 30 in the reference screenshots: $39 -> $27.30, $88 -> $61.60).
// Image names are files in the shop CDN "files" folder -> use shopImg(name).
import { shopImg } from '../lib/assets.js';

export const DEFAULT_DISCOUNT = 30;

// group: kids | teens | women | men | toddlers     category: multivitamin | probiotic | brain | magnesium | starter | daynight
// [handle, title(card), pdpTitle, group, category, price, rating, reviews, blurb, saleImage, homeImage, gallery[], extra]
const ROWS = [
  ['kids-tlc-starter-pack', "Kids' Starter Pack", "Kids' TLC Starter Pack", 'kids', 'starter', 88, 4.8, 251, 'Daily nutrition plus support for digestion, gut health & immunity.', 'kids-starter-flat.png', 'kids-starter-flat.png', ['Rebrand_Broad_Images_19.png', 'KG.png', 'gummies-kids-multi-vitamin.png']],
  ['teens-defense-starter-pack', "Teens' Starter Pack", "Teens' Defense Starter Pack", 'teens', 'starter', 88, 4.6, 1485, 'Supplements nutrition while also supporting skin health & immunity.', 'teens-starter-flat.png', 'teens-starter-flat.png', ['Rebrand_Broad_Images_20.png', 'Nutrients_over_gummy_macro_de37d2db-1e2e-44e9-94b9-1c3f1693b9dc.jpg', 'Us_vs_them_table_-_V2_a95448c7-b1b2-4908-a7b1-820ed5feccd3.jpg']],
  ['womens-wellness-starter-pack', "Women's Starter Pack", "Women's Wellness Starter Pack", 'women', 'starter', 88, 4.9, 219, 'Helps combat exhaustion while promoting gut health, immunity and vaginal health.', 'womens-starter-flat.png', 'womens-starter-flat.png', ['Rebrand_Broad_Images_21.png', 'Nutrients_over_gummy_macro_40e15c56-9924-44cc-af9f-633cb61d7fee.jpg', 'Product_UVP_b84e0534-f956-4d0a-8c0e-52e0990853b0.jpg']],
  ['mens-power-up-starter-pack', "Men's Starter Pack", "Men's Power-Up Starter Pack", 'men', 'starter', 88, 4.9, 42, 'Perform your best with enhanced nutrition & muscle strength.', 'mens-starter-flat.png', 'mens-starter-flat.png', ['Rebrand_Broad_Images_22.png', 'FDRB_Mens-Multi_NutrientCallouts.jpg', 'FDRB_Mens-Multi_ProductFeatures.jpg']],
  ['kids-dream-team-starter-pack', "Kids' Day/Night Pack", "Kids' Dream Team Starter Pack", 'kids', 'daynight', 78, 4.7, 339, 'Day and night support for growing kids. Ages 4-12.', '5_cebacdbb-14a7-4093-a961-4e3c973f118d.png', '5_cebacdbb-14a7-4093-a961-4e3c973f118d.png', ['5_cebacdbb-14a7-4093-a961-4e3c973f118d.png', 'Directions_with_product-in-use_image_7dcf6bf4-3df1-401e-bf60-0b183f1f011a.jpg', 'why-first-day-muiltivitamins-for-kids.jpg']],
  ['teens-dream-team-starter-pack', "Teens' Day/Night Pack", "Teens' Dream Team Starter Pack", 'teens', 'daynight', 78, 4.6, 1485, 'Nutritional support for motivated days and calm nights. Ages 13+', '3_fc031422-e4a6-434a-bd2a-9b1ab2653b34.png', '3_fc031422-e4a6-434a-bd2a-9b1ab2653b34.png', ['3_fc031422-e4a6-434a-bd2a-9b1ab2653b34.png', 'Nutrients_over_gummy_macro_de37d2db-1e2e-44e9-94b9-1c3f1693b9dc.jpg', 'Product_UVP_26ec3181-c450-4f70-be3b-29d2af6c41da.jpg']],
  ['womens-dream-team-starter-pack', "Women's Day/Night Pack", "Women's Dream Team Starter Pack", 'women', 'daynight', 78, 4.9, 451, 'Helps fight daytime exhaustion and nighttime stress. Ages 18+', '4_3d18595a-f37d-4ac7-99a3-6952d7f2e84c.png', '4_3d18595a-f37d-4ac7-99a3-6952d7f2e84c.png', ['4_3d18595a-f37d-4ac7-99a3-6952d7f2e84c.png', 'Directions_with_product-in-use_image_187961cf-a8af-42ca-aa1c-8f85bbc95c51.jpg', 'Nutrients_over_gummy_macro_40e15c56-9924-44cc-af9f-633cb61d7fee.jpg']],

  ['kids-enrichment-vitamin', "Kids' Multivitamin", 'The "No Junk"™ Kids’ Multi', 'kids', 'multivitamin', 39, 4.7, 5106, 'Support for mood, behavior & picky eating.', 'kids-multi-flat.png', '2.webp', ['kids-multi.png', 'kde_3_-_Gummies_Nutrients_-_Kids_Multi_result.webp', 'ingredients-kde.webp']],
  ['teens-kickstart-vitamin', "Teens' Multivitamin", 'The "No Junk"™ Teens’ Multi', 'teens', 'multivitamin', 39, 4.6, 1485, 'Support for motivation, energy & immunity.', 'teens-multi-flat.png', '3.webp', ['teens-multi.png', 'tdk_3_-_Gummies_Nutrients_-_Teens_Multi_result.webp', 'ingredients-tdk.webp']],
  ['the-no-junk-toddlers-multivitamin', "Toddlers' Multivitamin", 'The "No Junk"™ Toddlers\' Multi', 'toddlers', 'multivitamin', 39, 4.7, 5106, 'Helps fill missing nutrients in young children.', '65.png', 'toddlers-multi-flat.png', ['toddlers-multi.png', 'trmv_3_-_Gummies_Nutrients_-_Toddlers_Multi_result.webp', 'trmv_4_-_Ingredients_-_Toddlers_Multi_result.webp'], { badge: 'New!' }],
  ['womens-supercharge-vitamin', "Women's Multivitamin", 'The "No Junk"™ Women’s Multi', 'women', 'multivitamin', 39, 4.8, 2419, 'Support for energy, skin & hair health.', 'womens-multi-flat.png', 'womens-multi-flat.png', ['woman-multi.png', 'wds_3_-_Gummies_Nutrients_-_Women_s_Multi_result.webp', 'wds-hero-carousel-dont-eat-veggies.webp']],
  ['mens-provisions-vitamin', "Men's Multivitamin", 'The "No Junk"™ Men’s Multi', 'men', 'multivitamin', 39, 4.9, 333, 'Power-packed nutrition for men.', 'men-multi.png', 'mens-multi-flat.png', ['men-multi.png', 'mdp_3_-_Gummies_Nutrients_-_Men_s_Multi_result.webp', 'ingredients-mdp.webp']],

  ['kids-calming-magnesium', "Kids' Magnesium", 'Kids’ Nighttime Reset Magnesium', 'kids', 'magnesium', 39, 4.7, 339, 'Melatonin-free support for relaxation & sleep.', '1_19d423ed-4f0d-496c-9a77-d89110e2a119.png', '1_19d423ed-4f0d-496c-9a77-d89110e2a119.png', ['kids-mag.png', 'kcm_10_-_Benefits_-_Kids_Magnesium_result.webp', 'kcm_3_-_Benefits_-_Kids_Magnesium_result.webp']],
  ['teens-calming-magnesium', "Teens' Magnesium", 'Teens’ Nighttime Reset Magnesium', 'teens', 'magnesium', 39, 4.4, 148, 'Melatonin-free support for relaxation & sleep.', 'teens-magnesium-flat.png', 'teens-magnesium-flat.png', ['teens-mag.png', 'tcm_10_-_Benefits_-_Teens_Magnesium_result.webp', 'tcm_3_-_Benefits_-_Teens_Magnesium_result.webp']],
  ['womens-calming-magnesium', "Women's Magnesium", 'Women’s Nighttime Reset Magnesium', 'women', 'magnesium', 39, 4.9, 451, 'Melatonin-free support for relaxation & sleep.', 'Magnesium_1_1f242593-10ef-4e3c-b945-f922d11c82ea.png', 'Magnesium_1_1f242593-10ef-4e3c-b945-f922d11c82ea.png', ['woman-mag.png', 'wcm_10_-_Benefits_-_Women_s_Magnesium_result.webp', 'wcm_3_-_Benefits_-_Women_s_Magnesium_result.webp']],
  ['mens-calming-magnesium', "Men's Magnesium", 'Men’s Nighttime Reset Magnesium', 'men', 'magnesium', 39, 5.0, 19, 'Melatonin-free support for relaxation & sleep.', 'mcm_2_-_Lifestyle_Image_-_Men_s_Magnesium_result.webp', '3_77f0ab1f-46e0-43bc-aba5-c682b06b32ee.png', ['men-mag.png', 'mcm_10_-_Benefits_-_Women_s_Magnesium_result.webp', 'mcm_3_-_Benefits_-_Women_s_Magnesium_result.webp']],

  ['kids-daily-focus', "Kids' Brain Support", "Kids' Daily Focus Brain Support", 'kids', 'brain', 49, 4.4, 48, 'Support for focus, learning, and behavior.', '1_ad331e3b-42c6-45b2-b33a-c027ea8de0ad.png', 'Kids_Brain_Support.png', ['kids-brain.png', 'kdbf_10_-_Social_Proof_-_Kids_Brain_Support_result.webp', 'kdbf_3_-_Benefits_-_Kids_Brain_Support_result.webp'], { badge: 'New!' }],
  ['teens-daily-focus', "Teens' Brain Support", "Teens' Daily Focus Brain Support", 'teens', 'brain', 49, 4.4, 48, 'Support for focus, learning, and memory recall.', 'Teens_Brain_Support.png', 'Teens_Brain_Support.png', ['teens-brain.png', 'tdbf_3_-_Benefits_-_Teens_Brain_Support_result.webp', 'tdbf_4_-_Gummies_Nutrients_-_Teens_Brain_Support_result.webp'], { badge: 'New!' }],
  ['womens-daily-focus', "Women's Brain Support", "Women's Daily Focus Brain Support", 'women', 'brain', 49, 4.4, 48, 'Helps provide focus and calm mental energy.', 'Womens_Brain_Support.png', 'Womens_Brain_Support.png', ['woman-brain.png', 'wdbf_3_-_Benefits_-_Women_s_Brain_Support_result.webp', 'wdbf_4_-_Gummies_Nutrients_-_Women_s_Brain_Support_result.webp'], { badge: 'New!' }],
  ['mens-daily-focus', "Men's Brain Support", "Men's Daily Focus Brain Support", 'men', 'brain', 49, 4.4, 48, 'Bolsters focus, memory and mental clarity.', 'BrainSupportShoot_Mens-Brain_69.jpg', 'BrainSupportShoot_Mens-Brain_69.jpg', ['men-brain.png', 'mdbf_3_-_Benefits_-_Men_s_Brain_Support_result.webp', 'mdbf_4_-_Gummies_Nutrients_-_Men_s_Brain_Support_result.webp'], { badge: 'New!' }],

  ['kids-belly-biotic', "Kids' Probiotic+", "First Day - Kids' 3-in-1 Pre+ Post+ Probiotic", 'kids', 'probiotic', 49, 4.8, 251, 'To support immunity, digestion, and oral health.', 'kids-probiotic-flat.png', '4.webp', ['kids-prob_4b7651d5-86e6-4eb3-8d96-e6d26e57c0e4.png', 'BenefitsList_1ac4fd90-9bbe-4a5e-b88e-727cdb15937c.jpg', 'ingredients-krtb.avif']],
  ['teens-gut-sustainer', "Teens' Probiotic+", "First Day - Teens' 3-in-1 Pre+ Post+ Probiotic", 'teens', 'probiotic', 49, 4.8, 103, 'To support immunity, digestion, and skin health.', 'teens-probiotic-flat.png', '5.webp', ['teens-prob.png', 'BenefitsList.jpg', 'ingredients-trtb.avif']],
  ['womens-good-gut', "Women's Probiotic+", "First Day - Women's 3-in-1 Pre+ Post+ Probiotic", 'women', 'probiotic', 49, 4.9, 219, 'To support immunity, digestion, and bloating.', 'womens-probiotic-flat.png', 'womens-probiotic-flat.png', ['woman-prob.png', 'Benefits_List.jpg', 'ingredients-wrtb.avif']],
  ['mens-gut-guardian', "Men's Probiotic+", "Men's 3-in-1 Pre+ Post+ Probiotic", 'men', 'probiotic', 49, 4.9, 42, 'To support immunity, digestion, and recovery.', 'mens-probiotic-flat.png', 'mens-probiotic-flat.png', ['men-prob.png', 'mtb_3_-_Features_-_Men_s_Tribiotics_result.webp', 'ingredients-mtb.webp']],
  ['toddlers-3-in-1-probiotic', "Toddlers' Probiotic+", "Toddlers' 3-in-1 Pre+ Post+ Probiotic", 'toddlers', 'probiotic', 49, 4.8, 251, 'For softer, easier to pass stools.', '38486cd4-dbb4-448b-9d5e-4515a8fd95ac.png', '38486cd4-dbb4-448b-9d5e-4515a8fd95ac.png', ['toddlers-prob.png', 'trtb_3_-_Features_-_Toddlers_Tribiotics_result.webp', 'ingredients-trtb.webp']],
];

export const PRODUCTS = {};
for (const [handle, title, pdpTitle, group, category, price, rating, reviews, blurb, saleImage, homeImage, gallery, extra = {}] of ROWS) {
  PRODUCTS[handle] = {
    handle, title, pdpTitle, group, category, price, rating, reviews, blurb,
    badge: extra.badge || null, // badge the live Sale page shows on the card ("New!")
    saleImage: shopImg(saleImage),
    homeImage: shopImg(homeImage),
    images: gallery.map(shopImg),
    url: `/products/${handle}`,
  };
}

export const getProduct = (handle) => PRODUCTS[handle] || null;
export const allProducts = () => Object.values(PRODUCTS);
export const byGroup = (group) => allProducts().filter((p) => p.group === group);
export const byCategory = (category) => allProducts().filter((p) => p.category === category);

// money helpers. Card price = base * (1 - discount%). "$39.00"
export const money = (n) => `$${n.toFixed(2)}`;
export const salePrice = (p, discount = DEFAULT_DISCOUNT) => Math.round(p.price * (100 - discount)) / 100;

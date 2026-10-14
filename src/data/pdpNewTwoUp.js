// Section instances for the new PDP (templates/product.uniified-default-v2.json): three PDP V2 Two Up, Quality Criterias, PDP V2 Hero.
// Settings are the template JSON values; Liquid metafield expressions are replaced by the copy rendered on the live
// /products/kids-enrichment-vitamin page ({demo_plural} -> "kids", rich text bodies as HTML strings, images as local /assets paths).
import { shopImg, extImg } from '../lib/assets.js';

const SHOP = 'cdn.shopify.com/s/files/1/0028/0533/4131/files/';
const VIDEO = (id, file) => extImg(`cdn.shopify.com/videos/c/vp/${id}/${file}`);

const TWO_UP_BASE = {
  container_max_width_desktop: 1600, card_gap_desktop: 64, card_gap_mobile: 20, content_gap_desktop: 24,
  padding_top_desktop: 40, padding_right_desktop: 32, padding_bottom_desktop: 64, padding_left_desktop: 32,
  padding_top_mobile: 40, padding_right_mobile: 16, padding_bottom_mobile: 40, padding_left_mobile: 16,
  wave_top: false, wave_bottom: false, wave_top_container_color: '#ffffff', wave_bottom_container_color: '#ffffff',
  card_bg_color_desktop: '#ffffff', card_bg_color_mobile: '#ffffff', card_border_color_desktop: '#d7effa', card_border_color_mobile: '#ffffff',
  card_border_width: 1, card_radius: 12, card_padding_desktop: 52, card_padding_mobile: 0,
  video_autoplay: true, media_width_desktop: 361, media_height_desktop: 628, media_aspect_mobile: '', media_height_mobile: 628, media_radius: 8,
  badge_bg_color: '#eeedf6', badge_radius: 6, badge_padding_x: 16, badge_padding_y: 8, badge_font_family: "'sofia-pro', sans-serif",
  badge_font_size_desktop: 16, badge_font_size_mobile: 16, badge_font_weight: 700, badge_font_color: '#776cb1',
  heading_font_family: "'sofia-pro', sans-serif", heading_font_size_desktop: 32, heading_font_size_mobile: 25, heading_font_weight: 500,
  heading_font_color: '#2c3d50', heading_accent_font_weight: 700, heading_accent_color: '#776cb1', heading_line_height: 1.3,
  body_font_family: "'sofia-pro', sans-serif", body_font_size_desktop: 18, body_font_size_mobile: 16, body_font_weight: 300,
  body_font_color: '#2c3d50', body_line_height: 1.5, body_paragraph_gap: 16,
  cta_url: '#product-purchase-content', cta_bg_color: '#476ded', cta_radius: 2000, cta_height: 48, cta_font_family: "'sofia-pro', sans-serif",
  cta_font_size_desktop: 18, cta_font_size_mobile: 18, cta_font_weight: 400, cta_font_color: '#ffffff',
  highlights_margin_top: 46, highlights_gap: 16,
};

// anchor dosage-risks: video right, light blue background (video only, no image: grey placeholder until the video can play)
export const TWO_UP_DOSAGE = {
  id: 'pdp_v2_two_up_zBFdcp', type: 'pdp-v2-two-up', blocks: [],
  settings: {
    ...TWO_UP_BASE,
    anchor_id: 'dosage-risks', media_position: 'right',
    section_bg_color: '#d7effa', card_bg_color_mobile: '#d7effa', card_border_color_desktop: '#ffffff', card_border_color_mobile: '#d7effa',
    video: VIDEO('2c4558733e8b44d5a82438ac5aa67e12', '2c4558733e8b44d5a82438ac5aa67e12.HD-720p-4.5Mbps-90971851.mp4'),
    video_poster: extImg(`${SHOP}preview_images/2c4558733e8b44d5a82438ac5aa67e12.thumbnail.0000000000.jpg`),
    media_width_desktop: 616, media_height_desktop: 348, media_aspect_mobile: '1600 / 900', media_height_mobile: 400,
    badge_text: '💡 Did You Know?',
    heading: 'Most Vitamins Give A 4-Year-Old A 17-Year-Old Dose. [It’s not just lazy, it’s dangerous. ]',
    body: '<div class="metafield-rich_text_field"><p><strong>Here\'s something most parents don\'t know: </strong>the FDA uses the same Daily Value reference for a 4-year-old and a 45-year-old on supplement labels. That\'s because, for labeling purposes, everyone age 4+ is grouped together, using the highest nutrient requirement within that group.</p><p>Take vitamin B6, for example. The Daily Value is 1.7mg, even though a 4-year-old actually needs closer to 0.6mg. Over time, high intakes of vitamin B6 have been linked to neuropathy—a reminder that vitamins should be dosed specifically.</p></div>',
    cta_text: 'Try Now', cta_bg_color: '#486ced',
  },
};

// anchor root-causes: image left (iceberg), white
export const TWO_UP_ROOT_CAUSES = {
  id: 'pdp_v2_two_up_6WdHLX', type: 'pdp-v2-two-up', blocks: [],
  settings: {
    ...TWO_UP_BASE,
    anchor_id: 'root-causes', media_position: 'left', container_max_width_desktop: 1280,
    image: shopImg('symptoms-multi-kids-iceberg.jpg'),
    badge_text: '💡 Did You Know?',
    heading: 'The Symptoms You See Are Just [The Tip of the Iceberg]',
    body: '<div class="metafield-rich_text_field"><p>Mood swings. Focus gaps. Speech delay. They point to real deficiencies, but <strong>most brands only treat the symptoms</strong>, never where it comes from.</p><p>The food your family eats today isn\'t the food it used to be. Fresh produce has lost up to <strong>73% of its nutrients over the past 50 years</strong>, and additives, heavy metals, and microplastics make it even harder for kids to get what they need.</p><p>That\'s why First Day formulates for both sides of the problem: what\'s missing inside your child\'s body, and what\'s working against them outside it. <strong>We call it Bio-Matched.</strong></p></div>',
    cta_text: 'Start Your Risk-Free Journey',
  },
};

// anchor our-formula: blue wavy section, gummies image (+ video layered on top), media right
export const TWO_UP_FORMULA = {
  id: 'pdp_v2_two_up_9kHJJe', type: 'pdp-v2-two-up', blocks: [],
  custom_css: ['.pdp-v2-two-up__heading {text-transform: capitalize;}'],
  settings: {
    ...TWO_UP_BASE,
    anchor_id: 'our-formula', media_position: 'right',
    section_bg_color: '#486ced', wave_top: true, wave_bottom: true,
    card_bg_color_desktop: '#486ced', card_bg_color_mobile: '#486ced', card_border_color_desktop: '#486ced', card_border_color_mobile: '#486ced',
    image: shopImg('gummy-background-transparent.png'),
    video: VIDEO('55556ee05cf444aca1e0f127c48f1f2c', '55556ee05cf444aca1e0f127c48f1f2c.HD-1080p-7.2Mbps-90978702.mp4'),
    media_width_desktop: 400, media_height_desktop: 488, media_aspect_mobile: '100 / 150', media_height_mobile: 400,
    badge_text: '',
    heading: "93% Of kids Don't Get Enough Nutrients. [So We Invented A New Formula That Addresses Their Biggest Gaps.]",
    heading_font_color: '#ffffff', heading_accent_color: '#ffffff',
    body: '<p>We match every nutrient to your child\'s exact age, using the right forms and doses through our exclusive Bio-Matched™ Formula.</p>',
    body_font_color: '#ffffff',
    cta_text: 'Shop Now', cta_bg_color: '#ffffff', cta_font_color: '#486ced',
  },
};

// The template has no blocks: cards come from product.metafields.custom.quality_criterias (7 metaobjects on the live page).
const card = (title, description, disadvantage_description, advantage_description) => ({
  type: 'quality_criteria',
  settings: {
    title, description,
    disadvantage_title: 'Other Brands', disadvantage_description, disadvantage_image: shopImg('Wrap.png'),
    advantage_title: 'First Day', advantage_description, advantage_image: shopImg('Wrap_1.png'),
  },
});
export const QUALITY_CRITERIAS_PDP_NEW = {
  id: 'pdp_v2_quality_criterias_R4nT8p', type: 'pdp-v2-quality-criterias',
  blocks: [
    card('Sugar Level', 'Less sugar than Flintstones, SmartyPants & Nordic Naturals.', 'Candy Level', 'Up to 80% less sugar'),
    card('Superfood Blend', '21 organic fruits & veggies baked into every gummy.', 'Vitamins, zero produce', '21 organic fruits & veggies'),
    card('Kid-Approved Taste', '30 flavor profiles tested until kids actually asked for more.', 'One flavor, hope it works', '30 flavors, kid-tested'),
    card('Folate Form', 'The only folate form that the body can naturally absorb and use.', 'Synthetic folic acid', 'Methylfolate'),
    card('Dosing', 'The right amount for their age, never megadosed to impress.', 'Megadosed to look good', 'The right dose, not highest'),
    card('Dyes & Fillers', 'Zero synthetic dyes. Every color comes from real produce.', 'Artificial colors', 'None, zero'),
    card('Testing', 'Verified three times per batch, independently, every batch.', 'Testing isn’t guaranteed', '3× per batch, independent'),
  ].map((b, i) => ({ id: `quality_criteria_${i + 1}`, ...b })),
  settings: {
    anchor_id: 'our-criteria',
    title: 'The "No Junk" Standard',
    main_title: '<p>First Day Builds Every Formula <strong>To Rigorous Quality Criteria</strong></p>',
    description: '<p>Formulated with guidance from our medical advisory board, including Dr. Lei Chen (<strong>Yale</strong>) and Dr. Ed Giovannucci (<strong>Harvard</strong>), and tested to meet Clean Label Project standards.</p>',
    list_aria_label: 'Quality criteria', metafield_key: 'quality_criterias',
    section_bg_color: '#ffffff', container_max_width: 1280, card_bg_color: '#f2fbff', row_bg_color: '#e4f5ff',
    padding_top_desktop: 80, padding_bottom_desktop: 64, padding_left_desktop: 32, padding_right_desktop: 32,
    padding_top_mobile: 44, padding_bottom_mobile: 24, padding_left_mobile: 16, padding_right_mobile: 16,
    title_font_family: "'sofia-pro', sans-serif", title_font_size_desktop: 16, title_font_size_mobile: 16, title_font_weight: 300, title_font_color: '#2c3d50',
    main_title_font_family: "'sofia-pro', sans-serif", main_title_font_size_desktop: 38, main_title_font_size_mobile: 25, main_title_font_weight: 500,
    main_title_line_height: 1.4, main_title_font_color: '#2c3d50', main_title_accent_color: '#776cb1',
    description_font_family: "'sofia-pro', sans-serif", description_font_size_desktop: 18, description_font_size_mobile: 16, description_font_weight: 300, description_font_color: '#2c3d50',
  },
};

const richText = (id, content, o) => ({
  id, type: 'fd-rich-text',
  settings: {
    content, font_family: "'sofia-pro', sans-serif", bold_font_weight: 700, font_color: '#ffffff', line_height: 1.5, paragraph_gap: 12, text_align: 'left',
    ...o,
  },
});
export const PDP_V2_HERO_PDP_NEW = {
  id: 'pdp_v2_hero_qw3EWc', type: 'pdp-v2-hero',
  blocks: [
    richText('fd_rich_text_8cHddA', '<p>BEFORE IT BECOMES A PROBLEM</p>', { font_size_desktop: 16, font_size_mobile: 14, font_weight: 300, margin_top: 0, text_transform: 'uppercase' }),
    richText('fd_rich_text_JKPXDk', '<p>The Focus Gaps Unaddressed in Elementary School Become the <strong>Grades That Slip in Middle School</strong></p>', { font_size_desktop: 38, font_size_mobile: 28, font_weight: 500, margin_top: 0, text_transform: 'none', line_height: 1.4 }),
    richText('fd_rich_text_xaYUiF', '<p>Bio-Matched™ formulates for what’s developmentally next — so the foundation is there before it’s tested.</p>', { font_size_desktop: 18, font_size_mobile: 16, font_weight: 400, margin_top: 20, text_transform: 'none' }),
    {
      id: 'pill_button_9GKpz7', type: 'pill-button',
      settings: {
        label: 'Get Started Now', link: '#product-purchase-content', open_in_new_tab: false, left_emoji: '', right_emoji: '',
        icon_size_desktop: 14, icon_size_mobile: 12, icon_gap_desktop: 6, icon_gap_mobile: 4,
        bg_color: '#476ded', text_color: '#ffffff', border_color: '#000000', hover_bg_color: '', hover_text_color: '', hover_border_color: '',
        border_width: 0, border_style: 'solid', border_radius: 100, shadow: 'none', font_family: '', font_size_desktop: 16, font_size_mobile: 16,
        font_weight: 400, text_transform: 'none', letter_spacing: 0, line_height: 1.4, padding_y_desktop: 8, padding_y_mobile: 8,
        padding_x_desktop: 28, padding_x_mobile: 24, min_height_desktop: 40, min_height_mobile: 40, margin_top: 20, transition_ms: 200,
      },
    },
  ],
  settings: {
    anchor_id: 'get-started',
    background_image_desktop: shopImg('before-problems-kids-multi-desktop.png'),
    background_image_mobile: shopImg('before-problems-kids-multi-mobile.png'),
    above_the_fold: true, background_color: '#2c3d50', overlay_color: '#000000', overlay_opacity: 25, content_alignment: 'left',
    container_max_width_desktop: 1280, content_max_width_desktop: 595, min_height_desktop: 550, min_height_mobile: 480,
    content_gap_desktop: 12, content_gap_mobile: 12,
    padding_top_desktop: 80, padding_right_desktop: 32, padding_bottom_desktop: 64, padding_left_desktop: 32,
    padding_top_mobile: 48, padding_right_mobile: 16, padding_bottom_mobile: 40, padding_left_mobile: 16,
  },
};

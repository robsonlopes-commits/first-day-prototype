// Generated from reference/theme/templates/page.lp-bundle-v2.json (section settings + blocks as in the template JSON) by tools/template-json-to-js.mjs.
// Page metafield-driven values stay as {{ page.metafields... }} strings: real content lives in src/data/bundleBuilder.js.
export const TEMPLATE = {
 "fd_countdown_bar": {
  "id": "fd_countdown_bar",
  "type": "fd-countdown-bar",
  "name": "Countdown Bar",
  "settings": {
   "padding_top_desktop": 0,
   "padding_right_desktop": 0,
   "padding_bottom_desktop": 0,
   "padding_left_desktop": 0,
   "padding_top_mobile": 0,
   "padding_right_mobile": 0,
   "padding_bottom_mobile": 0,
   "padding_left_mobile": 0,
   "section_bg_color": "#3952a0",
   "content_gap_desktop": 32,
   "content_gap_mobile": 16,
   "title": "🔥 Special Offer 🔥",
   "subtitle": "Up To 62% With Free Gifts",
   "title_font_family": "'sofia-pro', sans-serif",
   "title_font_size_desktop": 14,
   "title_font_size_mobile": 14,
   "title_font_weight": 700,
   "title_font_color": "#ffffff",
   "subtitle_font_family": "'sofia-pro', sans-serif",
   "subtitle_font_size_desktop": 14,
   "subtitle_font_size_mobile": 14,
   "subtitle_font_weight": 400,
   "subtitle_font_color": "#ffffff",
   "unit_bg_color": "#2c3e50",
   "unit_size": 44,
   "number_font_size": 14,
   "label_font_size": 12
  }
 },
 "temp_replo_hero_Femkti": {
  "id": "temp_replo_hero_Femkti",
  "type": "temp-replo-hero",
  "custom_css": [
   "h1,h2 {font-family: \"sofia-pro\", sans-serif;}"
  ],
  "name": "Temp Replo Hero",
  "settings": {
   "margin_top_desktop": 0,
   "margin_right_desktop": 0,
   "margin_bottom_desktop": 0,
   "margin_left_desktop": 0,
   "padding_top_desktop": 32,
   "padding_right_desktop": 32,
   "padding_bottom_desktop": 32,
   "padding_left_desktop": 32,
   "margin_top_mobile": 0,
   "margin_right_mobile": 0,
   "margin_bottom_mobile": 0,
   "margin_left_mobile": 0,
   "padding_top_mobile": 20,
   "padding_right_mobile": 16,
   "padding_bottom_mobile": 20,
   "padding_left_mobile": 16,
   "section_bg_color": "#ffffff",
   "section_border_radius": 20,
   "container_max_width_desktop": 1344,
   "container_column_gap_desktop": 44,
   "container_row_gap_mobile": 24,
   "content_row_gap_desktop": 6,
   "content_row_gap_mobile": 10,
   "left_content_width_desktop": 560,
   "hero_image": "{{ page.metafields.custom.section_temp_replo_hero.value.image.value }}",
   "hero_video": "{{ page.metafields.custom.section_temp_replo_hero.value.desktop_video_image_url_override.value }}",
   "hero_image_alt": "Hero image",
   "hero_image_max_width_desktop": 500,
   "above_the_fold": true,
   "hero_image_mobile": "{{ page.metafields.custom.section_temp_replo_hero.value.mobile_image.value }}",
   "hero_video_mobile": "{{ page.metafields.custom.section_temp_replo_hero.value.mobile_video_image_url_override.value }}",
   "mobile_image_full_width": true,
   "top_badge_phrases": "{{ page.metafields.custom.section_temp_replo_hero.value.rotating_badges.value }}",
   "top_badge_typing": true,
   "top_badge_show_cursor": true,
   "top_badge_type_speed": 70,
   "top_badge_untype_speed": 40,
   "top_badge_hold": 1800,
   "top_badge_font_family": "'sofia-pro', sans-serif",
   "top_badge_font_size_desktop": 18,
   "top_badge_font_size_mobile": 15,
   "top_badge_font_weight": 800,
   "top_badge_bg_color": "#f8e2a0",
   "top_badge_text_color": "#2c3d50",
   "top_badge_radius": 10,
   "show_stars": true,
   "stars_size_desktop": 24,
   "stars_size_mobile": 18,
   "stars_text": "Preferred by 1,500,000+ Families",
   "stars_font_family": "'sofia-pro', sans-serif",
   "stars_font_size_desktop": 16,
   "stars_font_size_mobile": 16,
   "stars_font_weight": 400,
   "stars_font_color": "#ffb511",
   "headline": "{{ page.metafields.custom.section_temp_replo_hero.value.header.value }}",
   "heading_level": "h1",
   "headline_highlight_color": "#5368c2",
   "headline_font_family": "'gelica', serif",
   "headline_font_size_desktop": 44,
   "headline_font_size_mobile": 28,
   "headline_font_weight": 700,
   "headline_line_height": 1.4,
   "headline_font_color": "#2c3d50",
   "description": "{{ page.metafields.custom.section_temp_replo_hero.value.body | metafield_tag }}",
   "description_above_image_mobile": false,
   "description_font_family": "'sofia-pro', sans-serif",
   "description_font_size_desktop": 16,
   "description_font_size_mobile": 16,
   "description_font_weight": 400,
   "description_font_color": "#2c3d50",
   "cta_text": "{{ page.metafields.custom.section_temp_replo_hero.value.cta_copy.value }}",
   "cta_url": "#fd-quiz-buy-box",
   "show_cta_arrow": false,
   "show_announcement_arrow": false,
   "jello_enabled": false,
   "jello_interval": 7,
   "cta_font_family": "sofia-pro, sans-serif",
   "cta_font_size_desktop": 18,
   "cta_font_size_mobile": 18,
   "cta_font_weight": 600,
   "cta_font_color": "#ffffff",
   "cta_bg_color": "#476ded",
   "cta_shadow_color": "#2c3d50",
   "cta_margin_top_desktop": 0,
   "cta_margin_bottom_desktop": 0,
   "cta_margin_top_mobile": 0,
   "cta_margin_bottom_mobile": 0,
   "show_divider": false,
   "divider_color": "#d7effa",
   "list_font_family": "'sofia-pro', sans-serif",
   "list_font_size_desktop": 16,
   "list_font_size_mobile": 16,
   "list_font_weight": 400,
   "list_font_color": "#2c3d50",
   "list_icon_color": "#2c3d50",
   "list_row_gap_desktop": 12,
   "list_row_gap_mobile": 12,
   "testimonial_font_family": "'sofia-pro', sans-serif",
   "testimonial_font_size_desktop": 14,
   "testimonial_font_size_mobile": 14,
   "testimonial_font_weight": 300,
   "testimonial_font_color": "#2c3d50",
   "testimonial_border_color": "#d7effa",
   "show_offer_badge": false,
   "offer_badge_prefix": "LIMITED TIME OFFER:",
   "offer_badge_text": "GET 1 MONTH FREE",
   "offer_badge_top": 40,
   "offer_badge_bg_color": "#f2a7be",
   "offer_badge_text_color": "#1a1a2e",
   "offer_badge_icon_color": "#d4e157",
   "center_badge_text": "",
   "center_badge_bg_color": "#1a1a2e",
   "center_badge_text_color": "#ffffff",
   "coupon_title": "",
   "coupon_label": "Use Coupon:",
   "coupon_code": "",
   "coupon_bg_color": "#eef3ff",
   "coupon_icon_bg": "#486ced",
   "coupon_icon_color": "#ffffff",
   "coupon_title_color": "#2c3d50",
   "coupon_label_color": "#2c3d50",
   "coupon_code_color": "#486ced",
   "coupon_padding_top_desktop": 0,
   "coupon_padding_bottom_desktop": 0,
   "coupon_padding_top_mobile": 0,
   "coupon_padding_bottom_mobile": 0,
   "creator_quote": "",
   "creator_quote_border_color": "#486ced",
   "creator_quote_font_family": "'sofia-pro', sans-serif",
   "creator_quote_font_size_desktop": 15,
   "creator_quote_font_size_mobile": 14,
   "creator_quote_font_weight": 400,
   "creator_quote_font_color": "#2c3d50",
   "creator_quote_padding_top_desktop": 0,
   "creator_quote_padding_bottom_desktop": 0,
   "creator_quote_padding_top_mobile": 0,
   "creator_quote_padding_bottom_mobile": 0,
   "creator_handle": "",
   "creator_handle_bg_color": "#f0f0f0",
   "creator_handle_font_family": "'sofia-pro', sans-serif",
   "creator_handle_font_size_desktop": 14,
   "creator_handle_font_size_mobile": 14,
   "creator_handle_font_weight": 400,
   "creator_handle_font_color": "#2c3d50",
   "creator_handle_padding_top_desktop": 0,
   "creator_handle_padding_bottom_desktop": 0,
   "creator_handle_padding_top_mobile": 0,
   "creator_handle_padding_bottom_mobile": 0
  },
  "blocks": [
   {
    "id": "temp_hero_list_item_pyE6rx",
    "type": "temp_hero_list_item",
    "name": "Temp Hero List Item",
    "settings": {
     "icon_type": "shield",
     "list_text": "Exclusive First Day 45 Day Money Back Guarantee**",
     "text_size_desktop": 16,
     "text_size_mobile": 16
    },
    "blocks": {}
   },
   {
    "id": "temp_social_proof_jmVhyi",
    "type": "temp-social-proof",
    "name": "Temp Social Proof Bar",
    "settings": {
     "bg_color": "#f1f1ef",
     "icon_image": "shopify://shop_images/ebce1fea9a768a63cc6c95d28e1efa8e9818e9db.gif",
     "bold_text": "6,646 Gummies",
     "text": "Sold Every 24h",
     "text_size_desktop": 16,
     "text_size_mobile": 16,
     "image_size": 50,
     "images_padding_left": 0,
     "max_width": 1000,
     "remove_padding": false,
     "padding_top": 8,
     "padding_right": 16,
     "padding_bottom": 8,
     "padding_left": 16,
     "margin_top_desktop": 0,
     "margin_right_desktop": 0,
     "margin_bottom_desktop": 0,
     "margin_left_desktop": 0,
     "margin_top_mobile": 0,
     "margin_right_mobile": 0,
     "margin_bottom_mobile": 0,
     "margin_left_mobile": 0
    },
    "blocks": {}
   },
   {
    "id": "temp_hero_list_testimonial_TKmecd",
    "type": "temp-hero-list_testimonial",
    "name": "Temp Hero Testimonial",
    "settings": {
     "testimonial_text": "Very happy with these vitamins!! They really seem to helping us with my teen's energy, sleep and her all‒around attitude is so much better!"
    },
    "blocks": {}
   }
  ]
 },
 "quiz_buy_box": {
  "id": "quiz_buy_box",
  "type": "fd-quiz-buy-box",
  "name": "Quiz Buy Box",
  "settings": {
   "concerns": [
    "mood-swings-meltdowns",
    "picky-eater-who-wont-touch-vegetables",
    "struggles-to-focus-or-pay-attention",
    "hard-to-fall-asleep-at-night",
    "hyperactive-or-hard-to-calm-down",
    "tummy-digestion-issues"
   ],
   "bundles": [
    "nutrition-essential-pack-1-pack",
    "2-pack",
    "3-pack",
    "4-pack"
   ],
   "anchor_id": "fd-quiz-buy-box",
   "padding_top_desktop": 32,
   "padding_right_desktop": 32,
   "padding_bottom_desktop": 48,
   "padding_left_desktop": 32,
   "padding_top_mobile": 24,
   "padding_right_mobile": 16,
   "padding_bottom_mobile": 32,
   "padding_left_mobile": 16,
   "section_bg_color": "#ffffff",
   "container_max_width_desktop": 1344,
   "heading": "Holistic Wellness For Kids",
   "title_font_family": "'sofia-pro', sans-serif",
   "title_font_size_desktop": 36,
   "title_font_size_mobile": 28,
   "title_font_weight": 700,
   "title_font_color": "#2c3d50",
   "stars_text": "4.8 stars | 1,000,000+ Families",
   "promo_text": "<p>Order by <strong>&lcub;date&rcub;</strong> for guaranteed FREE gifts.</p>",
   "question": "Which of these sounds like your kid?",
   "question_lede": "Select all that apply. We'll build the pack around it.",
   "question_font_family": "'sofia-pro', sans-serif",
   "question_font_size_desktop": 26,
   "question_font_size_mobile": 22,
   "question_font_weight": 700,
   "question_font_color": "#2c3d50",
   "empty_hint": "Pick at least one to continue.",
   "continue_label": "See My Recommendation",
   "back_label": "Change my answers",
   "results_heading": "Here's what we recommend based on your answers",
   "price_suffix": "per bottle",
   "miss_template": "You're missing out on {gift}. Get the {pack}.",
   "renew_template": "Renews every 4 weeks for {price}",
   "gifts_status_template": "{n}/{total} free gifts",
   "add_label": "Add My Pack",
   "meet_heading": "Meet the products",
   "meet_count_template": "{n} of {total} in your pack",
   "in_pack_badge": "In your pack",
   "learn_more_label": "Learn more",
   "info_button_label": "What's in the {pack}",
   "choose_pack_label": "Choose the {pack}",
   "price_plan_label": "per bottle, delivered monthly",
   "status_guarantee_text": "100% Money Back Guarantee",
   "claim_text": "<p><strong>Less than 1%</strong> of First Day customers claim our Money-Back Guarantee!</p>",
   "cta_bg_color": "#476ded",
   "cta_font_color": "#ffffff",
   "cta_font_family": "'sofia-pro', sans-serif",
   "cta_font_size_desktop": 24,
   "cta_font_size_mobile": 20,
   "cta_font_weight": 400,
   "cta_height": 64,
   "cta_radius": 100,
   "benefits_heading": "First Day Subscription Benefits",
   "benefit_1": "Special discounts & early product access!",
   "benefit_2": "Renews every 4 weeks. Delay or cancel anytime.",
   "benefit_3": "Adjust your delivery frequency as needed in your account.",
   "show_otp": true,
   "otp_label": "One-Time Purchase",
   "otp_note": "We recommend a subscription so that you can experience a variety of First Day's clinician recommended products.",
   "after_add": "drawer",
   "selling_plan_id": "3896967266",
   "coupon_code": "BUNDLEBUILDER",
   "otp_coupon_code": "BUNDLEBUILDER",
   "discount_percentage": "",
   "sub_discount_percentage": "",
   "auto_apply_subscription_discount": true,
   "auto_apply_otp_discount": true
  },
  "blocks": [
   {
    "id": "gallery_image_4jJe49",
    "type": "gallery_image",
    "settings": {
     "image": "shopify://shop_images/Gemini_Generated_Image_plfnv8plfnv8plfn.jpg"
    }
   },
   {
    "id": "gallery_image_zTTiCx",
    "type": "gallery_image",
    "settings": {
     "image": "shopify://shop_images/0fd459772147e948ade55694b22086a0f35aeb8c.webp"
    }
   },
   {
    "id": "gallery_image_yPytkr",
    "type": "gallery_image",
    "settings": {
     "image": "shopify://shop_images/c4a52e4012513a60cddebca55cffdd5fb007cfb8.webp"
    }
   },
   {
    "id": "gallery_image_PamQ9q",
    "type": "gallery_image",
    "settings": {
     "image": "shopify://shop_images/fa8db815cf106d47a832b64bef0c78beb778b0a0.webp"
    }
   },
   {
    "id": "gallery_image_BVgNhp",
    "type": "gallery_image",
    "settings": {
     "image": "shopify://shop_images/kdbf_2_-_Lifestyle_Image_-_Kids_Brain_Support_result.webp"
    }
   },
   {
    "id": "gallery_image_U4AKtr",
    "type": "gallery_image",
    "settings": {
     "image": "shopify://shop_images/kdbf_5_-_Benefits_-_Kids_Brain_Support_result.webp"
    }
   },
   {
    "id": "gallery_image_9Uc744",
    "type": "gallery_image",
    "settings": {
     "image": "shopify://shop_images/kdbf_6_-_Nutrition_-_Kids_Brain_Support_result.webp"
    }
   },
   {
    "id": "gallery_image_UckYqQ",
    "type": "gallery_image",
    "settings": {
     "image": "shopify://shop_images/kids-magnesium-bottle-2-gummies.jpg"
    }
   },
   {
    "id": "gallery_image_haT8EP",
    "type": "gallery_image",
    "settings": {
     "image": "shopify://shop_images/kcm_10_-_Benefits_-_Kids_Magnesium_result.webp"
    }
   },
   {
    "id": "gallery_image_XPtJFP",
    "type": "gallery_image",
    "settings": {
     "image": "shopify://shop_images/kcm_5_-_Benefits_-_Kids_Magnesium_result.webp"
    }
   },
   {
    "id": "gallery_image_7rB8bh",
    "type": "gallery_image",
    "settings": {
     "image": "shopify://shop_images/12_-_Lifestyle_Image_-_Kids_Tribiotics_result.webp"
    }
   },
   {
    "id": "gallery_image_Uw3e4W",
    "type": "gallery_image",
    "settings": {
     "image": "shopify://shop_images/ktb_5_-_Benefits_-_Kids_Tribiotics_result.webp"
    }
   },
   {
    "id": "gallery_image_D3cRnd",
    "type": "gallery_image",
    "settings": {
     "image": "shopify://shop_images/ktb_6_-_Nutrition_-_Kids_Tribiotics_result.webp"
    }
   },
   {
    "id": "gallery_image_gCMgJU",
    "type": "gallery_image",
    "settings": {
     "image": "shopify://shop_images/ingredients-kde.webp"
    }
   },
   {
    "id": "gallery_image_r6Wx8b",
    "type": "gallery_image",
    "settings": {
     "image": "shopify://shop_images/ingredients-kde.webp"
    }
   },
   {
    "id": "gallery_image_tqPwEx",
    "type": "gallery_image",
    "settings": {
     "image": "shopify://shop_images/ingredients-kdbf.webp"
    }
   },
   {
    "id": "gallery_image_khmD3C",
    "type": "gallery_image",
    "settings": {
     "image": "shopify://shop_images/ingredients-kcm.webp"
    }
   }
  ]
 },
 "custom_liquid_V3FUrH": {
  "id": "custom_liquid_V3FUrH",
  "type": "custom-liquid",
  "name": "t:sections.custom-liquid.presets.name",
  "settings": {
   "anchor_id": "",
   "custom_liquid": "<div style=\"padding: 50px 0px; background: #2C3E50\" id=\"frontrow-badge\" class=\"general-frontrow-brand-badge\">\n    <script async type=\"text/javascript\" src=\"https://app.thefrontrowhealth.com/api/widgets/script?presentation_type=brand&product_id=4210\"></script>\n    <iframe class=\"iframe-frontrow\" id=\"iframe-frontrow-brand\" frameborder=\"0\" src=\"https://app.thefrontrowhealth.com/api/widgets?presentation_type=brand&product_id=4210\"></iframe>\n</div>\n<style>\n  #iframe-frontrow-brand {height: 0px;}\n  #frontrow-badge{position:relative;display:flex;}.iframe-frontrow{width:100%;margin:0}.iframe-modal-frontrow{display:none;position:fixed;z-index:99999999;left:0;top:0;right:0;bottom:0;width:100%;height:100%;overflow:hidden}\n</style>",
   "full_width": true,
   "show_divider": false,
   "padding_top": 36,
   "padding_bottom": 36
  }
 },
 "timeline_section_xei4R8": {
  "id": "timeline_section_xei4R8",
  "type": "timeline-section",
  "name": "Expectation timeline",
  "settings": {
   "accessibility_label": "{{ page.metafields.custom.timeline.value.heading_line_1.value }}",
   "heading_line_1": "What You Can Expect",
   "heading_line_2": "Noticeable Benefits Over Time",
   "heading_tag": "h2",
   "heading_alignment": "left",
   "background_color": "#e7f7ff",
   "heading_color": "#26364a",
   "title_color": "#26364a",
   "body_color": "#29364e",
   "card_background_color": "#ffffff",
   "badge_background_color": "#2c3b50",
   "badge_text_color": "#ffffff",
   "marker_background_color": "#5978f4",
   "marker_icon_color": "#ffffff",
   "timeline_line_color": "#cfe3ee",
   "image_border_color": "#ffffff",
   "max_width": 1600,
   "padding_top_mobile": 26,
   "padding_bottom_mobile": 28,
   "padding_x_mobile": 12,
   "padding_top_desktop": 72,
   "padding_bottom_desktop": 76,
   "padding_x_desktop": 40,
   "heading_gap_mobile": 24,
   "heading_gap_desktop": 52,
   "mobile_timeline_offset": 24,
   "mobile_content_gap": 14,
   "mobile_item_gap": 36,
   "desktop_item_gap": 28,
   "desktop_marker_gap": 34,
   "marker_top_mobile": 14,
   "marker_size": 28,
   "timeline_line_width": 4,
   "image_size_mobile": 96,
   "image_size_desktop": 128,
   "image_lift_mobile": 18,
   "image_lift_desktop": 20,
   "image_title_gap": 12,
   "image_border_width": 4,
   "show_badge_icon": true,
   "badge_height": 42,
   "badge_padding_x": 16,
   "badge_radius": 6,
   "badge_notch_size": 14,
   "image_badge_overlap": 10,
   "card_radius": 9,
   "card_shadow_opacity": 0,
   "card_max_width_desktop": 320,
   "card_padding_top_mobile": 48,
   "card_padding_x_mobile": 14,
   "card_padding_bottom_mobile": 16,
   "card_padding_top_desktop": 78,
   "card_padding_x_desktop": 20,
   "card_padding_bottom_desktop": 22,
   "heading_max_width": 640,
   "heading_size_mobile": 22,
   "heading_size_desktop": 36,
   "heading_line_height": 135,
   "heading_primary_weight": "700",
   "heading_secondary_weight": "400",
   "title_size_mobile": 14,
   "title_size_desktop": 17,
   "title_weight": "700",
   "body_size_mobile": 13,
   "body_size_desktop": 15,
   "body_line_height": 150,
   "badge_text_size": 15,
   "badge_text_weight": "600"
  },
  "blocks": [
   {
    "id": "milestone_eRUBaT",
    "type": "milestone",
    "settings": {
     "image": "{{ page.metafields.custom.timeline.value.timeline_1_image.value }}",
     "image_alt": "",
     "badge_label": "{{ page.metafields.custom.timeline.value.timeline_1_days_badge.value }}",
     "title": "{{ page.metafields.custom.timeline.value.timeline_1_headling.value }}",
     "description": "<p>{{ page.metafields.custom.timeline.value.timeline_1_body | metafield_tag }}</p>"
    }
   },
   {
    "id": "milestone_8Cd8YU",
    "type": "milestone",
    "settings": {
     "image": "{{ page.metafields.custom.timeline.value.timeline_2_image.value }}",
     "image_alt": "",
     "badge_label": "{{ page.metafields.custom.timeline.value.timeline_2_days_badge.value }}",
     "title": "{{ page.metafields.custom.timeline.value.timeline_2_headling.value }}",
     "description": "<p>{{ page.metafields.custom.timeline.value.timeline_2_body | metafield_tag }}</p>"
    }
   },
   {
    "id": "milestone_KgeXb9",
    "type": "milestone",
    "settings": {
     "image": "{{ page.metafields.custom.timeline.value.timeline_3_image.value }}",
     "image_alt": "",
     "badge_label": "{{ page.metafields.custom.timeline.value.timeline_3_days_badge.value }}",
     "title": "{{ page.metafields.custom.timeline.value.timeline_3_headling.value }}",
     "description": "<p>{{ page.metafields.custom.timeline.value.timeline_3_body | metafield_tag }}</p>"
    }
   }
  ]
 },
 "accordion_block_HznRip": {
  "id": "accordion_block_HznRip",
  "type": "accordion-block",
  "name": "Accordion Block",
  "settings": {
   "heading": "{{ page.metafields.custom.section_2_bts_2_accordtion.value.header.value }}",
   "subheading": "{{ page.metafields.custom.section_2_bts_2_accordtion.value.subheader.value }}",
   "heading_size": "h1",
   "heading_position": "above_module",
   "heading_alignment": "center",
   "heading_alignment_mobile": "center",
   "heading_bottom_spacing": 32,
   "heading_bottom_spacing_mobile": 24,
   "highlight_color": "#486ced",
   "heading_font_family": "'sofia-pro', sans-serif",
   "heading_font_size": 38,
   "heading_font_size_mobile": 24,
   "heading_font_color": "",
   "heading_subtitle_gap": 12,
   "heading_subtitle_gap_mobile": 8,
   "subheading_font_family": "'sofia-pro', sans-serif",
   "subheading_font_size": 18,
   "subheading_font_size_mobile": 16,
   "subheading_font_weight": 400,
   "subheading_font_color": "#666666",
   "section_bg_color": "",
   "section_max_width": 1200,
   "accordion_max_width": 720,
   "image": "{{ page.metafields.custom.section_2_bts_2_accordtion.value.image.value }}",
   "image_mobile": "{{ page.metafields.custom.section_2_bts_2_accordtion.value.image.value }}",
   "layout": "image_first",
   "image_ratio": "adapt",
   "border_radius": 25,
   "open_first_accordion": true,
   "card_bg_color": "#ffffff",
   "card_border_color": "#87adf5",
   "card_border_width": 1,
   "card_border_radius": 12,
   "card_gap": 10,
   "card_padding_v": 16,
   "card_padding_h": 20,
   "card_padding_v_mobile": 14,
   "card_padding_h_mobile": 16,
   "icon_badge_bg": "#f2fbff",
   "icon_badge_size": 48,
   "icon_badge_size_mobile": 40,
   "icon_badge_radius": 50,
   "icon_size": 24,
   "icon_size_mobile": 22,
   "icon_gap": 14,
   "title_font_family": "'sofia-pro', sans-serif",
   "title_font_size": 18,
   "title_font_size_mobile": 16,
   "title_font_weight": 600,
   "title_font_color": "#000000",
   "teaser_font_family": "'sofia-pro', sans-serif",
   "teaser_font_size": 14,
   "teaser_font_size_mobile": 13,
   "teaser_font_weight": 400,
   "teaser_font_color": "#666666",
   "body_font_family": "'sofia-pro', sans-serif",
   "body_font_size": 14,
   "body_font_size_mobile": 14,
   "body_font_weight": 400,
   "body_font_color": "",
   "learn_more_font_family": "'sofia-pro', sans-serif",
   "learn_more_font_size": 14,
   "learn_more_font_weight": 600,
   "learn_more_font_color": "#476ded",
   "chevron_bg": "#2c3d50",
   "chevron_color": "#ffffff",
   "chevron_bg_open": "#476ded",
   "chevron_color_open": "#ffffff",
   "chevron_circle_size": 26,
   "chevron_size": 18,
   "button_label": "Shop Now",
   "button_link": "#fd-quiz-buy-box",
   "button_bg_color": "#486ced",
   "button_text_color": "#ffffff",
   "button_font_size": 16,
   "button_font_size_mobile": 15,
   "button_font_weight": 600,
   "button_border_radius": 8,
   "button_padding_v": 14,
   "button_padding_h": 32,
   "cta_top_spacing": 24,
   "guarantee_text": "45-Day Money Back Guarantee",
   "guarantee_font_size": 14,
   "guarantee_font_weight": 500,
   "guarantee_font_color": "#333333",
   "padding_top": 36,
   "padding_bottom": 36,
   "padding_top_mobile": 20,
   "padding_bottom_mobile": 28
  },
  "blocks": [
   {
    "id": "accordion_item_QjFtNj",
    "type": "accordion_item",
    "repeater": "{{ page.metafields.custom.section_2_bts_2_accordtion.value.nutrient_deficiencies.value }}",
    "settings": {
     "icon": "{{ block.repeater.icon.value }}",
     "heading": "{{ block.repeater.header.value }}",
     "teaser": "",
     "content": "{{ block.repeater.body | metafield_tag }}",
     "learn_more_text": "",
     "learn_more_url": ""
    }
   }
  ]
 },
 "temp_science_module_wWLDWj": {
  "id": "temp_science_module_wWLDWj",
  "type": "temp-science-module",
  "custom_css": [
   "h2,h3,h4 {text-align: center; font-family: \"sofia-pro\", sans-serif; font-weight: 600; margin-bottom: 4px;}",
   "@media screen and (min-width: 700px) {h2 {text-align: center; }}"
  ],
  "name": "Temp: Science Tabs",
  "settings": {
   "heading": "<p>{{ page.metafields.custom.section_science_tabs.value.header.value }}</p>",
   "heading_font_family": "",
   "body_font_family": "",
   "heading_font_size": 38,
   "tab_font_size": 16,
   "content_title_font_size": 24,
   "content_desc_font_size": 18,
   "benefits_heading_font_size": 20,
   "benefits_text_font_size": 16,
   "heading_font_size_mobile": 26,
   "tab_font_size_mobile": 14,
   "content_title_font_size_mobile": 22,
   "content_desc_font_size_mobile": 16,
   "benefits_heading_font_size_mobile": 18,
   "section_bg": "#f2fbff",
   "heading_color": "#2c3d50",
   "container_bg": "#ffffff",
   "tab_bar_border_color": "#d7effa",
   "tab_bg": "#ffffff",
   "tab_text_color": "#2c3d50",
   "tab_active_bg": "#2c3d50",
   "tab_active_text_color": "#ffffff",
   "panel_border_color": "#d7effa",
   "content_title_color": "#2c3d50",
   "content_desc_color": "#2c3d50",
   "benefits_heading_color": "#2c3d50",
   "benefits_text_color": "#2c3d50",
   "tab_padding_vertical": 12,
   "tab_padding_horizontal": 20,
   "tab_padding_vertical_mobile": 12,
   "tab_padding_horizontal_mobile": 16,
   "heading_gap": 20,
   "heading_gap_mobile": 16,
   "container_radius": 12,
   "container_padding": 48,
   "panel_radius": 8,
   "image_width": 580,
   "image_height_mobile": 300,
   "padding_top": 32,
   "padding_bottom": 32,
   "padding_left": 32,
   "padding_right": 32,
   "padding_top_mobile": 24,
   "padding_bottom_mobile": 24,
   "padding_left_mobile": 16,
   "padding_right_mobile": 16
  },
  "blocks": [
   {
    "id": "tab_fnpPhm",
    "type": "tab",
    "repeater": "{{ page.metafields.custom.section_science_tabs.value.tabs.value }}",
    "settings": {
     "tab_label": "{{ block.repeater.tab_header.value }}",
     "content_title": "{{ block.repeater.tab_subheader.value }}",
     "content_description": "<p>{{ block.repeater.tab_intro | metafield_tag }}</p>",
     "benefits_heading": "",
     "benefits_list": "<p>{{ block.repeater.tab_body | metafield_tag }}</p>",
     "panel_image": "{{ block.repeater.image.value }}",
     "panel_video": "{{ block.repeater.video.value }}",
     "video_autoplay": true,
     "video_loop": true,
     "video_muted": true,
     "video_controls": false
    }
   }
  ]
 },
 "homepage_trust_section_iTcHJQ": {
  "id": "homepage_trust_section_iTcHJQ",
  "type": "homepage-trust-section",
  "name": "Homepage Trust Section",
  "settings": {
   "anchor_id": "",
   "wull_view": true,
   "alt_width": false,
   "desktop_side_padding": 64,
   "mobile_side_padding": 16,
   "heading": "Life Changing Results from \n[<strong>Doctors</strong> and <strong>Real Customers</strong>]",
   "title_alignment": "center",
   "title_alignment_mobile": "center",
   "title_accent_color": "#5368c2",
   "show_callout": false,
   "callout_text": "45 Day Money Back Guarantee*",
   "callout_background_color": "#e8f6ef",
   "callout_text_color": "#078942",
   "callout_font_family": "'sofia-pro', sans-serif",
   "callout_font_weight": 600,
   "callout_font_size_desktop": 14,
   "callout_font_size_mobile": 14,
   "callout_margin_top_desktop": 8,
   "callout_margin_top_mobile": 24,
   "background_color": "#ffffff",
   "text_color": "#2c3d50",
   "card_background": "#e4f5ff",
   "media_card_background": "#5368c2",
   "show_navigation": true,
   "show_navigation_mobile": true,
   "show_statistics": true,
   "stat_accent_color": "#5368c2",
   "stat_desc_color": "#2c3d50",
   "stat_card_bg_color": "#ffffff",
   "stat_value_font_size_desktop": 32,
   "stat_value_font_size_mobile": 37,
   "stat_desc_font_size_desktop": 18,
   "stat_desc_font_size_mobile": 14,
   "stat_gap_desktop": 16,
   "stat_gap_mobile": 8
  },
  "blocks": [
   {
    "id": "image_83ypHm",
    "type": "image",
    "settings": {
     "image": "shopify://shop_images/blue-bubble-social-grid.jpg",
     "has_overlay": false,
     "background_color": "",
     "text_color": ""
    }
   },
   {
    "id": "image_quote_mWn3N3",
    "type": "image_quote",
    "settings": {
     "image": "shopify://shop_images/der-lei-chen-medical-board.jpg",
     "quote": "These vitamins are exactly what I recommend to parents looking for quality nutrition.",
     "name": "Dr. Lei Chen",
     "credentials": "MD, MHS at Yale University",
     "background_color": "",
     "text_color": ""
    }
   },
   {
    "id": "video_mG8adq",
    "type": "video",
    "settings": {
     "thumbnail": "shopify://shop_images/phils-my-pharmacist.png",
     "video_url": "https://cdn.shopify.com/videos/c/o/v/aecd515a10d444158c4daf44fa5763f6.mov",
     "background_color": "",
     "text_color": ""
    }
   },
   {
    "id": "image_yi7Erx",
    "type": "image",
    "settings": {
     "image": "shopify://shop_images/Womens_daily_supercharge_ugc.png",
     "has_overlay": false,
     "background_color": "",
     "text_color": ""
    }
   },
   {
    "id": "image_quote_hEhMga",
    "type": "image_quote",
    "settings": {
     "image": "shopify://shop_images/ugc-4.png",
     "quote": "These are the best tasting vitamins I ever purchased. It feels like I am having a treat. These are the only ones so far that my kids like too.",
     "name": "Diana V.",
     "credentials": "Verified Purchaser",
     "background_color": "",
     "text_color": ""
    }
   },
   {
    "id": "video_cEADwi",
    "type": "video",
    "settings": {
     "thumbnail": "shopify://shop_images/review-woman_1.jpg",
     "video_url": "https://cdn.shopify.com/videos/c/o/v/37827354069a403e9ad7a5b203afe326.mp4",
     "background_color": "",
     "text_color": ""
    }
   },
   {
    "id": "quote_only_eh8xCc",
    "type": "quote_only",
    "settings": {
     "quote": "A revolutionary approach to children's health.",
     "logo": "shopify://shop_images/yahoo-finance-2.png",
     "variant": "dark",
     "background_color": "",
     "text_color": ""
    }
   },
   {
    "id": "image_quote_Y8yqbw",
    "type": "image_quote",
    "settings": {
     "image": "shopify://shop_images/dr-harvard-ed-medical-board.jpg",
     "quote": "We choose partners carefully, and First Day’s dedication to research, formulation integrity, and transparent quality practices makes them a brand we’re proud to align with.",
     "name": "Dr. Ed Giovannucci",
     "credentials": "MD, MPH, ScD at Harvard University",
     "background_color": "",
     "text_color": ""
    }
   },
   {
    "id": "video_q8CP7f",
    "type": "video",
    "settings": {
     "thumbnail": "shopify://shop_images/review-woman-2.png",
     "video_url": "https://cdn.shopify.com/videos/c/o/v/254cebfaf76545bbaf344675fd8c13bc.mp4",
     "background_color": "",
     "text_color": ""
    }
   },
   {
    "id": "stat_ajhami",
    "type": "stat",
    "settings": {
     "percentage": "95%",
     "description_line_1": "of parents see",
     "description_line_2": "improved health & wellness",
     "background_color": "",
     "text_color": ""
    }
   },
   {
    "id": "stat_JqaUGW",
    "type": "stat",
    "settings": {
     "percentage": "82%",
     "description_line_1": "of kids ask for",
     "description_line_2": "their vitamins daily",
     "background_color": "",
     "text_color": ""
    }
   },
   {
    "id": "stat_3kQgUX",
    "type": "stat",
    "settings": {
     "percentage": "97%",
     "description_line_1": "customer",
     "description_line_2": "satisfaction rate",
     "background_color": "",
     "text_color": ""
    }
   }
  ]
 },
 "temp_benefits_split_W9myQm": {
  "id": "temp_benefits_split_W9myQm",
  "type": "temp-benefits-split",
  "name": "Temp Benefits Split",
  "settings": {
   "heading": "{{ page.metafields.custom.section_benefits.value.header.value }}",
   "body": "{{ page.metafields.custom.section_benefits.value.body | metafield_tag }}",
   "button_label": "{{ page.metafields.custom.section_benefits.value.button_label.value }}",
   "button_link": "{{ page.metafields.custom.section_benefits.value.button_cta.value }}",
   "quote_image": "shopify://shop_images/leannposton_1b39e808-b229-41b9-838d-afe6e4b05fbe.webp",
   "quote_text": "<p>\"When I choose vitamins, I consider their quality and safety records, ingredients, dosage, and testing protocol. First Day has created an excellent supplement for teens.\"</p>",
   "quote_name": "- Leann Poston M.D, M.Ed, MBA, Pediatrician and Medical Educator",
   "max_width": 1200,
   "desktop_column_gap": 48,
   "mobile_section_gap": 28,
   "left_content_gap": 22,
   "desktop_margin_top": 0,
   "desktop_margin_right": 0,
   "desktop_margin_bottom": 0,
   "desktop_margin_left": 0,
   "desktop_padding_top": 20,
   "desktop_padding_right": 20,
   "desktop_padding_bottom": 20,
   "desktop_padding_left": 20,
   "mobile_margin_top": 20,
   "mobile_margin_right": 0,
   "mobile_margin_bottom": 20,
   "mobile_margin_left": 0,
   "mobile_padding_top": 16,
   "mobile_padding_right": 12,
   "mobile_padding_bottom": 16,
   "mobile_padding_left": 12,
   "section_bg": "rgba(0,0,0,0)",
   "heading_color": "#2b2f33",
   "body_color": "#2b2f33",
   "button_bg": "#4567e7",
   "button_text_color": "#ffffff",
   "button_border_color": "#4567e7",
   "quote_color": "#2b2f33",
   "quote_name_color": "#2b2f33",
   "quote_image_border_color": "#37c28f",
   "card_bg": "#ffffff",
   "card_border_color": "#ffffff",
   "card_title_color": "#111111",
   "card_body_color": "#111111",
   "heading_font": "'sofia-pro', sans-serif",
   "heading_size": 36,
   "heading_size_mobile": 24,
   "heading_weight": 700,
   "body_font": "'sofia-pro', sans-serif",
   "body_size": 16,
   "body_size_mobile": 14,
   "body_weight": 400,
   "body_paragraph_spacing": 16,
   "button_font": "'sofia-pro', sans-serif",
   "button_size": 18,
   "button_size_mobile": 18,
   "button_weight": 700,
   "button_height": 60,
   "button_height_mobile": 50,
   "button_max_width": 420,
   "button_border_radius": 12,
   "button_border_width": 1,
   "quote_font": "'sofia-pro', sans-serif",
   "quote_size": 14,
   "quote_size_mobile": 14,
   "quote_weight": 400,
   "quote_name_font": "'sofia-pro', sans-serif",
   "quote_name_size": 16,
   "quote_name_size_mobile": 14,
   "quote_name_weight": 600,
   "card_title_font": "'sofia-pro', sans-serif",
   "card_title_size": 20,
   "card_title_size_mobile": 20,
   "card_title_weight": 700,
   "card_body_font": "'sofia-pro', sans-serif",
   "card_body_size": 16,
   "card_body_size_mobile": 14,
   "card_body_weight": 400,
   "quote_gap": 16,
   "quote_image_size": 80,
   "quote_image_size_mobile": 58,
   "quote_image_border_width": 3,
   "card_gap": 16,
   "card_radius": 0,
   "card_border_width": 1,
   "card_padding_vertical": 20,
   "card_padding_horizontal": 24,
   "card_padding_vertical_mobile": 16,
   "card_padding_horizontal_mobile": 16,
   "card_icon_size": 38,
   "card_icon_size_mobile": 34
  },
  "blocks": [
   {
    "id": "benefit_aGrr9q",
    "type": "benefit",
    "repeater": "{{ page.metafields.custom.section_benefits.value.benefits.value }}",
    "settings": {
     "icon": "{{ block.repeater.icon.value }}",
     "title": "{{ block.repeater.header.value }}",
     "text": "{{ block.repeater.body | metafield_tag }}"
    }
   }
  ]
 },
 "accordion_block_HhfaTG": {
  "id": "accordion_block_HhfaTG",
  "type": "accordion-block",
  "custom_css": [
   "h2 {font-size: 24px; font-family: \"sofia-pro\", sans-serif;}",
   "@media screen and (min-width: 700px) {.h2 {font-size: 36px; }}"
  ],
  "name": "Accordion Block",
  "settings": {
   "heading": "Why We Are the Top Multivitamin",
   "subheading": "{{ page.metafields.custom.section_bts_3_accodtion.value.subheader.value }}",
   "heading_size": "h1",
   "heading_position": "above_module",
   "heading_alignment": "center",
   "heading_alignment_mobile": "center",
   "heading_bottom_spacing": 32,
   "heading_bottom_spacing_mobile": 24,
   "highlight_color": "#486ced",
   "heading_font_family": "'sofia-pro', sans-serif",
   "heading_font_size": 38,
   "heading_font_size_mobile": 24,
   "heading_font_color": "",
   "heading_subtitle_gap": 12,
   "heading_subtitle_gap_mobile": 8,
   "subheading_font_family": "'sofia-pro', sans-serif",
   "subheading_font_size": 18,
   "subheading_font_size_mobile": 16,
   "subheading_font_weight": 400,
   "subheading_font_color": "#666666",
   "section_bg_color": "",
   "section_max_width": 1200,
   "accordion_max_width": 720,
   "image": "shopify://shop_images/mdp_9_-_Nutrition_-_Men_s_Multi_result.webp",
   "image_mobile": "{{ page.metafields.custom.section_bts_3_accodtion.value.image.value }}",
   "layout": "image_first",
   "image_ratio": "adapt",
   "border_radius": 25,
   "open_first_accordion": true,
   "card_bg_color": "#ffffff",
   "card_border_color": "#87adf5",
   "card_border_width": 1,
   "card_border_radius": 12,
   "card_gap": 10,
   "card_padding_v": 16,
   "card_padding_h": 20,
   "card_padding_v_mobile": 14,
   "card_padding_h_mobile": 16,
   "icon_badge_bg": "#f2fbff",
   "icon_badge_size": 48,
   "icon_badge_size_mobile": 40,
   "icon_badge_radius": 50,
   "icon_size": 24,
   "icon_size_mobile": 22,
   "icon_gap": 14,
   "title_font_family": "'sofia-pro', sans-serif",
   "title_font_size": 18,
   "title_font_size_mobile": 16,
   "title_font_weight": 600,
   "title_font_color": "#000000",
   "teaser_font_family": "'sofia-pro', sans-serif",
   "teaser_font_size": 14,
   "teaser_font_size_mobile": 13,
   "teaser_font_weight": 400,
   "teaser_font_color": "#666666",
   "body_font_family": "'sofia-pro', sans-serif",
   "body_font_size": 14,
   "body_font_size_mobile": 14,
   "body_font_weight": 400,
   "body_font_color": "",
   "learn_more_font_family": "'sofia-pro', sans-serif",
   "learn_more_font_size": 14,
   "learn_more_font_weight": 600,
   "learn_more_font_color": "#476ded",
   "chevron_bg": "#2c3d50",
   "chevron_color": "#ffffff",
   "chevron_bg_open": "#476ded",
   "chevron_color_open": "#ffffff",
   "chevron_circle_size": 26,
   "chevron_size": 18,
   "button_label": "Shop Now",
   "button_link": "",
   "button_bg_color": "#486ced",
   "button_text_color": "#ffffff",
   "button_font_size": 16,
   "button_font_size_mobile": 15,
   "button_font_weight": 600,
   "button_border_radius": 8,
   "button_padding_v": 14,
   "button_padding_h": 32,
   "cta_top_spacing": 24,
   "guarantee_text": "45-Day Money Back Guarantee",
   "guarantee_font_size": 14,
   "guarantee_font_weight": 500,
   "guarantee_font_color": "#333333",
   "padding_top": 36,
   "padding_bottom": 36,
   "padding_top_mobile": 20,
   "padding_bottom_mobile": 28
  },
  "blocks": [
   {
    "id": "accordion_item_BWGica",
    "type": "accordion_item",
    "repeater": "{{ page.metafields.custom.section_bts_3_accodtion.value.nutrient_deficiencies.value }}",
    "settings": {
     "icon": "{{ block.repeater.icon.value }}",
     "heading": "{{ block.repeater.header.value }}",
     "teaser": "",
     "content": "{{ block.repeater.body | metafield_tag }}",
     "learn_more_text": "",
     "learn_more_url": ""
    }
   }
  ]
 },
 "pbfcm_comparison_table_NTeG66": {
  "id": "pbfcm_comparison_table_NTeG66",
  "type": "pbfcm-comparison-table",
  "custom_css": [
   "h2 {font-family: \"Sofia Pro\";}"
  ],
  "name": "PBFCM Comparison Table",
  "settings": {
   "extended_version": false,
   "use_logo_for_benefit_head": false,
   "anchor_id": "",
   "title": "Why Should You Choose First Day?",
   "description": "Made for modern families living on modern diets, we’re here to fill the nutrition gaps that today’s food often leaves behind.",
   "desktop_image": "shopify://shop_images/desk_720.png",
   "mobile_image_left": "shopify://shop_images/mob-left_360.png",
   "logo_bg_color": "#476ded",
   "text_color": "#2c3d50",
   "highlight_color": "#476ded",
   "subscribers_label": "First Day",
   "onetime_label": "Other Brands",
   "subscribers_bg_color": "#476ded",
   "subscribers_border_color": "#5368c2",
   "container_width": 1400,
   "wull_view": false,
   "desktop_side_padding": 64,
   "mobile_side_padding": 0,
   "content_bg_color": "#ffffff",
   "background_color": "#e4f5ff",
   "padding_top": 44,
   "padding_bottom": 44
  },
  "blocks": [
   {
    "id": "benefit_row_67Mhcg",
    "type": "benefit_row",
    "settings": {
     "benefit_text": "Clean Label Certified"
    }
   },
   {
    "id": "benefit_row_VhMwQ4",
    "type": "benefit_row",
    "settings": {
     "benefit_text": "Free Gifts With Purchase"
    }
   },
   {
    "id": "benefit_row_7ezRHa",
    "type": "benefit_row",
    "settings": {
     "benefit_text": "Research Backed"
    }
   },
   {
    "id": "benefit_row_PzgGAJ",
    "type": "benefit_row",
    "settings": {
     "benefit_text": "No Fillers Or Fake Ingredients"
    }
   },
   {
    "id": "benefit_row_799X3G",
    "type": "benefit_row",
    "settings": {
     "benefit_text": "Vegan, Gluten-Free, Non-GMO"
    }
   },
   {
    "id": "duration_row_etzbP9",
    "type": "duration_row",
    "settings": {
     "benefit_text": "Money-Back Guarantee",
     "subscribers_duration": "45 Days",
     "onetime_duration": "45 Days"
    }
   }
  ]
 },
 "frontrowmd_clinicians_reviews_URAENC": {
  "id": "frontrowmd_clinicians_reviews_URAENC",
  "type": "frontrowmd-clinicians-reviews",
  "name": "FrontRowMD Clinician Reviews",
  "settings": {
   "anchor_id": "",
   "product_id": "",
   "background_color": "",
   "padding_top": 24,
   "padding_right": 0,
   "padding_bottom": 24,
   "padding_left": 0,
   "padding_top_mobile": 16,
   "padding_right_mobile": 0,
   "padding_bottom_mobile": 16,
   "padding_left_mobile": 0
  }
 },
 "17879326565d1f9488": {
  "id": "17879326565d1f9488",
  "type": "apps",
  "settings": {
   "anchor_id": "",
   "include_margins": true,
   "show_divider": false,
   "padding_top": 36,
   "padding_bottom": 36
  },
  "blocks": [
   {
    "id": "judge_me_reviews_all_reviews_page_7KXftU",
    "type": "shopify://apps/judge-me-reviews/blocks/all_reviews_page/61ccd3b1-a9f2-4160-9fe9-4fec8413e5d8",
    "settings": {
     "max_width": 1200,
     "review_source": "all",
     "show_all_reviews_in_same_tab": false,
     "show_first": "product",
     "empty_state": "empty_widget"
    }
   },
   {
    "id": "judge_me_reviews_store_summary_AKt9Fe",
    "type": "shopify://apps/judge-me-reviews/blocks/store_summary/61ccd3b1-a9f2-4160-9fe9-4fec8413e5d8",
    "disabled": true,
    "settings": {
     "data_source": "sample",
     "theme": "expanded",
     "button_theme_color": "#ffffff",
     "button_theme_text_color": "#000000",
     "show_keywords": true,
     "keywords_visibility": "shown",
     "show_button": true,
     "button_visibility": "shown",
     "alignment": "left",
     "title_size": "default",
     "text_size": "default",
     "corner_styling": "soft",
     "widget_color": "#f9f9f9",
     "text_color": "#000000",
     "lighter_text_color": "#787878",
     "button_color": "#108474",
     "button_text_color": "#ffffff",
     "show_sentiment_colors": false,
     "max_width": 1100,
     "heading_text": "Customers rate this store",
     "button_text": "See AI reviews summary"
    }
   },
   {
    "id": "judge_me_reviews_review_widget_homepage_zJUwGR",
    "type": "shopify://apps/judge-me-reviews/blocks/review_widget_homepage/61ccd3b1-a9f2-4160-9fe9-4fec8413e5d8",
    "disabled": true,
    "settings": {
     "product": "",
     "review_data": "sample_data",
     "max_width": 1200
    }
   },
   {
    "id": "judge_me_reviews_review_widget_homepage_HtTga4",
    "type": "shopify://apps/judge-me-reviews/blocks/review_widget_homepage/61ccd3b1-a9f2-4160-9fe9-4fec8413e5d8",
    "disabled": true,
    "settings": {
     "product": "",
     "review_data": "sample_data",
     "max_width": 1200
    }
   },
   {
    "id": "judge_me_reviews_reviews_grid_widget_wdJUGL",
    "type": "shopify://apps/judge-me-reviews/blocks/reviews_grid_widget/61ccd3b1-a9f2-4160-9fe9-4fec8413e5d8",
    "disabled": true,
    "settings": {
     "show_sample_reviews": true,
     "review_selection": "product_reviews",
     "products": [],
     "filter_pinned": true,
     "filter_featured": true,
     "filter_custom_tags": "",
     "show_media_only": false,
     "display_order": "media_first",
     "card_grouping": "per_review",
     "columns_desktop": 3,
     "rows_desktop": 3,
     "columns_mobile": "2",
     "rows_mobile": 6,
     "show_stars": true,
     "show_reviewer_name": true,
     "show_review_title_on_hover_desktop": true,
     "max_width": 1100,
     "corner_styling": "soft",
     "card_spacing": "medium",
     "header_text_color": "#000000",
     "star_and_reviewer_name_color": "#f9f9f9",
     "drop_shadow_color": "#000000",
     "overlay_and_background_color": "#5368c2",
     "content_color": "#f9f9f9",
     "header_text": "From our customers",
     "show_average_rating": true,
     "rating_display": "default"
    }
   }
  ]
 },
 "faq_eTJqpc": {
  "id": "faq_eTJqpc",
  "type": "faq",
  "custom_css": [
   "h2 {font-family: \"sofia-pro\", sans-serif;}"
  ],
  "name": "t:sections.faq.presets.name",
  "settings": {
   "narrow": false,
   "secondary_background": false,
   "show_divider": false,
   "heading": "FAQs",
   "heading_size": "h1",
   "heading_alignment": "left",
   "heading_tag": "h2",
   "padding_top": 36,
   "padding_bottom": 36,
   "item_style": "card",
   "icon_style": "chevron",
   "single_open": false,
   "max_width": 1100,
   "item_gap": 10,
   "item_padding": 18,
   "item_radius": 16,
   "border_width": 1,
   "icon_size": 32,
   "primary_color": "#486ced",
   "item_bg_color": "#ffffff",
   "item_border_color": "#cccccc",
   "question_text_color": "#2c3e50",
   "answer_text_color": "#2c3e50",
   "icon_bg_color": "#eef2ff",
   "icon_color": "#486ced",
   "icon_bg_color_open": "#486ced",
   "icon_color_open": "#ffffff",
   "question_font_size": 18,
   "question_weight": 700,
   "answer_font_size": 15
  },
  "blocks": [
   {
    "id": "question_VdL6zP",
    "type": "question",
    "repeater": "{{ page.metafields.custom.section_faq.value.list_of_faq_blocks.value }}",
    "settings": {
     "title": "{{ block.repeater.question.value }}",
     "text": "{{ block.repeater.answer | metafield_tag }}"
    }
   }
  ]
 }
};
export const ORDER = ["fd_countdown_bar","temp_replo_hero_Femkti","quiz_buy_box","custom_liquid_V3FUrH","timeline_section_xei4R8","accordion_block_HznRip","temp_science_module_wWLDWj","homepage_trust_section_iTcHJQ","temp_benefits_split_W9myQm","accordion_block_HhfaTG","pbfcm_comparison_table_NTeG66","frontrowmd_clinicians_reviews_URAENC","17879326565d1f9488","faq_eTJqpc"];

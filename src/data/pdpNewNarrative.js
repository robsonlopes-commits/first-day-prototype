// Section instances for the new PDP (template product.uniified-default-v2): jump nav, brand narrative, problem signs.
// Settings are the template JSON; Liquid metafield expressions are replaced by the copy/media rendered on
// https://firstday.com/products/kids-enrichment-vitamin (product metafields section_why_first_day / section_problems).
import { extImg } from '../lib/assets.js';

export const JUMP_NAV_PDP_NEW = {
  "id": "fd_pdp_jump_nav",
  "type": "fd-pdp-jump-nav",
  "settings": {
    "nav_label": "On this page",
    "font_family": "'sofia-pro', sans-serif",
    "font_size_desktop": 16,
    "font_size_mobile": 14,
    "font_weight": 600,
    "line_height": 1.4,
    "item_gap_desktop": 0,
    "active_color": "#476ded",
    "inactive_color": "#2c3d50",
    "bar_bg_color": "#ffffff",
    "padding_top_desktop": 12,
    "padding_right_desktop": 0,
    "padding_bottom_desktop": 0,
    "padding_left_desktop": 0,
    "padding_top_mobile": 12,
    "padding_right_mobile": 0,
    "padding_bottom_mobile": 0,
    "padding_left_mobile": 0
  },
  "blocks": [
    {
      "id": "fd_jn_why",
      "type": "link",
      "settings": {
        "title": "Why First Day",
        "key": "why-first-day"
      }
    },
    {
      "id": "fd_jn_warning",
      "type": "link",
      "settings": {
        "title": "Warning Signs",
        "key": "warning-signs"
      }
    },
    {
      "id": "fd_jn_dosage",
      "type": "link",
      "settings": {
        "title": "Dosage Risks",
        "key": "dosage-risks"
      }
    },
    {
      "id": "fd_jn_root",
      "type": "link",
      "settings": {
        "title": "Root Causes",
        "key": "root-causes"
      }
    },
    {
      "id": "fd_jn_formula",
      "type": "link",
      "settings": {
        "title": "Our Formula",
        "key": "our-formula"
      }
    },
    {
      "id": "fd_jn_ingredients",
      "type": "link",
      "settings": {
        "title": "Our Ingredients",
        "key": "our-ingredients"
      }
    },
    {
      "id": "fd_jn_criteria",
      "type": "link",
      "settings": {
        "title": "Our Criteria",
        "key": "our-criteria"
      }
    },
    {
      "id": "fd_jn_shop_now",
      "type": "link",
      "settings": {
        "title": "Shop Now",
        "key": "#top"
      }
    }
  ]
};

export const BRAND_NARRATIVE_PDP_NEW = {
  "id": "fd_brand_narrative_AzFhNn",
  "type": "fd-brand-narrative",
  "settings": {
    "anchor_id": "why-first-day",
    "heading": "[#1 Fastest Growing] Teens & Kids Vitamin",
    "heading_tag": "h2",
    "heading_font_family": "'sofia-pro', sans-serif",
    "heading_font_size_desktop": 38,
    "heading_font_size_mobile": 26,
    "heading_font_weight": 500,
    "heading_font_weight_mobile": 700,
    "heading_line_height": 1.4,
    "heading_font_color": "#2c3d50",
    "heading_highlight_color": "#776cb1",
    "heading_highlight_weight": 700,
    "image": extImg('firstday.com/cdn/shop/files/First_Day_Banner.png'),
    "show_image_mobile": false,
    "media_width": 380,
    "media_height": 320,
    "media_radius": 8,
    "item_inner_gap": 16,
    "item_padding_inline": 16,
    "copy_gap": 8,
    "icon_disc": 80,
    "icon_glyph_size": 42,
    "icon_disc_bg": "#776cb10d",
    "icon_color": "#776cb1",
    "point_title_font_family": "'sofia-pro', sans-serif",
    "point_title_font_size_desktop": 20,
    "point_title_font_size_mobile": 20,
    "point_title_font_weight": 700,
    "point_title_line_height": 1.4,
    "point_title_font_color": "#2c3d50",
    "point_body_font_family": "'sofia-pro', sans-serif",
    "point_body_font_size_desktop": 15,
    "point_body_font_size_mobile": 15,
    "point_body_font_weight": 300,
    "point_body_line_height": 1.5,
    "point_body_font_color": "#2c3d50",
    "cta_text": "Start Today",
    "cta_url": "#top",
    "show_cta_desktop": false,
    "content_gap_desktop": 32,
    "content_gap_mobile": 32,
    "item_gap_desktop": 32,
    "item_gap_mobile": 32,
    "column_gap": 12,
    "column_width": 361,
    "container_max_width_desktop": 1280,
    "padding_top_desktop": 40,
    "padding_right_desktop": 0,
    "padding_bottom_desktop": 64,
    "padding_left_desktop": 0,
    "padding_top_mobile": 52,
    "padding_right_mobile": 16,
    "padding_bottom_mobile": 32,
    "padding_left_mobile": 16,
    "section_bg_color": "#ffffff"
  },
  "blocks": [
    {
      "id": "fd_narrative_point_GrUMVb",
      "type": "fd-narrative-point",
      "settings": {
        "column": "left",
        "icon": "shield",
        "icon_image": extImg('firstday.com/cdn/shop/files/fd-narrative-icon-shield.svg'),
        "custom_icon_color": "#776cb1",
        "title": "Guaranteed results",
        "body": "<p>Try it worry-free with a 45-day money back guarantee.</p>"
      }
    },
    {
      "id": "fd_narrative_point_GmNchB",
      "type": "fd-narrative-point",
      "settings": {
        "column": "left",
        "icon": "science",
        "icon_image": extImg('firstday.com/cdn/shop/files/fd-narrative-icon-science.svg'),
        "custom_icon_color": "#776cb1",
        "title": "The Latest Science",
        "body": "<p>Backed by experts, we combed through 35,000+ pediatric studies.</p>"
      }
    },
    {
      "id": "fd_narrative_point_z46QQw",
      "type": "fd-narrative-point",
      "settings": {
        "column": "right",
        "icon": "sugar",
        "icon_image": extImg('firstday.com/cdn/shop/files/fd-narrative-icon-sugar.svg'),
        "custom_icon_color": "#776cb1",
        "title": "Up To 75% Less Sugar",
        "body": "<p>We rely on real fruit like strawberries &amp; oranges.</p>"
      }
    },
    {
      "id": "fd_narrative_point_yAq9yy",
      "type": "fd-narrative-point",
      "settings": {
        "column": "right",
        "icon": "veggies",
        "icon_image": extImg('firstday.com/cdn/shop/files/fd-narrative-icon-veggies.svg'),
        "custom_icon_color": "#776cb1",
        "title": "21 Organic Superfoods",
        "body": "<p>Every gummy is packed with antioxidants and phytonutrients.</p>"
      }
    }
  ]
};

export const PROBLEM_SIGNS_PDP_NEW = {
  "id": "fd_problem_signs_aLMBHN",
  "type": "fd-problem-signs",
  "settings": {
    "anchor_id": "warning-signs",
    "content_layout": "row",
    "padding_top_desktop": 64,
    "padding_right_desktop": 32,
    "padding_bottom_desktop": 64,
    "padding_left_desktop": 32,
    "padding_top_mobile": 24,
    "padding_right_mobile": 16,
    "padding_bottom_mobile": 24,
    "padding_left_mobile": 16,
    "section_bg_color": "#f2fbff",
    "container_max_width_desktop": 1312,
    "wave_top": true,
    "wave_bottom": true,
    "wave_color": "#f2fbff",
    "wave_height": 33,
    "content_gap_desktop": 20,
    "content_gap_mobile": 20,
    "block_gap_desktop": 20,
    "block_gap_mobile": 20,
    "block_width_mobile": 280,
    "list_aria_label": "Signs your kid may be falling behind",
    "heading": "3 Signs Your Kid May Be Falling Behind. [See Results in Just a Few Weeks.]",
    "heading_font_family": "'sofia-pro', sans-serif",
    "heading_font_size_desktop": 32,
    "heading_font_size_mobile": 25,
    "heading_font_weight": 500,
    "heading_line_height": 1.3,
    "heading_font_color": "#2c3d50",
    "heading_highlight_color": "#776cb1",
    "card_bg_color": "#ffffff",
    "card_border_color": "#d7effa",
    "card_border_width": 1,
    "card_radius": 8,
    "card_padding": 16,
    "card_inner_gap": 12,
    "image_height_desktop": 170,
    "image_height_mobile": 170,
    "image_radius": 8,
    "number_size": 32,
    "number_bg_color": "rgba(0,0,0,0)",
    "number_border_color": "#2c3d50",
    "number_font_family": "'sofia-pro', sans-serif",
    "number_font_size_desktop": 16,
    "number_font_size_mobile": 16,
    "number_font_weight": 700,
    "number_font_color": "#2c3d50",
    "card_title_font_family": "'sofia-pro', sans-serif",
    "card_title_font_size_desktop": 16,
    "card_title_font_size_mobile": 16,
    "card_title_font_weight": 700,
    "card_title_font_color": "#2c3d50",
    "card_body_font_family": "'sofia-pro', sans-serif",
    "card_body_font_size_desktop": 16,
    "card_body_font_size_mobile": 16,
    "card_body_font_weight": 300,
    "card_body_font_color": "#2c3d50",
    "fact_bg_color": "#776cb112",
    "fact_radius": 8,
    "fact_padding": 16,
    "fact_gap": 8,
    "fact_label_font_family": "'sofia-pro', sans-serif",
    "fact_label_font_size_desktop": 14,
    "fact_label_font_size_mobile": 14,
    "fact_label_font_weight": 700,
    "fact_label_font_color": "#2c3d50",
    "fact_body_font_family": "'sofia-pro', sans-serif",
    "fact_body_font_size_desktop": 14,
    "fact_body_font_size_mobile": 14,
    "fact_body_font_weight": 400,
    "fact_body_font_color": "#2c3d50",
    "cta_text": "Don't Let Your Kid Fall Behind",
    "cta_url": "#product-purchase-content",
    "cta_bg_color": "#476ded",
    "cta_height": 48,
    "cta_radius": 100,
    "cta_font_family": "'sofia-pro', sans-serif",
    "cta_font_size_desktop": 18,
    "cta_font_size_mobile": 18,
    "cta_font_weight": 400,
    "cta_font_color": "#ffffff"
  },
  "blocks": [
    {
      "id": "fd_problem_sign_card_1",
      "type": "fd-problem-sign-card",
      "settings": {
        "image": extImg('firstday.com/cdn/shop/files/preview_images/d78d3c51888a43c0a6fb96a78cd8cd79.thumbnail.0000000000.jpg'),
        "video": extImg('firstday.com/cdn/shop/videos/c/vp/d78d3c51888a43c0a6fb96a78cd8cd79/d78d3c51888a43c0a6fb96a78cd8cd79.HD-720p-4.5Mbps-90957197.mp4'),
        "show_number": true,
        "title": "They Constantly Meltdown",
        "description": "<p>Mood swings and irritability usually point to a <strong>B6</strong> deficiency.</p>",
        "fact_label": "💡 Did You Know?",
        "fact_text": "<p>Most brands push B6 <strong>past 100% daily value</strong>. First Day doses it to what a growing body needs, enough to support the serotonin and dopamine behind mood.</p>"
      }
    },
    {
      "id": "fd_problem_sign_card_2",
      "type": "fd-problem-sign-card",
      "settings": {
        "image": extImg('firstday.com/cdn/shop/files/preview_images/c58143df4e23457cba9dde4300ec27eb.thumbnail.0000000000.jpg'),
        "video": extImg('firstday.com/cdn/shop/videos/c/vp/c58143df4e23457cba9dde4300ec27eb/c58143df4e23457cba9dde4300ec27eb.HD-720p-4.5Mbps-90957282.mp4'),
        "show_number": true,
        "title": "Their Speech Is Delayed",
        "description": "<p>Language delays are strongly correlated to low <strong>folate</strong>.</p>",
        "fact_label": "💡 Did You Know?",
        "fact_text": "<p>Most brands use folic acid, but up to <strong>40% of kids can't convert</strong> it into a usable form. First Day uses <strong>methylfolate</strong>, which is already active. No conversion required.</p>"
      }
    },
    {
      "id": "fd_problem_sign_card_3",
      "type": "fd-problem-sign-card",
      "settings": {
        "image": extImg('firstday.com/cdn/shop/files/preview_images/b615cd6f5a5c4fa7949ffff770460946.thumbnail.0000000000.jpg'),
        "video": extImg('firstday.com/cdn/shop/videos/c/vp/b615cd6f5a5c4fa7949ffff770460946/b615cd6f5a5c4fa7949ffff770460946.HD-720p-4.5Mbps-90957283.mp4'),
        "show_number": true,
        "title": "They Won't Touch Dinner",
        "description": "<p>Suppressed appetite is often a strong side of low <strong>B1 and B12.</strong></p>",
        "fact_label": "💡 Did You Know?",
        "fact_text": "<p>Most brands take an adult's B1 and B12 dose and scale it down. First Day researched the dose a kid's body <strong>actually needs</strong>, not simply shrunk from an adult's.</p>"
      }
    }
  ]
};

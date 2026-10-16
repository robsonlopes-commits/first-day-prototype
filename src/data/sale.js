// templates/page.bfcm-categories.json: temp-subnav section (blocks in block_order).
const pill = (id, label, icon, target_id) => ({
  id, type: 'pill',
  settings: { label, icon, target_id, link_url: '', is_default_active: false, use_custom_colors: false, custom_bg_color: '#ffffff', custom_border_color: '#e5e9f2', custom_text_color: '#3a475c', custom_active_bg_color: '#3b47d1', custom_active_text_color: '#ffffff' },
});

export const SALE_SUBNAV = {
  id: 'temp_subnav_4LbYmd',
  type: 'temp-subnav',
  settings: {
    show_heading: true, heading: '', heading_position: 'left', heading_font_family: 'Assistant', heading_italic: true, heading_font_weight: '500',
    heading_font_size_desktop: 16, heading_font_size_mobile: 14, aria_label: 'Shop by product', container: 'page', alignment: 'start', mobile_behavior: 'scroll',
    gap_heading_pills: 8, gap_pills: 10, gap_pills_mobile: 8,
    pill_font_family: 'Assistant', pill_font_weight: '600', pill_font_size_desktop: 14, pill_font_size_mobile: 12, pill_letter_spacing: 0,
    pill_style: 'outline', pill_size: 'md', pill_padding_x: 16, pill_padding_y: 10, pill_radius: 100, pill_border_width: 1, icon_size: 12, gap_icon_label: 5, active_style: 'tinted',
    bg_color: '#ffffff', heading_color: '#3a475c', pill_bg_color: '#ffffff', pill_border_color: '#e5e9f2', pill_text_color: '#3a475c',
    pill_hover_bg_color: '#f4f6fb', pill_hover_border_color: '#3b47d1', pill_hover_text_color: '#3b47d1',
    pill_active_bg_color: '#3b47d1', pill_active_border_color: '#3b47d1', pill_active_text_color: '#ffffff',
    pad_top_d: 28, pad_right_d: 100, pad_bottom_d: 28, pad_left_d: 100, pad_top_m: 14, pad_right_m: 16, pad_bottom_m: 10, pad_left_m: 16,
    sticky: true, sticky_offset_desktop: 76, sticky_offset_mobile: 0, jump_offset_desktop: 168, jump_offset_mobile: 92,
    show_divider: true, divider_color: '#e5e9f2', divider_width: 1, divider_style: 'solid',
  },
  blocks: [
    pill('pill_eRkkzD', 'Multis', '💊', 'vitamins'),
    pill('pill_9JqqcL', 'Calm', '🌙', 'magnesium'),
    pill('pill_eQWFUi', 'Brain', '🧠', 'brain'),
    pill('pill_XYAXU9', 'Probiotics', '🌱', 'probiotics'),
    pill('pill_zN74ED', 'Bundles', '📦', 'starterpacks'),
  ],
};

// {% style %} of blocks/temp_hero_list_item.liquid and blocks/temp-social-proof.liquid (bid = block id).
const listItem = (s, bid) => `
  .v1-hero-list-item-${bid} .v1-hero-list-text { font-size: ${s.text_size_desktop || 16}px; }
  @media (max-width: 990px) { .v1-hero-list-item-${bid} .v1-hero-list-text { font-size: ${s.text_size_mobile || 16}px; } }
`;

const socialProof = (s, bid) => `
  .social-proof-bar-${bid} {
    display: flex; justify-content: space-between; align-items: center; align-self: stretch;
    background: ${s.bg_color}; border-radius: 100px;
    padding: ${s.remove_padding ? '0px' : `${s.padding_top}px ${s.padding_right}px ${s.padding_bottom}px ${s.padding_left}px`};
    margin: ${s.margin_top_desktop}px ${s.margin_right_desktop}px ${s.margin_bottom_desktop}px ${s.margin_left_desktop}px;
    max-width: ${s.max_width}px;
  }
  .social-proof-bar__left-${bid} { display: flex; align-items: center; gap: 8px; }
  .social-proof-bar__icon-${bid} { font-size: 24px; line-height: 1; flex-shrink: 0; }
  .social-proof-bar__icon-img-${bid} { width: 24px; height: 24px; object-fit: contain; flex-shrink: 0; }
  .social-proof-bar__text-${bid} {
    font-family: "sofia-pro", sans-serif; font-size: ${s.text_size_desktop || 16}px; font-weight: 400; line-height: 1.4; color: #2C3D50;
    font-feature-settings: 'liga' off, 'clig' off; margin: 0;
  }
  .social-proof-bar__bold-${bid} { font-weight: 591; }
  .social-proof-bar__images-${bid} { display: flex; align-items: center; gap: 8px; padding-left: ${s.images_padding_left}px; }
  .social-proof-bar__img-${bid} { width: ${s.image_size}px; height: ${s.image_size}px; object-fit: contain; }
  @media (max-width: 990px) {
    .social-proof-bar-${bid} { margin: ${s.margin_top_mobile}px ${s.margin_right_mobile}px ${s.margin_bottom_mobile}px ${s.margin_left_mobile}px; }
    .social-proof-bar__icon-${bid} { font-size: 20px; }
    .social-proof-bar__text-${bid} { font-size: ${s.text_size_mobile || 16}px; }
  }
`;

export default { listItem, socialProof };

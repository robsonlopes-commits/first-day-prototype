import Img from '../components/Img.jsx';
import { settingImg } from '../lib/settingsImg.js';
import npCss from './fdNarrativePointCss.js';
import shieldSvg from './narrativeIcons/fd-narrative-icon-shield.svg?raw';
import scienceSvg from './narrativeIcons/fd-narrative-icon-science.svg?raw';
import sugarSvg from './narrativeIcons/fd-narrative-icon-sugar.svg?raw';
import veggiesSvg from './narrativeIcons/fd-narrative-icon-veggies.svg?raw';
import '../styles/ui-kit.css';
import '../styles/theme/fd-button.css';
import '../styles/theme/fd-brand-narrative.css';

// sections/fd-brand-narrative.liquid + blocks/fd-narrative-point.liquid.
// Props: { id, settings, blocks } as in the template JSON (src/data/pdpNewNarrative.js: BRAND_NARRATIVE_PDP_NEW).
// Block type 'fd-narrative-point': settings { column: left|right, icon: shield|science|sugar|veggies|none, icon_image, custom_icon_color, title, body (HTML) }.
const GLYPHS = { shield: shieldSvg, science: scienceSvg, sugar: sugarSvg, veggies: veggiesSvg };

function NarrativePoint({ block }) {
  const s = block.settings;
  const column = s.column || 'left';
  const icon = s.icon || 'none';
  const iconImage = settingImg(s.icon_image);
  const glyph = !iconImage && GLYPHS[icon];
  const hasIcon = iconImage || glyph;
  const cls = `fd-np-${block.id}`;
  return (
    <>
      <style>{npCss(block.id, s.custom_icon_color)}</style>
      <div className={`fd-np ${cls} ${cls}--${column} fd-np--${column}`} data-icon={icon}>
        {hasIcon && (
          <span className="fd-np__icon" aria-hidden="true">
            {iconImage ? (
              s.custom_icon_color
                ? <span className="fd-np__icon-mask" style={{ '--fd-np-custom-icon-mask': `url('${iconImage}')` }} />
                : <Img className="fd-np__icon-img" src={iconImage} alt="" loading="lazy" />
            ) : (
              <span className="fd-np__icon-glyph" dangerouslySetInnerHTML={{ __html: glyph }} />
            )}
          </span>
        )}
        {(s.title || s.body) && (
          <div className="fd-np__copy">
            {s.title && <h3 className="fd-np__title">{s.title}</h3>}
            {s.body && <div className="fd-np__body" dangerouslySetInnerHTML={{ __html: s.body }} />}
          </div>
        )}
      </div>
    </>
  );
}

export default function FdBrandNarrative({ id = 'fd_brand_narrative', settings: s = {}, blocks = [] }) {
  const Heading = s.heading_tag || 'h2';
  const image = settingImg(s.image);
  const parts = (s.heading || '').split('[');
  const bnClass = ['fd-bn', image && 'fd-bn--has-media', s.show_image_mobile && image && 'fd-bn--show-media-mobile'].filter(Boolean).join(' ');
  const cssVars = {
    '--fd-bn-padding-top-desktop': `${s.padding_top_desktop}px`,
    '--fd-bn-padding-right-desktop': `${s.padding_right_desktop}px`,
    '--fd-bn-padding-bottom-desktop': `${s.padding_bottom_desktop}px`,
    '--fd-bn-padding-left-desktop': `${s.padding_left_desktop}px`,
    '--fd-bn-padding-top-mobile': `${s.padding_top_mobile}px`,
    '--fd-bn-padding-right-mobile': `${s.padding_right_mobile}px`,
    '--fd-bn-padding-bottom-mobile': `${s.padding_bottom_mobile}px`,
    '--fd-bn-padding-left-mobile': `${s.padding_left_mobile}px`,
    '--fd-bn-bg-color': s.section_bg_color,
    '--fd-bn-container-max-width': `${s.container_max_width_desktop}px`,
    '--fd-bn-content-gap-desktop': `${s.content_gap_desktop}px`,
    '--fd-bn-content-gap-mobile': `${s.content_gap_mobile}px`,
    '--fd-bn-column-gap': `${s.column_gap}px`,
    '--fd-bn-col-width': `${s.column_width}px`,
    '--fd-bn-item-gap-desktop': `${s.item_gap_desktop}px`,
    '--fd-bn-item-gap-mobile': `${s.item_gap_mobile}px`,
    '--fd-bn-heading-font-family': s.heading_font_family,
    '--fd-bn-heading-font-size-desktop': `${s.heading_font_size_desktop}px`,
    '--fd-bn-heading-font-size-mobile': `${s.heading_font_size_mobile}px`,
    '--fd-bn-heading-font-weight': s.heading_font_weight,
    '--fd-bn-heading-font-weight-mobile': s.heading_font_weight_mobile,
    '--fd-bn-heading-line-height': s.heading_line_height,
    '--fd-bn-heading-font-color': s.heading_font_color,
    '--fd-bn-heading-highlight-color': s.heading_highlight_color,
    '--fd-bn-heading-highlight-weight': s.heading_highlight_weight,
    '--fd-bn-media-width': `${s.media_width}px`,
    '--fd-bn-media-height': `${s.media_height}px`,
    '--fd-bn-media-radius': `${s.media_radius}px`,
    '--fd-np-item-inner-gap': `${s.item_inner_gap}px`,
    '--fd-np-item-padding-inline': `${s.item_padding_inline}px`,
    '--fd-np-copy-gap': `${s.copy_gap}px`,
    '--fd-np-icon-disc': `${s.icon_disc}px`,
    '--fd-np-icon-disc-bg': s.icon_disc_bg,
    '--fd-np-icon-color': s.icon_color,
    '--fd-np-icon-glyph-size': `${s.icon_glyph_size}px`,
    '--fd-np-title-font-family': s.point_title_font_family,
    '--fd-np-title-font-size-desktop': `${s.point_title_font_size_desktop}px`,
    '--fd-np-title-font-size-mobile': `${s.point_title_font_size_mobile}px`,
    '--fd-np-title-font-weight': s.point_title_font_weight,
    '--fd-np-title-line-height': s.point_title_line_height,
    '--fd-np-title-font-color': s.point_title_font_color,
    '--fd-np-body-font-family': s.point_body_font_family,
    '--fd-np-body-font-size-desktop': `${s.point_body_font_size_desktop}px`,
    '--fd-np-body-font-size-mobile': `${s.point_body_font_size_mobile}px`,
    '--fd-np-body-font-weight': s.point_body_font_weight,
    '--fd-np-body-line-height': s.point_body_line_height,
    '--fd-np-body-font-color': s.point_body_font_color,
  };
  return (
    <div id={`shopify-section-${id}`} className="shopify-section fd-brand-narrative-section">
      {s.anchor_id ? <div id={s.anchor_id} className="fd-jump-anchor" /> : null}
      <div className={bnClass} id={`fd-bn-${id}`} style={cssVars}>
        <div className="fd-bn__inner">
          {s.heading && (
            <Heading className="fd-bn__heading">
              {parts.map((part, i) => {
                if (part.includes(']')) {
                  const [hl, rest] = part.split(']');
                  return <span key={i}><span className="fd-bn__heading-highlight">{hl}</span>{rest}</span>;
                }
                return part;
              })}
            </Heading>
          )}
          {(image || blocks.length > 0) && (
            <div className="fd-bn__stage">
              {image && (
                <div className="fd-bn__media">
                  <Img className="fd-bn__media-img" src={image} alt={s.image_alt || ''} width={s.media_width || 380} height={s.media_height || 320} loading="lazy" decoding="async" />
                </div>
              )}
              {blocks.length > 0 && (
                <div className="fd-bn__points">
                  {blocks.map((b) => <NarrativePoint key={b.id} block={b} />)}
                </div>
              )}
            </div>
          )}
          {s.cta_text && (
            <a className={`fd-bn__cta${s.show_cta_desktop ? '' : ' fd-bn__cta--mobile-only'} fd-btn fd-btn--large fd-btn--primary fd-btn-shape--pill`} href={s.cta_url || '#'}>
              <span className="fd-btn-text">{s.cta_text}</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

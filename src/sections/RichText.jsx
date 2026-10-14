import '../styles/theme/section-rich-text.css';
import '../styles/theme/component-rte.css';
import Waves from '../components/Waves.jsx';
import { settingImg } from '../lib/settingsImg.js';
import scopeCustomCss from '../lib/scopeCustomCss.js';

// sections/rich-text.liquid. Props: { id, settings, blocks, custom_css } as in the template JSON
// (blocks: heading | subheading | text | custom_liquid | image | button; custom_css = the section's "custom_css" rule array).
const rgb = (hex) => {
  const h = String(hex || '').replace('#', '');
  const f = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  return [0, 2, 4].map((i) => parseInt(f.slice(i, i + 2), 16)).join(', ');
};
const accent = (html) => String(html || '').replace('[', '<span class="rt-accent">').replace(']', '</span>');
const esc = (t) => String(t || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const fontStyle = (s) => {
  const st = {};
  if (s.font_family) st.fontFamily = s.font_family;
  if (s.font_size) st.fontSize = s.font_size;
  if (s.line_height) st.lineHeight = s.line_height;
  if (s.font_weight) st.fontWeight = s.font_weight;
  return Object.keys(st).length ? st : undefined;
};

const sectionCss = (s, id) => `
  #shopify-section-${id} {
    --section-padding-top: ${s.padding_top}px;
    --section-padding-right: ${s.padding_right || 0}px;
    --section-padding-bottom: ${s.padding_bottom}px;
    --section-padding-left: ${s.padding_left || 0}px;
    --section-padding-right-m: ${s.padding_right_mobile || 0}px;
    --section-padding-left-m: ${s.padding_left_mobile || 0}px;
    --rt-accent-color: ${s.colors_accent_text || '#486CED'};
    ${s.use_custom_colors ? `
      --gradient-background: ${s.gradient_background || s.colors_background};
      --color-background: ${rgb(s.colors_background)};
      --color-foreground: ${rgb(s.colors_text)};
      --color-link: var(--color-foreground);
      --color-border: var(--color-foreground);
      --color-heading: var(--color-foreground);
      --color-button-background: ${rgb(s.colors_button_background)};
      --color-button-text: ${rgb(s.colors_button_label)};
      --color-button-border: var(--color-button-background);` : ''}
  }
  #shopify-section-${id} .rich-text__image-block { text-align: var(--rt-image-align, left); margin: var(--rt-image-margin-top, 0px) var(--rt-image-margin-right, 0px) var(--rt-image-margin-bottom, 0px) var(--rt-image-margin-left, 0px); }
  #shopify-section-${id} .rich-text__image-block img { width: var(--rt-image-width, auto); max-width: var(--rt-image-max-width, 100%); height: auto; display: inline-block; }
  @media (max-width: 749px) {
    #shopify-section-${id} .rich-text__image-block { text-align: var(--rt-image-align-mobile, left); margin: var(--rt-image-margin-top-mobile, 0px) var(--rt-image-margin-right-mobile, 0px) var(--rt-image-margin-bottom-mobile, 0px) var(--rt-image-margin-left-mobile, 0px); }
    #shopify-section-${id} .rich-text__image-block img { width: var(--rt-image-width-mobile, auto); max-width: var(--rt-image-max-width-mobile, 100%); }
    #shopify-section-${id} .rich-text { padding-left: var(--section-padding-left-m) !important; padding-right: var(--section-padding-right-m) !important; }
  }
  ${s.bg_image_desktop ? `#shopify-section-${id} .rich-text { background-image: url('${settingImg(s.bg_image_desktop)}'); background-size: ${s.bg_image_size || 'cover'}; background-position: ${s.bg_image_position || 'center center'}; background-repeat: no-repeat; }` : ''}
  ${s.bg_image_mobile ? `@media (max-width: 749px) { #shopify-section-${id} .rich-text { background-image: url('${settingImg(s.bg_image_mobile)}'); background-size: ${s.bg_image_size_mobile || 'cover'}; background-position: ${s.bg_image_position_mobile || 'center center'}; background-repeat: no-repeat; } }` : ''}
  .rt-accent { color: var(--rt-accent-color, #486CED); }
  #shopify-section-${id} .rich-text__text a:not(.button),
  #shopify-section-${id} .rich-text__heading a:not(.button),
  #shopify-section-${id} .rich-text__subheading a:not(.button) { color: var(--rt-accent-color, #486CED); }
`;

function Block({ b }) {
  const s = b.settings;
  switch (b.type) {
    case 'heading': {
      const Tag = s.heading_tag || 'h2';
      return <Tag className={`rich-text__heading ${s.heading_size}`} style={fontStyle(s)} dangerouslySetInnerHTML={{ __html: accent(esc(s.heading)) }} />;
    }
    case 'subheading':
      return <p className={`rich-text__subheading${s.secondary_color ? ' rich-text__subheading--colored' : ''} ${s.subheading_size}`} style={s.font_family ? { fontFamily: s.font_family } : undefined} dangerouslySetInnerHTML={{ __html: accent(esc(s.subheading)) }} />;
    case 'text':
      return <div className={`rich-text__text${s.secondary_color ? ' rich-text__text--colored' : ''} ${s.text_size} rte`} style={fontStyle(s)} dangerouslySetInnerHTML={{ __html: accent(s.text) }} />;
    case 'custom_liquid':
      return <div className="rich-text__text rte" style={s.font_family ? { fontFamily: s.font_family } : undefined} dangerouslySetInnerHTML={{ __html: s.custom_liquid }} />;
    case 'image': {
      if (!s.image) return null;
      const v = {
        '--rt-image-align': s.alignment, '--rt-image-align-mobile': s.alignment_mobile,
        '--rt-image-width': s.width_desktop, '--rt-image-max-width': s.max_width_desktop,
        '--rt-image-width-mobile': s.width_mobile, '--rt-image-max-width-mobile': s.max_width_mobile,
        '--rt-image-margin-top': `${s.margin_top_desktop || 0}px`, '--rt-image-margin-right': `${s.margin_right_desktop || 0}px`,
        '--rt-image-margin-bottom': `${s.margin_bottom_desktop || 0}px`, '--rt-image-margin-left': `${s.margin_left_desktop || 0}px`,
        '--rt-image-margin-top-mobile': `${s.margin_top_mobile || 0}px`, '--rt-image-margin-right-mobile': `${s.margin_right_mobile || 0}px`,
        '--rt-image-margin-bottom-mobile': `${s.margin_bottom_mobile || 0}px`, '--rt-image-margin-left-mobile': `${s.margin_left_mobile || 0}px`,
      };
      return <div className="rich-text__image-block" style={v}><img src={settingImg(s.image)} alt="" loading="lazy" /></div>;
    }
    case 'button': {
      if (!s.button_label) return null;
      const link = s.button_link ? { href: s.button_link } : { role: 'link', 'aria-disabled': 'true' };
      const st = s.font_family ? { fontFamily: s.font_family } : undefined;
      return s.button_style_secondary ? (
        <a className={`button button--cta button--${s.button_size}`} {...link} style={st}>
          <span className="label">{s.button_label}</span>
          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" className="icon icon-arrow" fill="none" viewBox="0 0 14 10">
            <path fillRule="evenodd" clipRule="evenodd" d="M8.537.808a.5.5 0 01.817-.162l4 4a.5.5 0 010 .708l-4 4a.5.5 0 11-.708-.708L11.793 5.5H1a.5.5 0 010-1h10.793L8.646 1.354a.5.5 0 01-.109-.546z" fill="currentColor" />
          </svg>
        </a>
      ) : <a className={`button button--${s.button_size}`} {...link} style={st}>{s.button_label}</a>;
    }
    default: return null;
  }
}

export default function RichText({ id, settings: s, blocks = [], custom_css: customCss }) {
  const custom = `${s.use_custom_colors ? ' rich-text--colored' : ''}${s.horizontal_content ? ' rich-text--horizontal' : ''}`;
  const bg = s.enable_background_color ? s.section_background_color : undefined;
  const body = (
    <>
      {s.anchor_id ? <div id={s.anchor_id} className="fd-jump-anchor" /> : null}
      {s.top_waves ? <Waves position="top" color={s.background_color} containerBackground={s.wavesTopBackgroundColor} /> : null}
      <div style={{ backgroundColor: bg, paddingTop: s.top_waves ? '40px' : '0', paddingBottom: s.bottom_waves ? '40px' : '0' }}>
        <div className={`page-width${s.narrow ? ' page-width--inner' : ''}`}>
          <div className={`rich-text section--padding${custom}`} style={{ backgroundColor: bg, paddingLeft: 'var(--section-padding-left)', paddingRight: 'var(--section-padding-right)' }}>
            <div className={`rich-text__blocks ${s.text_alignment} mobile-${s.mobile_text_alignment}`}>
              {blocks.map((b) => <Block key={b.id} b={b} />)}
            </div>
          </div>
        </div>
      </div>
      {s.bottom_waves ? <Waves position="bottom" color={s.background_color} containerBackground={s.wavesBottomBackgroundColor} /> : null}
    </>
  );
  return (
    <div id={`shopify-section-${id}`} className="shopify-section section">
      <style>{sectionCss(s, id)}{scopeCustomCss(customCss, id)}</style>
      {s.show_divider ? <div className="section--divider">{body}</div> : body}
    </div>
  );
}

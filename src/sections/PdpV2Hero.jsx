import { settingImg } from '../lib/settingsImg.js';
import heroCss, { richTextCss, pillCss } from './pdpV2HeroCss.js';

// sections/pdp-v2-hero.liquid with its theme blocks (blocks/fd-rich-text.liquid, blocks/pill-button.liquid).
// Props: { id, settings, blocks } as in the template JSON (metafield expressions resolved in src/data/pdpNewTwoUp.js).
// Background images are plain paths/URLs (settings.background_image_desktop / _mobile).
function PillButton({ b }) {
  const s = b.settings;
  const st = {
    '--ap-bg': s.bg_color || '#ffffff', '--ap-text': s.text_color || '#000000', '--ap-border': s.border_color || '#000000',
    '--ap-bg-h': s.hover_bg_color || s.bg_color || '#ffffff', '--ap-text-h': s.hover_text_color || s.text_color || '#000000', '--ap-border-h': s.hover_border_color || s.border_color || '#000000',
    '--ap-bw': `${s.border_width || 0}px`, '--ap-br': `${s.border_radius || 999}px`, '--ap-bs': s.border_style || 'solid',
    '--ap-ff': s.font_family || 'inherit', '--ap-fs-d': `${s.font_size_desktop || 14}px`, '--ap-fs-m': `${s.font_size_mobile || 12}px`,
    '--ap-fw': s.font_weight || 600, '--ap-tt': s.text_transform || 'none', '--ap-ls': `${s.letter_spacing || 0}em`, '--ap-lh': s.line_height || 1,
    '--ap-py-d': `${s.padding_y_desktop || 8}px`, '--ap-py-m': `${s.padding_y_mobile || 6}px`, '--ap-px-d': `${s.padding_x_desktop || 16}px`, '--ap-px-m': `${s.padding_x_mobile || 12}px`,
    '--ap-min-h-d': `${s.min_height_desktop || 0}px`, '--ap-min-h-m': `${s.min_height_mobile || 0}px`,
    '--ap-gap-d': `${s.icon_gap_desktop || 6}px`, '--ap-gap-m': `${s.icon_gap_mobile || 4}px`,
    '--ap-icon-d': `${s.icon_size_desktop || 14}px`, '--ap-icon-m': `${s.icon_size_mobile || 12}px`,
    '--ap-trans': `${s.transition_ms || 200}ms`, '--ap-mt': `${s.margin_top || 0}px`,
  };
  const inner = (
    <>
      {s.left_emoji ? <span className="a-pill__emoji a-pill__emoji--left" aria-hidden="true">{s.left_emoji}</span> : null}
      {s.label ? <span className="a-pill__label">{s.label}</span> : null}
      {s.right_emoji ? <span className="a-pill__emoji a-pill__emoji--right" aria-hidden="true">{s.right_emoji}</span> : null}
    </>
  );
  const cls = `a-pill a-ticker__pill a-pill--shadow-${s.shadow || 'none'}`;
  const jump = (e) => {
    if (s.link && s.link.startsWith('#')) {
      const el = document.querySelector(s.link);
      if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth' }); }
    }
  };
  return s.link
    ? <a className={cls} href={s.link} style={st} onClick={jump} {...(s.open_in_new_tab ? { target: '_blank', rel: 'noopener' } : {})}>{inner}</a>
    : <span className={cls} style={st}>{inner}</span>;
}

export default function PdpV2Hero({ id, settings: s, blocks = [] }) {
  const bgDesktop = settingImg(s.background_image_desktop);
  const bgMobile = settingImg(s.background_image_mobile) || bgDesktop;
  const style = {
    '--pvh-padding-top-desktop': `${s.padding_top_desktop}px`, '--pvh-padding-right-desktop': `${s.padding_right_desktop}px`,
    '--pvh-padding-bottom-desktop': `${s.padding_bottom_desktop}px`, '--pvh-padding-left-desktop': `${s.padding_left_desktop}px`,
    '--pvh-padding-top-mobile': `${s.padding_top_mobile}px`, '--pvh-padding-right-mobile': `${s.padding_right_mobile}px`,
    '--pvh-padding-bottom-mobile': `${s.padding_bottom_mobile}px`, '--pvh-padding-left-mobile': `${s.padding_left_mobile}px`,
    '--pvh-bg-color': s.background_color, '--pvh-overlay-color': s.overlay_color, '--pvh-overlay-opacity': `${s.overlay_opacity}%`,
    '--pvh-min-height-desktop': `${s.min_height_desktop}px`, '--pvh-min-height-mobile': `${s.min_height_mobile}px`,
    '--pvh-container-max-width': `${s.container_max_width_desktop}px`, '--pvh-content-max-width-desktop': `${s.content_max_width_desktop}px`,
    '--pvh-content-gap-desktop': `${s.content_gap_desktop}px`, '--pvh-content-gap-mobile': `${s.content_gap_mobile}px`,
  };
  const loading = s.above_the_fold ? 'eager' : 'lazy';
  return (
    <div id={`shopify-section-${id}`} className="shopify-section pdp-v2-hero-section">
      <style>{heroCss(s, id)}{pillCss}{blocks.filter((b) => b.type === 'fd-rich-text').map((b) => richTextCss(b.settings, b.id)).join('\n')}</style>
      {s.anchor_id ? <div id={s.anchor_id} className="fd-jump-anchor" /> : null}
      <section className={`pdp-v2-hero pdp-v2-hero--align-${s.content_alignment}`} id={`pdp-v2-hero-${id}`} style={style}>
        {bgDesktop ? (
          <>
            <img className="pdp-v2-hero__bg pdp-v2-hero__bg--desktop" src={bgDesktop} alt="" loading={loading} />
            <img className="pdp-v2-hero__bg pdp-v2-hero__bg--mobile" src={bgMobile} alt="" loading={loading} />
          </>
        ) : null}
        {s.overlay_opacity > 0 ? <div className="pdp-v2-hero__overlay" aria-hidden="true" /> : null}
        <div className="pdp-v2-hero__inner">
          <div className="pdp-v2-hero__container">
            <div className="pdp-v2-hero__content">
              {blocks.map((b) => (
                <div key={b.id} id={`shopify-block-${b.id}`} className="shopify-block">
                  {b.type === 'fd-rich-text' && (
                    <div className={`fd-rich-text fd-rich-text-${b.id}`}>
                      <div className="metafield-rich_text_field" dangerouslySetInnerHTML={{ __html: b.settings.content }} />
                    </div>
                  )}
                  {b.type === 'pill-button' && <PillButton b={b} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';
import { settingImg } from '../lib/settingsImg.js';
import twoUpCss from './pdpV2TwoUpCss.js';

// sections/pdp-v2-two-up.liquid (+ snippet waves, fd-jump-anchor, assets/ptu-media.js).
// Props: { id, settings, blocks } as in the template JSON (metafield expressions already resolved in src/data/pdpNewTwoUp.js).
// settings.video is a plain URL (mp4); settings.image is a local/remote image path or a shopify://shop_images/ value.
const WAVE_D = 'M73.6677 10.5832C59.2917 17.0477 47.9595 19.4642 38.3536 19.4642C24.6496 19.4642 14.4507 14.5522 3.90915 9.4692C3.34514 9.19819 2.77775 8.92129 2.20736 8.64291C1.47625 8.2861 0.740205 7.92688 0 7.57458V36V44.4057V84H277V36H276.785V7.57897C258.768 -0.604741 247.642 -5.41585 212.06 10.5832C197.684 17.0477 186.352 19.4642 176.746 19.4642C163.042 19.4642 152.843 14.5522 142.302 9.4692C141.738 9.19822 141.17 8.92134 140.6 8.64299L140.6 8.64294C139.869 8.28612 139.133 7.92689 138.393 7.57458V7.57897C120.375 -0.604741 109.25 -5.41585 73.6677 10.5832Z';

// snippets/waves.liquid
function Waves({ position, color, containerBackground }) {
  const style = position === 'top'
    ? { display: 'flex', width: '100%', paddingTop: 15, background: containerBackground, zIndex: -1, marginBottom: -1 }
    : { display: 'flex', width: '100%', paddingTop: 15, background: containerBackground, transform: 'rotate(180deg)', zIndex: -1, marginTop: -1, position: 'relative' };
  return (
    <div className="waves" style={style}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="100%" viewBox="0 0 277 22">
        <path fillRule="evenodd" clipRule="evenodd" d={WAVE_D} fill={color} />
      </svg>
    </div>
  );
}

// ptu-media custom element: video layered over the image, revealed once it can play.
function Media({ s }) {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);
  const image = settingImg(s.image);
  useEffect(() => {
    const v = ref.current;
    if (!v) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { v.pause(); return undefined; }
    const on = () => setReady(true);
    const off = () => setReady(false);
    if (v.readyState >= 3) on();
    v.addEventListener('canplay', on);
    v.addEventListener('error', off);
    if (s.video_autoplay) v.play?.().catch(() => {});
    return () => { v.removeEventListener('canplay', on); v.removeEventListener('error', off); };
  }, [s.video, s.video_autoplay]);
  return (
    <div className={`pdp-v2-two-up__media${ready ? ' is-video-ready' : ''}`}>
      {image
        ? <img className="pdp-v2-two-up__image" src={image} alt={s.image_alt || ''} loading="lazy" />
        : <div className="pdp-v2-two-up__image pdp-v2-two-up__image--placeholder" aria-hidden="true" />}
      {s.video && (
        <video ref={ref} className="pdp-v2-two-up__video" src={s.video} poster={image || settingImg(s.video_poster)}
          {...(s.video_autoplay ? { loop: true, muted: true, playsInline: true, preload: 'none' } : { controls: true, preload: 'metadata' })} />
      )}
    </div>
  );
}

function Heading({ text }) {
  // [bracketed] text takes the accent colour / weight
  const parts = text.split('[');
  return (
    <h2 className="pdp-v2-two-up__heading">
      {parts.map((part, i) => {
        if (part.includes(']')) {
          const [accent, rest] = part.split(']');
          return <span key={i}><span className="pdp-v2-two-up__heading-accent">{accent}</span>{rest}</span>;
        }
        return part;
      })}
    </h2>
  );
}

export default function PdpV2TwoUp({ id, settings: s, blocks = [], custom_css }) {
  const highlights = blocks.filter((b) => b.type === 'highlight');
  const style = {
    '--ptu-padding-top-desktop': `${s.padding_top_desktop}px`,
    '--ptu-padding-right-desktop': `${s.padding_right_desktop}px`,
    '--ptu-padding-bottom-desktop': `${s.padding_bottom_desktop}px`,
    '--ptu-padding-left-desktop': `${s.padding_left_desktop}px`,
    '--ptu-padding-top-mobile': `${s.padding_top_mobile}px`,
    '--ptu-padding-right-mobile': `${s.padding_right_mobile}px`,
    '--ptu-padding-bottom-mobile': `${s.padding_bottom_mobile}px`,
    '--ptu-padding-left-mobile': `${s.padding_left_mobile}px`,
    '--ptu-bg-color': s.section_bg_color,
    '--ptu-container-max-width': `${s.container_max_width_desktop}px`,
    '--ptu-card-bg-color-desktop': s.card_bg_color_desktop,
    '--ptu-card-bg-color-mobile': s.card_bg_color_mobile,
    '--ptu-card-border-color-desktop': s.card_border_color_desktop,
    '--ptu-card-border-color-mobile': s.card_border_color_mobile,
    '--ptu-card-border-width': `${s.card_border_width}px`,
    '--ptu-card-radius': `${s.card_radius}px`,
    '--ptu-card-padding-desktop': `${s.card_padding_desktop}px`,
    '--ptu-card-padding-mobile': `${s.card_padding_mobile}px`,
    '--ptu-card-gap-desktop': `${s.card_gap_desktop}px`,
    '--ptu-card-gap-mobile': `${s.card_gap_mobile}px`,
    '--ptu-content-gap-desktop': `${s.content_gap_desktop}px`,
    '--ptu-media-width-desktop': `${s.media_width_desktop}px`,
    '--ptu-media-height-desktop': `${s.media_height_desktop}px`,
    '--ptu-media-height-mobile': `${s.media_height_mobile}px`,
    ...(s.media_aspect_mobile ? { '--ptu-media-aspect-mobile': s.media_aspect_mobile } : {}),
    '--ptu-media-radius': `${s.media_radius}px`,
    '--ptu-badge-bg-color': s.badge_bg_color,
    '--ptu-badge-radius': `${s.badge_radius}px`,
    '--ptu-badge-padding-x': `${s.badge_padding_x}px`,
    '--ptu-badge-padding-y': `${s.badge_padding_y}px`,
    '--ptu-badge-font-family': s.badge_font_family,
    '--ptu-badge-font-size-desktop': `${s.badge_font_size_desktop}px`,
    '--ptu-badge-font-size-mobile': `${s.badge_font_size_mobile}px`,
    '--ptu-badge-font-weight': s.badge_font_weight,
    '--ptu-badge-font-color': s.badge_font_color,
    '--ptu-heading-font-family': s.heading_font_family,
    '--ptu-heading-font-size-desktop': `${s.heading_font_size_desktop}px`,
    '--ptu-heading-font-size-mobile': `${s.heading_font_size_mobile}px`,
    '--ptu-heading-font-weight': s.heading_font_weight,
    '--ptu-heading-font-color': s.heading_font_color,
    '--ptu-heading-accent-font-weight': s.heading_accent_font_weight,
    '--ptu-heading-accent-color': s.heading_accent_color,
    '--ptu-heading-line-height': s.heading_line_height,
    '--ptu-body-font-family': s.body_font_family,
    '--ptu-body-font-size-desktop': `${s.body_font_size_desktop}px`,
    '--ptu-body-font-size-mobile': `${s.body_font_size_mobile}px`,
    '--ptu-body-font-weight': s.body_font_weight,
    '--ptu-body-font-color': s.body_font_color,
    '--ptu-body-line-height': s.body_line_height,
    '--ptu-body-paragraph-gap': `${s.body_paragraph_gap}px`,
    '--ptu-cta-bg-color': s.cta_bg_color,
    '--ptu-cta-radius': `${s.cta_radius}px`,
    '--ptu-cta-height': `${s.cta_height}px`,
    '--ptu-cta-font-family': s.cta_font_family,
    '--ptu-cta-font-size-desktop': `${s.cta_font_size_desktop}px`,
    '--ptu-cta-font-size-mobile': `${s.cta_font_size_mobile}px`,
    '--ptu-cta-font-weight': s.cta_font_weight,
    '--ptu-cta-font-color': s.cta_font_color,
    '--ptu-highlights-gap': `${s.highlights_gap}px`,
    '--ptu-highlights-margin-top': `${s.highlights_margin_top}px`,
  };
  const jump = (e) => {
    const href = s.cta_url;
    if (href && href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth' }); }
    }
  };
  return (
    <div id={`shopify-section-${id}`} className="shopify-section">
      <style>{twoUpCss(s, id)}{(custom_css || []).map((c) => `#shopify-section-${id} ${c}`).join('\n')}</style>
      {s.anchor_id ? <div id={s.anchor_id} className="fd-jump-anchor" /> : null}
      {s.wave_top && <Waves position="top" color={s.section_bg_color} containerBackground={s.wave_top_container_color} />}
      <section className={`pdp-v2-two-up pdp-v2-two-up--media-${s.media_position}`} id={`pdp-v2-two-up-${id}`} style={style}>
        <div className="pdp-v2-two-up__inner">
          <div className="pdp-v2-two-up__container">
            <div className="pdp-v2-two-up__card">
              <Media s={s} />
              <div className="pdp-v2-two-up__content">
                {s.badge_text ? <p className="pdp-v2-two-up__badge">{s.badge_text}</p> : null}
                {s.heading ? <Heading text={s.heading} /> : null}
                {s.body ? <div className="pdp-v2-two-up__body" dangerouslySetInnerHTML={{ __html: s.body }} /> : null}
                {s.cta_text ? (
                  <a className="pdp-v2-two-up__cta" href={s.cta_url || '#'} onClick={jump}>
                    <span className="pdp-v2-two-up__cta-text">{s.cta_text}</span>
                  </a>
                ) : null}
                {highlights.length > 0 && (
                  <ul className="pdp-v2-two-up__highlights" role="list">
                    {highlights.map((b) => (
                      <li key={b.id} className="pdp-v2-two-up__highlight" style={{
                        '--ptu-highlight-icon-size': `${b.settings.icon_size}px`,
                        '--ptu-highlight-font-family': b.settings.font_family,
                        '--ptu-highlight-font-size-desktop': `${b.settings.font_size_desktop}px`,
                        '--ptu-highlight-font-size-mobile': `${b.settings.font_size_mobile}px`,
                        '--ptu-highlight-font-weight': b.settings.font_weight,
                        '--ptu-highlight-font-color': b.settings.font_color,
                      }}>
                        {b.settings.icon ? <img className="pdp-v2-two-up__highlight-icon" src={settingImg(b.settings.icon)} alt="" loading="lazy" /> : null}
                        <span className="pdp-v2-two-up__highlight-text">{b.settings.text}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      {s.wave_bottom && <Waves position="bottom" color={s.section_bg_color} containerBackground={s.wave_bottom_container_color} />}
    </div>
  );
}

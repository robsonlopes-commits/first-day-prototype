import { useEffect, useRef } from 'react';
import Img from '../components/Img.jsx';
import { settingImg } from '../lib/settingsImg.js';
import css from './fdProblemSignsCss.js';
import '../styles/ui-kit.css';
import '../styles/theme/fd-problem-sign-card.css';

// sections/fd-problem-signs.liquid + snippets/fd-problem-sign-card.liquid + snippets/fd-wave-svg.liquid.
// Shared by the new PDP and the landing page (page.lp-BTS-master): fully driven by { id, settings, blocks }.
//   settings: as in the template JSON (content_layout 'row' | 'stack', wave_top/wave_bottom/wave_color/wave_height, block_width_mobile, card_*, fact_*, cta_* ...).
//   blocks: [{ id, type: 'fd-problem-sign-card', settings: { image, video, show_number, title, description (HTML), fact_label, fact_text (HTML) } }]
//   image: shopify://shop_images/x, /assets/... local path or http(s) URL. video: mp4 URL (image = poster).
export function FdWaveSvg({ fill = 'currentColor' }) {
  return (
    <svg className="fd-wave-svg" width="393" height="33" viewBox="0 0 393 33" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path fillRule="evenodd" clipRule="evenodd" d="M104.518 4.15768C84.1214 6.69731 68.0436 7.64665 54.415 7.64665C34.9722 7.64665 20.5023 5.71693 5.54619 3.72004C4.74599 3.61357 3.941 3.50479 3.13174 3.39543C2.09446 3.25525 1.05018 3.11413 0 2.97573V14.1429V17.4451V33H393V14.1429H392.695V2.97745C367.133 -0.237579 351.348 -2.12766 300.865 4.15768C280.469 6.69731 264.391 7.64665 250.762 7.64665C231.32 7.64665 216.849 5.71693 201.894 3.72004C201.094 3.61358 200.288 3.50481 199.479 3.39546C198.442 3.25528 197.398 3.11413 196.348 2.97573V2.97745C170.785 -0.237579 155.001 -2.12766 104.518 4.15768Z" fill={fill} />
    </svg>
  );
}

// theme JS: video[data-fd-autoplay] plays while in view.
function CardVideo({ src, poster }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.play().catch(() => {}); else el.pause(); }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <video ref={ref} className="fd-psc-card__media" data-fd-autoplay loop muted playsInline preload="none" poster={poster}><source src={src} type="video/mp4" /></video>;
}

export function FdProblemSignCard({ settings: b }) {
  const image = settingImg(b.image);
  return (
    <article className="fd-psc-card">
      {b.video ? <CardVideo src={b.video} poster={image} />
        : image ? <Img className="fd-psc-card__media" src={image} alt={b.image_alt || ''} loading="lazy" />
          : <div className="fd-psc-card__media fd-psc-card__media--placeholder" aria-hidden="true" />}
      <div className="fd-psc-card__head">
        {b.show_number !== false && <span className="fd-psc-card__number" aria-hidden="true" />}
        {b.title && <h3 className="fd-psc-card__title">{b.title}</h3>}
      </div>
      {b.description && <div className="fd-psc-card__description" dangerouslySetInnerHTML={{ __html: b.description }} />}
      {(b.fact_label || b.fact_text) && (
        <div className="fd-psc-card__fact">
          {b.fact_label && <p className="fd-psc-card__fact-label">{b.fact_label}</p>}
          {b.fact_text && <div className="fd-psc-card__fact-body" dangerouslySetInnerHTML={{ __html: b.fact_text }} />}
        </div>
      )}
    </article>
  );
}

const px = (v) => (v === undefined || v === null || v === '' ? undefined : `${v}px`);

export default function FdProblemSigns({ id = 'fd_problem_signs', settings: s = {}, blocks = [] }) {
  const layout = s.content_layout || 'row';
  const isRow = layout === 'row';
  const parts = (s.heading || '').split('[');
  const vars = {
    '--fd-psc-padding-top-desktop': px(s.padding_top_desktop), '--fd-psc-padding-right-desktop': px(s.padding_right_desktop),
    '--fd-psc-padding-bottom-desktop': px(s.padding_bottom_desktop), '--fd-psc-padding-left-desktop': px(s.padding_left_desktop),
    '--fd-psc-padding-top-mobile': px(s.padding_top_mobile), '--fd-psc-padding-right-mobile': px(s.padding_right_mobile),
    '--fd-psc-padding-bottom-mobile': px(s.padding_bottom_mobile), '--fd-psc-padding-left-mobile': px(s.padding_left_mobile),
    '--fd-psc-bg-color': s.section_bg_color, '--fd-psc-container-max-width': px(s.container_max_width_desktop), '--fd-psc-wave-height': px(s.wave_height),
    '--fd-psc-content-gap-desktop': px(s.content_gap_desktop), '--fd-psc-content-gap-mobile': px(s.content_gap_mobile),
    '--fd-psc-block-gap-desktop': px(s.block_gap_desktop), '--fd-psc-block-gap-mobile': px(s.block_gap_mobile), '--fd-psc-block-width-mobile': px(s.block_width_mobile),
    '--fd-psc-heading-font-family': s.heading_font_family, '--fd-psc-heading-font-size-desktop': px(s.heading_font_size_desktop), '--fd-psc-heading-font-size-mobile': px(s.heading_font_size_mobile),
    '--fd-psc-heading-font-weight': s.heading_font_weight, '--fd-psc-heading-font-color': s.heading_font_color, '--fd-psc-heading-highlight-color': s.heading_highlight_color, '--fd-psc-heading-line-height': s.heading_line_height,
    '--fd-psc-card-bg-color': s.card_bg_color, '--fd-psc-card-border-color': s.card_border_color, '--fd-psc-card-border-width': px(s.card_border_width), '--fd-psc-card-radius': px(s.card_radius),
    '--fd-psc-card-padding': px(s.card_padding), '--fd-psc-card-inner-gap': px(s.card_inner_gap),
    '--fd-psc-image-height-desktop': px(s.image_height_desktop), '--fd-psc-image-height-mobile': px(s.image_height_mobile), '--fd-psc-image-radius': px(s.image_radius),
    '--fd-psc-number-size': px(s.number_size), '--fd-psc-number-border-color': s.number_border_color, '--fd-psc-number-bg-color': s.number_bg_color,
    '--fd-psc-number-font-family': s.number_font_family, '--fd-psc-number-font-size-desktop': px(s.number_font_size_desktop), '--fd-psc-number-font-size-mobile': px(s.number_font_size_mobile),
    '--fd-psc-number-font-weight': s.number_font_weight, '--fd-psc-number-font-color': s.number_font_color,
    '--fd-psc-card-title-font-family': s.card_title_font_family, '--fd-psc-card-title-font-size-desktop': px(s.card_title_font_size_desktop), '--fd-psc-card-title-font-size-mobile': px(s.card_title_font_size_mobile),
    '--fd-psc-card-title-font-weight': s.card_title_font_weight, '--fd-psc-card-title-font-color': s.card_title_font_color,
    '--fd-psc-card-body-font-family': s.card_body_font_family, '--fd-psc-card-body-font-size-desktop': px(s.card_body_font_size_desktop), '--fd-psc-card-body-font-size-mobile': px(s.card_body_font_size_mobile),
    '--fd-psc-card-body-font-weight': s.card_body_font_weight, '--fd-psc-card-body-font-color': s.card_body_font_color,
    '--fd-psc-fact-bg-color': s.fact_bg_color, '--fd-psc-fact-radius': px(s.fact_radius), '--fd-psc-fact-padding': px(s.fact_padding), '--fd-psc-fact-gap': px(s.fact_gap),
    '--fd-psc-fact-label-font-family': s.fact_label_font_family, '--fd-psc-fact-label-font-size-desktop': px(s.fact_label_font_size_desktop), '--fd-psc-fact-label-font-size-mobile': px(s.fact_label_font_size_mobile),
    '--fd-psc-fact-label-font-weight': s.fact_label_font_weight, '--fd-psc-fact-label-font-color': s.fact_label_font_color,
    '--fd-psc-fact-body-font-family': s.fact_body_font_family, '--fd-psc-fact-body-font-size-desktop': px(s.fact_body_font_size_desktop), '--fd-psc-fact-body-font-size-mobile': px(s.fact_body_font_size_mobile),
    '--fd-psc-fact-body-font-weight': s.fact_body_font_weight, '--fd-psc-fact-body-font-color': s.fact_body_font_color,
    '--fd-psc-cta-bg-color': s.cta_bg_color, '--fd-psc-cta-radius': px(s.cta_radius), '--fd-psc-cta-height': px(s.cta_height),
    '--fd-psc-cta-font-family': s.cta_font_family, '--fd-psc-cta-font-size-desktop': px(s.cta_font_size_desktop), '--fd-psc-cta-font-size-mobile': px(s.cta_font_size_mobile),
    '--fd-psc-cta-font-weight': s.cta_font_weight, '--fd-psc-cta-font-color': s.cta_font_color,
  };
  Object.keys(vars).forEach((k) => vars[k] === undefined && delete vars[k]);
  const cards = blocks.filter((b) => b.type === 'fd-problem-sign-card' || !b.type);

  return (
    <div id={`shopify-section-${id}`} className="shopify-section fd-problem-section">
      <style>{css(s, id)}</style>
      {s.anchor_id ? <div id={s.anchor_id} className="fd-jump-anchor" /> : null}
      <section className={`fd-psc fd-psc--${layout}`} id={`fd-psc-${id}`} style={vars}>
        {s.wave_top && <div className="fd-psc__wave fd-psc__wave--top"><FdWaveSvg fill={s.wave_color} /></div>}
        <div className="fd-psc__inner">
          <div className="fd-psc__container">
            {s.heading && (
              <h2 className="fd-psc__heading">
                {parts.map((part, i) => {
                  if (part.includes(']')) {
                    const [hl, rest] = part.split(']');
                    return <span key={i}><span className="fd-psc__heading-highlight">{hl}</span>{rest}</span>;
                  }
                  return part;
                })}
              </h2>
            )}
            {cards.length > 0 && (
              <div className="fd-psc__list" {...(isRow ? { role: 'group', 'aria-label': s.list_aria_label, tabIndex: 0 } : {})}>
                {cards.map((b) => <FdProblemSignCard key={b.id} settings={b.settings} />)}
              </div>
            )}
            {s.cta_text && (
              <a className={s.fd_button ? 'fd-btn fd-btn--primary fd-btn--large fd-btn-shape--pill aio-cta aio-cta--center' : 'fd-psc__cta'} href={s.cta_url || '#'}><span className={s.fd_button ? 'fd-btn-text' : 'fd-psc__cta-text'}>{s.cta_text}</span></a>
            )}
          </div>
        </div>
        {s.wave_bottom && <div className="fd-psc__wave fd-psc__wave--bottom"><FdWaveSvg fill={s.wave_color} /></div>}
      </section>
    </div>
  );
}

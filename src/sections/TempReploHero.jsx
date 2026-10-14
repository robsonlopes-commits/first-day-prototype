import { useEffect, useRef } from 'react';
import Img from '../components/Img.jsx';
import { settingImg } from '../lib/settingsImg.js';
import customCss from '../lib/customCss.js';
import css from './tempReploHeroCss.js';
import blockCss from './tempReploHeroBlocksCss.js';
import './tempReploHeroBlocks.css';

// sections/temp-replo-hero.liquid (+ blocks temp_hero_list_item, temp-social-proof, temp-testimonial).
// Props = { id, settings, blocks } as in the template JSON; metafield-driven settings (headline, description, cta_text, hero_image,
// hero_video, ...) are already resolved by the caller (see src/data/landing.js). Used twice on page.lp-BTS-master (top hero + founder hero).
const STAR = 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z';
const ICONS = {
  star: STAR,
  credit_card: 'M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z',
  check: 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z',
  shield: 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z',
};
const Svg = ({ d }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d={d} /></svg>;

// "[x]" marks the highlighted part in headline / plain-text description
const bracket = (text, cls) => (text || '').split('[').map((part, i) => {
  if (i === 0) return part;
  const close = part.indexOf(']');
  return close === -1 ? `[${part}` : `<span class="${cls}">${part.slice(0, close)}</span>${part.slice(close + 1)}`;
}).join('');
const descHtml = (text) => {
  const t = (text || '').trim();
  if (!t) return '';
  if (t.includes('<p') || t.includes('<div')) return t;
  return `<p>${bracket(t, 'v1-hero-description-highlight').replace(/\n+/g, '</p><p>')}</p>`;
};
const Rich = ({ className, html }) => <div className={className} dangerouslySetInnerHTML={{ __html: `<div class="metafield-rich_text_field">${html}</div>` }} />;

// theme inline script: mark the hero video as playing (video is hidden until it plays)
function HeroVideo({ src, style, className }) {
  const ref = useRef(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return undefined;
    const show = () => v.classList.add('is-playing');
    v.addEventListener('playing', show);
    const t = setTimeout(show, 1500);
    const p = v.play();
    if (p && p.catch) p.catch(show);
    return () => { v.removeEventListener('playing', show); clearTimeout(t); };
  }, []);
  return <video ref={ref} className={className} autoPlay loop muted playsInline preload="auto" style={style}><source src={src} type="video/mp4" /></video>;
}

function Block({ b, sid }) {
  const s = b.settings;
  const bid = `${sid}__${b.id}`;
  if (b.disabled) return null;
  if (b.type === 'temp_hero_list_item') {
    return (
      <div id={`shopify-block-${bid}`} className="shopify-block">
        <style>{blockCss.listItem(s, bid)}</style>
        <div className={`v1-hero-list-item v1-hero-list-item-${bid}`}>
          <span className="v1-hero-list-icon">{ICONS[s.icon_type] && <Svg d={ICONS[s.icon_type]} />}</span>
          <span className="v1-hero-list-text">{s.list_text}</span>
        </div>
      </div>
    );
  }
  if (b.type === 'temp-social-proof') {
    return (
      <div id={`shopify-block-${bid}`} className="shopify-block">
        <style>{blockCss.socialProof(s, bid)}</style>
        <div className={`social-proof-bar-${bid}`}>
          <div className={`social-proof-bar__left-${bid}`}>
            {s.icon_image ? <img src={settingImg(s.icon_image)} alt="" className={`social-proof-bar__icon-img-${bid}`} width="24" height="24" loading="lazy" /> : <span className={`social-proof-bar__icon-${bid}`}>🔥</span>}
            <p className={`social-proof-bar__text-${bid}`}><span className={`social-proof-bar__bold-${bid}`}>{s.bold_text}</span> {s.text}</p>
          </div>
          <div className={`social-proof-bar__images-${bid}`}>
            {[s.image_1, s.image_2].filter(Boolean).map((im, i) => <img key={i} src={settingImg(im)} alt="" className={`social-proof-bar__img-${bid}`} loading="lazy" width="50" height="50" />)}
          </div>
        </div>
      </div>
    );
  }
  if (b.type === 'temp-testimonial') {
    if (!s.quote) return null;
    const rating = parseFloat(s.rating) || 0;
    const full = Math.floor(rating);
    const style = {
      '--tc-bg': s.bg_color || '#ffffff', '--tc-border': s.border_color || '#f1f1ef', '--tc-text': s.text_color || '#1a1a1a', '--tc-name': s.name_color || '#486ced',
      '--tc-star': s.star_color || '#2c3e50', '--tc-star-empty': s.star_empty_color || '#D4D4D4', '--tc-font': s.font_family || 'inherit',
      '--tc-quote-size-d': `${s.quote_size_desktop || 14}px`, '--tc-quote-size-m': `${s.quote_size_mobile || 13}px`, '--tc-name-size-d': `${s.name_size_desktop || 14}px`, '--tc-name-size-m': `${s.name_size_mobile || 13}px`,
      '--tc-quote-weight': s.quote_weight || 400, '--tc-quote-style': s.quote_style || 'normal', '--tc-avatar-d': `${s.avatar_size_desktop || 64}px`, '--tc-avatar-m': `${s.avatar_size_mobile || 56}px`,
      '--tc-star-d': `${s.star_size_desktop || 18}px`, '--tc-star-m': `${s.star_size_mobile || 16}px`, '--tc-radius': `${s.card_radius ?? 12}px`, '--tc-border-width': `${s.border_width ?? 1}px`,
      '--tc-pad-d': `${s.card_padding_desktop || 24}px`, '--tc-pad-m': `${s.card_padding_mobile || 16}px`, '--tc-gap': `${s.gap || 16}px`, '--tc-max-width': `${s.max_width || 600}px`,
      '--tc-verified': s.verified_color || '#486ced', '--tc-quote-lines': s.quote_max_lines || 4,
    };
    const layout = s.layout || 'horizontal';
    const starPath = 'M10 1.25l2.47 5.01 5.53.8-4 3.9.94 5.49L10 13.77l-4.94 2.68.94-5.49-4-3.9 5.53-.8L10 1.25z';
    return (
      <div id={`shopify-block-${bid}`} className="shopify-block">
        <div className={`tc-card tc-card--${layout}`} style={style}>
          {s.avatar && <div className="tc-card__avatar-wrap"><Img className="tc-card__avatar" src={settingImg(s.avatar)} alt={s.name} loading="lazy" width={s.avatar_size_desktop || 64} height={s.avatar_size_desktop || 64} /></div>}
          <div className="tc-card__body">
            <blockquote className="tc-card__quote" dangerouslySetInnerHTML={{ __html: `<div class="metafield-rich_text_field">${s.quote}</div>` }} />
            <div className="tc-card__footer">
              <div className="tc-card__author">
                <span className="tc-card__name">{s.name}</span>
                {s.show_verified_badge && (
                  <svg className="tc-card__verified" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-label="Verified">
                    <circle cx="8" cy="8" r="8" fill="var(--tc-verified)" />
                    <path d="M5 8.2l2 2 4-4.4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              {rating > 0 && (
                <div className="tc-card__stars" role="img" aria-label={`${s.rating} out of 5 stars`}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} className={`tc-card__star tc-card__star--${i <= full ? 'full' : 'empty'}`} viewBox="0 0 20 20"><path d={starPath} fill="currentColor" /></svg>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

export default function TempReploHero({ id, settings: s, blocks = [], video, mobileVideo }) {
  const hlevel = ['h1', 'h2'].includes((s.heading_level || 'h1').trim().toLowerCase()) ? (s.heading_level || 'h1').trim().toLowerCase() : 'h2';
  const Heading = hlevel;
  const px = (n) => `${n}px`;
  const vars = {
    '--section-margin-top-desktop': px(s.margin_top_desktop), '--section-margin-right-desktop': px(s.margin_right_desktop), '--section-margin-bottom-desktop': px(s.margin_bottom_desktop), '--section-margin-left-desktop': px(s.margin_left_desktop),
    '--section-padding-top-desktop': px(s.padding_top_desktop), '--section-padding-right-desktop': px(s.padding_right_desktop), '--section-padding-bottom-desktop': px(s.padding_bottom_desktop), '--section-padding-left-desktop': px(s.padding_left_desktop),
    '--section-margin-top-mobile': px(s.margin_top_mobile), '--section-margin-right-mobile': px(s.margin_right_mobile), '--section-margin-bottom-mobile': px(s.margin_bottom_mobile), '--section-margin-left-mobile': px(s.margin_left_mobile),
    '--section-padding-top-mobile': px(s.padding_top_mobile), '--section-padding-right-mobile': px(s.padding_right_mobile), '--section-padding-bottom-mobile': px(s.padding_bottom_mobile), '--section-padding-left-mobile': px(s.padding_left_mobile),
    '--section-bg-color': s.section_bg_color, '--section-border-radius': px(s.section_border_radius),
    '--container-gap-desktop': px(s.container_column_gap_desktop), '--container-gap-mobile': px(s.container_row_gap_mobile), '--container-max-width-desktop': px(s.container_max_width_desktop || 1344),
    '--content-gap-desktop': px(s.content_row_gap_desktop), '--content-gap-mobile': px(s.content_row_gap_mobile),
    '--stars-font-family': s.stars_font_family, '--stars-font-size-desktop': px(s.stars_font_size_desktop), '--stars-font-size-mobile': px(s.stars_font_size_mobile), '--stars-font-weight': s.stars_font_weight, '--stars-font-color': s.stars_font_color,
    '--stars-size-desktop': px(s.stars_size_desktop || 24), '--stars-size-mobile': px(s.stars_size_mobile || 18),
    '--headline-font-family': s.headline_font_family, '--headline-font-size-desktop': px(s.headline_font_size_desktop), '--headline-font-size-mobile': px(s.headline_font_size_mobile), '--headline-font-weight': s.headline_font_weight,
    '--headline-font-color': s.headline_font_color, '--headline-line-height': s.headline_line_height || 1.4, '--headline-highlight-color': s.headline_highlight_color,
    '--top-badge-bg': s.top_badge_bg_color, '--top-badge-text-color': s.top_badge_text_color, '--top-badge-font-family': s.top_badge_font_family, '--top-badge-font-size-desktop': px(s.top_badge_font_size_desktop), '--top-badge-font-size-mobile': px(s.top_badge_font_size_mobile), '--top-badge-font-weight': s.top_badge_font_weight, '--top-badge-radius': px(s.top_badge_radius),
    '--description-font-family': s.description_font_family, '--description-font-size-desktop': px(s.description_font_size_desktop), '--description-font-size-mobile': px(s.description_font_size_mobile), '--description-font-weight': s.description_font_weight, '--description-font-color': s.description_font_color,
    '--cta-font-family': s.cta_font_family, '--cta-font-size-desktop': px(s.cta_font_size_desktop), '--cta-font-size-mobile': px(s.cta_font_size_mobile), '--cta-font-weight': s.cta_font_weight, '--cta-font-color': s.cta_font_color, '--cta-bg-color': s.cta_bg_color, '--cta-shadow-color': s.cta_shadow_color,
    '--cta-margin-bottom-desktop': px(s.cta_margin_bottom_desktop || 0), '--cta-margin-bottom-mobile': px(s.cta_margin_bottom_mobile || 0), '--cta-margin-top-desktop': px(s.cta_margin_top_desktop || 0), '--cta-margin-top-mobile': px(s.cta_margin_top_mobile || 0),
    '--divider-color': s.divider_color,
    '--list-font-family': s.list_font_family, '--list-font-size-desktop': px(s.list_font_size_desktop), '--list-font-size-mobile': px(s.list_font_size_mobile), '--list-font-weight': s.list_font_weight, '--list-font-color': s.list_font_color, '--list-icon-color': s.list_icon_color,
    '--list-row-gap-desktop': px(s.list_row_gap_desktop), '--list-row-gap-mobile': px(s.list_row_gap_mobile),
    '--testimonial-font-family': s.testimonial_font_family, '--testimonial-font-size-desktop': px(s.testimonial_font_size_desktop), '--testimonial-font-size-mobile': px(s.testimonial_font_size_mobile), '--testimonial-font-weight': s.testimonial_font_weight, '--testimonial-font-color': s.testimonial_font_color, '--testimonial-border-color': s.testimonial_border_color,
    '--left-content-width-desktop': px(s.left_content_width_desktop), '--hero-image-max-width-desktop': px(s.hero_image_max_width_desktop),
    '--offer-badge-bg': s.offer_badge_bg_color, '--offer-badge-text-color': s.offer_badge_text_color, '--offer-badge-icon-color': s.offer_badge_icon_color, '--center-badge-bg': s.center_badge_bg_color, '--center-badge-text-color': s.center_badge_text_color,
    '--coupon-bg': s.coupon_bg_color, '--coupon-icon-bg': s.coupon_icon_bg_color, '--coupon-icon-color': s.coupon_icon_color, '--coupon-title-color': s.coupon_title_color, '--coupon-code-color': s.coupon_code_color, '--coupon-label-color': s.coupon_label_color,
    '--coupon-margin-top-desktop': px(s.coupon_padding_top_desktop), '--coupon-margin-bottom-desktop': px(s.coupon_padding_bottom_desktop), '--coupon-margin-top-mobile': px(s.coupon_padding_top_mobile), '--coupon-margin-bottom-mobile': px(s.coupon_padding_bottom_mobile),
    '--creator-quote-border-color': s.creator_quote_border_color, '--creator-quote-font-family': s.creator_quote_font_family, '--creator-quote-font-size-desktop': px(s.creator_quote_font_size_desktop), '--creator-quote-font-size-mobile': px(s.creator_quote_font_size_mobile),
    '--creator-quote-font-weight': s.creator_quote_font_weight, '--creator-quote-font-color': s.creator_quote_font_color,
    '--creator-quote-margin-top-desktop': px(s.creator_quote_padding_top_desktop), '--creator-quote-margin-bottom-desktop': px(s.creator_quote_padding_bottom_desktop), '--creator-quote-margin-top-mobile': px(s.creator_quote_padding_top_mobile), '--creator-quote-margin-bottom-mobile': px(s.creator_quote_padding_bottom_mobile),
    '--creator-handle-bg': s.creator_handle_bg_color, '--creator-handle-font-family': s.creator_handle_font_family, '--creator-handle-font-size-desktop': px(s.creator_handle_font_size_desktop), '--creator-handle-font-size-mobile': px(s.creator_handle_font_size_mobile),
    '--creator-handle-font-weight': s.creator_handle_font_weight, '--creator-handle-font-color': s.creator_handle_font_color,
    '--creator-handle-margin-top-desktop': px(s.creator_handle_padding_top_desktop), '--creator-handle-margin-bottom-desktop': px(s.creator_handle_padding_bottom_desktop), '--creator-handle-margin-top-mobile': px(s.creator_handle_padding_top_mobile), '--creator-handle-margin-bottom-mobile': px(s.creator_handle_padding_bottom_mobile),
  };
  const heroImage = settingImg(s.hero_image);
  const mobileImage = settingImg(s.hero_image_mobile) || heroImage;
  const hasVideo = !!video;
  const alt = s.hero_image_alt || 'Hero image';
  const loading = s.above_the_fold ? 'eager' : 'lazy';
  const headline = bracket(s.headline, 'v1-hero-headline-highlight');
  const desc = descHtml(s.description);
  const cta = s.cta_text && (
    <>
      <span className="v1-hero-cta-text">{s.cta_text}</span>
      {s.show_cta_arrow && <span className="v1-hero-cta-arrow"><Svg d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" /></span>}
    </>
  );
  const blockEls = blocks.filter((b) => !b.disabled).map((b) => <Block key={b.id} b={b} sid={id} />);
  const offer = s.show_offer_badge && (
    <div className="v1-hero-offer-badge" style={{ top: `${s.offer_badge_top}px` }}>
      <span className="v1-hero-offer-badge__icon">⏰</span>
      <span className="v1-hero-offer-badge__prefix">{s.offer_badge_prefix}</span>
      <span className="v1-hero-offer-badge__text">{s.offer_badge_text}</span>
    </div>
  );

  return (
    <div id={`shopify-section-${id}`} className="shopify-section v1-hero-block-section">
      <style>{css(s, id)}</style>
      <style>{'.v1-hero-description p { margin: 10px 0px 16px; }'}</style>
      <style>{customCss(id, s.custom_css)}</style>
      <section className="v1-hero-section" id="temp-replo-hero" style={vars}>
        <div className="v1-hero-container">
          <div className="v1-hero-left-content">
            <div className="v1-hero-text-section">
              {s.show_stars && (
                <div className="v1-hero-reviews-row">
                  <div className="v1-hero-stars">
                    {[1, 2, 3, 4, 5].map((i) => <span key={i} className="v1-hero-star"><Svg d={STAR} /></span>)}
                  </div>
                  {s.stars_text ? <span className="v1-hero-reviews-text">{s.stars_text}</span> : null}
                </div>
              )}
              {headline && <Heading className="v1-hero-headline" dangerouslySetInnerHTML={{ __html: headline }} />}
              {desc && <Rich className="v1-hero-description v1-hero-desktop-only" html={desc} />}
            </div>
            <div className={`v1-hero-creator-quote v1-hero-desktop-only${s.creator_quote ? '' : ' hidden'}`}><div className="v1-hero-creator-quote__text">{s.creator_quote}</div></div>
            <div className={`v1-hero-creator-handle v1-hero-desktop-only${s.creator_handle ? '' : ' hidden'}`}>{s.creator_handle}</div>
            {cta && <a href={s.cta_url} className="v1-hero-cta v1-hero-desktop-only">{cta}</a>}
            {s.show_divider && <div className="v1-hero-divider v1-hero-desktop-only" />}
            <div className="v1-hero-highlights v1-hero-desktop-only">
              <div className="v1-hero-list" />
              {blockEls}
            </div>
          </div>

          <div className="v1-hero-image-wrap v1-hero-desktop-only">
            <div className="v1-hero-image-inner">
              {hasVideo ? <HeroVideo className="v1-hero-image v1-hero-video" src={settingImg(video)} />
                : heroImage ? <picture className="v1-hero-image-picture"><Img src={heroImage} alt={alt} className="v1-hero-image" loading={loading} /></picture>
                  : <div className="v1-hero-image v1-hero-image-placeholder" />}
              {offer}
              {s.center_badge_text ? <div className="v1-hero-center-badge"><span>{s.center_badge_text}</span></div> : null}
            </div>
          </div>

          <div className="v1-hero-mobile-content v1-hero-mobile-only">
            {desc && s.description_above_image_mobile && <Rich className="v1-hero-description" html={desc} />}
            <div className={`v1-hero-image-wrap-mobile${s.mobile_image_full_width ? ' v1-hero-image-wrap-mobile--full' : ''}`}>
              <div className="v1-hero-image-inner">
                {(mobileVideo || video) ? <HeroVideo className="v1-hero-image v1-hero-image--mobile-auto v1-hero-video" src={settingImg(mobileVideo || video)} style={{ aspectRatio: 1 }} />
                  : mobileImage ? <picture className="v1-hero-image-picture"><Img src={mobileImage} alt={alt} className="v1-hero-image v1-hero-image--mobile-auto" loading={loading} /></picture>
                    : <div className="v1-hero-image v1-hero-image-placeholder" />}
                {offer}
                {s.center_badge_text ? <div className="v1-hero-center-badge"><span>{s.center_badge_text}</span></div> : null}
              </div>
            </div>
            {desc && !s.description_above_image_mobile && <Rich className="v1-hero-description" html={desc} />}
            <div className={`v1-hero-creator-quote${s.creator_quote ? '' : ' hidden'}`}><div className="v1-hero-creator-quote__text">{s.creator_quote}</div></div>
            <div className={`v1-hero-creator-handle${s.creator_handle ? '' : ' hidden'}`}>{s.creator_handle}</div>
            {cta && <a href={s.cta_url} className="v1-hero-cta v1-hero-cta-mobile">{cta}</a>}
            {s.show_divider && <div className="v1-hero-divider" />}
            <div className="v1-hero-highlights">
              <div className="v1-hero-list" />
              {blockEls}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

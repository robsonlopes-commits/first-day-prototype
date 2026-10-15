import { Link } from 'react-router-dom';
import { settingLink } from '../lib/settingsLink.js';
import { settingImg } from '../lib/settingsImg.js';
import { TEMP_HERO_HOME } from '../data/sharedSections.js';
import css from './tempHeroCss.js';
import '../styles/ui-kit.css';
import '../styles/theme/fd-button.css';

// sections/temp-hero.liquid. Props = { id, settings } as in the template JSON (TEMP_HERO_HOME / TEMP_HERO_PDP_NEW in src/data/sharedSections.js).
function Cta({ href, label, aria, style, icon }) {
  const cls = `temp-hero__button fd-btn fd-btn--large fd-btn--${style} fd-btn-shape--pill`;
  const to = settingLink(href);
  const inner = (
    <>
      <span className="fd-btn-text">{label}</span>
      {icon && (
        <span className="temp-hero__button-icon" aria-hidden="true">
          <svg viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 5.5h11M9 1.5l3.5 4-3.5 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
      )}
    </>
  );
  return to.startsWith('/') ? <Link className={cls} to={to} aria-label={aria || label}>{inner}</Link> : <a className={cls} href={to} aria-label={aria || label}>{inner}</a>;
}

export default function TempHero({ id = TEMP_HERO_HOME.id, settings: s = TEMP_HERO_HOME.settings }) {
  const Heading = s.heading_tag || 'h1';
  const hasRating = s.rating_value || s.rating_supporting;
  return (
    <div id={`shopify-section-${id}`} className="shopify-section">
      <style>{css(s, id)}</style>
      {s.anchor_id ? <div id={s.anchor_id} className="fd-jump-anchor" /> : null}
      <section id={id} className="temp-hero" aria-label={s.aria_label}>
        <div className="temp-hero__media" role="presentation">
          {s.enable_video && s.background_video && (
            <video className="temp-hero__video" autoPlay muted playsInline loop poster={settingImg(s.background_image)}><source src={s.background_video} type="video/mp4" /></video>
          )}
        </div>
        <div className={`temp-hero__inner${s.product_strip_image ? ' temp-hero__inner--with-products' : ''}`}>
          <div className="temp-hero__content">
            {s.badge_text && <div className="temp-hero__badge">{s.badge_text}</div>}
            <div className="temp-hero__text">
              {s.heading && <Heading className="temp-hero__heading" dangerouslySetInnerHTML={{ __html: s.heading }} />}
              {s.subheading && <p className="temp-hero__subhead temp-hero__helper">{s.subheading}</p>}
            </div>
            <div className="temp-hero__cta-row">
              <div className="temp-hero__actions">
                {s.button_text && <Cta href={s.button_link} label={s.button_text} aria={s.button_aria} style="primary" icon={s.button_show_icon} />}
                {s.secondary_text && <Cta href={s.secondary_link} label={s.secondary_text} aria={s.secondary_aria} style="secondary" />}
              </div>
              {hasRating && (
                <div className="temp-hero__rating" aria-label={s.rating_aria}>
                  <span className="temp-hero__stars" aria-hidden="true">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <span key={n} className="temp-hero__star"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z" /></svg></span>
                    ))}
                  </span>
                  <span>
                    {s.rating_value ? <><strong>{s.rating_value}</strong>{s.rating_label ? ` ${s.rating_label}` : ''}</> : s.rating_label}
                    {s.rating_supporting && (<>{(s.rating_value || s.rating_label) && <span aria-hidden="true"> | </span>}{s.rating_supporting}</>)}
                  </span>
                </div>
              )}
            </div>
          </div>
          {s.product_strip_image && (
            <div className="temp-hero__products"><img src={settingImg(s.product_strip_image)} alt={s.product_strip_alt} loading="lazy" /></div>
          )}
        </div>
      </section>
    </div>
  );
}

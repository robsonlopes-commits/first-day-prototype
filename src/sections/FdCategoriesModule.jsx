import { useRef } from 'react';
import Img from '../components/Img.jsx';
import SiteLink from '../layout/SiteLink.jsx';
import { settingImg } from '../lib/settingsImg.js';
import { HOME_CATEGORIES } from '../data/home.js';
import css from './fdCategoriesModuleCss.js';
import '../styles/theme/fd-categories-module.css';

// sections/fd-categories-module.liquid (+ snippet wave-svg): 4 image cards under a heading, then a wavy band with a scrolling benefits marquee.
// Props = { id, settings, blocks } (HOME_CATEGORIES in src/data/home.js).
const WAVE_D = 'M1512 384.5C1413.65 397.012 1351.75 404.704 1157.53 380.244C1079.06 370.361 1017.2 366.667 964.766 366.667C889.963 366.667 834.291 374.176 776.753 381.947C773.674 382.361 770.574 382.785 767.463 383.211C763.473 383.756 759.455 384.306 755.416 384.845V384.838C657.065 397.35 596.339 404.704 402.114 380.244C323.643 370.361 261.786 366.667 209.353 366.667C134.549 366.667 78.8788 374.176 21.3379 381.947C18.2593 382.362 15.1623 382.785 12.0488 383.211C8.05808 383.756 4.04039 384.306 0 384.845V11.9247C98.3455 -0.587059 160.25 -8.27977 354.474 16.1806C432.945 26.0639 494.8 29.7577 547.234 29.7577C622.037 29.7577 677.709 22.2487 735.247 14.4775C738.326 14.0632 741.426 13.6393 744.537 13.2138C748.527 12.6683 752.545 12.1186 756.584 11.58V11.5868C854.935 -0.924946 915.661 -8.27977 1109.89 16.1806C1188.36 26.0639 1250.21 29.7577 1302.65 29.7577C1377.45 29.7577 1433.12 22.2487 1490.66 14.4775C1493.74 14.0631 1496.84 13.6394 1499.95 13.2138C1503.94 12.6683 1507.96 12.1186 1512 11.58V384.5Z';

export default function FdCategoriesModule({ id = HOME_CATEGORIES.id, settings: s = HOME_CATEGORIES.settings, blocks = HOME_CATEGORIES.blocks }) {
  const ref = useRef(null);
  const cards = blocks.filter((b) => b.type === 'card').slice(0, 4);
  const benefits = blocks.filter((b) => b.type === 'benefit');
  const pause = (state) => ref.current?.querySelectorAll('.fd-categories-module__benefits-track').forEach((t) => { t.style.animationPlayState = state; });
  const vars = {
    '--fd-cm-pt': `${s.padding_top}px`, '--fd-cm-pb': `${s.padding_bottom}px`,
    '--fd-cm-pt-mobile': `${s.padding_top_mobile}px`, '--fd-cm-pb-mobile': `${s.padding_bottom_mobile}px`,
    '--fd-cm-gap-cards-benefits': `${s.gap_cards_benefits}px`,
    '--fd-cm-title-color': s.title_color, '--fd-cm-cards-text-color': s.cards_text_color, '--fd-cm-benefits-text-color': s.benefits_text_color,
    '--fd-cm-btn-text-color': s.button_text_color, '--fd-cm-btn-text-hover': s.button_text_hover_color,
    '--fd-cm-btn-bg': s.button_bg_color, '--fd-cm-btn-bg-hover': s.button_bg_hover_color,
    '--fd-cm-btn-border-color': s.button_border_color, '--fd-cm-btn-border-hover': s.button_border_hover_color,
    '--fd-cm-wave-color': s.wave_color,
    '--fd-cm-title-font': s.title_font_family, '--fd-cm-title-size': `${s.title_font_size}px`, '--fd-cm-title-size-mobile': `${s.title_font_size_mobile}px`,
    '--fd-cm-card-title-font': s.card_title_font_family, '--fd-cm-card-title-size': `${s.card_title_font_size}px`, '--fd-cm-card-title-size-mobile': `${s.card_title_font_size_mobile}px`,
    '--fd-cm-card-desc-font': s.card_description_font_family, '--fd-cm-card-desc-size': `${s.card_description_font_size}px`,
    '--fd-cm-card-desc-size-tablet': `${s.card_description_font_size_tablet}px`, '--fd-cm-card-desc-size-mobile': `${s.card_description_font_size_mobile}px`,
    '--fd-cm-benefit-font': s.benefit_font_family, '--fd-cm-benefit-size': `${s.benefit_font_size}px`, '--fd-cm-benefit-size-mobile': `${s.benefit_font_size_mobile}px`,
    '--fd-cm-btn-font': s.button_font_family, '--fd-cm-btn-size': `${s.button_font_size}px`, '--fd-cm-btn-size-mobile': `${s.button_font_size_mobile}px`,
  };
  return (
    <div id={`shopify-section-${id}`} className="shopify-section fd-categories-module-section">
      <style>{css(s, id)}</style>
      <section className="fd-categories-module" id={`fd-categories-module-${id}`} style={vars} ref={ref}>
        <div className="fd-categories-module__inner">
          {s.title && <div className="fd-categories-module__heading rte" dangerouslySetInnerHTML={{ __html: s.title }} />}
          <div className="fd-categories-module__grid">
            {cards.map((b) => {
              const c = b.settings;
              const label = c.button_text || 'Shop';
              return (
                <SiteLink key={b.id} href={c.button_link || '#'} className="fd-categories-module__card" aria-label={c.description || c.title || label}>
                  <picture className="fd-categories-module__card-picture">
                    {c.mobile_image && <source media="(max-width: 700px)" srcSet={settingImg(c.mobile_image)} />}
                    <Img src={settingImg(c.image || c.mobile_image)} className="fd-categories-module__card-img" alt={c.description} loading="lazy" />
                  </picture>
                  <div className="fd-categories-module__card-bottom">
                    <div className="fd-categories-module__card-text">
                      {c.title && <p className="fd-categories-module__card-title">{c.title}</p>}
                      {c.description && <p className="fd-categories-module__card-description">{c.description}</p>}
                    </div>
                    <span className="fd-categories-module__card-btn">{label}</span>
                  </div>
                </SiteLink>
              );
            })}
          </div>
        </div>

        {benefits.length > 0 && (
          <div className="fd-categories-module__wave-zone">
            <div className="fd-categories-module__wave-bg" aria-hidden="true">
              <svg className="wave-svg" width="1512" height="397" viewBox="0 0 1512 397" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d={WAVE_D} fill={s.wave_color} />
              </svg>
            </div>
            <div className="fd-categories-module__benefits" aria-label="Product benefits" onMouseEnter={() => pause('paused')} onMouseLeave={() => pause('running')}>
              <div className="fd-categories-module__benefits-track-wrap">
                {[1, 2].map((n) => (
                  <ul key={n} className="fd-categories-module__benefits-track" aria-hidden={n === 2 ? 'true' : undefined}>
                    {benefits.map((b) => (
                      <li key={b.id} className="fd-categories-module__benefit">
                        {b.settings.icon && <span className="fd-categories-module__benefit-icon"><Img src={settingImg(b.settings.icon)} alt="" width="24" height="24" loading="lazy" /></span>}
                        <span>{b.settings.text}</span>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

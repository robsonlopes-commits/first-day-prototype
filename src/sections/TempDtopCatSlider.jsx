import Img from '../components/Img.jsx';
import SiteLink from '../layout/SiteLink.jsx';
import { settingImg } from '../lib/settingsImg.js';
import { HOME_CAT_SLIDER } from '../data/home.js';
import css from './tempDtopCatSliderCss.js';

// sections/temp-dtop-cat-slider.liquid ("Shop For ..." cards; mobile = scroll-snap carousel). Props = { id, settings, blocks } (HOME_CAT_SLIDER).
export default function TempDtopCatSlider({ id = HOME_CAT_SLIDER.id, settings: s = HOME_CAT_SLIDER.settings, blocks = HOME_CAT_SLIDER.blocks }) {
  const header = s.header;
  return (
    <div id={`shopify-section-${id}`} className="shopify-section">
      <style>{css(s, id)}</style>
      <section className="desk-shopcards" id={`desk-shopcards-${id}`}>
        <div className="desk-shopcards__inner page-width">
          {(header || s.subheader) && (
            <div className="desk-shopcards__header">
              {header && <h2 className="desk-shopcards__header-title">{header}</h2>}
              {s.subheader && <div className="desk-shopcards__header-sub">{s.subheader}</div>}
            </div>
          )}
          <div className="desk-shopcards__grid">
            {blocks.map((b) => (
              <SiteLink key={b.id} className="desk-shopcards__card" href={b.settings.card_url || '#'} {...(b.settings.open_new_tab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                {b.settings.card_image && (
                  <div className="desk-shopcards__imgwrap">
                    <Img className="desk-shopcards__img" src={settingImg(b.settings.card_image)} alt={b.settings.card_title} loading="lazy" />
                  </div>
                )}
                <div className="desk-shopcards__text">
                  <div className="desk-shopcards__kicker">{s.kicker_text}</div>
                  <div className="desk-shopcards__title">{b.settings.card_title}</div>
                </div>
                <span className="desk-shopcards__arrow">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.9025 20.0848L15.1486 19.3028L19.9185 14.5329H6.0127V13.4561H19.9185L15.1486 8.68616L15.9025 7.91528L21.9873 14L15.9025 20.0848Z" fill="#2C3D50" /></svg>
                </span>
              </SiteLink>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

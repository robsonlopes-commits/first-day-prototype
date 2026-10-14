import Img from '../components/Img.jsx';
import SiteLink from '../layout/SiteLink.jsx';
import { settingImg } from '../lib/settingsImg.js';
import { settingLink } from '../lib/settingsLink.js';
import { resolveTokens } from '../lib/resolveTokens.js';
import { HOME_COUPON_BANNER } from '../data/home.js';
import css from './pbfcmCouponBannerCss.js';
import '../styles/fd-ui-kit.css';
import '../styles/theme/fd-button.css';
import '../styles/theme/pbfcm-coupon-banner.css';

// sections/pbfcm-coupon-banner.liquid (+ snippet pbfcm-coupon-ticket). Props = { id, settings } (HOME_COUPON_BANNER in src/data/home.js).
const STUB_D = 'M46 0.173828C44.8353 0.585942 44 1.69415 44 3C44 4.30574 44.8355 5.41299 46 5.8252V9.17383C44.8353 9.58594 44 10.6941 44 12C44 13.3057 44.8355 14.413 46 14.8252V18.1738C44.8353 18.5859 44 19.6941 44 21C44 22.3057 44.8355 23.413 46 23.8252V27.1738C44.8353 27.5859 44 28.6941 44 30C44 31.3057 44.8355 32.413 46 32.8252V36.1738C44.8353 36.5859 44 37.6941 44 39C44 40.3057 44.8355 41.413 46 41.8252V45.1738C44.8353 45.5859 44 46.6941 44 48C44 49.3057 44.8355 50.413 46 50.8252V54.1738C44.8353 54.5859 44 55.6941 44 57C44 58.3057 44.8355 59.413 46 59.8252V63.1738C44.8353 63.5859 44 64.6941 44 66C44 67.3057 44.8355 68.413 46 68.8252V72.1738C44.8353 72.5859 44 73.6941 44 75C44 76.3057 44.8355 77.413 46 77.8252V81.1738C44.8353 81.5859 44 82.6941 44 84C44 85.3057 44.8355 86.413 46 86.8252V90.1738C44.8353 90.5859 44 91.6941 44 93C44 94.3057 44.8355 95.413 46 95.8252V99.1738C44.8353 99.5859 44 100.694 44 102C44 102.769 44.2923 103.469 44.7686 104H4C1.79086 104 8.05332e-08 102.209 0 100V64C6.62742 64 12 58.6274 12 52C12 45.3726 6.62742 40 0 40V4C1.54624e-06 1.79086 1.79086 4.02661e-08 4 0H46V0.173828Z';
const BODY_D = 'M266 0C268.209 0 270 1.79086 270 4V40.041C269.67 40.0138 269.337 40 269 40C262.373 40 257 45.3726 257 52C257 58.6274 262.373 64 269 64C269.337 64 269.67 63.9852 270 63.958V100C270 102.209 268.209 104 266 104H0V0H266Z';

export default function PbfcmCouponBanner({ id = HOME_COUPON_BANNER.id, settings: s = HOME_COUPON_BANNER.settings }) {
  const hasMobileBg = !!s.background_image_mobile;
  const code = resolveTokens(s.coupon_code);
  const segments = (s.title || '').split('**');
  const vars = {
    '--pcb-pt': `${s.padding_top}px`, '--pcb-pb': `${s.padding_bottom}px`, '--pcb-max-width': `${s.container_max_width}px`,
    '--pcb-banner-height': `${s.banner_height}px`, '--pcb-banner-radius': `${s.banner_radius}px`, '--pcb-bg-fallback': s.background_color,
    '--pcb-title-size': `${s.title_size}px`, '--pcb-title-color': s.title_color,
    '--pcb-coupon-label-size': `${s.coupon_label_size}px`, '--pcb-coupon-title-size': `${s.coupon_title_size}px`, '--pcb-coupon-code-size': `${s.coupon_code_size}px`,
    '--pcb-button-font-size': `${s.button_font_size}px`,
    '--pcb-coupon-bg': s.coupon_bg_color, '--pcb-coupon-label-bg': s.coupon_label_bg_color, '--pcb-coupon-label-color': s.coupon_label_text_color,
    '--pcb-coupon-title-color': s.coupon_title_color, '--pcb-coupon-code-color': s.coupon_code_color,
    '--pcb-btn-bg': s.button_bg_color, '--pcb-btn-bg-hover': s.button_bg_hover_color, '--pcb-btn-border': s.button_border_color, '--pcb-btn-border-hover': s.button_border_hover_color,
    '--pcb-btn-text': s.button_text_color, '--pcb-btn-text-hover': s.button_text_hover_color,
  };
  return (
    <div id={`shopify-section-${id}`} className="shopify-section pbfcm-coupon-banner-section">
      <style>{css(s, id)}</style>
      <section className={`pbfcm-coupon-banner${hasMobileBg ? ' pbfcm-coupon-banner--has-mobile-bg' : ''}`} id={s.anchor_id || id} style={vars}>
        <div className="pbfcm-coupon-banner__container">
          <div className="pbfcm-coupon-banner__banner">
            <div className="pbfcm-coupon-banner__bg" aria-hidden="true">
              {s.background_image && <Img src={settingImg(s.background_image)} alt="" loading="lazy" className="pbfcm-coupon-banner__bg-image pbfcm-coupon-banner__bg-image--desktop" />}
              {s.background_image_mobile && <Img src={settingImg(s.background_image_mobile)} alt="" loading="lazy" className="pbfcm-coupon-banner__bg-image pbfcm-coupon-banner__bg-image--mobile" />}
            </div>
            <div className="pbfcm-coupon-banner__content">
              <div className="pbfcm-coupon-banner__content-left">
                {s.title && (
                  <h2 className="pbfcm-coupon-banner__title">
                    {segments.map((seg, i) => (seg ? (i % 2 === 1 ? <span key={i} className="pbfcm-coupon-banner__title-emphasis">{seg}</span> : seg) : null))}
                  </h2>
                )}
              </div>
              <div className="pbfcm-coupon-banner__content-right">
                {(s.coupon_title || code) && (
                  <div className="pbfcm-coupon-banner__coupon">
                    <div className="pbfcm-coupon-banner__coupon-left">
                      <svg className="pbfcm-coupon-banner__coupon-left-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46 104" fill="none" preserveAspectRatio="none" aria-hidden="true" focusable="false">
                        <path className="pbfcm-coupon-banner__coupon-left-fill" d={STUB_D} />
                      </svg>
                      {s.coupon_label && <span className="pbfcm-coupon-banner__coupon-label">{s.coupon_label}</span>}
                    </div>
                    <div className="pbfcm-coupon-banner__coupon-right">
                      <svg className="pbfcm-coupon-banner__coupon-right-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 270 104" fill="none" preserveAspectRatio="none" aria-hidden="true" focusable="false">
                        <path className="pbfcm-coupon-banner__coupon-right-fill" d={BODY_D} />
                      </svg>
                      <div className="pbfcm-coupon-banner__coupon-copy">
                        {s.coupon_title && <p className="pbfcm-coupon-banner__coupon-title" data-fd-offer-upto>{s.coupon_title}</p>}
                        {code && <p className="pbfcm-coupon-banner__coupon-code" data-fd-offer-code>{code}</p>}
                      </div>
                    </div>
                  </div>
                )}
                {s.button_text && (
                  <SiteLink href={settingLink(s.button_link)} className="pbfcm-coupon-banner__button fd-btn fd-btn--large fd-btn--primary fd-btn-shape--pill">
                    <span className="fd-btn-text">{s.button_text}</span>
                  </SiteLink>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

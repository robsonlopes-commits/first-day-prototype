import Img from '../components/Img.jsx';
import { settingImg } from '../lib/settingsImg.js';
import { resolveTokens } from '../lib/resolveTokens.js';
import { GIFT_PROGRESS_SALE } from '../data/sharedSections.js';
import css from './pbfcmGiftProgressCss.js';

// sections/pbfcm-gift-progress.liquid. The right-hand progress card is driven by the section settings
// (progress_percentage, gift_threshold, tooltip prices); the live cart-driven snippet (PBFCM-minicart-gift-progress) is not modelled.
// NOTE: in the reference screenshots of /pages/sale this section renders nothing (no active gift), so pass `show={false}` there.
export default function PbfcmGiftProgress({ id = GIFT_PROGRESS_SALE.id, settings = GIFT_PROGRESS_SALE.settings, show = true }) {
  const s = settings;
  if (!show) return null;
  return (
    <div id={`shopify-section-${id}`} className="shopify-section">
      <style>{css(s, id)}</style>
      <div className={`pbfcm-gift-progress-section-${id}`} id={s.anchor_id || id}>
        <div className={`pbfcm-gift-progress-container-${id}`}>
          <div className={`pbfcm-gift-progress-wrapper-${id}`}>
            <div className={`pbfcm-gift-progress-left-${id}`}>
              <div className={`pbfcm-gift-progress-image-wrapper-${id}`}>
                <Img className={`pbfcm-gift-progress-image-${id}`} src={settingImg(s.image)} alt={(s.title || '').replace(/<[^>]+>/g, '')} loading="lazy" />
                {s.show_badge && (
                  <div className={`pbfcm-gift-progress-badge-${id}`}>
                    {s.original_price && <span className="strikethrough">{s.original_price}</span>}
                    <span>{s.badge_text}</span>
                  </div>
                )}
              </div>
              <div className={`pbfcm-gift-progress-content-${id}`}>
                <div className={`pbfcm-gift-progress-header-${id}`}>
                  {s.title && <h3 className={`pbfcm-gift-progress-title-${id}`} dangerouslySetInnerHTML={{ __html: s.title }} />}
                  {s.description && <p className={`pbfcm-gift-progress-description-${id}`} dangerouslySetInnerHTML={{ __html: resolveTokens(s.description) }} />}
                </div>
                {s.learn_more_text && (s.learn_more_url
                  ? <a href={s.learn_more_url} className={`pbfcm-gift-progress-learn-more-${id}`}>{s.learn_more_text}</a>
                  : <p className={`pbfcm-gift-progress-learn-more-${id}`}>{s.learn_more_text}</p>)}
              </div>
            </div>

            {s.show_progress_bar && (
              <div className={`pbfcm-gift-progress-right-${id}`}>
                <div className={`pbfcm-gift-progress-progress-wrapper-${id}`}>
                  <div className={`pbfcm-gift-progress-status-${id}`}>{s.progress_status_text}</div>
                  <div className={`pbfcm-gift-progress-bar-container-${id}`}>
                    <div className={`pbfcm-gift-progress-bar-wrapper-${id}`}>
                      <div className={`pbfcm-gift-progress-bar-fill-${id}`}><div className={`pbfcm-gift-progress-bar-mark-${id}`} /></div>
                    </div>
                    <span className={`pbfcm-gift-progress-bar-goal-${id}`}>${s.gift_threshold}</span>
                  </div>
                  {s.show_tooltip && (
                    <div className={`pbfcm-gift-progress-tooltip-${id}`}>
                      <span className="original-price">{s.tooltip_original_price}</span>
                      <span className="sale-price">{s.tooltip_sale_price}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

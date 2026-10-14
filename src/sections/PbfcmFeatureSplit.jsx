import Img from '../components/Img.jsx';
import { settingImg } from '../lib/settingsImg.js';
import { resolveTokens } from '../lib/resolveTokens.js';
import { FEATURE_SPLIT_SALE_BOTTOM } from '../data/sharedSections.js';
import css from './pbfcmFeatureSplitCss.js';

// sections/pbfcm-feature-split.liquid. Props = { id, settings, blocks } as in the template JSON
// (src/data/sharedSections.js: FEATURE_SPLIT_SALE_BOTTOM is the one rendered on /pages/sale; the top one is disabled in the theme).
const CHECK = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM16.3652 7.95378C16.1224 7.95214 15.8885 8.04511 15.7126 8.21256C15.7037 8.22126 15.696 8.23061 15.6882 8.24023L11.3473 13.7708L8.73014 11.1553C8.64432 11.0632 8.54078 10.9884 8.42578 10.9372C8.31099 10.886 8.18684 10.8597 8.0612 10.8574C7.93552 10.8552 7.80994 10.8772 7.69336 10.9242C7.57662 10.9713 7.46988 11.0418 7.38086 11.1309C7.29184 11.2199 7.2213 11.3266 7.17415 11.4434C7.12715 11.5599 7.1052 11.6855 7.10742 11.8112C7.10971 11.9368 7.13605 12.061 7.18717 12.1758C7.23841 12.2908 7.31316 12.3943 7.40527 12.4801L10.7126 15.7874C10.8017 15.8766 10.9082 15.947 11.0251 15.9941C11.1419 16.0412 11.267 16.0648 11.3929 16.0625C11.5186 16.0602 11.6427 16.0323 11.7575 15.9811C11.8723 15.9298 11.9762 15.8551 12.0618 15.763L17.0505 9.52441C17.2144 9.3453 17.3026 9.1096 17.2962 8.86686C17.2898 8.62399 17.1896 8.39258 17.0163 8.22233C16.8427 8.05205 16.6083 7.95562 16.3652 7.95378Z" fill="#078942" /></svg>;
const strip = (h) => (h || '').replace(/<[^>]+>/g, '').trim();

export default function PbfcmFeatureSplit({ id = FEATURE_SPLIT_SALE_BOTTOM.id, settings = FEATURE_SPLIT_SALE_BOTTOM.settings, blocks = FEATURE_SPLIT_SALE_BOTTOM.blocks }) {
  const s = settings;
  const alt = strip(s.title);
  const items = blocks.filter((b) => b.type === 'checklist_item');
  return (
    <div id={`shopify-section-${id}`} className="shopify-section">
      <style>{css(s, id)}</style>
      <div className={`pbfcm-feature-split-section-${id}`} id={s.anchor_id || id}>
        <div className={`pbfcm-feature-split-container-${id}`}>
          <div className={`pbfcm-feature-split-wrapper-${id}`}>
            {s.mobile_image && <div className={`pbfcm-feature-split-mobile-media-${id}`}><Img src={settingImg(s.mobile_image)} alt={alt} loading="lazy" /></div>}
            <div className={`pbfcm-feature-split-left-${id}`}>
              <div className={`pbfcm-feature-split-logo-title-wrapper-${id}`}>
                {s.logo && <div className={`pbfcm-feature-split-logo-${id}`}><Img src={settingImg(s.logo)} alt="Logo" /></div>}
                {s.title && <h2 className={`pbfcm-feature-split-title-${id}`} dangerouslySetInnerHTML={{ __html: resolveTokens(s.title) }} />}
              </div>
              <div className={`pbfcm-feature-split-content-${id}`}>
                {s.description && <div className={`pbfcm-feature-split-description-${id}`} dangerouslySetInnerHTML={{ __html: resolveTokens(s.description) }} />}
              </div>
              {items.length > 0 && (
                <div className={`pbfcm-feature-split-checklist-${id}`}>
                  {items.map((b) => (
                    <div key={b.id} className={`pbfcm-feature-check-item-${id}`}>
                      <div className={`pbfcm-feature-check-icon-${id}`}>{CHECK}</div>
                      <p className={`pbfcm-feature-check-text-${id}`}>{b.settings.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className={`pbfcm-feature-split-right-${id}`}>
              <Img src={settingImg(s.image)} alt={s.title ? alt : ''} loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

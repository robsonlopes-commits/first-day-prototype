import Waves from '../components/Waves.jsx';
import Img from '../components/Img.jsx';
import { settingImg } from '../lib/settingsImg.js';
import './reviewCards.css';
import customCssFor from '../lib/customCss.js';

// sections/review-cards.liquid (+ snippets/review-cards.css.liquid, review-stars). Props = template JSON section.
const STAR = 'M496,203.3H312.36L256,32,199.64,203.3H16L166.21,308.7,107.71,480,256,373.84,404.29,480,345.68,308.7Z';

export default function ReviewCards({ id, settings: s, blocks = [], customCss = [] }) {
  const sid = id;
  const cls = `review-cards-section-${id}`;
  const css = `
  .${cls} { --heading-font-size-desktop: ${s.heading_font_size_desktop}px; --heading-font-size-mobile: ${s.heading_font_size_mobile}px;
    --padding-top-desktop: ${s.padding_top_desktop}px; --padding-right-desktop: ${s.padding_right_desktop}px; --padding-bottom-desktop: ${s.padding_bottom_desktop}px; --padding-left-desktop: ${s.padding_left_desktop}px;
    --padding-top-mobile: ${s.padding_top_mobile}px; --padding-right-mobile: ${s.padding_right_mobile}px; --padding-bottom-mobile: ${s.padding_bottom_mobile}px; --padding-left-mobile: ${s.padding_left_mobile}px; }
  .${cls} .reviews-card-heading-container > span > h2 { font-size: var(--heading-font-size-desktop); }
  .${cls} .section-padding { padding-top: var(--padding-top-desktop); padding-right: var(--padding-right-desktop); padding-bottom: var(--padding-bottom-desktop); padding-left: var(--padding-left-desktop); }
  @media (max-width: 768px) {
    .${cls} .reviews-card-heading-container > span > h2 { font-size: var(--heading-font-size-mobile); }
    .${cls} .section-padding { padding-top: var(--padding-top-mobile); padding-right: var(--padding-right-mobile); padding-bottom: var(--padding-bottom-mobile); padding-left: var(--padding-left-mobile); }
  }
  .review-heading { font-family: 'Gelica', sans-serif; font-size: 18px; font-weight: 700; line-height: 1.4; color: #2c3d50; margin: 0; }`;
  return (
    <div id={`shopify-section-${sid}`} className="shopify-section firstday-review-cards-section">
      <style>{css}{customCssFor(id, customCss)}</style>
      {s.anchor_id && <div id={s.anchor_id} className="fd-jump-anchor" />}
      <div className={`reviews-card-container ${cls}`}>
        {s.top_waves && <Waves position="top" color={s.background_color} containerBackground={s.wavesTopBackgroundColor} />}
        <div className="section-padding" style={{ backgroundColor: s.background_color, width: '100%' }}>
          {s.heading !== '' && <div className="reviews-card-heading-container"><span style={{ width: '100%' }}><h2>{s.heading}</h2></span></div>}
          {s.text !== '' && <div className="reviews-card-text-container"><span style={{ width: '100%' }}><p>{s.text}</p></span></div>}
          <div className="reviews-card-container">
            <div className={s.enable_slider ? 'reviews-card-wrapper-slider' : 'reviews-card-wrapper'}>
              {blocks.map((b) => {
                const bs = b.settings;
                return (
                  <div key={b.id} className={`individual-review-card-container${s.enable_slider ? ' individual-review-card-container-slider' : ''}`} style={{ border: `1px solid ${bs.card_color}`, boxShadow: `5px 5px 0px 0px ${bs.card_color}` }} tabIndex={0} role="link">
                    <div className="review-stars">
                      {[0, 1, 2, 3, 4].map((i) => <span key={i}><svg xmlns="http://www.w3.org/2000/svg" fill={bs.card_color} width="18px" height="18px" viewBox="0 0 512 512"><path d={STAR} /></svg></span>)}
                    </div>
                    {bs.review_heading && <p className="review-heading">{bs.review_heading}</p>}
                    <p className="review-text">{bs.review_text}</p>
                    <div className="review-card-bottom">
                      <div className="review-card-bottom-row">
                        <div className="individual-review-card-image">
                          {bs.review_image && <Img src={settingImg(bs.review_image)} alt={bs.review_name} style={{ objectFit: 'cover', height: '100%', width: '100%' }} loading="lazy" />}
                        </div>
                        <div className="reviewers_info">
                          <p className="review-name">{bs.review_name}</p>
                          {bs.review_location && <p className="review-location">{bs.review_location}</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {s.bottom_waves && <Waves position="bottom" color={s.background_color} containerBackground={s.wavesBottomBackgroundColor} />}
      </div>
    </div>
  );
}

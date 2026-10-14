import { Fragment, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { settingImg } from '../lib/settingsImg.js';
import '../styles/theme/pdp-v2-quality-criterias.css';

// sections/pdp-v2-quality-criterias.liquid + snippets/pdp-v2-quality-criteria-card.liquid + assets/pdp-v2-quality-criterias.js.
// Props: { id, settings, blocks } as in the template JSON. The template has no blocks: the cards come from the product metafield
// custom.quality_criterias (metaobjects), mocked as 'quality_criteria' blocks in src/data/pdpNewTwoUp.js (settings keys = card fields).
// Carousel: 4 cards/page (<=989px: 2/page), arrows + dots; <=749px it is a native scroll-snap strip with peeking cards (controls hidden by CSS).
const breakpointPerPage = () => {
  const w = window.innerWidth;
  return w <= 749 ? 1 : w <= 989 ? 2 : 4;
};

const Lines = ({ text }) => String(text).split('\n').map((l, i) => <Fragment key={i}>{i > 0 && <br />}{l}</Fragment>);

function Card({ s }) {
  const dis = s.disadvantage_title || s.disadvantage_description || s.disadvantage_image;
  const adv = s.advantage_title || s.advantage_description || s.advantage_image;
  return (
    <article className="pdv-qc__card" data-pdv-qc-card>
      {(s.title || s.description) && (
        <div className="pdv-qc__card-copy">
          {s.title && <h3 className="pdv-qc__card-title">{s.title}</h3>}
          {s.description && <div className="pdv-qc__card-desc"><Lines text={s.description} /></div>}
        </div>
      )}
      <div className="pdv-qc__card-rows">
        {dis && (
          <div className="pdv-qc__row pdv-qc__row--disadvantage">
            <div className="pdv-qc__row-media">
              {s.disadvantage_image && (
                <div className="pdv-qc__row-img-wrap">
                  <img className="pdv-qc__row-img" src={settingImg(s.disadvantage_image)} alt="" loading="lazy" />
                  <span className="pdv-qc__row-x" aria-hidden="true">
                    <svg className="pdv-qc__row-x-icon" width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 0C9.055 0 11.667 2.612 11.667 5.833C11.667 9.055 9.055 11.667 5.833 11.667C2.612 11.667 0 9.055 0 5.833C0 2.612 2.612 0 6 0ZM8.029 3.637C7.847 3.455 7.55 3.455 7.368 3.637L5.833 5.173L4.297 3.638C4.115 3.456 3.819 3.456 3.637 3.638C3.455 3.82 3.455 4.116 3.637 4.299L5.173 5.833L3.638 7.37C3.456 7.552 3.456 7.848 3.638 8.03C3.82 8.212 4.116 8.212 4.299 8.03L5.833 6.494L7.37 8.029C7.552 8.211 7.848 8.211 8.03 8.029C8.212 7.847 8.212 7.55 8.03 7.368L6.494 5.833L8.029 4.297C8.211 4.115 8.211 3.819 8.029 3.637Z" fill="#D24343" />
                    </svg>
                  </span>
                </div>
              )}
            </div>
            <div className="pdv-qc__row-text">
              {s.disadvantage_title && <p className="pdv-qc__row-label">{s.disadvantage_title}</p>}
              {s.disadvantage_description && <p className="pdv-qc__row-value">{s.disadvantage_description}</p>}
            </div>
          </div>
        )}
        {adv && (
          <div className="pdv-qc__row pdv-qc__row--advantage">
            <div className="pdv-qc__row-media">
              {s.advantage_image && (
                <div className="pdv-qc__row-img-wrap"><img className="pdv-qc__row-img" src={settingImg(s.advantage_image)} alt="" loading="lazy" /></div>
              )}
            </div>
            <div className="pdv-qc__row-text">
              {s.advantage_title && <p className="pdv-qc__row-label">{s.advantage_title}</p>}
              {s.advantage_description && <p className="pdv-qc__row-value">{s.advantage_description}</p>}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

export default function PdpV2QualityCriterias({ id, settings: s, blocks = [] }) {
  const cards = blocks.filter((b) => b.type === 'quality_criteria');
  const trackRef = useRef(null);
  const [perPage, setPerPage] = useState(() => (typeof window === 'undefined' ? 4 : breakpointPerPage()));
  const [page, setPage] = useState(0);
  const mobile = perPage === 1;
  const pages = Math.max(1, Math.ceil(cards.length / perPage));
  const cur = Math.min(page, pages - 1);

  useEffect(() => {
    let t;
    const onResize = () => { clearTimeout(t); t = setTimeout(() => setPerPage(breakpointPerPage()), 120); };
    window.addEventListener('resize', onResize);
    return () => { clearTimeout(t); window.removeEventListener('resize', onResize); };
  }, []);

  const apply = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    if (mobile) { track.style.transform = ''; return; }
    const first = track.querySelector('[data-pdv-qc-card]');
    if (!first) return;
    const gap = parseFloat(window.getComputedStyle(track).gap) || 16;
    track.style.transform = `translateX(-${cur * perPage * (first.getBoundingClientRect().width + gap)}px)`;
  }, [cur, perPage, mobile]);
  useLayoutEffect(() => { apply(); }, [apply]);
  useEffect(() => { window.addEventListener('resize', apply); return () => window.removeEventListener('resize', apply); }, [apply]);

  const goTo = (i) => setPage(Math.max(0, Math.min(pages - 1, i)));
  const showNav = pages > 1 && !mobile;

  const rootStyle = {
    '--pdv-qc-bg': s.section_bg_color, '--pdv-qc-max-width': `${s.container_max_width}px`,
    '--pdv-qc-pt-d': `${s.padding_top_desktop}px`, '--pdv-qc-pr-d': `${s.padding_right_desktop}px`, '--pdv-qc-pb-d': `${s.padding_bottom_desktop}px`, '--pdv-qc-pl-d': `${s.padding_left_desktop}px`,
    '--pdv-qc-pt-m': `${s.padding_top_mobile}px`, '--pdv-qc-pr-m': `${s.padding_right_mobile}px`, '--pdv-qc-pb-m': `${s.padding_bottom_mobile}px`, '--pdv-qc-pl-m': `${s.padding_left_mobile}px`,
    '--pdv-qc-eyebrow-font': s.title_font_family, '--pdv-qc-eyebrow-size-d': `${s.title_font_size_desktop}px`, '--pdv-qc-eyebrow-size-m': `${s.title_font_size_mobile}px`,
    '--pdv-qc-eyebrow-weight': s.title_font_weight, '--pdv-qc-eyebrow-color': s.title_font_color,
    '--pdv-qc-main-font': s.main_title_font_family, '--pdv-qc-main-size-d': `${s.main_title_font_size_desktop}px`, '--pdv-qc-main-size-m': `${s.main_title_font_size_mobile}px`,
    '--pdv-qc-main-weight': s.main_title_font_weight, '--pdv-qc-main-lh': s.main_title_line_height, '--pdv-qc-main-color': s.main_title_font_color, '--pdv-qc-main-accent': s.main_title_accent_color,
    '--pdv-qc-desc-font': s.description_font_family, '--pdv-qc-desc-size-d': `${s.description_font_size_desktop}px`, '--pdv-qc-desc-size-m': `${s.description_font_size_mobile}px`,
    '--pdv-qc-desc-weight': s.description_font_weight, '--pdv-qc-desc-color': s.description_font_color,
    '--pdv-qc-card-bg': s.card_bg_color, '--pdv-qc-row-bg': s.row_bg_color,
  };

  return (
    <div id={`shopify-section-${id}`} className="shopify-section section-pdp-v2-quality-criterias">
      <style>{`#shopify-section-${id} { width: 100%; max-width: 100%; background-color: ${s.section_bg_color || '#ffffff'}; overflow-x: clip; }`}</style>
      {s.anchor_id ? <div id={s.anchor_id} className="fd-jump-anchor" /> : null}
      <section className="pdv-qc" id={`pdv-qc-${id}`} data-pdv-qc style={rootStyle}>
        <div className="pdv-qc__inner">
          <div className="pdv-qc__container">
            {(s.title || s.main_title || s.description) && (
              <header className="pdv-qc__header">
                <div className="pdv-qc__header-titles">
                  {s.title && <p className="pdv-qc__eyebrow">{s.title}</p>}
                  {s.main_title && <div className="pdv-qc__main-title" dangerouslySetInnerHTML={{ __html: s.main_title }} />}
                </div>
                {s.description && <div className="pdv-qc__description" dangerouslySetInnerHTML={{ __html: s.description }} />}
              </header>
            )}
            {cards.length > 0 && (
              <div className="pdv-qc__cards-wrap">
                <div className="pdv-qc__cards-viewport" data-pdv-qc-viewport role="group" aria-label={s.list_aria_label}>
                  <div className="pdv-qc__cards-track" data-pdv-qc-track ref={trackRef}>
                    {cards.map((b) => <Card key={b.id} s={b.settings} />)}
                  </div>
                </div>
                <div className="pdv-qc__controls">
                  <button type="button" className="pdv-qc__nav" aria-label="Previous criteria" hidden={!showNav} disabled={cur <= 0} onClick={() => goTo(cur - 1)}>
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                  <div className="pdv-qc__dots" role="tablist" aria-label="Criteria pages" hidden={!showNav}>
                    {Array.from({ length: pages }, (_, i) => (
                      <button key={i} type="button" className={`pdv-qc__dot${i === cur ? ' is-active' : ''}`} aria-label={`Go to page ${i + 1}`} aria-current={i === cur ? 'true' : 'false'} onClick={() => goTo(i)} />
                    ))}
                  </div>
                  <button type="button" className="pdv-qc__nav" aria-label="Next criteria" hidden={!showNav} disabled={cur >= pages - 1} onClick={() => goTo(cur + 1)}>
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

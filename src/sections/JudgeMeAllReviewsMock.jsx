import { useState } from 'react';
import './judgemeAllReviewsMock.css';

// Judge.me "All reviews page" app block (shopify://apps/judge-me-reviews/blocks/all_reviews_page) as rendered on /pages/bundle-builder-v2:
// the legacy jdgm-* widget (summary, tabs, sort, review list with product link + product picture, "Load More Reviews").
// data = { average, count, productCount, shopCount, items: [{ product, pic, rating, date, author, title, body }] } (REVIEWS in src/data/bundleBuilder.js).
// Mock: the sort dropdown and the tabs are inert, "Load More Reviews" reveals the remaining mock reviews (all are shown up front here).
const Stars = ({ n, half }) => (
  <>
    {[1, 2, 3, 4, 5].map((i) => <span key={i} className={`jdgm-star ${i <= n ? 'jdgm--on' : half && i === n + 1 ? 'jdgm--half' : 'jdgm--off'}`} />)}
  </>
);

export default function JudgeMeAllReviews({ data }) {
  const [shown, setShown] = useState(data.items.length);
  const whole = Math.floor(data.average);
  return (
    <div className="jdgm-widget jdgm-all-reviews-widget-v2025" data-widget="all-reviews-v2025">
      <div className="jdgm-legacy-widget-content">
        <article className="jdgm-widget jdgm-all-reviews-widget jdgm--done-setup-widget" data-widget-name="all_reviews_page">
          <div className="jdgm-all-reviews__header" data-number-of-reviews={data.count} data-average-rating={data.average}>
            <div className="jdgm-row-stars">
              <div className="jdgm-all-reviews__summary jdgm-rev-widg__summary">
                <div className="jdgm-rev-widg__summary-inner">
                  <div className="jdgm-all-reviews__summary-stars" tabIndex={0} aria-label={`Average rating is ${data.average}`} role="img">
                    <Stars n={whole} half={data.average - whole >= 0.25} />{' '}
                    <span className="jdgm-all-reviews__summary-average"><a className="jdgm-link" href="#judgeme" onClick={(e) => e.preventDefault()}>{data.average} out of 5</a></span>
                  </div>
                  <div className="jdgm-all-reviews__summary-text jdgm-all-reviews__summary-text--verified">
                    Based on {data.count} reviews<img className="jdgm-verified-checkmark" src="https://public-images.judge.me/judgeme/logos/verified-checkmark.svg" alt="Verified Checkmark" />
                  </div>
                </div>
              </div>
              <div className="jdgm-histogram">
                {data.histogram.map(([rating, freq, pct]) => (
                  <div className="jdgm-histogram__row" data-rating={rating} data-frequency={freq} data-percentage={pct} key={rating}>
                    <div className="jdgm-histogram__star" role="button" aria-label={`${pct}% (${freq}) reviews with ${rating} star rating`} tabIndex={0}><Stars n={rating} /></div>
                    <div className="jdgm-histogram__bar"><div className="jdgm-histogram__bar-content" style={{ width: `${pct}%` }} /></div>
                    <div className="jdgm-histogram__frequency">{freq}</div>
                  </div>
                ))}
              </div>
              <div className="jdgm-widget-actions-wrapper"><a href="#judgeme" className="jdgm-write-rev-link" aria-expanded="false" onClick={(e) => e.preventDefault()}>Write a Store Review</a></div>
            </div>
          </div>
          <div className="jdgm-subtab">
            <span className="jdgm-subtab__name jdgm--active" role="button" tabIndex={0}>Product Reviews (<span className="jdgm-subtab__count">{data.productCount}</span>)</span>
            <span className="jdgm-subtab__name" role="button" tabIndex={0}>Shop Reviews (<span className="jdgm-subtab__count">{data.shopCount}</span>)</span>
          </div>
          <div className="jdgm-row-actions">
            <div className="jdgm-rev-widg__sort-wrapper">
              <label className="jdgm-sort-dropdown-wrapper">
                <span className="jdgm-sort-dropdown-label" style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}>Sort by</span>
                <select className="jdgm-sort-dropdown" defaultValue="highest-rating">
                  <option value="most-recent">Most Recent</option><option value="highest-rating">Highest Rating</option><option value="lowest-rating">Lowest Rating</option>
                  <option value="with-pictures">Only Pictures</option><option value="pictures-first">Pictures First</option><option value="videos-first">Videos First</option><option value="most-helpful">Most Helpful</option>
                </select><span className="jdgm-sort-dropdown-arrow" />
              </label>
            </div>
          </div>
          <div className="jdgm-all-reviews__body">
            {data.items.slice(0, shown).map((r, i) => (
              <div className="jdgm-rev jdgm-divider-top jdgm--done-setup" data-verified-buyer="true" key={i}>
                <div className="jdgm-rev__header">
                  <div className="jdgm-row-product"><span className="jdgm-rev__prod-info-wrapper"><span className="jdgm-rev__prod-link-prefix" /> <a href="#judgeme" target="_blank" rel="noreferrer" className="jdgm-rev__prod-link" onClick={(e) => e.preventDefault()}> {r.product} </a></span></div>
                  <div className="jdgm-row-rating">
                    <span className="jdgm-rev__rating" data-score={r.rating} tabIndex={0} aria-label={`${r.rating} star review`} role="img"> <Stars n={r.rating} /> </span>
                    <span className="jdgm-rev__timestamp">{r.date}</span>
                  </div>
                  <div className="jdgm-row-profile">
                    <div className="jdgm-rev__icon" />
                    <span className="jdgm-rev__author-wrapper"> <span className="jdgm-rev__author">{r.author}</span> <span className="jdgm-rev__buyer-badge-wrapper"> <span className="jdgm-rev__buyer-badge" /> </span></span>
                  </div>
                  <div className="jdgm-rev__br" />
                </div>
                <div className="jdgm-rev__content">
                  {r.title && <b className="jdgm-rev__title">{r.title}</b>}
                  <div className="jdgm-rev__body"><p>{r.body}</p></div>
                  {r.pic && <div className="jdgm-rev__pics"><a className="jdgm-rev__product-picture jdgm-rev__pic-link" rel="nofollow" href={r.pic} onClick={(e) => e.preventDefault()}> <img className="jdgm-rev__pic-img" alt={r.product} src={r.pic} /> </a></div>}
                </div>
                <div className="jdgm-rev__actions"><div className="jdgm-rev__social" /><div className="jdgm-rev__votes" /></div>
              </div>
            ))}
          </div>
          <div className="jdgm-all-reviews__footer">
            <div className="jdgm-all-reviews-page__load-more-wrapper">
              <a href="#judgeme" className="jdgm-all-reviews-page__load-more jdgm-btn jdgm-btn--solid" role="button" onClick={(e) => { e.preventDefault(); setShown((n) => Math.min(data.items.length, n + 10)); }}>Load More Reviews</a>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

import { useMemo, useState } from 'react';
import Img from '../components/Img.jsx';
import { shopImg } from '../lib/assets.js';
import './judgemeAllReviewsMock.css';

// Interactive mock of the Judge.me "all_reviews_page" app block (all-reviews-widget-v2025, legacy .jdgm-all-reviews-widget markup, CSS captured in
// judgemeAllReviewsMock.css) as on /pages/bundle-quiz, plus the "all_reviews_text" block (stars + "N reviews") of the standalone product.
// data: src/data/bundleQuiz.js ALL_REVIEWS. Interactions: Product / Shop Reviews tabs, sort dropdown, star-histogram filter,
// "Load More Reviews" (the mock only has the first 25 reviews of each tab, so it just shows a spinner and hides the button).
const starClasses = (rating) => {
  const full = Math.floor(rating); const frac = rating - full;
  return Array.from({ length: 5 }, (_, i) => (i < full ? 'jdgm--on' : i === full && frac >= 0.25 && frac < 0.75 ? 'jdgm--half' : i === full && frac >= 0.75 ? 'jdgm--on' : 'jdgm--off'));
};
const Stars = ({ rating }) => starClasses(rating).map((c, i) => <span key={i} className={`jdgm-star ${c}`} />);

export function AllReviewsText({ id, rating, count }) {
  return (
    <div id={`shopify-block-${id}`} className="shopify-block shopify-app-block">
      <div className="jdgm-widget jdgm-all-reviews-text jdgm-all-reviews-text--style-text" data-widget-name="all_reviews_text">
        <a href="#reviews" onClick={(e) => e.preventDefault()}>
          <span data-score={rating} className="jdgm-all-reviews-rating"><Stars rating={rating} /></span>
          <span className="jdgm-all-reviews-text__text" data-score={rating} data-number-of-reviews={count}><a href="#reviews">{count} reviews</a></span>
        </a>
      </div>
    </div>
  );
}

const SORTS = [['most-recent', 'Most Recent'], ['highest-rating', 'Highest Rating'], ['lowest-rating', 'Lowest Rating'], ['with-pictures', 'Only Pictures'], ['pictures-first', 'Pictures First'], ['videos-first', 'Videos First'], ['most-helpful', 'Most Helpful']];
const ts = (d) => { const [m, day, y] = d.split('/'); return new Date(`${y}-${m}-${day}`).getTime(); };
const sortReviews = (list, sort) => {
  const l = list.map((r, i) => ({ r, i }));
  const by = {
    'most-recent': (a, b) => ts(b.r.date) - ts(a.r.date),
    'highest-rating': (a, b) => b.r.rating - a.r.rating,
    'lowest-rating': (a, b) => a.r.rating - b.r.rating,
    'pictures-first': (a, b) => (b.r.pics.length > 0) - (a.r.pics.length > 0),
  }[sort];
  const rows = sort === 'with-pictures' ? l.filter((x) => x.r.pics.length) : l;
  return (by ? [...rows].sort((a, b) => by(a, b) || a.i - b.i) : rows).map((x) => x.r);
};
const picUrl = (f) => (f.startsWith('http') ? f : shopImg(f));
const paras = (text) => text.split(/\n\s*\n/).map((t, i) => <p key={i}>{t}</p>);

function Review({ r }) {
  const badge = r.shop ? 'Review collected from a store visitor' : 'Review collected via store invitation';
  return (
    <div className="jdgm-rev jdgm-divider-top jdgm--done-setup" data-verified-buyer="true" data-thumb-up-count="0" data-thumb-down-count="0">
      <div className="jdgm-rev__header">
        <div className="jdgm-row-product">
          <span className="jdgm-rev__prod-info-wrapper">
            <span className="jdgm-rev__prod-link-prefix" />{' '}
            <a href={r.handle ? `/products/${r.handle}` : '/'} target="_blank" rel="noreferrer" className="jdgm-rev__prod-link"> {r.product} </a>
          </span>
        </div>
        <div className="jdgm-row-rating">
          <span className="jdgm-rev__rating" data-score={r.rating} tabIndex={0} aria-label={`${r.rating} star review`} role="img"> <Stars rating={r.rating} /> </span>
          <span className="jdgm-rev__timestamp">{r.date}</span>
        </div>
        <div className="jdgm-row-profile">
          <div className="jdgm-rev__icon" />
          <span className="jdgm-rev__author-wrapper"> <span className="jdgm-rev__author">{r.author}</span> <span className="jdgm-rev__buyer-badge-wrapper"> <span className="jdgm-rev__buyer-badge" /> </span></span>
        </div>
        <div className="jdgm-row-extra"><span className="jdgm-rev__location"> </span></div>
        <div className="jdgm-rev__br" />
      </div>
      <div className="jdgm-rev__content">
        {r.title ? <b className="jdgm-rev__title">{r.title}</b> : null}
        <div className="jdgm-rev__body">{paras(r.body)}</div>
        <div className="jdgm-rev__custom-form"> </div>
        {r.pics.length ? (
          <div className="jdgm-rev__pics">
            {r.pics.map((f) => (
              <a key={f} className="jdgm-rev__product-picture jdgm-rev__pic-link" target="_blank" rel="nofollow noreferrer" href={picUrl(f)}>
                <Img className="jdgm-rev__pic-img" alt={r.product} src={picUrl(f)} />
              </a>
            ))}
          </div>
        ) : null}
        <div className="jdgm-rev__transparency-badge-wrapper">
          <div className="jdgm-rev__transparency-badge" style={{ display: 'inline-flex', alignItems: 'center', padding: '4px 8px', marginRight: 2, borderRadius: 0, border: '1px solid rgb(230, 230, 230)', fontSize: 12, color: 'rgb(123, 123, 123)' }}>{badge}</div>
        </div>
      </div>
      <div className="jdgm-rev__actions"><div className="jdgm-rev__social" /><div className="jdgm-rev__votes" /></div>
    </div>
  );
}

export default function JudgeMeAllReviewsWidget({ data, id }) {
  const [tab, setTab] = useState('product');
  const [sort, setSort] = useState('highest-rating');
  const [star, setStar] = useState(null);
  const [more, setMore] = useState('idle'); // idle | loading | done
  const list = useMemo(() => {
    let l = tab === 'product' ? data.reviews : data.shopReviews;
    if (star) l = l.filter((r) => r.rating === star);
    return sortReviews(l, sort);
  }, [data, tab, sort, star]);
  const pick = (t) => { setTab(t); setStar(null); setMore('idle'); };
  const loadMore = (e) => { e.preventDefault(); setMore('loading'); setTimeout(() => setMore('done'), 900); };
  return (
    <div id={`shopify-block-${id}`} className="shopify-block shopify-app-block">
      <div className="jdgm-widget jdgm-all-reviews-widget-v2025" data-widget="all-reviews-v2025" data-review-source="all" data-widget-name="jdgm-all-reviews-widget-v2025">
        <div className="jdgm-legacy-widget-content">
          <div>
            <article className="jdgm-widget jdgm-all-reviews-widget jdgm--done-setup-widget" data-widget-name="all_reviews_page">
              <div className="jdgm-all-reviews__header" data-number-of-reviews={data.count} data-average-rating={data.average}>
                <div className="jdgm-row-stars">
                  <div className="jdgm-all-reviews__summary jdgm-rev-widg__summary">
                    <div className="jdgm-rev-widg__summary-inner">
                      <div className="jdgm-all-reviews__summary-stars" tabIndex={0} aria-label={`Average rating is ${data.average}`} role="img">
                        <Stars rating={data.average} />{' '}
                        <span className="jdgm-all-reviews__summary-average"><a className="jdgm-link" target="_blank" rel="noreferrer" href="https://app.judge.me/reviews/stores/firstday.com">{data.average} out of 5</a></span>
                      </div>
                      <div className="jdgm-all-reviews__summary-text jdgm-all-reviews__summary-text--verified">Based on {data.count} reviews<img className="jdgm-verified-checkmark" src="https://public-images.judge.me/judgeme/logos/verified-checkmark.svg" alt="Verified Checkmark" /></div>
                    </div>
                  </div>
                  <div className="jdgm-histogram">
                    {data.histogram.map(([rating, freq, pct]) => (
                      <div key={rating} className={`jdgm-histogram__row${star === rating ? ' jdgm-histogram__row--selected' : ''}`} data-rating={rating} data-frequency={freq} data-percentage={pct} onClick={() => setStar(star === rating ? null : rating)}>
                        <div className="jdgm-histogram__star" role="button" aria-label={`${pct}% (${freq}) reviews with ${rating} star rating`} tabIndex={0}><Stars rating={rating} /></div>
                        <div className="jdgm-histogram__bar"><div className="jdgm-histogram__bar-content" style={{ width: `${pct}%` }}> </div></div>
                        <div className="jdgm-histogram__frequency">{freq}</div>
                      </div>
                    ))}
                    {star ? <div className="jdgm-histogram__row jdgm-histogram__clear-filter" data-rating="null" tabIndex={0} onClick={() => setStar(null)}>See all reviews</div> : null}
                  </div>
                  <div className="jdgm-widget-actions-wrapper">
                    <a href="#judgeme" className="jdgm-write-rev-link" aria-expanded="false" onClick={(e) => e.preventDefault()}>Write a Store Review</a>
                  </div>
                </div>
              </div>
              <div className="jdgm-subtab">
                <span className={`jdgm-subtab__name${tab === 'product' ? ' jdgm--active' : ''}`} role="button" tabIndex={0} onClick={() => pick('product')}>Product Reviews (<span className="jdgm-subtab__count">{data.productCount}</span>)</span>
                <span className={`jdgm-subtab__name${tab === 'shop' ? ' jdgm--active' : ''}`} role="button" tabIndex={0} onClick={() => pick('shop')}>Shop Reviews (<span className="jdgm-subtab__count">{data.shopCount}</span>)</span>
              </div>
              <div className="jdgm-row-actions">
                <div className="jdgm-rev-widg__sort-wrapper">
                  <label className="jdgm-sort-dropdown-wrapper">
                    <span className="jdgm-sort-dropdown-label" style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}>Sort by</span>{' '}
                    <select className="jdgm-sort-dropdown" value={sort} onChange={(e) => setSort(e.target.value)}>
                      {SORTS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                    </select>
                    <span className="jdgm-sort-dropdown-arrow" />
                  </label>
                </div>
              </div>
              <div className="jdgm-all-reviews__body">{list.map((r, i) => <Review key={`${r.author}-${r.date}-${i}`} r={r} />)}</div>
              {more === 'loading' ? <div className="jdgm-spinner" /> : null}
              <div className="jdgm-all-reviews__footer">
                {more !== 'done' ? (
                  <div className="jdgm-all-reviews-page__load-more-wrapper">
                    <a href="#judgeme" className="jdgm-all-reviews-page__load-more jdgm-btn jdgm-btn--solid" role="button" onClick={loadMore}>Load More Reviews</a>
                  </div>
                ) : null}
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}

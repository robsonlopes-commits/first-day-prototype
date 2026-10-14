import JudgeMeReviewWidget from './JudgeMeReviewWidget.jsx';
import customCssFor from '../lib/customCss.js';
import JudgeMeAllReviews from './JudgeMeAllReviewsWidget.jsx';

// sections/apps.liquid: renders app blocks inside .section--padding > .page-width. The Judge.me review_widget block is a static mock
// (see JudgeMeReviewWidget.jsx); the all_reviews_page block is display:none on the live page so it is not rendered.
// Props: { id, settings, customCss, reviews, productTitle, allReviews }. `allReviews` = { id, data, maxWidth } renders the all_reviews_page block
// (JudgeMeAllReviewsWidget.jsx; /pages/bundle-quiz, where that block is visible). `reviews` = data for the review widget (src/data/pdpLegacy.js JUDGEME).
export default function Apps({ id, settings: s, customCss = [], reviews, productTitle, allReviews }) {
  const sid = `shopify-section-${id}`;
  return (
    <div id={sid} className="shopify-section section">
      <style>{`#${sid} { --section-padding-top: ${s.padding_top}px; --section-padding-bottom: ${s.padding_bottom}px; }`}{customCssFor(id, customCss)}</style>
      {s.anchor_id && <div id={s.anchor_id} className="fd-jump-anchor" />}
      <div className={`section--padding${s.show_divider ? ' section--divider' : ''}`}>
        <div className={`page-width${s.include_margins ? '' : ' page-width--full-width'}`}>
          {allReviews && <JudgeMeAllReviews id={allReviews.id} data={allReviews.data} />}
          {reviews && <JudgeMeReviewWidget data={reviews} productTitle={productTitle} />}
        </div>
      </div>
    </div>
  );
}

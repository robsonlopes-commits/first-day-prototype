import Img from '../../../components/Img.jsx';
import { BUNDLE_DISCOUNT_MONTHLY, money } from '../../../data/allInOneBundle.js';
import '../../../styles/theme/fd-button.css';
import './bundle.css';

// "One at a time or all in one": a white card with a hairline border (production card styling), green savings, pill CTA.
export default function BundleCompare({ demo, onAddBundle }) {
  const { totals } = demo;
  const save = totals.individual - totals.monthly;
  return (
    <section className="aio-compare" id="bundle-vs-single" aria-labelledby="aio-compare-title">
      <div className="aio-compare__inner">
        <div className="aio-compare__head">
          <h2 className="aio-compare__title" id="aio-compare-title">One At A Time Or <strong>All In One</strong></h2>
          <p className="aio-compare__sub">Every product can be added on its own. In the bundle, every product costs less.</p>
        </div>
        <div className="aio-compare__card" role="table" aria-label="Price of each product on its own and in the bundle">
          <div className="aio-compare__row aio-compare__row--head" role="row">
            <span role="columnheader">Product</span>
            <span role="columnheader" className="aio-compare__cell">On its own</span>
            <span role="columnheader" className="aio-compare__cell">In the bundle</span>
          </div>
          {demo.items.map((it) => (
            <div className="aio-compare__row" role="row" key={it.key}>
              <span className="aio-compare__prod" role="cell">
                <Img src={it.image} alt="" loading="lazy" />
                <span><span className="aio-compare__role">{it.label}</span>{it.title}</span>
              </span>
              <span className="aio-compare__cell" role="cell"><s>{money(it.base)}</s>{money(it.individual)}</span>
              <span className="aio-compare__cell aio-compare__cell--bundle" role="cell">{money(it.inBundleMonthly)}</span>
            </div>
          ))}
          <div className="aio-compare__row aio-compare__row--total" role="row">
            <span role="cell">Total each month</span>
            <span className="aio-compare__cell" role="cell"><s>{money(totals.base)}</s>{money(totals.individual)}</span>
            <span className="aio-compare__cell aio-compare__cell--bundle" role="cell">
              {money(totals.monthly)}
              <br /><span className="aio-compare__save">You save {money(save)}</span>
            </span>
          </div>
        </div>
        <div className="aio-compare__cta">
          <button type="button" className="fd-btn fd-btn--large fd-btn--primary fd-btn-shape--pill" onClick={onAddBundle}>
            <span className="fd-btn-text">Add Bundle For {money(totals.monthly)}</span>
          </button>
        </div>
      </div>
    </section>
  );
}

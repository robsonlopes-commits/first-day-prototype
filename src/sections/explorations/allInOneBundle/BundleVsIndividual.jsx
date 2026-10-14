import { money, BUNDLE_DISCOUNT_MONTHLY } from '../../../data/allInOneBundle.js';

// Side by side price proof: each product on its own versus inside the bundle (monthly).
export default function BundleVsIndividual({ demo, onAddBundle }) {
  const t = demo.totals;
  return (
    <section className="aio-section aio-compare" style={{ '--aio-demo-color': demo.color }}>
      <div className="aio-container aio-container--narrow">
        <h2 className="aio-heading">The bundle costs less than the parts.</h2>
        <div className="aio-compare__table" role="table" aria-label="Price comparison">
          <div className="aio-compare__row aio-compare__row--head" role="row">
            <span role="columnheader">Product</span>
            <span role="columnheader">On its own</span>
            <span role="columnheader" className="aio-compare__col-bundle">In the bundle</span>
          </div>
          {demo.items.map((it) => (
            <div key={it.key} className="aio-compare__row" role="row">
              <span role="cell" className="aio-compare__name">{it.title}</span>
              <span role="cell">{money(it.individual)}</span>
              <span role="cell" className="aio-compare__col-bundle">{money(it.inBundleMonthly)}</span>
            </div>
          ))}
          <div className="aio-compare__row aio-compare__row--total" role="row">
            <span role="cell">Total</span>
            <span role="cell">{money(t.individual)}</span>
            <span role="cell" className="aio-compare__col-bundle">{money(t.monthly)}</span>
          </div>
        </div>
        <p className="aio-compare__note">Monthly prices. Bundle is {BUNDLE_DISCOUNT_MONTHLY}% off the list price and saves {money(t.individual - t.monthly)} against buying separately.</p>
        <button type="button" className="fd-btn fd-btn--primary fd-btn--large fd-btn-shape--pill" onClick={onAddBundle}>
          <span className="fd-btn-text">Add All-in-1 Bundle · {money(t.monthly)}</span>
        </button>
      </div>
    </section>
  );
}

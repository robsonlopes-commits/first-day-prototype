import AddStepper from './AddStepper.jsx';
import Img from '../../../components/Img.jsx';
import { money } from '../../../data/allInOneBundle.js';
import '../../../styles/theme/fd-button.css';
import './bundle.css';

// Price comparison of each product on its own versus in the bundle. No title of its own: it continues the Four Jobs section
// right above it. Same visual language as Four Jobs and the buy box: bottle in a light blue disc, purple role chip, purple tinted
// "In the bundle" column, green savings, pill buttons (one per product to add it on its own, one big pill for the bundle).
export default function BundleCompare({ demo, onAddBundle, onAddItem, onDecItem, itemQty }) {
  const { totals } = demo;
  const save = totals.individual - totals.monthly;
  return (
    <section className="aio-compare" id="bundle-vs-single" aria-label="Each product on its own versus in the bundle">
      <div className="aio-compare__inner">
        <div className="aio-compare__card" role="table" aria-label="Price of each product on its own and in the bundle">
          <div className="aio-compare__row aio-compare__row--head" role="row">
            <span role="columnheader">Product</span>
            <span role="columnheader" className="aio-compare__cell">On its own</span>
            <span role="columnheader" className="aio-compare__cell aio-compare__cell--bundle-head">In the bundle</span>
            <span role="columnheader" className="aio-compare__action aio-compare__sr">Add to cart</span>
          </div>
          {demo.items.map((it) => (
            <div className="aio-compare__row" role="row" key={it.key}>
              <span className="aio-compare__prod" role="cell">
                <span className="aio-compare__disc"><Img src={it.image} alt="" loading="lazy" /></span>
                <span className="aio-compare__name">
                  <span className="aio-compare__role">{it.label}</span>
                  <span className="aio-compare__title">{it.title}</span>
                </span>
              </span>
              <span className="aio-compare__cell" role="cell" data-label="On its own"><s>{money(it.base)}</s><b>{money(it.individual)}</b></span>
              <span className="aio-compare__cell aio-compare__cell--bundle" role="cell" data-label="In the bundle">{money(it.inBundleMonthly)}</span>
              <div className="aio-compare-prices aio-compare__tiles" role="group" aria-label="Price on its own versus in the bundle">
                <div className="aio-compare-prices__tile">
                  <span className="aio-compare-prices__label">On its own</span>
                  <span className="aio-compare-prices__price"><s>{money(it.base)}</s> {money(it.individual)}</span>
                  <AddStepper className="aio-in-tile" qty={itemQty(it)} label={it.title} onAdd={() => onAddItem(it)} onDec={() => onDecItem(it)} />
                </div>
                <div className="aio-compare-prices__tile aio-compare-prices__tile--bundle">
                  <span className="aio-compare-prices__label">In the bundle</span>
                  <span className="aio-compare-prices__price">{money(it.inBundleMonthly)}</span>
                  <span className="aio-compare-prices__save">Save {money(it.individual - it.inBundleMonthly)}</span>
                </div>
              </div>
              <span className="aio-compare__action" role="cell">
                <AddStepper qty={itemQty(it)} label={it.title} onAdd={() => onAddItem(it)} onDec={() => onDecItem(it)} />
              </span>
            </div>
          ))}
          <div className="aio-compare__row aio-compare__row--total" role="row">
            <span className="aio-compare__total-label" role="cell">Total each month</span>
            <span className="aio-compare__cell" role="cell" data-label="On its own"><s>{money(totals.base)}</s><b>{money(totals.individual)}</b></span>
            <span className="aio-compare__cell aio-compare__cell--bundle" role="cell" data-label="In the bundle">
              {money(totals.monthly)}
              <span className="aio-compare__save">You save {money(save)}</span>
            </span>
            <div className="aio-compare-prices aio-compare__tiles" role="group" aria-label="Price on its own versus in the bundle">
              <div className="aio-compare-prices__tile">
              <span className="aio-compare-prices__label">Individual items</span>
              <span className="aio-compare-prices__price"><s>{money(totals.base)}</s> {money(totals.individual)}</span>
              </div>
              <div className="aio-compare-prices__tile aio-compare-prices__tile--bundle">
              <span className="aio-compare-prices__label">In the bundle</span>
              <span className="aio-compare-prices__price">{money(totals.monthly)}</span>
              <span className="aio-compare-prices__save">Save {money(save)}</span>
              </div>
            </div>
            <span className="aio-compare__action" role="cell" aria-hidden="true" />
          </div>
        </div>
        <div className="aio-compare__cta">
          <button type="button" className="fd-btn fd-btn--large fd-btn--primary fd-btn-shape--pill aio-cta" onClick={onAddBundle}>
            <span className="fd-btn-text">Add Bundle For {money(totals.monthly)}</span>
          </button>
        </div>
      </div>
    </section>
  );
}

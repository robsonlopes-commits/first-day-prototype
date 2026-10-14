import { money } from '../../../data/allInOneBundle.js';

// Mobile only: appears once the main bundle button scrolls out of view.
export default function StickyBundleBar({ visible, demo, price, onAdd }) {
  return (
    <div className={`aio-sticky${visible ? ' is-visible' : ''}`} aria-hidden={!visible}>
      <div className="aio-sticky__info">
        <strong>{demo.possessive} All-in-1 Bundle</strong>
        <span><s>{money(demo.totals.base)}</s> {money(price)}</span>
      </div>
      <button type="button" className="fd-btn fd-btn--primary fd-btn--medium fd-btn-shape--pill" tabIndex={visible ? 0 : -1} onClick={onAdd}>
        <span className="fd-btn-text">Add Bundle</span>
      </button>
    </div>
  );
}

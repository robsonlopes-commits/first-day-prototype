import Img from '../../../components/Img.jsx';
import { money } from '../../../data/allInOneBundle.js';

// Requirement: shoppers can add each product on its own, at a higher price than inside the bundle.
export default function IndividualPicks({ demo, frequency, onAddItem }) {
  const bundlePrice = (it) => (frequency === 'monthly' ? it.inBundleMonthly : it.inBundleOneTime);
  return (
    <div className="aio-picks">
      <div className="aio-picks__head">
        <h3 className="aio-picks__title">Prefer one at a time?</h3>
        <p className="aio-picks__sub">Add any product on its own. It costs more than inside the bundle.</p>
      </div>
      <ul className="aio-picks__list">
        {demo.items.map((it) => (
          <li key={it.key} className="aio-pick">
            <Img className="aio-pick__img" src={it.image} alt="" />
            <div className="aio-pick__info">
              <span className="aio-pick__role">{it.label}</span>
              <span className="aio-pick__name">{it.title}</span>
              <span className="aio-pick__prices">
                <s>{money(it.base)}</s> <strong>{money(it.individual)}</strong> on its own
              </span>
              <span className="aio-pick__bundle">{money(bundlePrice(it))} in the bundle</span>
            </div>
            <button type="button" className="fd-btn fd-btn--secondary fd-btn--small fd-btn-shape--pill aio-pick__add" onClick={() => onAddItem(it)}>
              <span className="fd-btn-text">Add</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

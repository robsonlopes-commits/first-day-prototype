import DemoTabs from './DemoTabs.jsx';
import { money } from '../../../data/allInOneBundle.js';

// Closing band: one more chance to add the bundle, plus a way to switch audience without scrolling up.
export default function FinalCta({ demo, demoId, onDemoChange, price, onAddBundle }) {
  return (
    <section className="aio-final">
      <div className="aio-container aio-container--narrow">
        <h2 className="aio-final__title">Four jobs. One order. <em>{demo.possessive} All-in-1 Bundle.</em></h2>
        <button type="button" className="fd-btn fd-btn--reversed fd-btn--large fd-btn-shape--pill" onClick={onAddBundle}>
          <span className="fd-btn-text">Add All-in-1 Bundle · {money(price)}</span>
        </button>
        <p className="aio-final__switch">Shopping for someone else?</p>
        <DemoTabs demoId={demoId} onChange={onDemoChange} />
      </div>
    </section>
  );
}

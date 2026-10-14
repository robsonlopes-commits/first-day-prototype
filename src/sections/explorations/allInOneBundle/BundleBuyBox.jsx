import { forwardRef } from 'react';
import DemoTabs from './DemoTabs.jsx';
import IndividualPicks from './IndividualPicks.jsx';
import { money, BUNDLE_DISCOUNT_MONTHLY, BUNDLE_DISCOUNT_ONETIME } from '../../../data/allInOneBundle.js';

// Right column of the hero: demo tabs, promise, frequency, bundle CTA, then the individual picks.
const BundleBuyBox = forwardRef(function BundleBuyBox({ demo, demoId, onDemoChange, frequency, onFrequencyChange, onAddBundle, onAddItem }, ctaRef) {
  const price = frequency === 'monthly' ? demo.totals.monthly : demo.totals.oneTime;
  const pct = frequency === 'monthly' ? BUNDLE_DISCOUNT_MONTHLY : BUNDLE_DISCOUNT_ONETIME;
  return (
    <div className="aio-buybox" style={{ '--aio-demo-color': demo.color }}>
      <DemoTabs demoId={demoId} onChange={onDemoChange} />

      <p className="aio-buybox__eyebrow">All-in-1 Bundle · {demo.age}</p>
      <h1 className="aio-buybox__title">{demo.possessive} All-in-1 Bundle</h1>
      <div className="aio-buybox__rating" aria-label="4.8 stars from over 1,000,000 families">
        <span className="aio-buybox__stars" aria-hidden="true">★★★★★</span>
        <span>4.8 stars | 1,000,000+ Families</span>
      </div>
      <p className="aio-buybox__tagline">{demo.tagline}</p>
      <p className="aio-buybox__sub">{demo.sub}</p>

      <ul className="aio-buybox__inside" aria-label="What is inside">
        {demo.items.map((it) => (
          <li key={it.key}><span className="aio-check" aria-hidden="true" />{it.label}<em>{it.title}</em></li>
        ))}
      </ul>

      <fieldset className="aio-freq">
        <legend className="aio-freq__legend">Delivery Frequency</legend>
        {[
          ['monthly', 'Monthly', demo.totals.monthly, BUNDLE_DISCOUNT_MONTHLY, ['FREE gift on orders $75+', 'FREE shipping on first order', 'Cancel anytime, no questions asked']],
          ['onetime', 'One-Time', demo.totals.oneTime, BUNDLE_DISCOUNT_ONETIME, []],
        ].map(([id, label, total, off, perks]) => (
          <label key={id} className={`aio-freq__card${frequency === id ? ' is-selected' : ''}`}>
            <input type="radio" name="aio-frequency" value={id} checked={frequency === id} onChange={() => onFrequencyChange(id)} />
            <span className="aio-freq__row">
              <span className="aio-freq__radio" aria-hidden="true" />
              <span className="aio-freq__label">{label}</span>
              <span className="aio-freq__price"><s>{money(demo.totals.base)}</s> <strong>{money(total)}</strong></span>
            </span>
            {perks.length > 0 && (
              <ul className="aio-freq__perks">
                {perks.map((p) => <li key={p}><span className="aio-check" aria-hidden="true" />{p}</li>)}
              </ul>
            )}
            <span className="aio-freq__off">Save {off}%</span>
          </label>
        ))}
      </fieldset>

      <button ref={ctaRef} type="button" className="fd-btn fd-btn--primary fd-btn--large fd-btn-shape--pill aio-buybox__cta" onClick={onAddBundle}>
        <span className="fd-btn-text">Add All-in-1 Bundle · {money(price)}</span>
      </button>
      <p className="aio-buybox__save">
        You save <strong>{money(demo.totals.base - price)}</strong> ({pct}%) and {money(demo.totals.individual - price)} more than buying the four on their own.
      </p>

      <IndividualPicks demo={demo} frequency={frequency} onAddItem={onAddItem} />
    </div>
  );
});
export default BundleBuyBox;

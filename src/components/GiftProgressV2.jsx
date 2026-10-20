import { useState } from 'react';
import { customImg } from '../lib/assets.js';
import './giftProgressV2.css';

// Free gift progress, v2. The v1 is GiftProgressV1 in src/layout/CartDrawer.jsx (the cart keeps using it). Designed in Figma "Ideation - Brainstorming",
// page "PDP", frame "Cart" (nodes 6400:14056 and 6400:14119). Two states, both with the collapse arrow:
//   in progress  discount icon + "$45.00 away from a FREE $25 GIFT!", the gift card (image, name, line, More Info), the bar with the gift lock and the goal
//   unlocked     "🎉 Gift Unlocked", the same card with a gift badge on the photo, a full bar and a check instead of the lock
// It starts collapsed (header + bar); the arrow reveals the gift card. Reaching the goal changes the header and bar but does not open it: only the arrow does.
//   total      current subtotal in CENTS      threshold   goal in cents (default 7500)      giftValue  dollars shown in the message
//   gift       { title, description, image }  (data supplied, so the image stays dynamic)   onMoreInfo  called by the More Info button
const G = (f) => customImg(`gwp2/${f}`);
const money = (cents) => `$${(Math.max(0, cents) / 100).toFixed(2)}`;
const DEFAULT_GIFT = { title: 'Hydration Electrolyte', description: 'Replenishes electrolytes for optimal hydration.', image: G('product.png') };

export default function GiftProgressV2({ total, threshold = 7500, giftValue = 25, gift = DEFAULT_GIFT, defaultExpanded = false, onMoreInfo }) {
  const unlocked = total >= threshold;
  const [expanded, setExpanded] = useState(defaultExpanded);
  const fill = Math.min(1, total / threshold);
  const g = { ...DEFAULT_GIFT, ...gift };

  return (
    <div className={`fd-gwp2${unlocked ? ' is-unlocked' : ''}${expanded ? ' is-expanded' : ''}`} data-component="fd-gwp-v2">
      <div className="fd-gwp2__head">
        {unlocked
          ? <p className="fd-gwp2__msg"><strong>🎉 Gift Unlocked</strong></p>
          : <p className="fd-gwp2__msg"><img src={G('discount.svg')} alt="" width="24" height="24" /><span><strong>{money(threshold - total)}</strong> away from a FREE ${giftValue} GIFT!</span></p>}
        <button type="button" className="fd-gwp2__toggle" aria-expanded={expanded} aria-label={expanded ? 'Hide gift details' : 'Show gift details'} onClick={() => setExpanded((e) => !e)}>
          <img src={G('collapse.svg')} alt="" width="20" height="20" />
        </button>
      </div>

      <div className="fd-gwp2__details" aria-hidden={!expanded}>
        <div className="fd-gwp2__details-inner">
          <div className="fd-gwp2__card">
            <div className="fd-gwp2__gift">
              <div className="fd-gwp2__media">
                <img src={g.image} alt="" width="60" height="60" loading="lazy" />
                {unlocked && <span className="fd-gwp2__badge"><img src={G('gift-white.svg')} alt="" width="12" height="12" /></span>}
              </div>
              <div className="fd-gwp2__text">
                <p className="fd-gwp2__name">{g.title}</p>
                <p className="fd-gwp2__desc">{g.description}</p>
              </div>
            </div>
            <div className="fd-gwp2__foot">
              <button type="button" className="fd-gwp2__more" tabIndex={expanded ? 0 : -1} onClick={onMoreInfo}>
                <img src={G('info.svg')} alt="" width="16" height="16" /><span>More Info</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="fd-gwp2__bar" role="progressbar" aria-valuemin={0} aria-valuemax={threshold} aria-valuenow={Math.min(total, threshold)} aria-label="Progress to the free gift">
        <div className="fd-gwp2__track"><div className="fd-gwp2__fill" style={{ width: `${fill * 100}%` }} /></div>
        <div className="fd-gwp2__point">
          <span className="fd-gwp2__lock"><img src={G(unlocked ? 'check.svg' : 'gift.svg')} alt="" width="15" height="15" /></span>
          <span className="fd-gwp2__cap">${threshold / 100}</span>
        </div>
      </div>
    </div>
  );
}

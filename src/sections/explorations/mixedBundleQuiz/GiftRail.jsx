import { shopImg } from '../../../lib/assets.js';

// EXPLORATION Mixed Bundle Builder + Quiz: the head of the footer of the builder (the closed summary drawer). It shows the climb as ONE line of stops instead of two lines of text:
// every stop is a product of the box (1, 2, 3, 4) and holds its discount, with the free gift of that step as a round picture hanging on the stop (color when earned, grey when not).
// Under it only the NEXT gift is named ("Next Gift: Weekly Meal Planner + Recipes"), the discount lives inside the stop as "40% Off"; once everything is earned it says so. The full detail (names, prices, savings) stays in the
// drawer that opens with the arrow. Used through the `renderHead` option of useBuildBox (src/sections/FdBuildBox.jsx), nothing else uses it.
const giftName = (g) => g.displayName || g.label || 'Gift';
const free = (g) => `Free ${giftName(g)}`;

export default function GiftRail({ n, tiers, subscribe, filled, gifts }) {
  const steps = tiers.map((t) => ({ qty: t.qty, pct: subscribe ? t.percent : t.otpPercent, gift: gifts[t.qty - 1] || null })).filter((s) => Number.isFinite(s.pct));
  if (!steps.length) return null;
  const reached = steps.filter((s) => s.qty <= filled).length;
  const next = steps.find((s) => s.qty > filled) || null;
  const frac = steps.length > 1 ? Math.max(0, Math.min(1, (reached - 1) / (steps.length - 1))) : 0;
  const last = steps[steps.length - 1];
  const text = next
    ? <>Next Gift: <strong>{next.gift ? giftName(next.gift) : `${next.pct}% Off`}</strong></>
    : <>You unlocked <strong>{last.pct}% Off</strong> + all free gifts</>;
  return (
    <div className="mbq-rail">
      <div className="mbq-rail__track" role="img" aria-label={steps.map((s) => `${s.qty} ${s.qty === 1 ? 'product' : 'products'}: ${s.pct}% off${s.gift ? ` and ${free(s.gift)}` : ''}${s.qty <= filled ? ', unlocked' : ''}`).join('. ')}>
        <i className="mbq-rail__line" />
        <i className="mbq-rail__fill" style={{ '--f': frac }} />
        {steps.map((s) => {
          const on = s.qty <= filled; const isNext = next && next.qty === s.qty;
          const gOn = s.gift && s.qty <= n.earned;
          return (
            <div key={s.qty} className={`mbq-rail__stop${on ? ' is-on' : ''}${isNext ? ' is-next' : ''}`}>
              <span className="mbq-rail__pct"><b>{s.pct}%</b><small>Off</small></span>
              {s.gift ? <span className={`mbq-rail__gift${gOn ? ' is-on' : ''}${isNext ? ' is-next' : ''}`}>{s.gift.image ? <img src={shopImg(s.gift.image)} alt="" width="40" height="40" draggable="false" /> : null}</span> : null}
            </div>
          );
        })}
      </div>
      <p className={`mbq-rail__text${next ? '' : ' is-done'}`} data-drawer-text aria-live="polite">{text}</p>
    </div>
  );
}

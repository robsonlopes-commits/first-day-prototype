import { useEffect, useRef, useState } from 'react';
import NavIcon from '../../../layout/NavIcon.jsx';
import { themeAsset } from '../../../lib/assets.js';
import { useCart } from '../../../layout/CartContext.jsx';
import { MEMBER_TYPES, START_TYPES, TIERS, MAX_PCT, GIFT_LIST, typeOf, pctFor, nextTier, productsFor, memberName, defaultName } from '../../../data/familyBox.js';
import { PLUS_SVG, MINUS_SVG, Raw } from '../../FdBuildBox.jsx';
import Img from '../../../components/Img.jsx';
import FdInfoModal from '../../../components/FdInfoModal.jsx';
import { shopImg, customImg } from '../../../lib/assets.js';
import { INFO_MODAL_PRODUCTS, INFO_MODAL_IMAGES } from '../../../data/bundleQuiz.js';
import '../../../styles/theme/PBFCM-PDP-styles.css'; // the style of the "Add to my box" button of the info modal (the landing buy box that loaded it is gone)
import '../../../styles/theme/fd-button.css';
import '../../../styles/theme/fd-build-box.css';
import './familyBox.css';

// EXPLORATION Family Box Builder: the block under the clinicians band. The shopper adds the people of the family (1 kid by default), every person gets their own
// box with a carousel of the products of their age, and a summary fixed at the bottom of the screen shows what was chosen, split by box, the discount tier and the
// gifts, with the add to cart button. Mom and Teen always have a box with a "Start" button until the person is added; the other boxes exist only when the family has that person.
const money = (cents) => `$${(cents / 100).toFixed(2).replace(/\.00$/, '')}`;
const unit = (p, pct) => Math.round((p.price * (100 - pct)) / 100);
const Check = ({ size = 14 }) => <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3.5 8.4l3 3 6-6.4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>;

// a trash can, no circle: with one in the box the minus becomes "remove" and the plus is the only blue button
const TRASH_SVG = <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a1 1 0 0 0 1 .9h8a1 1 0 0 0 1-.9L18 7M9 7V4.8A.8.8 0 0 1 9.8 4h4.4a.8.8 0 0 1 .8.8V7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
function Stepper({ qty, label, onSet }) {
  return (
    <div className="fd-build-box-popup__stepper fbb-qty" role="group" aria-label={`${label} quantity`}>
      {qty <= 1
        ? <button type="button" className="fd-build-box-popup__step fbb-step--trash" aria-label={`Remove ${label}`} onClick={() => onSet(0)}>{TRASH_SVG}</button>
        : <button type="button" className="fd-build-box-popup__step" aria-label={`Decrease ${label}`} onClick={() => onSet(qty - 1)}><Raw html={MINUS_SVG} style={{ display: 'contents' }} /></button>}
      <span className="fd-build-box-popup__qty" aria-live="polite">{qty}</span>
      <button type="button" className="fd-build-box-popup__step" aria-label={`Increase ${label}`} onClick={() => onSet(qty + 1)}><Raw html={PLUS_SVG} style={{ display: 'contents' }} /></button>
    </div>
  );
}

// the vertical version of the product item of the bundle builder: bottle on a tinted spotlight, name, blurb, price and tier discount, Add (a stepper once it is in the box)
function Product({ p, qty, pct, onSet, onInfo }) {
  return (
    <article className={`fbb-prod${qty > 0 ? ' is-in' : ''}`}>
      {/* photo, name and text open the info modal; the (i) button is the visible way to it (and the one for the keyboard, with the name) */}
      <div className="fbb-prod__media fbb-open" onClick={onInfo}>
        {p.multi && <span className="fbb-prod__badge">Best Seller</span>}
        <span className="fbb-prod__tick" aria-hidden="true"><Check size={14} /></span>
        <img src={p.bottle} alt="" width="280" height="280" loading="lazy" />
        <button type="button" className="fbb-prod__info" aria-label={`Product details: ${p.title}`} onClick={(e) => { e.stopPropagation(); onInfo(); }}><img src={customImg('addon/icon-info.svg')} alt="" width="16" height="16" /></button>
      </div>
      <div className="fbb-prod__body fbb-open" onClick={onInfo}>
        <h4 className="fbb-prod__name"><button type="button" className="fbb-prod__name-btn" onClick={(e) => { e.stopPropagation(); onInfo(); }}>{p.title}</button></h4>
        <p className="fbb-prod__blurb">{p.blurb}</p>
        <p className="fbb-prod__price"><b>{money(unit(p, pct))}</b><s>{money(p.price)}</s><em>{pct}% Off</em></p>
      </div>
      <div className="fbb-prod__action">
        {qty > 0 ? <Stepper qty={qty} label={p.title} onSet={onSet} /> : (
          <button type="button" className="fd-build-box-popup__add fbb-add" onClick={() => onSet(1)}>Add <Raw html={PLUS_SVG} style={{ display: 'contents' }} /></button>
        )}
      </div>
    </article>
  );
}

const ARROW_PREV = <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const ARROW_NEXT = <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>;

// The carousel pattern of the site (the product carousel): on desktop, under the track, a round arrow, the page dots and a round arrow (the first one is
// faded at the start, the last one at the end). On mobile there is no navigation, the track is swiped.
function Carousel({ children }) {
  const ref = useRef(null);
  const [nav, setNav] = useState({ pages: 1, page: 0 });
  const measure = () => {
    const e = ref.current; if (!e) return;
    const max = e.scrollWidth - e.clientWidth;
    const pages = max <= 2 ? 1 : Math.ceil(e.scrollWidth / e.clientWidth);
    const page = pages <= 1 ? 0 : Math.min(pages - 1, Math.max(0, Math.round((e.scrollLeft / max) * (pages - 1))));
    setNav((n) => (n.pages === pages && n.page === page ? n : { pages, page }));
  };
  useEffect(() => { measure(); window.addEventListener('resize', measure); return () => window.removeEventListener('resize', measure); }, []); // eslint-disable-line
  const goTo = (i) => { const e = ref.current; if (!e) return; const max = e.scrollWidth - e.clientWidth; e.scrollTo({ left: nav.pages <= 1 ? 0 : (max * i) / (nav.pages - 1), behavior: 'smooth' }); };
  return (
    <div className="fbb-car">
      <div className="fbb-car__track" ref={ref} onScroll={measure}>{children}</div>
      {nav.pages > 1 && (
        <div className="fbb-car__nav" aria-label="Carousel navigation">
          <button type="button" className={`fbb-car__arrow${nav.page === 0 ? ' disabled' : ''}`} aria-label="View previous products" aria-disabled={nav.page === 0} onClick={() => goTo(nav.page - 1)}>{ARROW_PREV}</button>
          <div className="fbb-car__dots">
            {Array.from({ length: nav.pages }, (_, i) => <button key={i} type="button" className={`fbb-car__dot${i === nav.page ? ' active' : ''}`} aria-label={`Page ${i + 1}`} onClick={() => goTo(i)} />)}
          </div>
          <button type="button" className={`fbb-car__arrow${nav.page === nav.pages - 1 ? ' disabled' : ''}`} aria-label="View next products" aria-disabled={nav.page === nav.pages - 1} onClick={() => goTo(nav.page + 1)}>{ARROW_NEXT}</button>
        </div>
      )}
    </div>
  );
}

// The small dialog to type the name of a person (opens from the chip in "Your Family"). Empty = back to the default name ("Kid 1").
function NameModal({ member, members, onSave, onClose }) {
  const [text, setText] = useState(member.name || '');
  const inputRef = useRef(null);
  useEffect(() => { inputRef.current?.focus(); inputRef.current?.select(); }, []);
  useEffect(() => { const k = (e) => { if (e.key === 'Escape') onClose(); }; document.addEventListener('keydown', k); return () => document.removeEventListener('keydown', k); }, [onClose]);
  const t = typeOf(member.type);
  const save = (e) => { e.preventDefault(); onSave(member.id, text.trim()); };
  return (
    <div className="fbb-name" data-t={member.type} role="dialog" aria-modal="true" aria-labelledby="fbb-name-title">
      <div className="fbb-name__overlay" onClick={onClose} />
      <form className="fbb-name__panel" onSubmit={save}>
        <button type="button" className="fbb-name__close" aria-label="Close" onClick={onClose}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
        </button>
        <span className="fbb-name__disc"><NavIcon icon={t.icon} /></span>
        <h3 className="fbb-name__title" id="fbb-name-title">Name This {t.label}</h3>
        <label className="fbb-name__label" htmlFor="fbb-name-input">Their name shows on their box and in your cart.</label>
        <input id="fbb-name-input" ref={inputRef} className="fbb-name__input" type="text" maxLength={20} autoComplete="off" placeholder={defaultName(members, member)} value={text} onChange={(e) => setText(e.target.value)} />
        <button type="submit" className="fd-btn fd-btn--large fd-btn--primary fd-btn-shape--pill fbb-name__save"><span className="fd-btn-text">Save</span></button>
      </form>
    </div>
  );
}

// Asks before a box that already has products is removed (a box with nothing in it is removed right away).
function ConfirmRemoveModal({ name, bottles, onConfirm, onClose }) {
  useEffect(() => { const k = (e) => { if (e.key === 'Escape') onClose(); }; document.addEventListener('keydown', k); return () => document.removeEventListener('keydown', k); }, [onClose]);
  return (
    <div className="fbb-name fbb-confirm" role="alertdialog" aria-modal="true" aria-labelledby="fbb-confirm-title" aria-describedby="fbb-confirm-text">
      <div className="fbb-name__overlay" onClick={onClose} />
      <div className="fbb-name__panel">
        <button type="button" className="fbb-name__close" aria-label="Close" onClick={onClose}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
        </button>
        <h3 className="fbb-name__title" id="fbb-confirm-title">Remove {name}&apos;s Box?</h3>
        <p className="fbb-name__label" id="fbb-confirm-text">{bottles === 1 ? 'The product in this box' : `The ${bottles} products in this box`} will be removed from your family box too.</p>
        <button type="button" className="fd-btn fd-btn--large fd-btn--primary fd-btn-shape--pill fbb-name__save" onClick={onConfirm}><span className="fd-btn-text">Remove Box</span></button>
        <button type="button" className="fd-btn fd-btn--large fd-btn--secondary fd-btn-shape--pill fbb-name__save fbb-confirm__keep" onClick={onClose}><span className="fd-btn-text">Keep Box</span></button>
      </div>
    </div>
  );
}

export default function FamilyBox() {
  const cart = useCart();
  const nextId = useRef(2);
  const [members, setMembers] = useState([{ id: 1, type: 'kid' }]); // 1 kid by default
  const [qty, setQty] = useState({}); // `${memberId}:${variantId}` -> bottles
  const [open, setOpen] = useState(false); // the summary at the bottom, expanded
  const [removing, setRemoving] = useState(null); // id of the person whose box has products and waits for the confirmation
  const [naming, setNaming] = useState(null); // id of the person whose name is being typed
  const [info, setInfo] = useState(null); // { p, memberId }: the product whose info modal is open

  // the sticky header covers the top of the screen: every jump to the box (the CTAs of the page, the grey button) stops below it (scroll-margin-top in the css)
  useEffect(() => {
    const set = () => { const h = document.querySelector('.header-wrapper-container'); document.documentElement.style.setProperty('--fbb-header-h', `${h ? Math.round(h.getBoundingClientRect().height) : 80}px`); };
    set(); window.addEventListener('resize', set);
    return () => { window.removeEventListener('resize', set); document.documentElement.style.removeProperty('--fbb-header-h'); };
  }, []);
  useEffect(() => { document.body.classList.add('fbb-has-bar'); return () => document.body.classList.remove('fbb-has-bar'); }, []); // room at the end of the page for the fixed summary
  const addMember = (type) => setMembers((ms) => [...ms, { id: nextId.current++, type }]);
  const renameMember = (id, name) => { setMembers((ms) => ms.map((m) => (m.id === id ? { ...m, name } : m))); setNaming(null); };
  const bottlesOf = (id) => Object.entries(qty).filter(([k]) => k.startsWith(`${id}:`)).reduce((t, [, n]) => t + n, 0);
  const askRemove = (id) => { if (bottlesOf(id) > 0) setRemoving(id); else removeMember(id); };
  const removeMember = (id) => { setMembers((ms) => ms.filter((m) => m.id !== id)); setQty((q) => Object.fromEntries(Object.entries(q).filter(([k]) => !k.startsWith(`${id}:`)))); };
  const setBottles = (memberId, variantId, n) => setQty((q) => { const k = `${memberId}:${variantId}`; const next = { ...q }; if (n <= 0) delete next[k]; else next[k] = Math.min(9, n); return next; });

  const rows = []; // what is in the boxes, in box order
  members.forEach((m) => productsFor(typeOf(m.type).audience).forEach((p) => { const n = qty[`${m.id}:${p.variantId}`] || 0; if (n > 0) rows.push({ m, p, n }); }));
  const bottles = rows.reduce((t, r) => t + r.n, 0);
  const pct = pctFor(Math.max(1, bottles)); // with an empty box the cards show the first tier price
  const listTotal = rows.reduce((t, r) => t + r.p.price * r.n, 0);
  const total = rows.reduce((t, r) => t + unit(r.p, pct) * r.n, 0);
  const next = nextTier(bottles);
  const unlocked = Math.min(bottles, GIFT_LIST.length);
  const nextGift = GIFT_LIST[unlocked];
  const progress = Math.min(bottles, TIERS[TIERS.length - 1].n) / TIERS[TIERS.length - 1].n;

  const headline = bottles === 0 ? 'Add your first product to earn gifts'
    : next ? `Add one more product to unlock ${next.pct}% Off + Free ${nextGift.label}` : `You unlocked ${MAX_PCT}% Off + ${GIFT_LIST.length} Free Gifts`;

  const stepRef = useRef(null);
  // nothing chosen yet: the grey button is not really disabled, it takes the person to the boxes to pick the first product
  const goToBoxes = () => { setOpen(false); stepRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
  const addToCart = () => {
    if (bottles === 0) { goToBoxes(); return; }
    rows.forEach((r) => {
      const key = `fbb-${r.m.id}-${r.p.variantId}`;
      cart.addLine({ handle: r.p.handle, title: r.p.title, image: r.p.bottle, price: r.p.price }, true,
        { key, title: `${r.p.title} for ${memberName(members, r.m)}`, price: unit(r.p, pct), compare: r.p.price, image: r.p.bottle });
      if (r.n > 1) cart.changeQty(key, r.n - 1);
    });
    cart.openCart();
  };

  const present = new Set(members.map((m) => m.type));
  return (
    <section className="fbb" id="family-box" aria-label="Family box builder">
      <div className="fbb__layout">
      <div className="fbb__inner">
        <div className="fbb-hero">
          <p className="fbb-hero__text">🎁 Build Your Personalized Bundle To Unlock Up To <mark>{MAX_PCT}% Off</mark> + <mark>{GIFT_LIST.length} FREE Gifts</mark>!</p>
          <ol className="fbb-ladder" aria-label="Discount tiers">
            {TIERS.map((t) => (
              <li key={t.n} className={bottles >= t.n ? 'is-on' : ''}>
                <span className="fbb-ladder__dot">{bottles >= t.n ? <Check size={14} /> : t.n}</span>
                <span className="fbb-ladder__lab"><b>{t.pct}% Off</b><small>{t.n} {t.n === 1 ? 'bottle' : 'bottles'}</small></span>
              </li>
            ))}
          </ol>
        </div>

        <div className="fbb-step">
          <p className="fbb-eyebrow">Step 1</p>
          <h2 className="fbb__h">Who Are You Shopping For?</h2>
          <p className="fbb__sub">Add everyone in your family. Each person gets their own box.</p>
          <div className="fbb__types">
            {MEMBER_TYPES.map((t) => (
              <button key={t.key} type="button" className="fbb-type" data-t={t.key} onClick={() => addMember(t.key)}>
                <span className="fbb-type__avatar">
                  <span className="fbb-type__disc"><NavIcon icon={t.icon} /></span>
                  <span className="fbb-type__plus" aria-hidden="true"><svg viewBox="0 0 12 12" width="12" height="12" fill="none"><path d="M6 1.75v8.5M1.75 6h8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg></span>
                </span>
                <span className="fbb-type__label">{t.label}</span>
                <span className="fbb-type__ages">{t.ages}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="fbb-family">
          <div className="fbb-family__head">
            <h3 className="fbb__h fbb__h--sm">Your Family</h3>
            <span className="fbb-count">{members.length} {members.length === 1 ? 'person' : 'people'}</span>
          </div>
          {members.length === 0 ? <p className="fbb__empty">No one yet. Add someone above.</p> : (
            <ul className="fbb__members">
              {members.map((m) => (
                <li key={m.id} className="fbb-member" data-t={m.type}>
                  <button type="button" className="fbb-member__edit" aria-label={`Edit the name of ${memberName(members, m)}`} onClick={() => setNaming(m.id)}>
                    <span className="fbb-member__disc"><NavIcon icon={typeOf(m.type).icon} /></span>
                    <span className="fbb-member__name">{memberName(members, m)}</span>
                  </button>
                  <button type="button" className="fbb-member__remove" aria-label={`Remove ${memberName(members, m)}`} onClick={() => askRemove(m.id)}>×</button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="fbb-step" ref={stepRef}>
          <p className="fbb-eyebrow">Step 2</p>
          <h2 className="fbb__h">Fill Each Box</h2>
          <p className="fbb__sub">Pick what each person needs. Every bottle counts toward your discount.</p>
        </div>

        <div className="fbb__boxes">
          {members.map((m) => {
            const t = typeOf(m.type); const name = memberName(members, m);
            const prods = productsFor(t.audience);
            const count = prods.reduce((s, p) => s + (qty[`${m.id}:${p.variantId}`] || 0), 0);
            return (
              <article key={m.id} className="fbb-box" data-t={m.type}>
                <header className="fbb-box__head">
                  <span className="fbb-box__disc"><NavIcon icon={t.icon} /></span>
                  <div className="fbb-box__titles">
                    <h3 className="fbb-box__title">{name}&apos;s Box</h3>
                    <span className="fbb-box__ages">Age {t.ages}</span>
                  </div>
                  {count > 0 && <span className="fbb-box__count">{count} added</span>}
                </header>
                <Carousel>
                  {prods.map((p) => <Product key={p.variantId} p={p} pct={pct} qty={qty[`${m.id}:${p.variantId}`] || 0} onSet={(n) => setBottles(m.id, p.variantId, n)} onInfo={() => setInfo({ p, memberId: m.id })} />)}
                </Carousel>
              </article>
            );
          })}
          {START_TYPES.filter((k) => !present.has(k)).map((k) => {
            const t = typeOf(k);
            return (
              <article key={k} className="fbb-box fbb-box--start" data-t={k}>
                <header className="fbb-box__head">
                  <span className="fbb-box__disc"><NavIcon icon={t.icon} /></span>
                  <div className="fbb-box__titles">
                    <h3 className="fbb-box__title">{t.label}&apos;s Box</h3>
                    <span className="fbb-box__ages">Age {t.ages}</span>
                  </div>
                </header>
                <button type="button" className="fd-btn fd-btn--medium fd-btn--primary fd-btn-shape--pill fbb-box__start" onClick={() => addMember(k)}>
                  <span className="fd-btn-text">Start {t.label}&apos;s Box</span>
                </button>
              </article>
            );
          })}
        </div>
      </div>

      <div className={`fbb-sum${open ? ' is-open' : ''}`}>
        <div className="fbb-sum__scrim" aria-hidden="true" onClick={() => setOpen(false)} />
        <div className="fbb-sum__sheet">
          <button type="button" className="fbb-sum__head" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
            <span className="fbb-sum__grab" aria-hidden="true" />
            <span className="fbb-sum__badge"><img src={themeAsset('fd-build-box-promo-badge.svg')} width="32" height="32" alt="" /></span>
            <span className="fbb-sum__txt">
              <span className="fbb-sum__headline">{headline}</span>
              <span className="fbb-sum__bar" aria-hidden="true"><i style={{ width: `${progress * 100}%` }} /></span>
            </span>
            <span className="fbb-sum__chev" aria-hidden="true"><i /></span>
          </button>
          <div className="fbb-sum__panel" aria-hidden={!open}>
            <div className="fbb-sum__scroll">
              {rows.length === 0 ? <p className="fbb-sum__empty">Your boxes are empty. Pick products above.</p> : members.filter((m) => rows.some((r) => r.m === m)).map((m) => (
                <div key={m.id} className="fbb-sum__group" data-t={m.type}>
                  <h4 className="fbb-sum__group-title"><span className="fbb-sum__group-disc"><NavIcon icon={typeOf(m.type).icon} /></span>{memberName(members, m)}&apos;s Box</h4>
                  {rows.filter((r) => r.m === m).map((r) => (
                    <div key={r.p.variantId} className="fbb-sum__row">
                      <span className="fbb-sum__thumb"><img src={r.p.bottle} alt="" width="48" height="48" /></span>
                      <div className="fbb-sum__info"><span className="fbb-sum__name">{r.p.title}</span><span className="fbb-sum__price"><b>{money(unit(r.p, pct))}</b> <s>{money(r.p.price)}</s></span></div>
                      <Stepper qty={r.n} label={r.p.title} onSet={(n) => setBottles(m.id, r.p.variantId, n)} />
                    </div>
                  ))}
                </div>
              ))}
              <div className="fbb-sum__gifts">
                {GIFT_LIST.map((g, i) => (
                  <div key={g.key} className={`fbb-gift${i < unlocked ? ' is-on' : ''}`}>
                    <span className="fbb-gift__tag">FREE <s>{g.price}</s></span>
                    <span className="fbb-gift__img"><Img src={shopImg(g.image)} alt="" width="120" height="120" loading="lazy" />{i >= unlocked && <i className="fbb-gift__lock" aria-hidden="true" />}</span>
                    <span className="fbb-gift__name">{g.label}</span>
                  </div>
                ))}
              </div>
              <div className="fbb-sum__line"><span>Current Subtotal:</span><span>{bottles > 0 && <s>{money(listTotal)}</s>} <b>{money(total)}</b>{bottles > 0 && <em className="fbb-sum__off">{pct}% OFF</em>}</span></div>
              {next && bottles > 0 && <div className="fbb-sum__line fbb-sum__line--next"><span>Add 1 More Product:</span><span>Extra Gift + <em className="fbb-sum__off fbb-sum__off--next">{next.pct}% OFF</em></span></div>}
            </div>
          </div>
          <button type="button" className="fd-btn fd-btn--large fd-btn--primary fd-btn-shape--pill fbb-sum__cta" aria-disabled={bottles === 0} onClick={addToCart}>
            <span className="fd-btn-text">{bottles === 0 ? 'Add Your First Product' : 'Add To Cart'}</span>
            {bottles > 0 && <span className="fbb-sum__total">{money(total)}</span>}
            {bottles > 0 && <img src={themeAsset('fd-build-box-cta-arrow.svg')} width="28" height="28" alt="" aria-hidden="true" />}
          </button>
        </div>
      </div>
      </div>
      {removing != null && members.some((m) => m.id === removing) && <ConfirmRemoveModal name={memberName(members, members.find((m) => m.id === removing))} bottles={bottlesOf(removing)} onConfirm={() => { removeMember(removing); setRemoving(null); }} onClose={() => setRemoving(null)} />}
      {naming != null && members.some((m) => m.id === naming) && <NameModal member={members.find((m) => m.id === naming)} members={members} onSave={renameMember} onClose={() => setNaming(null)} />}
      <FdInfoModal motion="soft" open={!!info} onClose={() => setInfo(null)}
        product={info ? { title: info.p.title, description: (INFO_MODAL_PRODUCTS[info.p.handle] || {}).description || `<p>${info.p.blurb}</p>`, images: (INFO_MODAL_IMAGES[info.p.handle] || []).map(shopImg).concat([]).length ? INFO_MODAL_IMAGES[info.p.handle].map(shopImg) : [info.p.bottle] } : null}
        offer={info ? { price: unit(info.p, pct), compare: info.p.price } : null}
        footer={info ? { label: 'Add to my box', onClick: () => setBottles(info.memberId, info.p.variantId, (qty[`${info.memberId}:${info.p.variantId}`] || 0) + 1) } : null} />
    </section>
  );
}

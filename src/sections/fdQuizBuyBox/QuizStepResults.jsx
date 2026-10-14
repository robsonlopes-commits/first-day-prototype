import { themeAsset } from '../../lib/assets.js';
import Img from '../../components/Img.jsx';
import {
  config, giftLadder, giftKey, money, packSize, shownFor, packCartTitle, recapBlurb, detailBlurb, bundlePriceLabel, otpPriceLabel, compareLabel, productListTotal,
  listField, unlockedGiftKeys, nextHigherBundle, nextLockedGift, packFlag,
} from './quizLogic.js';

// STEP 2 of the quiz (data-qbb-step="2"): the recommendation. Every block below is its own component so one piece can be restyled at a time:
//   QuizRecap -> QuizBackLink -> QuizPackPicker -> QuizPackDetail -> QuizMeetProducts -> QuizGiftLadder -> QuizAddToCart -> QuizClaim
//   -> QuizSubscriptionBenefits -> QuizOneTimePurchase
// Markup / class names follow sections/fd-quiz-buy-box.liquid; texts that the theme JS builds at runtime follow assets/fd-quiz-buy-box.js.
const CheckIcon = ({ size = 20 }) => (
  <svg className="fd-qbb__check-icon" width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="10" fill="currentColor" /><path d="M5.4 10.2l3.1 3.1 6.1-7" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const MissIcon = () => (
  <svg className="fd-qbb__miss-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="10" fill="currentColor" /><path d="M6.5 6.5l7 7M13.5 6.5l-7 7" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" /></svg>
);
const LockIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true"><path d="M9 33C8.175 33 7.46875 32.7063 6.88125 32.1188C6.29375 31.5313 6 30.825 6 30V15C6 14.175 6.29375 13.4688 6.88125 12.8813C7.46875 12.2938 8.175 12 9 12H10.5V9C10.5 6.925 11.2313 5.15625 12.6938 3.69375C14.1563 2.23125 15.925 1.5 18 1.5C20.075 1.5 21.8438 2.23125 23.3063 3.69375C24.7688 5.15625 25.5 6.925 25.5 9V12H27C27.825 12 28.5313 12.2938 29.1188 12.8813C29.7063 13.4688 30 14.175 30 15V30C30 30.825 29.7063 31.5313 29.1188 32.1188C28.5313 32.7063 27.825 33 27 33H9ZM20.1188 24.6188C20.7063 24.0313 21 23.325 21 22.5C21 21.675 20.7063 20.9688 20.1188 20.3813C19.5313 19.7938 18.825 19.5 18 19.5C17.175 19.5 16.4688 19.7938 15.8813 20.3813C15.2938 20.9688 15 21.675 15 22.5C15 23.325 15.2938 24.0313 15.8813 24.6188C16.4688 25.2063 17.175 25.5 18 25.5C18.825 25.5 19.5313 25.2063 20.1188 24.6188ZM13.5 12H22.5V9C22.5 7.75 22.0625 6.6875 21.1875 5.8125C20.3125 4.9375 19.25 4.5 18 4.5C16.75 4.5 15.6875 4.9375 14.8125 5.8125C13.9375 6.6875 13.5 7.75 13.5 9V12Z" fill="#2C3D50" /></svg>
);
const InfoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9.2" stroke="currentColor" strokeWidth="1.8" /><circle cx="12" cy="8" r="1.1" fill="currentColor" /><path d="M12 11.2v5.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
);
const bottle = (src) => (src ? <Img src={src} alt="" width="48" height="96" loading="lazy" /> : null);
const fill = (tpl, map) => Object.entries(map).reduce((t, [k, v]) => t.replace(`{${k}}`, String(v)), tpl);

/* "Here's what we recommend based on your answers" green banner */
export function QuizRecap({ s, html }) {
  return (
    <aside className="fd-qbb__recap" data-qbb-recap hidden={!s.results_heading && !html}>
      <span className="fd-qbb__recap-icon" aria-hidden="true"><CheckIcon size={22} /></span>
      <div className="fd-qbb__recap-copy">
        {s.results_heading && <h3 className="fd-qbb__recap-heading">{s.results_heading}</h3>}
        <div className="fd-qbb__recap-body" hidden={!html} dangerouslySetInnerHTML={{ __html: html || '&nbsp;' }} />
      </div>
    </aside>
  );
}

/* "← Change my answers" (goes back to step 1, answers kept) */
export function QuizBackLink({ s, onBack }) {
  return <button type="button" className="fd-qbb__back" onClick={onBack}>← {s.back_label}</button>;
}

/* 2x2 grid of pack cards. States per card: default / hover / is-selected (purple ring + filled "Save" bar) / is-recommended / flag (Best deal, Recommended) */
export function QuizPackPicker({ s, contents, recommendedHandle, selectedHandle, onSelect, onInfo }) {
  return (
    <div className="fd-qbb__packs" role="radiogroup" aria-label="Pack size">
      {config.bundles.map((b) => {
        const selected = b.handle === selectedHandle; const recommended = b.handle === recommendedHandle;
        const shown = shownFor(b, contents); const flag = packFlag(b, recommendedHandle);
        const price = bundlePriceLabel(b, shown);
        return (
          <div className="fd-qbb__pack-wrap" key={b.handle} style={{ order: b.sortOrder }}>
            <div className={`fd-qbb__pack${selected ? ' is-selected' : ''}${recommended ? ' is-recommended' : ''}`} role="radio" tabIndex={0} aria-checked={selected} data-qbb-bundle={b.handle}
              onClick={() => onSelect(b.handle)} onKeyDown={(e) => { if ((e.key === 'Enter' || e.key === ' ') && e.target === e.currentTarget) { e.preventDefault(); onSelect(b.handle); } }}>
              {flag && <span className={flag.cls}>{flag.text}</span>}
              <button type="button" className="fd-qbb__pack-info" aria-label={fill(s.info_button_label, { pack: b.title })} onClick={(e) => { e.preventDefault(); e.stopPropagation(); onInfo(b.handle); }}><InfoIcon /></button>
              <span className="fd-qbb__pack-body">
                <span className="fd-qbb__pack-shot">{shown.map((p) => <span className="fd-qbb__pack-shot-item" key={p.handle}>{bottle(p.quizImage || p.image)}</span>)}</span>
                <span className="fd-qbb__pack-name">{b.title}</span>
                <span className="fd-qbb__pack-price"><span>{price}</span>{s.price_suffix && <span className="fd-qbb__pack-per">{s.price_suffix}</span>}</span>
              </span>
              {b.displaySavings && <span className="fd-qbb__pack-save">Save {b.displaySavings}</span>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* purple detail card under the packs: title, price / compare, blurb, benefit checks, "missing out" upgrade nudge */
export function QuizPackDetail({ s, bundle, shown, keys, subscribe, onUpgrade, rootRef }) {
  const name = packCartTitle(bundle, shown, keys);
  const body = detailBlurb(shown, bundle);
  const each = bundlePriceLabel(bundle, shown);
  const compare = compareLabel(bundle, shown);
  const total = money(productListTotal(shown, subscribe !== false));
  let benefits = listField(bundle.advantages); if (!benefits.length) benefits = listField(s.renew_template);
  const higher = nextHigherBundle(bundle);
  let flaws = listField(bundle.flaws);
  if (!flaws.length) { const locked = nextLockedGift(bundle); if (locked && higher) flaws = [fill(s.miss_template, { gift: locked.label || locked.displayName || 'the next gift', pack: higher.title || 'next pack' })]; }
  return (
    <div className="fd-qbb__detail" data-qbb-detail ref={rootRef}>
      <div className="fd-qbb__detail-head">
        <h3 className="fd-qbb__detail-title">{name}</h3>
        <div className="fd-qbb__detail-prices">
          <span className="fd-qbb__detail-price"><span>{each}</span><span className="fd-qbb__detail-each" hidden={!each}>/each</span></span>
          <span className="fd-qbb__detail-compare" hidden={!compare}>{compare}</span>
        </div>
      </div>
      <p className="fd-qbb__detail-body" hidden={!body}>{body}</p>
      <ul className="fd-qbb__checks" hidden={!benefits.length}>
        {benefits.map((l) => <li className="fd-qbb__check" key={l}><CheckIcon /><span>{l.replace(/\{price\}/gi, total)}</span></li>)}
      </ul>
      <ul className="fd-qbb__flaws" hidden={!flaws.length}>
        {flaws.map((l) => (
          <li className="fd-qbb__miss" key={l} {...(higher ? { 'data-qbb-upgrade': higher.handle, role: 'button', tabIndex: 0, onClick: () => onUpgrade(higher.handle), onKeyDown: (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onUpgrade(higher.handle); } } } : {})}>
            <MissIcon /><span>{l}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* collapsible "Meet the products": closed = bottle stack + "2 of 4 in your pack", open = one row per product with "Learn more" */
export function QuizMeetProducts({ s, shown, open, onToggle, onLearnMore }) {
  const inPack = Object.fromEntries(shown.map((p) => [p.handle, true]));
  return (
    <div className={`fd-qbb__meet${open ? ' is-open' : ''}`} data-qbb-meet>
      <button type="button" className="fd-qbb__meet-head" aria-expanded={open} aria-controls="fd-qbb-meet-body" onClick={onToggle}>
        <span className="fd-qbb__meet-stack">
          {config.catalog.map((p) => <span key={p.handle} className={`fd-qbb__meet-shot${inPack[p.handle] ? '' : ' is-out'}`}>{p.quizImage || p.image ? <Img src={p.quizImage || p.image} alt="" width="40" height="48" loading="lazy" /> : null}</span>)}
        </span>
        <span className="fd-qbb__meet-title"><b>{s.meet_heading || 'Meet the products'}</b><small>{fill(s.meet_count_template, { n: shown.length, total: config.catalog.length })}</small></span>
        <span className="fd-qbb__meet-chev" aria-hidden="true"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
      </button>
      <div className="fd-qbb__meet-body" id="fd-qbb-meet-body" hidden={!open}>
        {config.catalog.map((p) => (
          <div className="fd-qbb__meet-row" key={p.handle}>
            <span className="fd-qbb__meet-img">{p.quizImage || p.image ? <Img src={p.quizImage || p.image} alt="" width="40" height="48" loading="lazy" /> : null}</span>
            <span className="fd-qbb__meet-txt">
              <b>{p.title}{inPack[p.handle] && <em>{s.in_pack_badge}</em>}</b>
              {p.description && <span>{p.description}</span>}
            </span>
            <button type="button" className="fd-qbb__meet-more" onClick={() => onLearnMore(p.handle)}>{s.learn_more_label}</button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* "VALUED AT $10, OUR GIFT TO YOU" + the 4 gift tiles (unlocked = product shot with green ring, locked = grey tile with lock) */
export function QuizGiftLadder({ bundle }) {
  const unlocked = unlockedGiftKeys(bundle);
  return (
    <>
      <p className="fd-qbb__gifts-heading" hidden={!bundle.giftBenefitInfo}>{bundle.giftBenefitInfo}</p>
      <div className="fd-qbb__gifts">
        {giftLadder.map((g) => {
          const on = !!unlocked[giftKey(g)];
          return (
            <div key={giftKey(g)} className={`fd-qbb__gift fd-build-box__gift ${on ? 'is-unlocked' : 'is-locked is-lock-only'}`}>
              <div className="fd-qbb__gift-media fd-build-box__gift-media">
                {on && g.image && <Img src={g.image} alt="" width="120" height="120" loading="lazy" />}
                {g.price
                  ? <span className="fd-qbb__gift-badge fd-build-box__gift-badge"><span className="fd-qbb__gift-badge-label">FREE</span><span className="fd-qbb__gift-badge-price">{g.price}</span></span>
                  : g.badgeLabel ? <span className="fd-qbb__gift-badge fd-build-box__gift-badge">{g.badgeLabel}</span> : null}
                {!on && <span className="fd-build-box__gift-lock" aria-hidden="true"><LockIcon /></span>}
              </div>
              <p className="fd-qbb__gift-label fd-build-box__gift-label">{g.label || g.displayName || 'Gift'}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

/* "Add My Pack →" + "2/4 free gifts · 100% Money Back Guarantee". busy = request in flight (button disabled, aria-busy) */
export function QuizAddToCart({ s, bundle, busy, onAdd }) {
  const unlocked = unlockedGiftKeys(bundle);
  const n = giftLadder.filter((g) => unlocked[giftKey(g)]).length;
  return (
    <>
      <button type="button" className="fd-qbb__add" disabled={busy} aria-busy={busy} onClick={onAdd}>
        <span>{s.add_label}</span>
        <img src={themeAsset('fd-build-box-cta-arrow.svg')} width="32" height="32" alt="" aria-hidden="true" />
      </button>
      <div className="fd-qbb__status">
        <span>{fill(s.gifts_status_template, { n, total: giftLadder.length })}</span>
        <span>{s.status_guarantee_text}</span>
      </div>
    </>
  );
}

/* seal + "Less than 1% of First Day customers claim our Money-Back Guarantee!" */
export function QuizClaim({ s }) {
  if (!s.claim_text) return null;
  return (
    <div className="fd-qbb__claim">
      <img src={themeAsset('fd-build-box-seal.png')} width="51" height="51" alt="" />
      <div className="fd-qbb__claim-text rte" dangerouslySetInnerHTML={{ __html: s.claim_text }} />
    </div>
  );
}

/* "First Day Subscription Benefits" checklist */
export function QuizSubscriptionBenefits({ s }) {
  const items = [s.benefit_1, s.benefit_2, s.benefit_3].filter(Boolean);
  if (!s.benefits_heading && !items.length) return null;
  return (
    <div className="fd-qbb__benefits-block">
      {s.benefits_heading && <h4 className="fd-qbb__benefits-heading">{s.benefits_heading}</h4>}
      {items.length > 0 && (
        <ul className="fd-qbb__benefits-list">
          {items.map((t) => <li className="fd-qbb__benefit" key={t}><img src={themeAsset('fd-build-box-check-outline.svg')} width="16" height="11" alt="" aria-hidden="true" /><span>{t}</span></li>)}
        </ul>
      )}
    </div>
  );
}

/* "One-Time Purchase $35.10 / each" link: switches to OTP pricing (.is-otp) and adds the pack straight away */
export function QuizOneTimePurchase({ s, bundle, shown, subscribe, onOtp }) {
  if (!s.show_otp) return null;
  return (
    <div className="fd-qbb__otp">
      <button type="button" className="fd-qbb__otp-link" aria-pressed={!subscribe} onClick={onOtp}>
        <span>{s.otp_label}</span> <span>{otpPriceLabel(bundle, shown)}</span>
      </button>
      {s.otp_note && <p className="fd-qbb__otp-note">{s.otp_note}</p>}
    </div>
  );
}

export default function QuizStepResults({ s, keys, contents, recommendedHandle, selectedHandle, meetOpen, subscribe, busy, detailRef, step2Ref, actions }) {
  const bundle = config.bundles.find((b) => b.handle === selectedHandle) || config.bundles.find((b) => b.handle === recommendedHandle);
  if (!bundle) return null;
  const shown = shownFor(bundle, contents);
  return (
    <div data-qbb-step="2" ref={step2Ref}>
      <QuizRecap s={s} html={recapBlurb(shownFor(bundle, contents), keys)} />
      <QuizBackLink s={s} onBack={actions.back} />
      <QuizPackPicker s={s} contents={contents} recommendedHandle={recommendedHandle} selectedHandle={bundle.handle} onSelect={actions.selectPack} onInfo={actions.openPackInfo} />
      <QuizPackDetail s={s} bundle={bundle} shown={shown} keys={keys} subscribe={subscribe} onUpgrade={actions.selectPack} rootRef={detailRef} />
      <QuizMeetProducts s={s} shown={shown} open={meetOpen} onToggle={actions.toggleMeet} onLearnMore={actions.openProduct} />
      <QuizGiftLadder bundle={bundle} />
      <QuizAddToCart s={s} bundle={bundle} busy={busy} onAdd={actions.add} />
      <QuizClaim s={s} />
      <QuizSubscriptionBenefits s={s} />
      <QuizOneTimePurchase s={s} bundle={bundle} shown={shown} subscribe={subscribe} onOtp={actions.otp} />
    </div>
  );
}

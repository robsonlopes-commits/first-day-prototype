import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useCart } from '../layout/CartContext.jsx';
import { themeAsset } from '../lib/assets.js';
import { QUIZ_GALLERY } from '../data/bundleBuilder.js';
import QuizGallery from './fdQuizBuyBox/QuizGallery.jsx';
import QuizStepConcerns from './fdQuizBuyBox/QuizStepConcerns.jsx';
import QuizStepResults from './fdQuizBuyBox/QuizStepResults.jsx';
import QuizInfoModal from './fdQuizBuyBox/QuizInfoModal.jsx';
import QuizStateJumper from './fdQuizBuyBox/QuizStateJumper.jsx';
import { concernsInDisplayOrder, recommend } from './fdQuizBuyBox/quizLogic.js';
import '../styles/theme/PBFCM-PDP-styles.css';
import '../styles/theme/fd-build-box.css';
import '../styles/theme/fd-quiz-buy-box.css';

// sections/fd-quiz-buy-box.liquid + assets/fd-quiz-buy-box.js (<fd-quiz-buy-box> custom element) as local React state.
// Props: { id, settings } = the section instance of templates/page.lp-bundle-v2.json; content comes from src/data/bundleBuilder.js.
//
// QUIZ STATES (all reachable from the prototype chip bottom-left, see QUIZ_STATES):
//   step 1  QuizStepConcerns  - nothing ticked (hint + disabled CTA) / ticked (CTA on)            -> fd-qbb root has no .is-step-2
//   step 2  QuizStepResults   - recommendation for 1 / 2 / 3 / 4 products, shopper-picked pack, "Meet the products" open,
//                               adding (busy), one-time purchase (.is-otp)                         -> fd-qbb root has .is-step-2
//   modal   QuizInfoModal     - pack info (tabs + "Choose the N Pack") / product "Learn more"
// There are no loading or error screens in the theme: "Add My Pack" disables itself while the cart request is in flight, then the
// cart drawer opens (settings.after_add = 'drawer'; prototype: useCart().openCart()).
const STEP_HASH = 'fd-quiz-step-2';
const ordinal = (n) => { const v = n % 100; return v >= 11 && v <= 13 ? `${n}th` : n % 10 === 1 ? `${n}st` : n % 10 === 2 ? `${n}nd` : n % 10 === 3 ? `${n}rd` : `${n}th`; };
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const todayLabel = () => { const d = new Date(); return `${MONTHS[d.getMonth()]}. ${ordinal(d.getDate())}`; }; // "Oct. 14th" (data-fd-date-src)

export default function FdQuizBuyBox({ id, settings: s }) {
  const { openCart } = useCart();
  const [keys, setKeys] = useState([]);
  const [step, setStep] = useState(1);
  const [packPick, setPackPick] = useState('');
  const [meetOpen, setMeetOpen] = useState(false);
  const [subscribe, setSubscribe] = useState(true);
  const [busy, setBusy] = useState(false);
  const [modal, setModal] = useState(null);
  const [jumped, setJumped] = useState('step1-empty');
  const step2Ref = useRef(null);
  const detailRef = useRef(null);
  const sectionId = id;

  const rec = useMemo(() => recommend(keys), [keys]);
  const selectedHandle = packPick || rec.recommendedHandle;
  const scrollTo = (ref) => requestAnimationFrame(() => ref.current && ref.current.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' }));

  const pushHash = (on) => { try { history.pushState({ fdQuizStep: on ? 2 : 1 }, '', location.pathname + location.search + (on ? `#${STEP_HASH}` : '')); } catch (e) { /* ignore */ } };
  useEffect(() => { // browser back from step 2 returns to step 1 (popstate handler of the theme JS); a fresh load always starts at step 1
    if (location.hash === `#${STEP_HASH}`) { try { history.replaceState(null, '', location.pathname + location.search); } catch (e) { /* ignore */ } }
    const onPop = () => setStep(location.hash.replace(/^#/, '') === STEP_HASH ? 2 : 1);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const toggle = (handle) => { // every tick re-computes the winner and resets the highlighted pack to it
    setKeys((k) => (k.includes(handle) ? k.filter((x) => x !== handle) : [...k, handle]));
    setPackPick('');
    setJumped('');
  };
  const goStep = (n, push = true) => {
    if (n === 2 && !keys.length) return;
    setStep(n);
    if (push) pushHash(n === 2);
    if (n === 2) scrollTo(step2Ref);
  };
  const selectPack = (handle) => { setPackPick(handle); setJumped(''); scrollTo(detailRef); };
  const addToCart = useCallback(() => { // theme: FDCartApi.addItems -> refresh + open drawer. Prototype: short busy state, then the mock drawer.
    setBusy(true);
    setTimeout(() => { setBusy(false); openCart(); }, 700);
  }, [openCart]);

  const jump = (st) => { // prototype state jumper
    setKeys(st.answers); setPackPick(st.pack || ''); setStep(st.step); setMeetOpen(!!st.meetOpen); setSubscribe(st.subscribe !== false);
    setBusy(!!st.busy); setModal(st.modal ? (st.modal.type === 'pack'
      ? { type: 'pack', bundle: st.modal.bundle, contents: recommend(st.answers).contents } : st.modal) : null);
    setJumped(st.key);
    if (st.step === 2) scrollTo(step2Ref);
  };

  const actions = {
    back: () => goStep(1),
    selectPack,
    openPackInfo: (bundle) => setModal({ type: 'pack', bundle, contents: rec.contents }),
    openProduct: (handle) => setModal({ type: 'product', handle }),
    toggleMeet: () => setMeetOpen((o) => !o),
    add: addToCart,
    otp: () => { setSubscribe(false); addToCart(); },
  };

  const px = (v) => `${v}px`;
  const vars = {
    '--fd-qbb-padding-top-desktop': px(s.padding_top_desktop), '--fd-qbb-padding-right-desktop': px(s.padding_right_desktop), '--fd-qbb-padding-bottom-desktop': px(s.padding_bottom_desktop), '--fd-qbb-padding-left-desktop': px(s.padding_left_desktop),
    '--fd-qbb-padding-top-mobile': px(s.padding_top_mobile), '--fd-qbb-padding-right-mobile': px(s.padding_right_mobile), '--fd-qbb-padding-bottom-mobile': px(s.padding_bottom_mobile), '--fd-qbb-padding-left-mobile': px(s.padding_left_mobile),
    '--fd-qbb-bg-color': s.section_bg_color, '--fd-qbb-container-max-width': px(s.container_max_width_desktop),
    '--fd-qbb-title-font-family': s.title_font_family, '--fd-qbb-title-font-size-desktop': px(s.title_font_size_desktop), '--fd-qbb-title-font-size-mobile': px(s.title_font_size_mobile), '--fd-qbb-title-font-weight': s.title_font_weight, '--fd-qbb-title-font-color': s.title_font_color,
    '--fd-qbb-question-font-family': s.question_font_family, '--fd-qbb-question-font-size-desktop': px(s.question_font_size_desktop), '--fd-qbb-question-font-size-mobile': px(s.question_font_size_mobile), '--fd-qbb-question-font-weight': s.question_font_weight, '--fd-qbb-question-font-color': s.question_font_color,
    '--fd-qbb-cta-bg': s.cta_bg_color, '--fd-qbb-cta-color': s.cta_font_color, '--fd-qbb-cta-font-family': s.cta_font_family, '--fd-qbb-cta-font-size-desktop': px(s.cta_font_size_desktop), '--fd-qbb-cta-font-size-mobile': px(s.cta_font_size_mobile),
    '--fd-qbb-cta-font-weight': s.cta_font_weight, '--fd-qbb-cta-height': px(s.cta_height), '--fd-qbb-cta-radius': px(s.cta_radius),
  };
  const promo = (s.promo_text || '').replace(/\{date\}|\[date\]/gi, todayLabel());
  const rootClass = `fd-qbb${step === 2 ? ' is-step-2' : ''}${subscribe ? '' : ' is-otp'}`;

  return (
    <div id={`shopify-section-${id}`} className="shopify-section fd-quiz-buy-box-section">
      <fd-quiz-buy-box class={rootClass} id={s.anchor_id || 'fd-quiz-buy-box'} style={vars}>
        <div className="fd-qbb__layout">
          <aside className="fd-qbb__gallery" data-qbb-gallery><QuizGallery images={QUIZ_GALLERY} /></aside>
          <div className="fd-qbb__panel">
            {s.heading && <h2 className="fd-qbb__title">{s.heading}</h2>}
            {s.stars_text && <p className="fd-qbb__stars"><span className="fd-qbb__stars-icons" aria-hidden="true">★★★★★</span><span>{s.stars_text}</span></p>}
            {promo && (
              <div className="fd-qbb__promo">
                <img src={themeAsset('fd-build-box-promo-badge.svg')} width="24" height="24" alt="" />
                <div className="rte" dangerouslySetInnerHTML={{ __html: promo }} />
              </div>
            )}
            {step === 1 && <QuizStepConcerns s={s} sectionId={sectionId} concerns={concernsInDisplayOrder} selected={keys} onToggle={toggle} onContinue={() => goStep(2)} />}
            {step === 2 && (
              <QuizStepResults s={s} keys={keys} contents={rec.contents} recommendedHandle={rec.recommendedHandle} selectedHandle={selectedHandle}
                meetOpen={meetOpen} subscribe={subscribe} busy={busy} detailRef={detailRef} step2Ref={step2Ref} actions={actions} />
            )}
          </div>
        </div>
      </fd-quiz-buy-box>
      <QuizInfoModal s={s} request={modal} onClose={() => setModal(null)} onChoose={(handle) => { setModal(null); selectPack(handle); }} />
      <QuizStateJumper current={jumped} onJump={jump} />
    </div>
  );
}

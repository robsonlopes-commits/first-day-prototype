import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { customImg } from '../../../lib/assets.js';
import { QUIZ_SETTINGS as s } from '../../../data/bundleBuilder.js';
import { concernsInDisplayOrder } from '../../fdQuizBuyBox/quizLogic.js';
import '../../../layout/styles/fd-tabs-v3.css';
import '../../../styles/theme/fd-button.css';
import '../../../styles/theme/fd-build-box.css';
import '../../../styles/theme/fd-quiz-buy-box.css';
import '../bundleAddOn/addOnModal.css'; // the shell (overlay, dialog, scrolling body, footer buttons) is the one of the add-on modal exploration
import './quizModal.css';

// EXPLORATION Mixed Bundle Builder + Quiz: the modal that opens from the buy box button "Add To Cart & View Gift" (same trigger as the live upsell
// dialog and the add-on modal exploration). It holds step 1 of the 1 step quiz of /pages/bundle-builder-v2: the question as the title, the line "Select all that apply..." and the concerns (the promo line and the hint are not shown).
//   onContinue()  "No, Thanks. Continue": adds only the product and opens the cart
//   onClose()     Escape or a click on the overlay: closes without adding anything
//   onSee(keys)   "See My Recommendation": the ticked concern handles, the page moves to the bundle builder step
const px = (v) => `${v}px`;
const VARS = {
  '--fd-qbb-question-font-family': s.question_font_family, '--fd-qbb-question-font-size-desktop': px(s.question_font_size_desktop), '--fd-qbb-question-font-size-mobile': px(s.question_font_size_mobile),
  '--fd-qbb-question-font-weight': s.question_font_weight, '--fd-qbb-question-font-color': s.question_font_color,
};

function ConcernLabel({ label, emphasis }) {
  const em = (emphasis || '').trim() ? emphasis : '';
  const i = em ? label.indexOf(em) : -1;
  if (i === -1) return <>{label}</>;
  return <>{label.slice(0, i)}<strong>{em}</strong>{label.slice(i + em.length)}</>;
}

export default function QuizModal({ open, onSee, onContinue, onClose }) {
  const [keys, setKeys] = useState([]);
  const bodyRef = useRef(null);
  const toggle = (handle) => setKeys((k) => (k.includes(handle) ? k.filter((x) => x !== handle) : [...k, handle]));
  const canContinue = keys.length > 0;

  useEffect(() => { if (open) setKeys([]); }, [open]);
  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
  }, [open, onClose]);

  if (!open) return null;
  return createPortal(
    <div className="aom" role="presentation">
      <div className="aom__overlay" onClick={onClose} />
      <section className="aom__dialog" role="dialog" aria-modal="true" aria-labelledby="mbq-title">
        <div className="aom__body" ref={bodyRef}>
          <div className="fd-qbb mbq-quiz" style={VARS}>
            <div className="mbq-quiz__head">
              <h2 className="aom__title" id="mbq-title">{s.question}</h2>
              {s.question_lede && <p className="mbq-quiz__lede">{s.question_lede}</p>}
            </div>
            <ul className="fd-qbb__concerns">
              {concernsInDisplayOrder.map((c) => {
                const checked = keys.includes(c.handle);
                return (
                  <li className="fd-qbb__concern" key={c.handle}>
                    <label className={`fd-qbb__concern-label${checked ? ' is-checked' : ''}`}>
                      <input className="fd-qbb__concern-input" id={`fd-qbb-mbq-${c.handle}`} type="checkbox" name="fd-qbb-concern-mbq" value={c.handle} autoComplete="off" checked={checked} onChange={() => toggle(c.handle)} />
                      <span className="fd-qbb__concern-copy">
                        {c.emoji && <span className="fd-qbb__concern-emoji" aria-hidden="true">{c.emoji}</span>}
                        <span className="fd-qbb__concern-text"><ConcernLabel label={c.label} emphasis={c.emphasis} /></span>
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <footer className="aom__cta">
          <button type="button" className="fd-btn fd-btn--large fd-btn--primary fd-btn-shape--pill aom__primary" disabled={!canContinue} aria-disabled={!canContinue} onClick={() => onSee(keys)}>
            <span className="fd-btn-text">{s.continue_label}</span><img src={customImg('addon/icon-arrow.svg')} alt="" width="24" height="24" />
          </button>
          <button type="button" className="fd-btn fd-btn--medium fd-btn--ghost fd-btn-shape--pill aom__secondary" onClick={onContinue}>
            <span className="fd-btn-text">No, Thanks. Continue</span>
          </button>
        </footer>
      </section>
    </div>,
    document.body,
  );
}

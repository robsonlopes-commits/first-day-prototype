import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useCart } from '../../layout/CartContext.jsx';
import { QUIZ_STATES } from '../../data/bundleBuilder.js';
import './quizStateJumper.css';

// PROTOTYPE-ONLY (not storefront UI): dashed chip, bottom-left, same look as the cart-state chip of the cart drawer.
// Lists every quiz state (QUIZ_STATES in src/data/bundleBuilder.js) so a designer can jump straight to it.
export default function QuizStateJumper({ current, onJump }) {
  const [open, setOpen] = useState(false);
  const { open: cartOpen } = useCart();
  if (cartOpen) return null; // the cart drawer shows its own prototype chip in the same corner
  return createPortal(
    <div className="proto-quiz-jump" data-expanded={open}>
      <button type="button" className="proto-quiz-jump__chip" onClick={() => setOpen((o) => !o)} aria-expanded={open}>prototype · quiz state</button>
      {open && (
        <div className="proto-quiz-jump__options" role="radiogroup" aria-label="Prototype quiz state">
          {QUIZ_STATES.map((st) => (
            <button key={st.key} type="button" role="radio" aria-checked={current === st.key} className={current === st.key ? 'is-on' : ''} onClick={() => onJump(st)}>{st.label}</button>
          ))}
        </div>
      )}
    </div>,
    document.body,
  );
}

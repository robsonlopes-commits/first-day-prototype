import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import ProductLegacy from '../ProductLegacy.jsx';
import EditionPicker from '../../components/EditionPicker.jsx';
import EditionMagic, { SWAP_AT, END_AT } from '../../components/EditionMagic.jsx';
import { TODDLERS_PROBIOTIC_PAGE } from '../../data/pdp/toddlersProbiotic.js';

// EXPLORATION: /explorations/sesame-toddlers-probiotic
// The page starts as the ORIGINAL (the production replica of /products/toddlers-3-in-1-probiotic: white, original assets and copy). The Sesame Street edition lives in
// SesameToddlersProbioticStyled.jsx (colors, waves, characters, new copy; its CSS and code are loaded only when it is picked, so the original stays untouched). The "Choose The Edition"
// picker of the buy box (Original / Sesame Street) switches between the two; it is in both versions, in the same place. ?sesame=1 opens the Sesame version directly.
const loadStyled = () => import('./SesameToddlersProbioticStyled.jsx');
const Styled = lazy(loadStyled);

const ORIGINAL = { ...TODDLERS_PROBIOTIC_PAGE, main: { ...TODDLERS_PROBIOTIC_PAGE.main } };
const reduced = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export default function SesameToddlersProbiotic() {
  const [edition, setEdition] = useState(() => (new URLSearchParams(window.location.search).get('sesame') === '1' ? 'sesame' : 'original'));
  const [magic, setMagic] = useState(false);
  const back = useRef(false);
  const timers = useRef([]);
  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);
  const toTop = () => window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  const pick = (id) => {
    if (id === edition || magic) return;
    if (id === 'sesame') {
      // Abby's spell: the page is swapped while the burst covers the screen, then it is scrolled back to the top
      loadStyled();
      if (reduced()) { setEdition('sesame'); toTop(); return; }
      setMagic(true);
      timers.current.push(window.setTimeout(() => { setEdition('sesame'); toTop(); }, SWAP_AT), window.setTimeout(() => setMagic(false), END_AT));
      return;
    }
    back.current = true; setEdition('original');
  };
  // going back to the Original keeps the picker where the shopper is looking (the two pages have different heights)
  useEffect(() => {
    if (!back.current) return undefined;
    back.current = false;
    const t = [120, 700].map((ms) => window.setTimeout(() => document.querySelector('.fd-edition')?.scrollIntoView({ block: 'center' }), ms));
    return () => t.forEach(window.clearTimeout);
  }, [edition]);
  const picker = <EditionPicker value={magic ? 'sesame' : edition} onChange={pick} />;
  return (
    <>
      {edition === 'sesame'
        ? <Suspense fallback={null}><Styled editionPicker={picker} /></Suspense>
        : <ProductLegacy page={{ ...ORIGINAL, main: { ...ORIGINAL.main, SLOT_AFTER_QTY: picker } }} />}
      {magic && <EditionMagic />}
    </>
  );
}

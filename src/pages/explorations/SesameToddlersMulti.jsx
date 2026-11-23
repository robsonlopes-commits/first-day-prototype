import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import ProductNew from '../ProductNew.jsx';
import EditionPicker from '../../components/EditionPicker.jsx';
import EditionMagic, { SWAP_AT, END_AT } from '../../components/EditionMagic.jsx';
import { TODDLERS_MULTI_PAGE } from '../../data/pdp/toddlersMultivitamin.js';
import { shopImg } from '../../lib/assets.js';
import './sesameToddlersMulti.css';

// EXPLORATION: /explorations/sesame-toddlers-multi
// The page starts as the ORIGINAL (the production replica of /products/the-no-junk-toddlers-multivitamin: white, original assets and copy). The Sesame Street edition lives in
// SesameToddlersMultiStyled.jsx (colors, waves, characters, the street scene, new copy; its CSS and code are loaded only when it is picked, so the original stays untouched). The
// "Choose The Edition" picker of the buy box (Original / Sesame Street) switches between the two; it is in both versions, in the same place (under the quantity cards, above Add To Cart).
// ?sesame=1 opens the Sesame version directly. Same flow as /explorations/sesame-toddlers-probiotic.
const loadStyled = () => import('./SesameToddlersMultiStyled.jsx');
const Styled = lazy(loadStyled);

const EDITIONS = [
  { id: 'original', label: 'Original', image: shopImg('toddlers-multi.png'), alt: "First Day Toddlers The Multi bottle" },
  { id: 'sesame', label: 'Sesame Street', image: '/assets/sesame/bottle-sesame-toddlers-multi.png', alt: "First Day Toddlers The Multi bottle, Sesame Street edition" },
];
const reduced = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export default function SesameToddlersMulti() {
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
  const picker = <EditionPicker value={magic ? 'sesame' : edition} onChange={pick} editions={EDITIONS} sameSize />;
  return (
    <>
      {edition === 'sesame'
        ? <Suspense fallback={null}><Styled editionPicker={picker} /></Suspense>
        : <div className="ss-multi-original"><ProductNew page={{ ...TODDLERS_MULTI_PAGE, main: { ...TODDLERS_MULTI_PAGE.main, SLOT_AFTER_QTY: picker } }} /></div>}
      {magic && <EditionMagic />}
    </>
  );
}

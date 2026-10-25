import { useEffect, useRef } from 'react';
import { TEMPLATE as T } from '../../../data/bundleQuizTemplate.js';
import { BUNDLE_PRODUCT, GIFTS, BUNDLE_CATALOG, INFO_MODAL_PRODUCTS, ALL_REVIEWS } from '../../../data/bundleQuiz.js';
import { useCart } from '../../../layout/CartContext.jsx';
import { useBuildBox, BuildBoxPopup } from '../../FdBuildBox.jsx';
import { QuizRecap } from '../../fdQuizBuyBox/QuizStepResults.jsx';
import { buildPlan, plainPlan } from './quizPlan.js';
import '../../../styles/theme/fd-quiz-buy-box.css';
import './quizBuild.css';

// EXPLORATION Mixed Bundle Builder + Quiz: the bundle builder of /pages/bundle-quiz (the full screen "Select At Least N Bottles" popup of the build box),
// opened on top of the landing right after the quiz modal. It starts with the product of the landing buy box (same quantity) plus what the answers add
// (quizPlan.js), every added item has a note that says why, and the list starts with the friendly recap box of the quiz explaining why items were added.
//   answers = { keys?, qty, monthly }   (no keys = no quiz, v2)   onClose()  the shopper closed the builder (the back arrow)
// The data is the one of /pages/bundle-quiz (template and catalog), the popup is the shared BuildBoxPopup, nothing is re-drawn here.
// the popup of this page without its template intro lines ("You've unlocked big savings...", "789+ bottles bought in past week" and the "Order by ..." promo): the recap box already opens the list
const BLOCKS = T.standalone_product.blocks.filter((b) => !b.disabled).map((b) => (b.type === 'build_box_popup' ? { ...b, settings: { ...b.settings, intro_text: '', social_proof_stat: '', promo_text: '' } } : b));
// the one line blurb of each product, short enough for two lines on a phone even on a chosen (bordered) card. Same meaning as the catalog blurbs, no hyphens in new copy.
const SHORT = {
  "Kids' Multivitamin": 'For mood, behavior & picky eating.', "Kids' Magnesium": 'Melatonin free relaxation & sleep.', "Kids' Brain Support": 'For focus, learning & behavior.', "Kids' Probiotic+": 'Immunity, digestion & oral health.',
  "Toddlers' Multivitamin": "Helps fill toddlers' nutrient gaps.", "Toddlers' Probiotic+": 'For softer, easier to pass stools.',
  "Teens' Multivitamin": 'For motivation, energy & immunity.', "Teens' Magnesium": 'Melatonin free relaxation & sleep.', "Teens' Brain Support": 'For focus, learning & memory.', "Teens' Probiotic+": 'Immunity, digestion & skin health.',
  "Women's Multivitamin": 'For energy, skin & hair health.', "Women's Magnesium": 'Melatonin free relaxation & sleep.', "Women's Brain Support": 'Focus and calm mental energy.', "Women's Probiotic+": 'Immunity, digestion & bloating.',
  "Men's Multivitamin": 'Power packed nutrition for men.', "Men's Magnesium": 'Melatonin free relaxation & sleep.', "Men's Brain Support": 'Focus, memory & mental clarity.', "Men's Probiotic+": 'Immunity, digestion & recovery.',
};
// the audiences of the adults read as the family: Women is Mom, Men is Dad (tabs and list titles; the product names stay the real ones)
const AUDIENCE = { Women: 'Mom', Men: 'Dad' };
const CATALOG = BUNDLE_CATALOG.map((c) => ({ ...c, label: AUDIENCE[c.label] || c.label, products: c.products.map((p) => ({ ...p, description: SHORT[p.title] || p.description })) }));
const PRODUCT = { ...BUNDLE_PRODUCT, gifts: GIFTS, catalog: CATALOG, infoProducts: INFO_MODAL_PRODUCTS, mainImage: BUNDLE_PRODUCT.gallery[0][0], allReviewsText: { count: ALL_REVIEWS.count } };

export default function QuizBuilder({ answers, onClose }) {
  const cart = useCart();
  const withQuiz = !!answers.keys; // v1 comes from the quiz; v2 has no quiz: only the product of the page, no recap box, no notes
  const plan = withQuiz ? buildPlan(answers.keys, answers.qty) : plainPlan(answers.qty);
  const topSlot = withQuiz ? <div className="fd-qbb mbq-notice mbq-marker"><QuizRecap s={{}} html={plan.html} /></div> : <span className="mbq-marker" hidden />; // the marker lets the css style this builder only
  const bb = useBuildBox({ blocks: BLOCKS, product: PRODUCT, cart, initial: { qty: plan.initialQty, subscribe: answers.monthly }, notes: plan.notes, topSlot, pinned: plan.pinned, title: 'Build Your Family Box' });
  const opened = useRef(false);
  useEffect(() => { if (bb) bb.openPopup(); }, []); // eslint-disable-line
  const isOpen = !!(bb && bb.ui.open);
  useEffect(() => { // back to the landing when the shopper closes the builder
    if (isOpen) opened.current = true;
    else if (opened.current) onClose();
  }, [isOpen]); // eslint-disable-line
  return bb ? <BuildBoxPopup bb={bb} /> : null;
}

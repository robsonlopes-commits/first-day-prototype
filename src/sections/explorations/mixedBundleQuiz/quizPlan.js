import { CONCERNS, CATALOG } from '../../../data/bundleBuilder.js';
import { BUNDLE_CATALOG } from '../../../data/bundleQuiz.js';

// EXPLORATION Mixed Bundle Builder + Quiz: from the answers of the quiz to the box of the bundle builder (/pages/bundle-quiz).
// The product the shopper added on the page stays in its quantity, each answer adds the product that the live quiz maps it to (CONCERNS: product, and a
// partner product when the answers map to only ONE product, exactly like the live quiz does), one of each. Every added item gets a note that says why.
// The quiz catalog and the bundle builder catalog use different handles for two products: the map below joins them.
const BUILDER_HANDLE = { 'kids-enrichment-vitamin': 'kids-enrichment-vitamin', 'kids-calming-magnesium': 'kids-calming-magnesium', 'kids-daily-focus-brain-support-copy': 'kids-daily-focus', 'kids-3-in-1-probiotic': 'kids-belly-biotic' };
const KIDS = BUNDLE_CATALOG.find((c) => c.key === 'kids').products;
const builderProduct = (quizHandle) => KIDS.find((p) => p.handle === BUILDER_HANDLE[quizHandle]);
const titleOf = (quizHandle) => CATALOG.find((p) => p.handle === quizHandle).title;
const joinList = (arr) => (arr.length <= 1 ? arr[0] || '' : arr.length === 2 ? `${arr[0]} and ${arr[1]}` : `${arr.slice(0, -1).join(', ')} and ${arr[arr.length - 1]}`);
const bold = (arr) => arr.map((t) => `<strong>${t}</strong>`);

// The info card of an item has two lines at most, on every width. In the summary of the box on a desktop it is only about 230 px of text, so about 70
// characters in all. Text = what the shopper said + what the product does, without repeating its name (the card sits under it). Functional claims,
// asterisk; facts of firstday-brand-knowledge. Keep every piece short: the card also clamps at two lines, but a clamped sentence reads as broken.
const WHAT = {
  'kids-calming-magnesium': 'Melatonin free relaxation support.*',
  'kids-3-in-1-probiotic': 'Supports digestion and gut health.*',
  'kids-daily-focus-brain-support-copy': 'Citicoline supports focus and memory.*',
};
// what the shopper said, to follow "Your child ..." (one answer for the product)
const SAID = {
  'tummy-digestion-issues': 'has tummy troubles',
  'hyperactive-or-hard-to-calm-down': 'is hard to calm down',
  'struggles-to-focus-or-pay-attention': 'struggles to focus',
  'hard-to-fall-asleep-at-night': 'struggles to fall asleep',
  'picky-eater-who-wont-touch-vegetables': 'is a picky eater',
  'mood-swings-meltdowns': 'has mood swings',
};
// shorter phrases for the case of two answers on one product
const SHORT_PHRASE = { 'trouble sleeping': 'sleep' };
export const MAIN_HANDLE = 'kids-enrichment-vitamin'; // the product of the landing buy box

// keys = ticked concern handles, qty = quantity of the main product that was added on the page
export function buildPlan(keys, qty) {
  const picked = CONCERNS.filter((c) => keys.includes(c.handle)).sort((a, b) => a.sortOrder - b.sortOrder);
  const byProduct = {};
  picked.forEach((c) => { (byProduct[c.product] = byProduct[c.product] || []).push(c); });
  const matched = Object.keys(byProduct);
  let partner = null; // answers that map to one product pull in its partner
  if (matched.length === 1) { const c = picked.find((x) => x.partnerProduct && x.partnerProduct !== matched[0]); if (c) partner = { handle: c.partnerProduct, to: matched[0] }; }

  const main = builderProduct(MAIN_HANDLE);
  const initialQty = { [main.variantId]: Math.max(1, qty || 1) };
  const notes = {}; const added = [];
  CATALOG.forEach((p) => { // catalog order, so the list reads the same every time
    const handle = p.handle;
    if (handle === MAIN_HANDLE) return;
    const phrases = (byProduct[handle] || []).map((c) => c.phrase);
    const isPartner = partner && partner.handle === handle;
    if (!phrases.length && !isPartner) return;
    const bp = builderProduct(handle);
    initialQty[bp.variantId] = 1;
    const mine = byProduct[handle] || [];
    // one answer: the exact problem, two answers: their short phrases, so the card never needs a third line
    const why = mine.length === 1 ? `Your child ${SAID[mine[0].handle]}.` : mine.length ? `You mentioned ${joinList(phrases.map((x) => SHORT_PHRASE[x] || x))}.` : `Pairs with your ${titleOf(partner.to)}.`;
    notes[String(bp.variantId)] = `${why} ${WHAT[handle] || ''}`.trim(); // the info card of the item, in the list and in the summary of the box
    added.push({ title: p.title, phrases, partner: !phrases.length });
  });

  // the friendly notice at the top of the page
  const told = bold(picked.map((c) => c.phrase));
  const parts = [];
  if (told.length) parts.push(`You told us about ${joinList(told)}.`);
  if (added.length) parts.push(`So along with the ${bold([titleOf(MAIN_HANDLE)])[0]} you picked, we added ${joinList(bold(added.map((a) => a.title)))} to your box.`);
  const pinned = Object.keys(initialQty).map(String); // the product of the page first, then what the answers added (insertion order = catalog order)
  return { initialQty, notes, added, pinned, html: `<p>${parts.join(' ')}</p><p>You can change anything below.</p>` } // the last sentence is its own paragraph;
}

// no quiz (v2): the box starts with the product of the page, in the quantity that was added, and nothing else, with no notes and no recap
export function plainPlan(qty) {
  const main = builderProduct(MAIN_HANDLE);
  return { initialQty: { [main.variantId]: Math.max(1, qty || 1) }, notes: {}, added: [], pinned: [String(main.variantId)], html: '' };
}

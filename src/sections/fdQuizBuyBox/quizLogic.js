// Pure logic of assets/fd-quiz-buy-box.js (pack recommendation, naming, prices, gifts, recap copy), ported 1:1 so the prototype
// recommends / names / prices packs exactly like the live quiz. No DOM here: the React components only render the results.
import { CATALOG, CONCERNS, BUNDLES } from '../../data/bundleBuilder.js';

export const money = (cents) => `$${((Number(cents) || 0) / 100).toFixed(2).replace(/\.00$/, '')}`;
export const escapeHtml = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const parseMoneyToCents = (v) => { const raw = String(v == null ? '' : v).replace(/[^0-9.]/g, ''); return raw ? Math.round(parseFloat(raw) * 100) : 0; };
const capFirst = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : '');

export const sortByOrder = (list) => (list || []).slice().sort((a, b) => {
  const sa = Number(a && a.sortOrder); const sb = Number(b && b.sortOrder);
  const na = Number.isFinite(sa) ? sa : Infinity; const nb = Number.isFinite(sb) ? sb : Infinity;
  return na !== nb ? na - nb : String(a.handle || '').localeCompare(String(b.handle || ''));
});

// ---- resolved config (handles -> catalog objects) ----
const byHandle = Object.fromEntries(CATALOG.map((p) => [p.handle, p]));
export const config = {
  catalog: CATALOG,
  concerns: sortByOrder(CONCERNS.map((c) => ({ ...c, product: byHandle[c.product], partnerProduct: byHandle[c.partnerProduct] }))),
  // pack cards render in sortOrder (4 Pack first)
  bundles: sortByOrder(BUNDLES.map((b) => ({ ...b, products: b.products.map((h) => byHandle[h]) }))),
};
// concerns in the on-screen (step 1) order of the live page
export const concernsInDisplayOrder = CONCERNS.map((c) => config.concerns.find((x) => x.handle === c.handle));

const giftKey = (g) => (g ? g.handle || g.displayName || g.label || '' : '');
export const giftLadder = (() => {
  const seen = {}; const out = [];
  BUNDLES.slice().sort((a, b) => (a.giftUnlockCount || 0) - (b.giftUnlockCount || 0)).forEach((b) => b.gifts.forEach((g) => { const k = giftKey(g); if (k && !seen[k]) { seen[k] = true; out.push(g); } }));
  return out;
})();

export const packSize = (b) => { const n = Number(b && b.giftUnlockCount); return Number.isFinite(n) && n > 0 ? n : (b && b.products ? b.products.length : 0) || 1; };
export const bundleByHandle = (h) => config.bundles.find((b) => b.handle === h) || null;
const concernByHandle = (h) => config.concerns.find((c) => c.handle === h) || null;
const productKey = (e) => (e ? 'h' + String(e.handle).toLowerCase() : '');
const selectedConcerns = (keys) => sortByOrder(config.concerns.filter((c) => keys.indexOf(c.handle) !== -1));

function bundleForSize(size) {
  const exact = config.bundles.filter((b) => packSize(b) === size);
  if (exact.length) return sortByOrder(exact)[0];
  const bigger = config.bundles.filter((b) => packSize(b) >= size).sort((a, b) => packSize(a) - packSize(b));
  if (bigger.length) return bigger[0];
  const ordered = sortByOrder(config.bundles);
  return ordered.length ? ordered[ordered.length - 1] : null;
}

// products the answers map to first (partner product added when only one matches), then the rest of the catalog
export function buildContents(keys) {
  const picked = selectedConcerns(keys);
  const wanted = {};
  picked.forEach((c) => { const k = productKey(c.product); if (k) wanted[k] = true; });
  const matched = config.catalog.filter((p) => wanted[productKey(p)]);
  const matchedCount = matched.length;
  if (matched.length === 1) {
    for (let i = 0; i < picked.length; i += 1) {
      const partner = picked[i].partnerProduct;
      if (partner && productKey(partner) !== productKey(matched[0])) { matched.push(partner); break; }
    }
  }
  const used = {}; matched.forEach((p) => { used[productKey(p)] = true; });
  return { contents: matched.concat(config.catalog.filter((p) => !used[productKey(p)])), matchedCount };
}

// { contents, matchedCount, recommendedHandle } for a set of ticked concerns ('' when nothing ticked)
export function recommend(keys) {
  const built = buildContents(keys);
  if (!keys.length) return { ...built, recommendedHandle: '' };
  const picked = bundleForSize(Math.max(2, built.matchedCount));
  return { ...built, recommendedHandle: picked ? picked.handle : '' };
}

export const shownFor = (bundle, contents) => (contents && contents.length ? contents : (bundle && bundle.products) || []).slice(0, packSize(bundle));

function domainOf(item, keys) {
  const k = productKey(item);
  const sel = selectedConcerns(keys);
  for (let i = 0; i < sel.length; i += 1) if (productKey(sel[i].product) === k && sel[i].domain) return sel[i].domain;
  for (let i = 0; i < config.concerns.length; i += 1) if (productKey(config.concerns[i].product) === k && config.concerns[i].domain) return config.concerns[i].domain;
  return '';
}
function nameFor(items, bundle, keys) {
  if (items.length === 4) return String((bundle && bundle.subtitle) || '').trim() || 'Complete Kids Health Pack';
  const domains = items.map((i) => domainOf(i, keys)).filter(Boolean);
  if (domains.length === 3) return `${domains[0]} + ${domains[1]} + ${domains[2]} Pack`;
  if (domains.length === 2) return `${domains[0]} + ${domains[1]} Pack`;
  if (domains.length === 1) return `${domains[0]} Essential Pack`;
  return String((bundle && (bundle.subtitle || bundle.title)) || '').trim();
}
export function packCartTitle(bundle, items, keys) {
  const name = nameFor(items, bundle, keys); const size = String((bundle && bundle.title) || '').trim();
  if (name && size && name !== size) return `${name} — ${size}`;
  return name || size || 'Quiz Pack';
}

const joinList = (arr) => { arr = arr.filter(Boolean); if (arr.length <= 1) return arr[0] || ''; if (arr.length === 2) return `${arr[0]} and ${arr[1]}`; return `${arr.slice(0, -1).join(', ')} and ${arr[arr.length - 1]}`; };
const joinListHtml = (arr) => joinList(arr.filter(Boolean).map((i) => `<strong>${escapeHtml(i)}</strong>`));
const phraseOf = (c) => String((c && (c.phrase || c.emphasis || c.label)) || '').trim();

// "That covers the restlessness you told us about. This pack includes our Kids' Magnesium and Kids' Multivitamin."
export function recapBlurb(items, keys) {
  const parts = [];
  let covered = selectedConcerns(keys).filter((c) => items.some((i) => productKey(i) === productKey(c.product))).map(phraseOf).filter(Boolean);
  if (!covered.length) covered = selectedConcerns(keys).map(phraseOf).filter(Boolean);
  const names = items.map((i) => String(i.title || i.handle).trim()).filter(Boolean);
  if (covered.length) parts.push(`That covers the ${joinListHtml(covered)} you told us about.`);
  if (names.length) parts.push(`This pack includes our ${joinListHtml(names)}.`);
  return parts.join(' ');
}

export function detailBlurb(items, bundle) {
  const outcomes = items.map((i) => String((i && i.quizOutcome) || '').trim());
  const filled = outcomes.filter(Boolean);
  if (!items.length || filled.length !== items.length) return String((bundle && bundle.description) || '').trim();
  const roles = items.map((i) => String((i && i.quizRole) || '').trim());
  if (items.length === 1) return roles[0] ? `One thing to fix, one product doing it: ${roles[0]}.` : `${capFirst(outcomes[0])}.`;
  if (items.length === 2) return `${capFirst(outcomes[0])} plus ${outcomes[1]} — the two reinforce each other, so sorting one out makes the other easier.`;
  return `${capFirst(outcomes.slice(0, -1).join(', '))} and ${outcomes[outcomes.length - 1]} — handled together instead of one symptom at a time, because the same daily gaps sit behind all of them.`;
}

export const productListTotal = (products, subscribe) => products.reduce((t, p) => t + (subscribe === false ? Number(p.compareAtPrice || p.price) || 0 : Number(p.price) || 0), 0);
const eachPriceLabel = (products, subscribe) => { if (!products.length) return ''; const each = productListTotal(products, subscribe) / products.length; return each ? money(each) : ''; };
export const bundlePriceLabel = (bundle, products) => (bundle && bundle.displayPrice ? String(bundle.displayPrice) : eachPriceLabel(products, true));
export function otpPriceLabel(bundle, products) {
  const raw = String((bundle && bundle.displayOtpPrice) || '').trim();
  if (raw) return raw;
  const each = eachPriceLabel(products, false);
  return each ? `${each} / each` : '';
}
export function compareLabel(bundle, shown) {
  let label = String((bundle && bundle.displayComparePrice) || '').trim();
  if (!label && shown.length) { const c = productListTotal(shown, false) / shown.length; if (c > 0) label = money(c); }
  return label;
}

// lines split on bullets like listField()
export const listField = (v) => (v == null || v === '' ? [] : Array.isArray(v) ? v.flatMap(listField) : String(v).split(/[•\n\r]+/).map((l) => l.replace(/^\s*[-–]\s*/, '').trim()).filter(Boolean));

export function unlockedGiftKeys(bundle) {
  const map = {};
  ((bundle && bundle.gifts) || []).forEach((g) => { const k = giftKey(g); if (k) map[k] = true; });
  giftLadder.slice(0, Number(bundle && bundle.giftUnlockCount) || 0).forEach((g) => { map[giftKey(g)] = true; });
  return map;
}
export const nextHigherBundle = (current) => {
  const cu = Number(current && current.giftUnlockCount) || 0; let next = null;
  config.bundles.forEach((b) => { const n = Number(b.giftUnlockCount) || 0; if (n > cu && (!next || n < (Number(next.giftUnlockCount) || 0))) next = b; });
  return next;
};
export const nextLockedGift = (bundle) => { const u = unlockedGiftKeys(bundle); return giftLadder.find((g) => !u[giftKey(g)]) || null; };
export { giftKey, concernByHandle, parseMoneyToCents };

// pack flag above a card: Recommended / badge / Best deal / nothing
export function packFlag(bundle, recommendedHandle) {
  const cms = String(bundle.badge || '').trim(); const down = cms.toLowerCase();
  if (bundle.handle === recommendedHandle) return { cls: 'fd-qbb__pack-rec', text: down === 'recommended' ? cms : 'Recommended' };
  if (packSize(bundle) === 4 && (!recommendedHandle || bundle.handle !== recommendedHandle)) return { cls: 'fd-qbb__pack-badge', text: cms && down !== 'recommended' ? cms : 'Best deal' };
  if (cms && down !== 'recommended') return { cls: 'fd-qbb__pack-badge', text: cms };
  return null;
}

// the price offer passed to the pack info modal: { price, compare, plan } in cents
export function packOffer(bundle, shown, copy) {
  let price = parseMoneyToCents(bundle && bundle.displayPrice);
  if (!price && shown.length) price = Math.round(productListTotal(shown, true) / shown.length);
  let compare = parseMoneyToCents(bundle && bundle.displayComparePrice);
  if (!compare && shown.length) compare = Math.round(productListTotal(shown, false) / shown.length);
  return price ? { price, compare: compare > price ? compare : 0, plan: copy.price_plan_label } : null;
}

import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

// Private index of the EXPLORATIONS only (the replicas of the live pages are still reachable by their routes, they are just not listed here).
// Intentionally NOT styled with the storefront theme.
// To add one: put it as the FIRST item of `explorations` (the list order breaks ties between items of the same day), with the day it was started and a description of
// 8 words or fewer. `group` (a key of GROUPS) puts variations of the same idea together: new versions of a group go in it, not as a new top level item.
const GROUPS = {
  sesame: 'Sesame Street',
  mbb: 'Mixed Bundle Builder',
};
// { to: route, name, desc: 8 words or fewer, date: 'YYYY-MM-DD' (day it was started), group?: key of GROUPS }
const explorations = [
  { to: '/explorations/mixed-bundle-builder-quiz-v1-3', name: 'Quiz v1-3', desc: 'Text only footer, no pictures.', date: '2026-11-18', group: 'mbb' },
  { to: '/explorations/mixed-bundle-builder-quiz-v1-2', name: 'Quiz v1-2', desc: 'Footer with a small next gift picture.', date: '2026-11-18', group: 'mbb' },
  { to: '/explorations/sesame-toddlers-probiotic-v2', name: 'Toddlers Probiotic v2', desc: 'Park parallax, a family on a bench.', date: '2026-11-19', group: 'sesame' },
  { to: '/explorations/sesame-toddlers-bts', name: 'Toddlers Behind the Science', desc: 'Sesame edition of the Toddlers Multi landing.', date: '2026-11-12', group: 'sesame' },
  { to: '/explorations/sesame-toddlers-bundle', name: 'Toddlers Starter Pack', desc: 'Sesame edition of the Starter Pack PDP.', date: '2026-11-12', group: 'sesame' },
  { to: '/explorations/sesame-toddlers-multi', name: 'Toddlers Multi', desc: 'Original first, Sesame edition, street scene.', date: '2026-11-12', group: 'sesame' },
  { to: '/explorations/sesame-toddlers-probiotic', name: 'Toddlers Probiotic', desc: 'Sesame edition of the Probiotic PDP.', date: '2026-11-12', group: 'sesame' },
  { to: '/explorations/family-box-builder', name: 'Family Box Builder', desc: 'One box per family member, with tiers and gifts.', date: '2026-10-27' },
  { to: '/explorations/mixed-bundle-builder-quiz-v2', name: 'No quiz v2', desc: 'No quiz, the builder opens with a green note.', date: '2026-10-25', group: 'mbb' },
  { to: '/explorations/mixed-bundle-builder-quiz-v1', name: 'Quiz v1', desc: 'One step quiz, then the builder.', date: '2026-10-25', group: 'mbb' },
  { to: '/explorations/bundle-add-on', name: 'Bundle Add-on', desc: 'Add-on modal with stacks and gift progress.', date: '2026-10-20' },
  { to: '/explorations/all-in-1-bundle', name: 'All-in-1 Bundle', desc: 'The four hero products as one bundle.', date: '2026-10-14' },
].map((e, i) => ({ ...e, i }));

const SORTS = [['recent', 'Most recent'], ['oldest', 'Oldest'], ['az', 'A to Z']];
const day = (d) => new Date(`${d}T00:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
const label = (e) => (e.group ? `${GROUPS[e.group]} ${e.name}` : e.name);

const byRecent = (a, b) => (a.date === b.date ? a.i - b.i : a.date < b.date ? 1 : -1);
const compare = (sort) => (sort === 'az' ? (a, b) => label(a).localeCompare(label(b)) : sort === 'oldest' ? (a, b) => -byRecent(a, b) : byRecent);

const Row = ({ e }) => (
  <li style={{ padding: '10px 0', borderBottom: '1px solid #eee' }}>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
      <Link to={e.to} style={{ fontWeight: 500 }}>{e.name}</Link>
      <span style={{ marginLeft: 'auto', color: '#999', fontSize: 12, whiteSpace: 'nowrap' }}>{day(e.date)}</span>
    </div>
    <div style={{ color: '#666', fontSize: 13 }}>{e.desc}</div>
  </li>
);

export default function PrototypeIndex() {
  const [q, setQ] = useState('');
  const [sort, setSort] = useState('recent');
  const [open, setOpen] = useState({});
  const term = q.trim().toLowerCase();
  const searching = term.length > 0;

  // the items that match, put into groups (a group is one entry of the list, ranked by its best item for the chosen sort)
  const entries = useMemo(() => {
    const match = explorations.filter((e) => !term || `${e.name} ${e.desc} ${e.to} ${e.group ? GROUPS[e.group] : ''}`.toLowerCase().includes(term));
    const cmp = compare(sort);
    const out = []; const seen = {};
    [...match].sort(cmp).forEach((e) => {
      if (!e.group) { out.push({ single: e }); return; }
      if (!seen[e.group]) { seen[e.group] = { key: e.group, items: [] }; out.push(seen[e.group]); }
      seen[e.group].items.push(e);
    });
    if (sort === 'az') out.sort((a, b) => (a.single ? label(a.single) : GROUPS[a.key]).localeCompare(b.single ? label(b.single) : GROUPS[b.key]));
    return out;
  }, [term, sort]);

  const field = { font: 'inherit', fontSize: 15, padding: '9px 12px', border: '1px solid #ccc', borderRadius: 8, background: '#fff', color: '#222' };
  return (
    <div style={{ font: '15px/1.5 system-ui, sans-serif', maxWidth: 640, margin: '48px auto', padding: '0 20px', color: '#222' }}>
      <h1 style={{ fontSize: 22, margin: 0 }}>First Day explorations</h1>
      <p style={{ color: '#888', fontSize: 13, margin: '4px 0 16px' }}>Ideas and concepts, not in production.</p>
      <div style={{ display: 'flex', gap: 8 }}>
        <input type="search" value={q} onChange={(ev) => setQ(ev.target.value)} placeholder="Search explorations" aria-label="Search explorations" style={{ ...field, flex: 1, minWidth: 0 }} />
        <select value={sort} onChange={(ev) => setSort(ev.target.value)} aria-label="Sort explorations" style={field}>
          {SORTS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
      </div>
      <ul style={{ padding: 0, margin: '8px 0 0', listStyle: 'none' }}>
        {entries.map((en) => {
          if (en.single) return <Row key={en.single.to} e={en.single} />;
          const isOpen = searching || open[en.key];
          const newest = [...en.items].sort(byRecent)[0];
          return (
            <li key={en.key} style={{ borderBottom: '1px solid #eee' }}>
              <button type="button" aria-expanded={!!isOpen} onClick={() => setOpen((o) => ({ ...o, [en.key]: !o[en.key] }))}
                style={{ all: 'unset', boxSizing: 'border-box', display: 'flex', alignItems: 'baseline', gap: 8, width: '100%', padding: '10px 0', cursor: 'pointer' }}>
                <span aria-hidden="true" style={{ width: 12, color: '#888', fontSize: 11, transform: isOpen ? 'rotate(90deg)' : 'none', transition: 'transform 150ms' }}>▶</span>
                <span style={{ fontWeight: 500 }}>{GROUPS[en.key]}</span>
                <span style={{ color: '#888', fontSize: 12 }}>{en.items.length} variations</span>
                <span style={{ marginLeft: 'auto', color: '#999', fontSize: 12, whiteSpace: 'nowrap' }}>{day(newest.date)}</span>
              </button>
              {isOpen ? (
                <ul style={{ padding: '0 0 6px 20px', margin: 0, listStyle: 'none', borderLeft: '2px solid #eee' }}>
                  {en.items.map((e) => <Row key={e.to} e={e} />)}
                </ul>
              ) : null}
            </li>
          );
        })}
      </ul>
      {entries.length === 0 ? <p style={{ color: '#888', fontSize: 14 }}>Nothing matches "{q.trim()}".</p> : null}
    </div>
  );
}

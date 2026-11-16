import { useEffect, useRef, useState } from 'react';
import { Char, Bubble, Digits, Sparkles, LOGO, PR } from './ss.jsx';
import { ESSENTIAL_EIGHT_ICONS } from '../../essentialEightIcons.js';
import ModernWave from '../../../components/ModernWave.jsx';

export const celebrate = () => window.dispatchEvent(new CustomEvent('ss:celebrate'));
export const duckRain = () => window.dispatchEvent(new CustomEvent('ss:ducks'));

/* ---------- the strip above the title of the buy box: the Sesame Street sign (tap it for a surprise) ---------- */
export function SignBadge() {
  return (
    <button type="button" className="ss-sign" onClick={duckRain} aria-label="Sesame Street edition. Tap for a surprise.">
      <img src={LOGO} alt="" draggable="false" />
      <span><b>Sesame Street Edition</b><small>Tap the sign for a surprise</small></span>
    </button>
  );
}

/* ---------- under the quantity cards: the Count counts the bottles ---------- */
const NUM = ['', 'One', 'Two', 'Three', 'Four'];
// the Count only counts ("One!", "Two!"): no word about the product or the purchase (a character may not take part in a call to action)
export function CountBubble({ qty, unit = '' }) {
  const word = unit ? `${NUM[qty] || qty} ${unit}${qty === 1 ? '' : 's'}!` : `${NUM[qty] || qty}!`;
  return (
    <div className="ss-count-q" aria-live="polite">
      <Char n="count-1" className="ss-count-q__count" />
      <span key={qty} className="ss-count-q__say">
        <Digits value={qty} />
        <Bubble tail="left">{word} Ah ah ah!</Bubble>
      </span>
    </div>
  );
}

/* ---------- Real Wholesome (the 8 icons of the live page, as 8 friends) ---------- */
const WHOLESOME = [
  ['real_results', 'rosita', 'Real Wholesome<sup>®</sup>. <br> Real results you can feel.', 4],
  ['no_fillers', 'elmo-jump', 'No fillers, fake sugars or fad ingredients with wild claims.', 2],
  ['eco_friendly', 'abby', 'Refillable packaging for a healthier planet', 3],
  ['clinically_tested', 'grover-3', 'Research-backed & clinically proven.', 0],
  ['non_gmo', 'zoe-1', 'Vegan. Cruelty Free. Non GMO. Free of allergens, artificial colors & flavors.', 1],
  ['tested_and_loved', 'cookie-cross', 'Tested & loved by picky kids (and adults)', 4],
  ['quality_and_safety', 'bigbird', 'Meticulously sourced for highest quality & safety.', 2],
  ['potency_and_purity', 'count-2', 'Repeatedly tested for potency & purity.', 1],
];
// the original icon of each item (the live icons of the Real Wholesome section) stays, so the grid is easy to scan, and a character joins it; order of the live page
// the live icons sit in a wide viewBox with empty sides: scale them by the HEIGHT of the viewBox so the glyph is about 54px, centered in a 54px box
const iconSvg = (key) => {
  const svg = ESSENTIAL_EIGHT_ICONS[`${key}_variant_two`] || '';
  const m = svg.match(/viewBox="([\d.\-\s]+)"/);
  if (!m) return svg;
  const [, , vw, vh] = m[1].trim().split(/\s+/).map(Number);
  return svg.replace(/ width="\d+"/, '').replace(/ height="\d+"/, '').replace('<svg', `<svg width="${Math.round((60 * vw) / vh)}" height="60"`);
};
// `first`: the section is the first one under the buy box (nothing above it to tuck under), so it keeps its own top padding
// `friends={false}`: no character under the claims (the guidelines say a character may not promote benefits: the icon and the live claim stand alone)
export function Wholesome({ first = false, friends = true }) {
  return (
    <section className={`ss-wholesome${first ? ' ss-wholesome--first' : ''}${friends ? '' : ' ss-wholesome--plain'}`} id="shopify-section-ss-wholesome">
      <div className="ss-wholesome__inner">
        <h2 className="ss-h2">Real Wholesome<sup>®</sup></h2>
        <ul className="ss-wholesome__grid">
          {WHOLESOME.map(([icon, ch, text, tone]) => (
            <li key={icon} className={`ss-wholesome__card ss-tone-${tone}`}>
              <span className="ss-wholesome__icon" aria-hidden="true" dangerouslySetInnerHTML={{ __html: friends ? iconSvg(icon) : (ESSENTIAL_EIGHT_ICONS[`${icon}_variant_two`] || '') }} />
              {friends && <span className="ss-wholesome__pic"><Char n={ch} pop="pop" /></span>}
              <p dangerouslySetInnerHTML={{ __html: text }} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- the Count counts the numbers of the page ---------- */
// four numbers that mean something on their own (every one is on the live page): the three strains named, 2 gummies a day, only 2g of sugar, 1,000,000+ parents
const STATS = [
  { n: 3, label: 'Powerful strains: pre, pro & postbiotic' },
  { n: 2, label: 'Gummies a day' },
  { n: 2, suffix: 'g', tag: 'Only', label: 'Of sugar' },
  { n: 1000000, suffix: '+', label: 'Parents on the mission', fmt: true },
];
// the numbers are static (the counting animation was removed: it looked odd); the cards just rise in one after the other when the section scrolls into view
function CountUp({ to, fmt }) {
  return <>{fmt ? to.toLocaleString('en-US') : to}</>;
}
// `friends={false}`: the numbers are First Day's, so the Count does not stand next to them (a character may not promote a product's benefits)
export function CountSection({ bg, stats = STATS, title = 'The Count Counts It', sub = 'Some numbers are worth counting. Ah ah ah!', friends = true }) {
  const ref = useRef(null);
  const [run, setRun] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return undefined;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setRun(true); io.disconnect(); } }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section className={`ss-count-wrap${run ? ' is-in' : ''}${friends ? '' : ' ss-count-wrap--plain'}`} id="shopify-section-ss-count" ref={ref} style={bg ? { background: bg } : undefined}>
      <div className="ss-count">
        <div className="ss-count__inner">
          {friends && <Char n="count-1" className="ss-count__count" pop="left" />}
          <div className="ss-count__main">
            <h2 className="ss-h2">{title}</h2>
            <p className="ss-count__sub">{sub}</p>
            <ul className="ss-count__grid">
              {stats.map((s, i) => (
                <li key={s.label} style={{ '--i': i }}>
                  <small className={`ss-count__tag${s.tag ? '' : ' is-empty'}`}>{s.tag || '\u00a0'}</small>
                  <b className="ss-count__num"><CountUp to={s.n} fmt={s.fmt} />{s.suffix}</b>
                  <span>{s.label}</span>
                </li>
              ))}
            </ul>
          </div>
          {friends && <Char n="count-2" className="ss-count__count ss-count__count--r" pop="right" />}
        </div>
      </div>
    </section>
  );
}

/* ---------- Meet the gang ---------- */
const GANG = [
  ['elmo-wave', 'Elmo', 'Elmo wants happy tummies for everybody!'],
  ['bigbird', 'Big Bird', 'Big Bird learned that good bacteria live in tummies!'],
  ['grover-3', 'Grover', 'Hello! It is I, Grover! Pre, pro and post support a happy gut!'],
  ['abby', 'Abby', 'Abby thinks a happy gut is so magic!'],
  ['count-1', 'The Count', 'Two gummies a day! One, two! Ah ah ah!'],
  ['cookie-eat', 'Cookie Monster', 'Me love cookies! Cookies are a sometimes food. Me try new food too!'],
];
// height of each friend relative to Big Bird, from the scale chart of the guidelines (characters must keep their scale: pupils of the same size)
const SCALE = { bigbird: 1, 'cookie-eat': 0.75, 'grover-3': 0.62, 'count-1': 0.53, 'elmo-wave': 0.41, abby: 0.38 };
// `scaled`: use the chart above; the lines of `gang` must be catchphrases or generic phrases
export function MeetTheGang({ waveFrom = '#f2fbff', gang = GANG, title = 'Meet The Gang', sub = 'Tap a friend to say hello.', scaled = false }) {
  const [open, setOpen] = useState(null);
  return (
    <section className={`ss-gang${scaled ? ' ss-gang--scaled' : ''}`} id="shopify-section-ss-gang">
      <ModernWave position="top" color="#bfe6ff" containerBackground={waveFrom} />
      <div className="ss-gang__inner">
        <h2 className="ss-h2">{title}</h2>
        <p className="ss-gang__sub">{sub}</p>
        <div className="ss-gang__street">
          <Char n="lamp-post" prop className="ss-gang__lamp" />
          <ul className="ss-gang__row">
            {gang.map(([ch, name, line], i) => (
              <li key={name} className={open === i ? 'is-open' : ''} style={scaled ? { '--s': SCALE[ch] || 0.5 } : undefined}>
                {open === i && <Bubble tail="left" className="ss-gang__bubble">{line}</Bubble>}
                <button type="button" onClick={() => setOpen(open === i ? null : i)} aria-label={`${name} says hello`} aria-expanded={open === i}><Char n={ch} /></button>
                <span className="ss-gang__name">{name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export const PR_FOR = PR;

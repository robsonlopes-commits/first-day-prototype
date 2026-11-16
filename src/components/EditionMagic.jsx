import './EditionMagic.css';

// The spell that turns the page into the Sesame Street edition: Abby Cadabby flies in, flicks her wand in the middle of the screen, fairy dust sparkles (✨) burst from the wand and twinkle
// around her, a soft light sweeps over the page (the page is swapped while it covers the screen, and scrolled back to the top) and she flies off. The timing (ms) is shared with the page
// that owns the swap: SWAP_AT is the moment the screen is covered, END_AT the moment the overlay can go. Characters are the library art (abby-2, Version B), never generated.
export const SWAP_AT = 1950;
export const END_AT = 3150;

const r = (i, n) => { const x = Math.sin((i + 1) * 37.7 + n * 11.3) * 10000; return x - Math.floor(x); };
const DUST = ['#ffc928', '#ff7fb8', '#b98cff', '#5cc8ff', '#ffe27a', '#ff9cc9']; // gold, pink, lilac and aqua: they read on the white light too
// the sparkles that fly out of the wand tip
const BURST = Array.from({ length: 26 }, (_, i) => ({ a: Math.round((i / 26) * 360 + r(i, 1) * 12), d: 140 + Math.round(r(i, 2) * 300), s: 22 + Math.round(r(i, 3) * 30), c: DUST[i % DUST.length], t: (1.0 + r(i, 4) * 0.22).toFixed(2) }));
// the ones that twinkle around Abby while she flicks the wand
const AROUND = Array.from({ length: 16 }, (_, i) => ({ x: (0.05 + r(i, 5) * 1.05).toFixed(2), y: (0.4 - r(i, 6) * 1.1).toFixed(2), s: 16 + Math.round(r(i, 7) * 24), c: DUST[(i + 2) % DUST.length], t: (0.55 + r(i, 8) * 1.2).toFixed(2) }));
// and a sprinkle over the whole screen while the light sweeps
const SCREEN = Array.from({ length: 24 }, (_, i) => ({ x: Math.round(r(i, 9) * 100), y: Math.round(r(i, 10) * 100), s: 18 + Math.round(r(i, 11) * 32), c: DUST[(i + 4) % DUST.length], t: (1.35 + r(i, 12) * 1.0).toFixed(2) }));

export default function EditionMagic() {
  return (
    <div className="fd-magic" role="presentation" aria-hidden="true">
      <div className="fd-magic__veil" />
      <div className="fd-magic__stage">
        <img className="fd-magic__abby" src="/assets/sesame/characters/abby-2.svg" alt="" draggable="false" />
        {AROUND.map((s, i) => <i key={`a${i}`} className="fd-magic__spark fd-magic__spark--twinkle" style={{ left: `calc(var(--tipx) - var(--h) * ${s.x} * 1.122)`, top: `calc(var(--tipy) - var(--h) * ${s.y})`, '--s': `${s.s}px`, background: s.c, animationDelay: `${s.t}s` }} />)}
      </div>
      <div className="fd-magic__burst" />
      <div className="fd-magic__stage">
        <div className="fd-magic__tip">
          <span className="fd-magic__ring" />
          {BURST.map((s, i) => <i key={`b${i}`} className="fd-magic__spark fd-magic__spark--burst" style={{ '--a': `${s.a}deg`, '--d': `${s.d}px`, '--s': `${s.s}px`, background: s.c, animationDelay: `${s.t}s` }} />)}
        </div>
      </div>
      <div className="fd-magic__sprinkle">
        {SCREEN.map((s, i) => <i key={`s${i}`} className="fd-magic__spark fd-magic__spark--twinkle" style={{ left: `${s.x}%`, top: `${s.y}%`, '--s': `${s.s}px`, background: s.c, animationDelay: `${s.t}s` }} />)}
      </div>
    </div>
  );
}

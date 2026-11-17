import { useRef, useState } from 'react';
import { Char, Bubble } from './ss.jsx';

// SVG stickers laid on top of a REAL or generated picture (a file in the Shopify theme). The picture itself is never drawn with HTML: in the theme a picture slot is an image
// field, so the art of the library can only sit on top of it. The layer is positioned over the picture and measured in container units (cqw = 1% of the picture width), so the
// stickers scale with it. A sticker with `say` is a button: tap it and the character talks.
export function Sticker({ n, say, tail = 'left', style, bubbleStyle, hop, flip, delay = 0 }) {
  const [on, setOn] = useState(false);
  const t = useRef(0);
  const talk = (e) => {
    e.stopPropagation();
    setOn(true); window.clearTimeout(t.current); t.current = window.setTimeout(() => setOn(false), 3200);
  };
  const img = <Char n={n} />;
  if (!say) return <span className={`ss-st ss-st--idle${flip ? ' ss-st--flip' : ''}`} style={{ ...style, animationDelay: `${delay}s` }} aria-hidden="true">{img}</span>;
  return (
    <button type="button" className={`ss-st ss-st--talk${on ? ' is-on' : ''}${flip ? ' ss-st--flip' : ''}`} style={{ ...style, animationDelay: `${delay}s` }} onClick={talk} onBlur={() => setOn(false)} aria-label={`${say} (tap the character)`}>
      <span className="ss-st__art">{img}</span>
      <Bubble tail={tail} className="ss-st__bubble" style={bubbleStyle}>{say}</Bubble>
    </button>
  );
}

export const Layer = ({ children }) => <div className="ss-ov">{children}</div>;

/* ---- gallery slides ---- */
export const OvWhy = () => (
  <Layer>
    <Sticker n="count-2" say="Vitamins are good! One, two, three! Ah ah ah!" tail="right" style={{ right: '1cqw', bottom: '0', height: '27cqw' }} bubbleStyle={{ right: '70%', bottom: '88%', width: 'max-content' }} />
  </Layer>
);
export const OvLifestyle = () => (
  <Layer>
    <Sticker n="elmo-peek" say="Elmo wants to grow big and strong!" style={{ right: '1cqw', bottom: '0', height: '25cqw' }} bubbleStyle={{ right: '60%', bottom: '90%', width: 'max-content' }} tail="right" />
  </Layer>
);

/* ---- sections (image with text) ---- */
export const OvKitchen = () => (
  <Layer>
    <Sticker n="cookie-wave" say="Me love snack time! Om nom nom!" style={{ right: '1cqw', bottom: '0', height: '38cqw' }} bubbleStyle={{ right: '55%', bottom: '88%', width: 'max-content' }} tail="right" />
  </Layer>
);
export const OvBath = () => (
  <Layer>
    <Sticker n="ernie" say="Splish, splash! Bath time is fun!" style={{ right: '1cqw', bottom: '0', height: '27cqw' }} bubbleStyle={{ right: '58%', bottom: '86%', width: 'max-content' }} tail="right" />
  </Layer>
);
export const OvEssentials = () => (
  <Layer>
    <Sticker n="grover-wave" say="Hello! It is I, Grover! Vitamins are super!" tail="left" style={{ left: '2cqw', bottom: '0', height: '27cqw' }} bubbleStyle={{ left: '60%', bottom: '88%', width: 'max-content' }} />
  </Layer>
);
export const OvBerries = () => (
  <Layer>
    <Sticker n="count-2" say="One sunny day, two sunny days! Ah ah ah!" style={{ left: '1cqw', bottom: '0', height: '32cqw' }} bubbleStyle={{ left: '70%', bottom: '80%', width: 'max-content' }} />
  </Layer>
);
export const OvBoy = () => (
  <Layer>
    <Sticker n="abby" say="Wow! Being healthy and happy is magical!" tail="left" style={{ left: '1cqw', bottom: '0', height: '27cqw' }} bubbleStyle={{ left: '65%', bottom: '85%', width: 'max-content' }} />
  </Layer>
);
export const OvCompare = () => (
  <Layer>
    <Sticker n="oscar-1" say="Hmph! Today is not so bad, I guess." style={{ right: '1cqw', bottom: '0', height: '25cqw' }} bubbleStyle={{ right: '68%', bottom: '80%', width: 'max-content' }} tail="right" />
  </Layer>
);
export const OvStrains = () => (
  <Layer>
    <Sticker n="count-2" say="Count with me! One, two, three! Ah ah ah!" tail="right" style={{ right: '1cqw', bottom: '0', height: '24cqw' }} bubbleStyle={{ right: '70%', bottom: '86%', width: 'max-content' }} />
  </Layer>
);
export const OvFruity = () => (
  <Layer>
    <Sticker n="zoe-1" say="Zoe loves to play and grow strong!" tail="right" style={{ right: '2cqw', bottom: '0', height: '22cqw' }} bubbleStyle={{ right: '65%', bottom: '86%', width: 'max-content' }} />
  </Layer>
);

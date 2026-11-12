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
    <Sticker n="count-2" say="Five reasons! Ah ah ah!" tail="right" style={{ right: '1cqw', bottom: '-2cqw', height: '27cqw' }} bubbleStyle={{ right: '70%', bottom: '88%', width: 'max-content' }} />
  </Layer>
);
export const OvLifestyle = () => (
  <Layer>
    <Sticker n="elmo-peek" say="Elmo found the gut helper!" style={{ right: '1cqw', bottom: '-3cqw', height: '25cqw' }} bubbleStyle={{ right: '60%', bottom: '90%', width: 'max-content' }} tail="right" />
  </Layer>
);

/* ---- sections (image with text) ---- */
export const OvKitchen = () => (
  <Layer>
    <Sticker n="cookie-wave" say="Happy gut, happy tummy. Me know!" style={{ right: '1cqw', bottom: '-2cqw', height: '38cqw' }} bubbleStyle={{ right: '55%', bottom: '88%', width: 'max-content' }} tail="right" />
  </Layer>
);
export const OvBath = () => (
  <Layer>
    <Sticker n="ernie" say="Easy does it, Rubber Duckie. Potty time too!" style={{ right: '1cqw', bottom: '-1cqw', height: '27cqw' }} bubbleStyle={{ right: '58%', bottom: '86%', width: 'max-content' }} tail="right" />
  </Layer>
);
export const OvEssentials = () => (
  <Layer>
    <Sticker n="grover-wave" say="Hello! Pre, pro and post. That is three in one!" style={{ right: '1cqw', top: '-2cqw', height: '33cqw' }} bubbleStyle={{ right: '62%', top: '14%', width: 'max-content', bottom: 'auto' }} tail="right" />
  </Layer>
);
export const OvBerries = () => (
  <Layer>
    <Sticker n="count-2" say="Two gummies a day! Ah ah ah!" style={{ left: '1cqw', top: '1cqw', height: '36cqw' }} bubbleStyle={{ left: '82%', top: '10%', bottom: 'auto', width: 'max-content' }} />
  </Layer>
);
export const OvBoy = () => (
  <Layer>
    <Sticker n="abby-2" say="A little help every day. That is so magic!" style={{ right: '1cqw', top: '1cqw', height: '24cqw' }} bubbleStyle={{ right: '70%', top: '18%', bottom: 'auto', width: 'max-content' }} tail="right" />
  </Layer>
);
export const OvCompare = () => (
  <Layer>
    <Sticker n="oscar-1" say="No fake sugars? Hmph! Nothing to grouch about." style={{ right: '0cqw', bottom: '-4cqw', height: '25cqw' }} bubbleStyle={{ right: '68%', bottom: '80%', width: 'max-content' }} tail="right" />
  </Layer>
);
export const OvStrains = () => (
  <Layer>
    <Sticker n="count-2" say="Three strains! Ah ah ah!" tail="right" style={{ right: '1cqw', bottom: '-2cqw', height: '24cqw' }} bubbleStyle={{ right: '70%', bottom: '86%', width: 'max-content' }} />
  </Layer>
);
export const OvFruity = () => (
  <Layer>
    <Sticker n="zoe-1" say="Golden Kiwi flavor! La la la!" tail="right" style={{ right: '2cqw', bottom: '-1cqw', height: '22cqw' }} bubbleStyle={{ right: '65%', bottom: '86%', width: 'max-content' }} />
  </Layer>
);

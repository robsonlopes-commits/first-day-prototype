import { Sticker, Layer } from './Stickers.jsx';

// Stickers of the Toddlers' Multi exploration (/explorations/sesame-toddlers-multi). The bottle of this page has Big Bird on the label, so Big Bird leads. Same rules as Stickers.jsx, with the Sesame Workshop
// guidelines: every line is a catchphrase or a generic phrase true to the character, never a word about the product (no bottle, vitamins, superfoods or dose in a mouth).
// the pictures are files of the theme, the SVGs sit on top, every line is tied to the picture or the section. `Ov*` are full layers for the gallery slides (`overlay` of an image);
// `St*` are fragments rendered by <Stick> (ss.jsx) inside the picture of a shared section.

/* ---- gallery slides ---- */
export const OvNutrients = () => (
  <Layer>
    <Sticker n="count-2" say="Count with me! One, two, three! Ah ah ah!" tail="right" style={{ right: '1cqw', bottom: '0', height: '28cqw' }} bubbleStyle={{ right: '70%', bottom: '88%', width: 'max-content' }} />
  </Layer>
);
export const OvDesigned = () => (
  <Layer>
    <Sticker n="bigbird" say="Hello, neighbor! Let’s grow big and strong!" tail="right" style={{ right: '1cqw', bottom: '0', height: '31cqw' }} bubbleStyle={{ right: '62%', bottom: '90%', width: 'max-content' }} />
  </Layer>
);
export const OvWhyMulti = () => (
  <Layer>
    <Sticker n="oscar-1" say="Hmph! Today is not so bad, I guess." tail="right" style={{ right: '0cqw', bottom: '0', height: '24cqw' }} bubbleStyle={{ right: '68%', bottom: '80%', width: 'max-content' }} />
  </Layer>
);
export const OvLifestyleMulti = () => (
  <Layer>
    <Sticker n="elmo-peek" say="Elmo wants to grow big and strong!" tail="right" style={{ right: '1cqw', bottom: '0', height: '25cqw' }} bubbleStyle={{ right: '60%', bottom: '90%', width: 'max-content' }} />
  </Layer>
);
export const OvNutritionMulti = () => (
  <Layer>
    <Sticker n="cookie-wave" say="Me love snack time! Om nom nom!" tail="right" style={{ right: '1cqw', bottom: '0', height: '30cqw' }} bubbleStyle={{ right: '30%', bottom: 'calc(100% + 1.6cqw)', width: 'max-content' }} />
  </Layer>
);

/* ---- section pictures (fragments for <Stick>) ---- */
export const StBanner = () => (<Sticker n="bigbird" say="Hello, neighbor!" tail="right" style={{ right: '2cqw', bottom: '0', height: '40cqw' }} bubbleStyle={{ right: '60%', bottom: '86%', width: 'max-content' }} />);
export const StWords = () => (<Sticker n="bigbird" say="Big Bird loves new words!" tail="right" style={{ right: '2cqw', bottom: '0', height: '38cqw' }} bubbleStyle={{ right: '62%', bottom: '70%', width: 'max-content' }} />);
export const StMeltdown = () => (<Sticker n="elmo-hello" say="Big feelings? Elmo has them too!" tail="right" style={{ right: '2cqw', bottom: '0', height: '36cqw' }} bubbleStyle={{ right: '62%', bottom: '70%', width: 'max-content' }} />);
export const StMilestones = () => (<Sticker n="count-1" say="Count every milestone! Ah ah ah!" tail="right" style={{ right: '2cqw', bottom: '0', height: '40cqw' }} bubbleStyle={{ right: '62%', bottom: '70%', width: 'max-content' }} />);
export const StIceberg = () => (<Sticker n="abby" say="Abby looks under the water!" tail="right" style={{ right: '0', bottom: '0', height: '21cqw' }} bubbleStyle={{ right: '70%', bottom: '80%', width: 'max-content' }} />);
// the hero spans the whole page width, so its sticker is sized in pixels (cqw of a full width layer would make a giant character and bubble)
// Sesame Workshop guidelines: every character stands on a surface (the bottom edge of its picture), never floating, hanging below it or hovering at the top
export const StHero = () => (<Sticker n="bigbird" say="Big Bird is getting ready for school!" tail="right" style={{ right: '30%', bottom: '0', height: 'clamp(104px, 15vw, 190px)' }} bubbleStyle={{ right: '70%', bottom: '105%', width: 'max-content', maxWidth: 200, fontSize: 15, lineHeight: 1.25, padding: '6px 12px', borderWidth: 2, borderRadius: 14, '--tail': '9px', '--bw': '2px' }} />);

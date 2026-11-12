import { Sticker, Layer } from './Stickers.jsx';

// Stickers of the Toddlers' Multi exploration (/explorations/sesame-toddlers-multi). The bottle of this page has Big Bird on the label, so Big Bird leads. Same rules as Stickers.jsx:
// the pictures are files of the theme, the SVGs sit on top, every line is tied to the picture or the section. `Ov*` are full layers for the gallery slides (`overlay` of an image);
// `St*` are fragments rendered by <Stick> (ss.jsx) inside the picture of a shared section.

/* ---- gallery slides ---- */
export const OvNutrients = () => (
  <Layer>
    <Sticker n="count-2" say="Ten vitamins! One, two, three... Ah ah ah!" tail="right" style={{ right: '1cqw', bottom: '-2cqw', height: '28cqw' }} bubbleStyle={{ right: '70%', bottom: '88%', width: 'max-content' }} />
  </Layer>
);
export const OvDesigned = () => (
  <Layer>
    <Sticker n="bigbird" say="Big Bird is growing too!" tail="right" style={{ right: '1cqw', bottom: '-2cqw', height: '31cqw' }} bubbleStyle={{ right: '62%', bottom: '90%', width: 'max-content' }} />
  </Layer>
);
export const OvWhyMulti = () => (
  <Layer>
    <Sticker n="oscar-1" say="Fake sugars? Hmph! Not here." tail="right" style={{ right: '0cqw', bottom: '-4cqw', height: '24cqw' }} bubbleStyle={{ right: '68%', bottom: '80%', width: 'max-content' }} />
  </Layer>
);
export const OvLifestyleMulti = () => (
  <Layer>
    <Sticker n="elmo-peek" say="Elmo found Big Bird on the bottle!" tail="right" style={{ right: '1cqw', bottom: '-3cqw', height: '25cqw' }} bubbleStyle={{ right: '60%', bottom: '90%', width: 'max-content' }} />
  </Layer>
);
export const OvNutritionMulti = () => (
  <Layer>
    <Sticker n="cookie-wave" say="Me try veggies too!" tail="right" style={{ right: '1cqw', bottom: '-2cqw', height: '30cqw' }} bubbleStyle={{ right: '30%', bottom: 'calc(100% + 1.6cqw)', width: 'max-content' }} />
  </Layer>
);

/* ---- section pictures (fragments for <Stick>) ---- */
export const StBanner = () => (<Sticker n="bigbird" say="Big Bird counts 21 superfoods!" tail="right" style={{ right: '-3cqw', bottom: '-2cqw', height: '40cqw' }} bubbleStyle={{ right: '60%', bottom: '86%', width: 'max-content' }} />);
export const StWords = () => (<Sticker n="bigbird" say="Big Bird loves new words!" tail="right" style={{ right: '2cqw', bottom: '-6cqw', height: '38cqw' }} bubbleStyle={{ right: '62%', bottom: '70%', width: 'max-content' }} />);
export const StMeltdown = () => (<Sticker n="elmo-hello" say="Big feelings? Elmo has them too!" tail="right" style={{ right: '2cqw', bottom: '-6cqw', height: '36cqw' }} bubbleStyle={{ right: '62%', bottom: '70%', width: 'max-content' }} />);
export const StMilestones = () => (<Sticker n="count-1" say="Count every milestone! Ah ah ah!" tail="right" style={{ right: '2cqw', bottom: '-6cqw', height: '40cqw' }} bubbleStyle={{ right: '62%', bottom: '70%', width: 'max-content' }} />);
export const StDosage = () => (<Sticker n="grover-wave" say="Super Grover says the right dose for tiny growers!" tail="right" style={{ right: '1cqw', bottom: '-3cqw', height: '38cqw' }} bubbleStyle={{ right: '58%', bottom: '70%', width: 'max-content' }} />);
export const StIceberg = () => (<Sticker n="abby-2" say="Abby looks under the water!" tail="right" style={{ right: '1cqw', top: '2cqw', height: '16cqw' }} bubbleStyle={{ right: '70%', top: '10%', bottom: 'auto', width: 'max-content' }} />);
export const StFormula = () => (<Sticker n="elmo-cheer" say="Elmo says thank you, veggies!" tail="right" style={{ right: '1cqw', bottom: '-3cqw', height: '40cqw' }} bubbleStyle={{ right: '58%', bottom: '70%', width: 'max-content' }} />);
// the hero spans the whole page width, so its sticker is sized in pixels (cqw of a full width layer would make a giant character and bubble)
export const StHero = () => (<Sticker n="bigbird" say="Big Bird is getting ready for school!" tail="right" style={{ right: '30%', bottom: '10px', height: 'clamp(104px, 15vw, 190px)' }} bubbleStyle={{ right: '70%', bottom: '105%', width: 'max-content', maxWidth: 200, fontSize: 15, lineHeight: 1.25, padding: '6px 12px', borderWidth: 2, borderRadius: 14, '--tail': '9px', '--bw': '2px' }} />);

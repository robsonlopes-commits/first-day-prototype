import { Sticker, Layer } from './Stickers.jsx';

// Stickers of the Toddlers' Starter Pack exploration (/explorations/sesame-toddlers-bundle): two bottles, The Multi and the Pre + Post Probiotic. Same rules as Stickers.jsx and the Sesame Workshop
// guidelines: the pictures are files, the SVGs sit on top, every line is a catchphrase or a generic phrase true to the character (never a word about the product), and every character stands on the
// bottom edge of its picture (never floating or hanging below it).
export const OvBMulti = () => (
  <Layer>
    <Sticker n="bigbird" say="Hello, neighbor!" tail="right" style={{ right: '2cqw', bottom: '0', height: '40cqw' }} bubbleStyle={{ right: '60%', bottom: '86%', width: 'max-content' }} />
  </Layer>
);
export const OvBProbiotic = () => (
  <Layer>
    <Sticker n="elmo-peek" say="Elmo loves you!" tail="right" style={{ right: '1cqw', bottom: '0', height: '25cqw' }} bubbleStyle={{ right: '60%', bottom: '90%', width: 'max-content' }} />
  </Layer>
);
export const OvBSugar = () => (
  <Layer>
    <Sticker n="count-2" say="One sunny day, two sunny days! Ah ah ah!" tail="right" style={{ right: '2cqw', bottom: '0', height: '30cqw' }} bubbleStyle={{ right: '70%', bottom: '80%', width: 'max-content' }} />
  </Layer>
);
// the empty cell above the row names (top left of the table), so Oscar covers none of the words
export const OvBCompare = () => (
  <Layer>
    <Sticker n="oscar-1" say="Hmph! Today is not so bad, I guess." style={{ left: '3cqw', top: '0.3cqw', height: '12.5cqw' }} bubbleStyle={{ left: '10%', top: '85%', bottom: 'auto', width: 'max-content' }} />
  </Layer>
);

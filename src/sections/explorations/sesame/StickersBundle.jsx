import { Sticker, Layer } from './Stickers.jsx';

// Stickers of the Toddlers' Starter Pack exploration (/explorations/sesame-toddlers-bundle): two bottles, Big Bird on The Multi and Elmo on the Pre + Post Probiotic. Same rules as
// Stickers.jsx: the pictures are files, the SVGs sit on top, every line is tied to the picture or the section.
export const OvBMulti = () => (
  <Layer>
    <Sticker n="bigbird" say="Big Bird is on the bottle!" tail="right" style={{ right: '-3cqw', bottom: '-2cqw', height: '40cqw' }} bubbleStyle={{ right: '60%', bottom: '86%', width: 'max-content' }} />
  </Layer>
);
export const OvBProbiotic = () => (
  <Layer>
    <Sticker n="elmo-peek" say="Elmo is on this bottle!" tail="right" style={{ right: '1cqw', bottom: '-3cqw', height: '25cqw' }} bubbleStyle={{ right: '60%', bottom: '90%', width: 'max-content' }} />
  </Layer>
);
export const OvBSugar = () => (
  <Layer>
    <Sticker n="count-2" say="Only 2g! One, two! Ah ah ah!" tail="right" style={{ right: '2cqw', top: '4cqw', height: '30cqw' }} bubbleStyle={{ right: '70%', top: '12%', bottom: 'auto', width: 'max-content' }} />
  </Layer>
);
// the empty cell above the row names (top left of the table), so Oscar covers none of the words
export const OvBCompare = () => (
  <Layer>
    <Sticker n="oscar-1" say="Nothing to grouch about!" style={{ left: '3cqw', top: '0.3cqw', height: '12.5cqw' }} bubbleStyle={{ left: '10%', top: '85%', bottom: 'auto', width: 'max-content' }} />
  </Layer>
);

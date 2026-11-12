import { Sticker } from './Stickers.jsx';

// Stickers of the Behind the Science landing exploration (/explorations/sesame-toddlers-bts), rendered by <Stick> (ss.jsx) inside the picture of a shared section. The pictures stay files;
// every line is tied to the picture or the section.
// the whole figure stays inside the picture (the wrapper clips: his feet were cut at bottom -4cqw); a short line above his head, away from the words of the wheel
export const StSymptoms = () => (<Sticker n="bigbird" say="Big Bird counts six!" tail="right" style={{ right: '1cqw', bottom: '0', height: '31cqw' }} bubbleStyle={{ right: '10%', bottom: '122%', width: 'max-content' }} />);
export const StRaising = () => (<Sticker n="grover-wave" say="Hello! It is I, Grover!" style={{ left: '1cqw', bottom: '-3cqw', height: '30cqw' }} bubbleStyle={{ left: '70%', bottom: '88%', width: 'max-content' }} />);

// the timeline: the Count counts the days next to the title, a friend sits in the empty corner of each card
// the Count at the title does not talk: a bubble would land on the title or the cards (there is no free corner); his line is in the Count section below
export const StTimelineCount = () => (<Sticker n="count-1" style={{ left: '-21cqw', top: '-3cqw', height: '21cqw' }} />);

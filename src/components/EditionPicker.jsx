import './EditionPicker.css';
import { shopImg } from '../lib/assets.js';

// "Choose The Edition": two cards (the Original bottle and the Sesame Street bottle) with a label bar; the picked one has the purple border and bar. It sits in the buy box, under the quantity cards and
// right above the Add To Cart button. Design: Figma "Ideation - Brainstorming", node 5980-1071.
export const EDITIONS = [
  { id: 'original', label: 'Original', image: shopImg('toddlers-prob.png'), alt: 'First Day Toddlers Pre + Post Probiotic bottle' },
  { id: 'sesame', label: 'Sesame Street', image: '/assets/sesame/bottle-sesame-toddlers-probiotic.png', alt: 'First Day Toddlers Pre + Post Probiotic bottle, Sesame Street edition' },
];

export default function EditionPicker({ value, onChange }) {
  return (
    <div className="fd-edition" data-component="edition-picker">
      <h2 className="PBFCM-PDP-frequency-selector__title fd-edition__title">Choose The Edition</h2>
      <div className="fd-edition__grid" role="radiogroup" aria-label="Choose the edition">
        {EDITIONS.map((f) => {
          const on = value === f.id;
          return (
            <button key={f.id} data-id={f.id} type="button" role="radio" aria-checked={on} className={`fd-edition__card${on ? ' is-selected' : ''}`} onClick={() => onChange(f.id)}>
              <span className="fd-edition__media"><img src={f.image} alt={f.alt} draggable="false" /></span>
              <span className="fd-edition__label">{f.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

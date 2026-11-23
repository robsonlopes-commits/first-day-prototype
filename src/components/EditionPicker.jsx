import './EditionPicker.css';
import { shopImg } from '../lib/assets.js';

// "Choose The Edition": two cards (the Original bottle and the Sesame Street bottle) with a label bar; the picked one has the purple border and bar. It sits in the buy box, under the quantity cards and
// right above the Add To Cart button. The Sesame Street card is the entry point of the edition: the sky with clouds of the Sesame page behind the bottle and Abby (the fairy who casts the
// spell when it is picked, the same picture as the one in the spell) in the sky; EditionMagic starts her flight from here. Design: Figma "Ideation - Brainstorming", node 5980-1071.
export const EDITIONS = [
  { id: 'original', label: 'Original', image: shopImg('toddlers-prob.png'), alt: 'First Day Toddlers Pre + Post Probiotic bottle' },
  { id: 'sesame', label: 'Sesame Street', image: '/assets/sesame/bottle-sesame-toddlers-probiotic.png', alt: 'First Day Toddlers Pre + Post Probiotic bottle, Sesame Street edition' },
];

// `editions`: the two cards of another product (the Multi page passes its own bottles); the default is the Toddlers' Probiotic
// `sameSize`: the Sesame bottle is shown at the same size and place as the original one (for products whose two bottles have the same shape)
// `duo`: the cards show a pair of bottles (the Starter Pack): both bottles whole and at the same size in the two cards
export default function EditionPicker({ value, onChange, editions = EDITIONS, sameSize = false, duo = false }) {
  return (
    <div className={`fd-edition${sameSize ? ' fd-edition--same' : ''}${duo ? ' fd-edition--duo' : ''}`} data-component="edition-picker">
      <h2 className="PBFCM-PDP-frequency-selector__title fd-edition__title">Choose The Edition</h2>
      <div className="fd-edition__grid" role="radiogroup" aria-label="Choose the edition">
        {editions.map((f) => {
          const on = value === f.id;
          return (
            <button key={f.id} data-id={f.id} type="button" role="radio" aria-checked={on} className={`fd-edition__card${on ? ' is-selected' : ''}`} onClick={() => onChange(f.id)}>
              <span className="fd-edition__media">
                <img className="fd-edition__bottle" src={f.image} alt={f.alt} draggable="false" />
                {f.id === 'sesame' && <img className="fd-edition__abby" src="/assets/sesame/characters/abby-2.svg" alt="" draggable="false" />}
              </span>
              <span className="fd-edition__label">{f.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

import Waves from '../components/Waves.jsx';
import './essentialEight.css';
import { ESSENTIAL_EIGHT_ICONS } from './essentialEightIcons.js';

// sections/essential-eight.liquid ("Real Wholesome" 8-icon grid). Blocks pick an icon via icon_metafield / icon_picker.
const TEXT = {
  real_results: 'Real Wholesome<sup>®</sup>. <br> Real results you can feel.',
  no_fillers: 'No fillers, fake sugars or fad ingredients with wild claims.',
  clinically_tested: 'Research-backed & clinically proven.',
  eco_friendly: 'Refillable packaging for a healthier planet',
  non_gmo: 'Vegan. Cruelty Free. Non GMO. Free of allergens, artificial colors & flavors.',
  tested_and_loved: 'Tested & loved by picky kids (and adults)',
  quality_and_safety: 'Meticulously sourced for highest quality & safety.',
  potency_and_purity: 'Repeatedly tested for potency & purity.',
};

export default function EssentialEight({ id, settings: s, blocks = [] }) {
  return (
    <div id={`shopify-section-${id}`} className="shopify-section firstday-essential-eight-section" style={{ paddingTop: s.padding_top, paddingBottom: s.padding_bottom }}>
      {s.anchor_id && <div id={s.anchor_id} className="fd-jump-anchor" />}
      {s.top_waves && <Waves position="top" color={s.background_color} containerBackground="transparent" />}
      <div className="essential-eight-container" style={{ backgroundColor: s.background_color }}>
        {s.heading != null && <div className="essential-eight-heading-container"><span style={{ width: '100%' }}><h2>{s.heading}</h2></span></div>}
        {s.text != null && <div className="essential-eight-text-container"><span style={{ width: '100%' }}><p>{s.text}</p></span></div>}
        <div className="essential-eight-container">
          <div className="essential-eight-wrapper">
            {blocks.map((b) => {
              const key = b.settings.icon_metafield !== 'none' && b.settings.icon_metafield ? b.settings.icon_metafield : b.settings.icon_picker;
              const svg = ESSENTIAL_EIGHT_ICONS[key];
              const base = String(key).replace(/_variant_two$/, '');
              if (!svg) return null;
              return (
                <div className="individual-icon-containers" key={b.id}>
                  <div className="svg-container" dangerouslySetInnerHTML={{ __html: svg }} />
                  {b.settings.show_text && <div className="svg-text"><span style={{ width: '100%' }}><p dangerouslySetInnerHTML={{ __html: TEXT[base] }} /></span></div>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {s.bottom_waves && <Waves position="bottom" color={s.background_color} containerBackground="transparent" />}
    </div>
  );
}

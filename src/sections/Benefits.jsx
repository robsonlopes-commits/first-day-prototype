import { useRef } from 'react';
import Img from '../components/Img.jsx';
import { settingImg } from '../lib/settingsImg.js';
import { BENEFITS_HOME } from '../data/sharedSections.js';
import '../styles/theme/benefits.css';

// sections/benefits.liquid: blue infinite marquee of benefit items (pauses on hover). Props = { id, settings, blocks } (BENEFITS_HOME).
export default function Benefits({ id = BENEFITS_HOME.id, settings: s = BENEFITS_HOME.settings, blocks = BENEFITS_HOME.blocks }) {
  const ref = useRef(null);
  const items = blocks.filter((b) => b.type === 'benefit' && b.settings.text);
  const pause = (state) => ref.current?.querySelectorAll('.benefits__track').forEach((t) => { t.style.animationPlayState = state; });
  return (
    <div id={`shopify-section-${id}`} className="shopify-section">
      <section
        ref={ref}
        className="benefits"
        id={`benefits-${id}`}
        aria-label={s.accessibility_label || 'Product benefits'}
        style={{ '--benefits-bg': s.background_color, '--benefits-text': s.text_color, '--benefits-pt': `${s.padding_top}px`, '--benefits-pb': `${s.padding_bottom}px` }}
      >
        {items.length > 0 && (
          <div className="benefits__marquee" onMouseEnter={() => pause('paused')} onMouseLeave={() => pause('running')}>
            <div className="benefits__track-wrap">
              {[1, 2].map((n) => (
                <ul key={n} className="benefits__track" role="list" aria-hidden={n === 2 ? 'true' : undefined}>
                  {items.map((b) => (
                    <li key={b.id} className="benefits__item">
                      {b.settings.icon && <span className="benefits__icon" aria-hidden="true"><Img src={settingImg(b.settings.icon)} alt="" loading="lazy" width="24" height="24" /></span>}
                      <span>{b.settings.text}</span>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

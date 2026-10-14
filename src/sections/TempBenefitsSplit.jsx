import Img from '../components/Img.jsx';
import { settingImg } from '../lib/settingsImg.js';
import css from './tempBenefitsSplitCss.js';

// sections/temp-benefits-split.liquid. Props = { id, settings, blocks } as in the template JSON; metafield values resolved:
// settings.heading/body/button_label/button_link, blocks[].settings = { icon, icon_pos, title, text (HTML) }.
const rich = (html) => ({ __html: `<p></p><div class="metafield-rich_text_field">${html}</div><p></p>` });

export default function TempBenefitsSplit({ id, settings: s, blocks = [] }) {
  if (!s.heading) return null;
  return (
    <div id={`shopify-section-${id}`} className="shopify-section section">
      <style>{css(s, id)}</style>
      <section className={`teen-benefits-${id}`}>
        <div className={`teen-benefits__container-${id} page-width`}>
          <div className={`teen-benefits__left-${id}`}>
            <h2 className={`teen-benefits__heading-${id}`}>{s.heading}</h2>
            {s.body && <div className={`teen-benefits__body-${id}`} dangerouslySetInnerHTML={rich(s.body)} />}
            {s.button_label && (s.button_link
              ? <a className={`teen-benefits__button-${id}`} href={s.button_link}>{s.button_label}</a>
              : <span className={`teen-benefits__button-${id}`}>{s.button_label}</span>)}
            {(s.quote_text || s.quote_name) && (
              <div className={`teen-benefits__quote-wrap-${id}`}>
                {s.quote_image && <div className={`teen-benefits__quote-image-${id}`}><Img src={settingImg(s.quote_image)} alt={s.quote_name} width="240" height="240" loading="lazy" /></div>}
                <div>
                  {s.quote_text && <div className={`teen-benefits__quote-text-${id}`} dangerouslySetInnerHTML={{ __html: s.quote_text }} />}
                  {s.quote_name && <div className={`teen-benefits__quote-name-${id}`}>{s.quote_name}</div>}
                </div>
              </div>
            )}
          </div>
          <div className={`teen-benefits__cards-${id}`}>
            {blocks.filter((b) => b.settings.title).map((b) => (
              <article key={b.id} className={`teen-benefits__card-${id}`}>
                {b.settings.icon && <Img src={settingImg(b.settings.icon)} alt={b.settings.title} width="120" height="120" loading="lazy" className={`teen-benefits__icon-${id}`} style={b.settings.icon_pos ? { objectPosition: b.settings.icon_pos } : undefined} />}
                <h3 className={`teen-benefits__card-title-${id}`}>{b.settings.title}</h3>
                {b.settings.text && <div className={`teen-benefits__card-body-${id}`} dangerouslySetInnerHTML={{ __html: `<div class="metafield-rich_text_field">${b.settings.text}</div>` }} />}
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

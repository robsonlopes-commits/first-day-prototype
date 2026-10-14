import Img from '../../../components/Img.jsx';
import SiteLink from '../../../layout/SiteLink.jsx';
import { money } from '../../../data/allInOneBundle.js';

// "How the bundle works": four jobs, four products. Each card can also be added on its own.
export default function PickyEaterBenefits({ demo, onAddItem }) {
  return (
    <section className="aio-section aio-benefits" style={{ '--aio-demo-color': demo.color }}>
      <div className="aio-container">
        <p className="aio-eyebrow">Why one bundle</p>
        <h2 className="aio-heading">Picky eating is hard. <em>Four gummies</em> make it easier.</h2>
        <p className="aio-lead">Picky eating is still the top reason families choose First Day. One bottle is a start. Four bottles cover the whole day.</p>
        <div className="aio-benefits__grid">
          {demo.items.map((it, i) => (
            <article key={it.key} className="aio-benefit" data-step={i + 1}>
              <div className="aio-benefit__media"><Img src={it.image} alt={`${it.pdpTitle} bottle`} /></div>
              <div className="aio-benefit__body">
                <span className="fd-badge fd-badge--md aio-benefit__role">{it.label}</span>
                <h3 className="aio-benefit__title">{it.headline}</h3>
                <p className="aio-benefit__text">{it.blurb}</p>
                <div className="aio-benefit__actions">
                  <button type="button" className="fd-btn fd-btn--secondary fd-btn--small fd-btn-shape--pill" onClick={() => onAddItem(it)}>
                    <span className="fd-btn-text">Add alone {money(it.individual)}</span>
                  </button>
                  <SiteLink href={it.url} className="aio-benefit__link">See product</SiteLink>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

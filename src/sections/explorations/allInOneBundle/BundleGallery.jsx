import { useEffect, useState } from 'react';
import Img from '../../../components/Img.jsx';

// Left column of the hero. "All 4" shows the whole bundle lined up; the thumbnails show each bottle on its own.
export default function BundleGallery({ demo }) {
  const [view, setView] = useState('all');
  useEffect(() => setView('all'), [demo.id]);
  const single = demo.items.find((i) => i.key === view);

  return (
    <div className="aio-gallery" style={{ '--aio-demo-color': demo.color }}>
      <div className="aio-gallery__stage">
        <span className="aio-gallery__blob" aria-hidden="true" />
        {view === 'all' ? (
          <div className="aio-gallery__lineup">
            {demo.items.map((it, i) => (
              <Img key={it.key} className={`aio-gallery__bottle aio-gallery__bottle--${i + 1}`} src={it.image} alt={`${it.pdpTitle} bottle`} />
            ))}
          </div>
        ) : (
          <div className="aio-gallery__solo">
            <Img className="aio-gallery__bottle-solo" src={single.image} alt={`${single.pdpTitle} bottle`} />
            <span className="fd-badge fd-badge--md aio-gallery__role">{single.label}</span>
          </div>
        )}
        <span className="aio-gallery__count">{view === 'all' ? '4 bottles, 30 day supply each' : single.title}</span>
      </div>
      <div className="aio-gallery__thumbs" role="tablist" aria-label="Bundle views">
        <button type="button" role="tab" aria-selected={view === 'all'} className={`aio-thumb aio-thumb--all${view === 'all' ? ' is-active' : ''}`} onClick={() => setView('all')}>
          <span className="aio-thumb__label">All 4</span>
        </button>
        {demo.items.map((it) => (
          <button key={it.key} type="button" role="tab" aria-selected={view === it.key} className={`aio-thumb${view === it.key ? ' is-active' : ''}`} onClick={() => setView(it.key)} aria-label={it.label}>
            <Img src={it.image} alt="" />
          </button>
        ))}
      </div>
    </div>
  );
}

import { useState } from 'react';
import { extImg } from '../lib/assets.js';
import Img from '../components/Img.jsx';
import { FRONTROWMD_WIDGET } from '../data/pdpNewBottom.js';
import * as ICON from './frontrowmdIcons.js';
import './frontrowmdWidget.css';

// sections/frontrowmd-clinicians-reviews.liquid. The live section embeds an iframe (app.thefrontrowhealth.com/api/widgets?presentation_type=qual);
// this is a static copy of the document it renders (markup and CSS scoped under .fr-qual).
// Props: { id, settings, widget } as in the template JSON; `widget` = { title, label, subtitle, disclaimer, reviews[] } (default FRONTROWMD_WIDGET).
// "Show more" / citation pills / "Learn more" open a modal on the live site: here "Show more" expands the clamped text, pills toggle their source list.
const Svg = ({ html, className }) => <span className={className} dangerouslySetInnerHTML={{ __html: html }} style={{ display: 'contents' }} />;
const pillLabel = (c) => { const t = (c.source || '').replace(/,\s*\d{4}$/, ''); return t.length > 20 ? `${t.slice(0, 20)}...` : t; };

function Citations({ items }) {
  const [open, setOpen] = useState(false);
  if (!items?.length) return null;
  return (
    <span className="cp-citation-pill-wrapper">
      <div className={`cp-citation-pill${open ? ' active' : ''}`} onClick={(e) => { e.stopPropagation(); setOpen(!open); }}>
        <span dangerouslySetInnerHTML={{ __html: ICON.BOOK_CLOSED }} style={{ display: 'contents' }} />
        <span dangerouslySetInnerHTML={{ __html: ICON.BOOK_OPEN }} style={{ display: 'contents' }} />
        <span>{pillLabel(items[0])}{items.length > 1 ? <span className="cp-additional-citation-count"> +{items.length - 1}</span> : null}</span>
      </div>
      <div className={`cp-citation-tooltip${open ? ' active' : ''}`} style={open ? { left: 0, right: 'auto' } : undefined}>
        <div className="cp-citation-tooltip-header">{items.length} Sources</div>
        <div className="cp-citation-tooltip-content">
          {items.map((c) => (
            <div className="cp-citation-tooltip-item" key={c.title}>
              <div className="cp-citation-tooltip-details">
                <div className="cp-citation-tooltip-title">{c.title}</div>
                <div className="cp-citation-tooltip-authors">{c.source}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </span>
  );
}

function Note({ r }) {
  const [expanded, setExpanded] = useState(false);
  const p = r.provider;
  return (
    <div id={`note-${r.id}`} className="note">
      <div className="note--provider-column">
        <div className="note--provider-summary">
          {p.image ? <Img className="note--provider-img" alt={p.name} src={p.image.startsWith('http') ? extImg(p.image) : p.image} /> : null}
          <div className="note--provider">
            <button className="note--provider-link" type="button">{p.displayName}</button>
            <div className="note--verified-provider">Verified clinician <span dangerouslySetInnerHTML={{ __html: ICON.VERIFIED }} style={{ display: 'contents' }} /></div>
          </div>
        </div>
        <div className="note--provider-info-extra">
          <div className="dd">Specialty</div>
          <div className="dt">{p.specialty}</div>
          <hr />
          <div className="dd">Years in practice</div>
          <div className="dt">{p.yearsInPractice}</div>
        </div>
      </div>
      <div className="note--container">
        <div className="note--content">
          <div className="note--summary">{r.summary}</div>
          <div className={`note--message${expanded ? '' : ' note--line-clamp'} has-research-asterisk`}>
            <div>{r.message}</div><sup>&dagger;</sup>
          </div>
          <Citations items={r.citations} />
          <button type="button" className="note--show-more" onClick={() => setExpanded(!expanded)}>{expanded ? 'Show less' : 'Show more'}</button>
          <div className="highlights">
            <span className="highlights--header">Highlights:</span>
            {r.highlights.map((h) => (
              <span className="highlights--item" key={h}>
                <span dangerouslySetInnerHTML={{ __html: ICON.SHIELD }} style={{ display: 'contents' }} />
                <span>{h}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FrontrowmdCliniciansReviews({ id, settings: s = {}, widget = FRONTROWMD_WIDGET }) {
  const pad = (k, d) => (s[k] ?? d);
  const css = `
    #shopify-section-${id} .fr-testimonials { padding-top: ${pad('padding_top', 24)}px; padding-right: ${pad('padding_right', 0)}px; padding-bottom: ${pad('padding_bottom', 24)}px; padding-left: ${pad('padding_left', 0)}px; ${s.background_color ? `background-color: ${s.background_color};` : ''} }
    @media screen and (max-width: 749px) {
      #shopify-section-${id} .fr-testimonials { padding-top: ${pad('padding_top_mobile', 16)}px; padding-right: ${pad('padding_right_mobile', 0)}px; padding-bottom: ${pad('padding_bottom_mobile', 16)}px; padding-left: ${pad('padding_left_mobile', 0)}px; }
    }`;
  return (
    <div id={`shopify-section-${id}`} className="shopify-section section">
      <style>{css}</style>
      {s.anchor_id ? <div id={s.anchor_id} className="fd-jump-anchor" /> : null}
      <section id="frontrow-md-reviews" className="fr-testimonials">
        <div className="fr-qual fade-in-element">
          <div className="container" id="frontrow-qual-data">
            <div className="header">
              <div className="header--cc-row">
                <div className="header--divider-left" />
                <span className="header--laurels-left" dangerouslySetInnerHTML={{ __html: ICON.LAURELS_LEFT }} />
                <span className="header--caduceus" dangerouslySetInnerHTML={{ __html: ICON.CADUCEUS }} />
                <p>{widget.label}</p>
                <span className="header--laurels-right" dangerouslySetInnerHTML={{ __html: ICON.LAURELS_RIGHT }} />
                <div className="header--divider-right" />
              </div>
              <h1 className="header--title">{widget.title}</h1>
              <div className="header--subtitle">
                <p>{widget.subtitle[0]}<span className="italics">{widget.subtitle[1]}</span>{widget.subtitle[2]}<button type="button" className="header--learn-more" aria-label="Click to learn more about the clinicians sharing this product"><span>Learn more</span></button></p>
              </div>
            </div>
            <div className="reviews-container">
              <div className="reviews--list">{widget.reviews.map((r) => <Note key={r.id} r={r} />)}</div>
              <footer>
                <button type="button" className="footer--read-more">Learn more</button>
                <span className="footer--text"><span>Clinician reviews powered by </span><button type="button" className="footer--logo" dangerouslySetInnerHTML={{ __html: ICON.FRONTROW_LOGO }} /></span>
              </footer>
              <p className="disclaimer"><sup>&dagger;</sup>{widget.disclaimer}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import { Caduceus, LEFT, RIGHT } from './FrontrowBadge.jsx';
import './frontrowBrandBand.css';

// "Clinicians' Choice" band under the hero: the custom-liquid section of page.lp-BTS-master (settings.custom_liquid) embeds the Front Row Health
// brand widget (iframe presentation_type=brand&product_id=4210) inside <div id="frontrow-badge" class="general-frontrow-brand-badge">.
// Static copy of the iframe document; props mirror its copy (clinicians count, avatars).
const AVATARS = [
  ['https://assets.app.thefrontrowhealth.com/jijjnma3wz2ktevmvpuoewdnubm0', 'Dr. Kimberly Rogers, MD'],
  ['https://assets.app.thefrontrowhealth.com/4e8he28d9xopj5iyyv83w41q78xi', 'Brittany Reynolds, NP'],
];

// optional paddingTop / paddingBottom = the section's padding_top / padding_bottom settings (px; page.lp-bundle-v3 uses 36, the BTS landing page 0)
export default function FrontrowBrandBand({ id, clinicians = 938, paddingTop, paddingBottom }) {
  const pad = paddingTop != null || paddingBottom != null ? { '--section-padding-top': `${paddingTop || 0}px`, '--section-padding-bottom': `${paddingBottom || 0}px` } : undefined;
  return (
    <div id={`shopify-section-${id}`} className="shopify-section section custom-liquid-outer-container" style={pad}>
      <div className="section--padding">
        <div className="page-width page-width--full-width">
          <div id="frontrow-badge" className="general-frontrow-brand-badge" style={{ padding: '50px 0px', background: '#2C3E50' }}>
            <div id="embedded">
              <div className="heading">
                <span className="left-laurels"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="18" viewBox="0 0 10 18" fill="none"><path d={LEFT} stroke="#212121" strokeLinecap="round" /></svg></span>
                <span className="caduceus-icon"><Caduceus /></span>
                <p>Clinicians' Choice</p>
                <span className="right-laurels"><svg xmlns="http://www.w3.org/2000/svg" width="11" height="18" viewBox="0 0 11 18" fill="none"><path d={RIGHT} stroke="#212121" strokeLinecap="round" /></svg></span>
              </div>
              <div>
                <p className="main-copy">
                  <span className="provider-inline-group">
                    <span className="images">{AVATARS.map(([src, alt], i) => <img key={src} src={src} alt={alt} style={{ zIndex: i }} />)}</span>
                    <span className="bold">{clinicians} clinicians</span>
                  </span>, including OB/GYNs, share First Day on <span className="italics">FrontrowMD</span> <span className="nowrap">without compensation.</span>{' '}
                  <span><button className="learn-more-thin short" type="button" aria-label="Click to learn more about the clinicians sharing this product"><p>Learn more</p></button></span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import SiteLink from './SiteLink.jsx';
import Img from '../components/Img.jsx';
import { SocialIcon } from './icons.jsx';
import { shopImg, extImg } from '../lib/assets.js';
import { footerColumns, footerPolicies, footerSocial } from '../data/navigation.js';
import './styles/footer.css';
import './styles/footer.settings.css';

// sections/footer.liquid + footer-group.json (footer block): logo + 3 link lists, newsletter, social, Weglot language switcher, disclaimers.
const isSmall = () => window.matchMedia('(max-width: 749px)').matches;

const Caret = () => (
  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" className="icon icon-caret" fill="none" viewBox="0 0 24 15">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 15c-.3 0-.6-.1-.8-.4l-11-13C-.2 1.2-.1.5.3.2c.4-.4 1.1-.3 1.4.1L12 12.5 22.2.4c.4-.4 1-.5 1.4-.1.4.4.5 1 .1 1.4l-11 13c-.1.2-.4.3-.7.3z" fill="currentColor" />
  </svg>
);

// footer-accordion.js: <details> closes on small screens (unless the summary is empty or data-open), always open on desktop.
function FooterAccordion({ className, heading, defaultOpenOnSmall = false, children }) {
  const empty = !heading;
  const [open, setOpen] = useState(() => !isSmall() || empty || defaultOpenOnSmall);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 749px)');
    const onChange = (e) => setOpen(!e.matches || empty);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [empty]);
  return (
    <footer-accordion class={`accordion ${className}`}>
      <details open={open} {...(empty ? { empty: 'true' } : {})}>
        <summary
          tabIndex={-1}
          onClick={(e) => {
            e.preventDefault();
            if (!empty || !isSmall()) setOpen((o) => !o);
          }}
        >
          <p className="h4 accordion__title">{heading}</p>
          <Caret />
        </summary>
        {children}
      </details>
    </footer-accordion>
  );
}

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" focusable="false">
    <path d="M16.6667 3.33331H3.33333C2.41286 3.33331 1.66667 4.0795 1.66667 4.99998V14.1666C1.66667 15.0871 2.41286 15.8333 3.33333 15.8333H16.6667C17.5871 15.8333 18.3333 15.0871 18.3333 14.1666V4.99998C18.3333 4.0795 17.5871 3.33331 16.6667 3.33331ZM16.6667 5.83331L10 10.4166L3.33333 5.83331V4.99998L10 9.58331L16.6667 4.99998V5.83331Z" fill="currentColor" />
  </svg>
);

function WeglotSwitcher() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return undefined;
    const close = (e) => (e.type === 'keydown' ? e.key === 'Escape' && setOpen(false) : !e.target.closest('.weglot_switcher') && setOpen(false));
    document.addEventListener('click', close);
    document.addEventListener('keydown', close);
    return () => {
      document.removeEventListener('click', close);
      document.removeEventListener('keydown', close);
    };
  }, [open]);
  return (
    <div className="weglot-container" id="weglot-switcher-1">
      <aside aria-label="Language selected: English" className={`weglot_switcher country-selector default ${open ? 'opened' : 'closed'} wg-drop`} {...(open ? { 'data-fd-open': 'true' } : {})}>
        <div data-l="en" tabIndex={0} role="combobox" aria-expanded={open} aria-controls="weglot-listbox" aria-label="Language Switcher: English" className="wg-li en wgcurrent wg-flags" onClick={() => setOpen((o) => !o)}>
          <a id="weglot-language-en" lang="en" tabIndex={-1}>
            <img src={extImg('cdn.weglot.com/flags/rectangle_mat/um.svg')} width="30" height="20" alt="Flag: English" className="wg-flag" />EN
          </a>
        </div>
        <ul role="listbox" id="weglot-listbox" aria-label="Language list" style={{ display: open ? 'block' : 'none' }}>
          <li data-l="es" tabIndex={0} role="option" id="wg-es" className="wg-li es wg-flags">
            <a href="#" id="weglot-language-es" lang="es" tabIndex={-1} onClick={(e) => e.preventDefault()}>
              <img src={extImg('cdn.weglot.com/flags/rectangle_mat/mx.svg')} width="30" height="20" alt="Flag: Español" className="wg-flag" />ES
            </a>
          </li>
        </ul>
      </aside>
    </div>
  );
}

export default function Footer() {
  return (
    <div id="shopify-section-footer" className="shopify-section shopify-section-footer">
      <footer id="main-footer" className="footer">
        <div className="footer__content-top page-width">
          <div className="grid">
            <div className="grid__item footer__content-left footer__content-left--alt">
              <div className="footer__blocks-wrapper grid grid--1-col grid--2-col grid--4-col-tablet">
                <FooterAccordion className="footer-block grid__item footer-block--logo footer-mobile-section" heading="">
                  <div className="footer-block__details-content footer-block-image center">
                    <Img
                      src={shopImg('logo-first-day-white-font_ee8ef403-a5e8-4b91-a356-40b2460ff87d.png')}
                      alt="FirstDay logo white with transparent background"
                      loading="lazy"
                      width="800"
                      height="240"
                      style={{ maxWidth: 'min(100%, 120px)' }}
                    />
                    <p className="caption-large" />
                  </div>
                </FooterAccordion>

                <div className="footer-block footer-block--menus-combined footer-mobile-section footer-mobile-only">
                  <ul className="footer-mobile-menu list-unstyled">
                    {footerColumns.flat().map((l) => (
                      <li key={l.title}>
                        <SiteLink href={l.url} className="link list-menu__item list-menu__item--link">{l.title}</SiteLink>
                      </li>
                    ))}
                  </ul>
                </div>

                {footerColumns.map((col, i) => (
                  <FooterAccordion key={i} className="footer-block grid__item footer-block--menu footer-desktop-only" heading="">
                    <ul className="footer-block__details-content list-unstyled">
                      {col.map((l) => (
                        <li key={l.title}>
                          <SiteLink href={l.url} className="link list-menu__item list-menu__item--link">{l.title}</SiteLink>
                        </li>
                      ))}
                    </ul>
                  </FooterAccordion>
                ))}
              </div>
            </div>

            <div className="grid__item footer__content-right">
              <div className="grid">
                <div className="grid__item small-hide m-temp-hide"><div /></div>
                <div className="grid__item">
                  <FooterAccordion className="footer-block--newsletter footer-mobile-section" heading="Join The First Day Family!" defaultOpenOnSmall>
                    <div className="footer-block__details-content">
                      <div className="footer-block__newsletter">
                        <form className="footer__newsletter newsletter-form" id="ContactFooter" onSubmit={(e) => e.preventDefault()}>
                          <div className="field footer-newsletter__field">
                            <span className="footer-newsletter__icon" aria-hidden="true"><MailIcon /></span>
                            <input id="ContactFooter-email" type="email" name="contact[email]" className="field__input required" aria-required="true" autoComplete="email" placeholder="Enter your email" required />
                            <label className="visually-hidden" htmlFor="ContactFooter-email">Enter your email</label>
                            <button type="submit" className="button button--arrow field__button footer-newsletter__submit animate-arrow" name="commit" aria-label="Subscribe">
                              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" className="icon icon-arrow" fill="none" viewBox="0 0 14 10">
                                <path fillRule="evenodd" clipRule="evenodd" d="M8.537.808a.5.5 0 01.817-.162l4 4a.5.5 0 010 .708l-4 4a.5.5 0 11-.708-.708L11.793 5.5H1a.5.5 0 010-1h10.793L8.646 1.354a.5.5 0 01-.109-.546z" fill="currentColor" />
                              </svg>
                            </button>
                          </div>
                          <div className="typeset rte" />
                        </form>
                      </div>
                      <div className="footer__social-row">
                        <ul className="footer__list-social list-unstyled list-social" role="list">
                          <li className="list-social__item">
                            <a target="_blank" rel="noopener noreferrer" href={footerSocial.facebook} className="list-social__link footer-social__link" aria-label="Facebook"><SocialIcon name="facebook" /></a>
                          </li>
                          <li className="list-social__item">
                            <a target="_blank" rel="noopener noreferrer" href={footerSocial.instagram} className="list-social__link footer-social__link" aria-label="Instagram"><SocialIcon name="instagram" /></a>
                          </li>
                          <li className="list-social__item--placeholder">Follow us on social media!</li>
                        </ul>
                        <div className="footer__weglot-mount"><WeglotSwitcher /></div>
                      </div>
                    </div>
                  </FooterAccordion>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="disclaimer">
          <p>*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.</p>
        </div>
        <div className="disclaimer2">
          <p>Use only as directed. The information provided herein is intended for informational purposes only and should not be considered as a substitute for professional medical advice. Always consult a qualified healthcare professional before starting any new dietary supplement regimen or making changes to you or your child's existing healthcare routine. Some Medical Professionals appearing on this site may have been compensated for their opinions. Results claimed by our customers above are based on individual experiences that are unique and cannot be guaranteed.</p>
          <p>* We offer a 45-day satisfaction guarantee for returns. It covers 45 days starting from the day that you place an order and includes only the very first purchase of any product so that families can try our gummies - for any reason you aren't happy with your vitamins. Please note that we will refund up to $100 so that you can try up to 3 bottles of our gummies risk free. If you would like to order more than 3 bottles in your first order, we recommend that you ordering less so that your family can try them first.</p>
        </div>
        <div className="disclaimer2">
          <p>† Based on a survey of First Day customers.</p>
        </div>
        <div className="footer__content-bottom">
          <div className="footer__content-bottom-wrapper page-width">
            <div className="footer__column footer__column--info">
              <div className="footer__copyright">
                <small className="copyright__content">
                  © {new Date().getFullYear()}, <SiteLink href="/">First Day Life Inc.</SiteLink> All rights reserved.{' '}
                  {footerPolicies.map((p) => (
                    <small key={p.url} className="copyright__content"> | <SiteLink href={p.url}>{p.title}</SiteLink></small>
                  ))}
                  <small className="copyright__content"> | <a href="#reopenBanner" className="pandectes-reopen-trigger" onClick={(e) => e.preventDefault()}>Do Not Sell My Information</a></small>
                </small>
              </div>
            </div>
            <div className="footer__column footer__column--extra"><div className="footer__localization" /></div>
          </div>
        </div>
      </footer>
    </div>
  );
}

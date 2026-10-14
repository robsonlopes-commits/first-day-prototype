import { useEffect, useRef, useState } from 'react';
import SiteLink from './SiteLink.jsx';
import NavIcon from './NavIcon.jsx';
import Img from '../components/Img.jsx';
import { LogoMobile, SocialIcon } from './icons.jsx';
import { navCategories, navFamilies, learnLinks, footerSocial } from '../data/navigation.js';

// snippets/mobile-menu-drawer.liquid + mobile-nav-refactored (header "Menu" drawer, mobile only).
const Arrow = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M13.6313 17.2155L12.985 16.5452L17.0735 12.4567H5.1543V11.5337H17.0735L12.985 7.44523L13.6313 6.78448L18.8468 12L13.6313 17.2155Z" fill="#2C3D50" />
  </svg>
);

export default function MobileMenuDrawer({ open, onClose }) {
  const drawerRef = useRef(null);
  const [learnOpen, setLearnOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('mobile-menu-open', open);
    document.body.classList.toggle('menu-mobile--open', open);
    if (open) drawerRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && open && onClose();
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.classList.remove('mobile-menu-open', 'menu-mobile--open');
    };
  }, [open, onClose]);

  return (
    <div className="mobile-menu-drawer-container large-up-hide">
      <div className={`mobile-menu-drawer__overlay${open ? ' is-open' : ''}`} onClick={onClose} />
      <div
        ref={drawerRef}
        className={`mobile-menu-drawer${open ? ' is-open' : ''}`}
        id="mobile-menu-drawer"
        tabIndex={-1}
        onClick={(e) => e.target.closest('.mobile-nav-v3__list a') && onClose()}
      >
        <div className="mobile-menu-drawer__inner">
          <div className="mobile-menu-drawer__navigation-container">
            <nav className="mobile-menu-drawer__navigation menu-drawer__navigation variable">
              <div className="mobile-nav-v3 ab-nav-v3">
                <div className="mobile-nav-v3__inner">
                  <div className="mobile-nav-v3__header">
                    <SiteLink href="/" className="mobile-nav-v3__logo" aria-label="Link to homepage"><LogoMobile /></SiteLink>
                    <button type="button" className="mobile-nav-v3__close-btn" aria-label="Close menu" onClick={onClose}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M14.9928 5.14423C15.1851 4.95192 15.4968 4.95192 15.6891 5.14423C15.8814 5.33654 15.8814 5.64826 15.6891 5.84055L11.113 10.4167L15.6891 14.9928C15.8814 15.1851 15.8814 15.4968 15.6891 15.6891C15.4968 15.8814 15.1851 15.8814 14.9928 15.6891L10.4167 11.113L5.84055 15.6891C5.64826 15.8814 5.33654 15.8814 5.14423 15.6891C4.95192 15.4968 4.95192 15.1851 5.14423 14.9928L9.72035 10.4167L5.14423 5.84055C4.95192 5.64825 4.95192 5.33653 5.14423 5.14423C5.33653 4.95192 5.64825 4.95192 5.84055 5.14423L10.4167 9.72035L14.9928 5.14423Z" fill="#2C3D50" />
                      </svg>
                    </button>
                  </div>

                  <div className="mobile-nav-v3__content">
                    <div>
                      <div className="mobile-nav-v3__section">
                        <h3 className="mobile-nav-v3__section-title">Shop By Category</h3>
                        <div className="mobile-nav-v3__list">
                          {navCategories.map((c) => (
                            <SiteLink key={c.title} href={c.url} className="mobile-nav-v3__category-item">
                              <div className="mobile-nav-v3__category-image"><Img src={c.image} alt={c.title} width="44" height="44" loading="lazy" /></div>
                              <div className="mobile-nav-v3__category-content"><span className="mobile-nav-v3__category-title">{c.title}</span></div>
                              <div className="mobile-nav-v3__arrow"><Arrow /></div>
                            </SiteLink>
                          ))}
                        </div>
                      </div>
                      <div className="mobile-nav-v3__section">
                        <h3 className="mobile-nav-v3__section-title">Shop By Family Member</h3>
                        <div className="mobile-nav-v3__list">
                          {navFamilies.map((f) => (
                            <SiteLink key={f.id} href={f.url} className="mobile-nav-v3__family-item">
                              <div className="mobile-nav-v3__family-image">
                                {f.image ? (
                                  <Img src={f.image} alt={f.title} width="44" height="44" loading="lazy" />
                                ) : (
                                  <span className="mobile-nav-v3__family-icon" aria-hidden="true"><NavIcon icon={f.icon} /></span>
                                )}
                              </div>
                              <div className="mobile-nav-v3__family-content">
                                <span className="mobile-nav-v3__family-title">{f.title}</span>
                                {f.subtitle && <span className="mobile-nav-v3__family-subtitle">{f.subtitle}</span>}
                              </div>
                              <div className="mobile-nav-v3__arrow"><Arrow /></div>
                            </SiteLink>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="ab-test-nav-learn">
                      <div className="mobile-nav-v3__section">
                        <div className="mobile-nav-v3__accordion-header" onClick={() => setLearnOpen((o) => !o)}>
                          <span className="mobile-nav-v3__section-title">Learn</span>
                          <span className={`mobile-nav-v3__accordion-chevron${learnOpen ? ' mobile-nav-v3__accordion-chevron--open' : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                              <path d="M7.41 8.59L12 13.17L16.59 8.59L18 10L12 16L6 10L7.41 8.59Z" fill="#2C3D50" />
                            </svg>
                          </span>
                        </div>
                        <div className="mobile-nav-v3__list mobile-nav-v3__accordion-content" style={{ display: learnOpen ? 'block' : 'none' }}>
                          {learnLinks.map((l) => (
                            <SiteLink key={l.url} href={l.url} className="mobile-nav-v3__learn-item">
                              <div className="mobile-nav-v3__learn-content"><span className="mobile-nav-v3__learn-title">{l.title}</span></div>
                              <span className="mobile-nav-v3__arrow"><Arrow /></span>
                            </SiteLink>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mobile-nav-v3__footer">
                    <div className="mobile-nav-v3__login-row">
                      <a href="https://account.firstday.com/orders" className="mobile-nav-v3__login">
                        <div className="mobile-nav-v3__login-icon">
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="10" cy="6" r="4" stroke="#476DED" strokeWidth="1.5" />
                            <path d="M3 17.5C3 14.4624 5.46243 12 8.5 12H11.5C14.5376 12 17 14.4624 17 17.5V18H3V17.5Z" stroke="#476DED" strokeWidth="1.5" />
                          </svg>
                        </div>
                        <span className="mobile-nav-v3__login-text">Log in</span>
                      </a>
                      <div className="mobile-nav-v3__social">
                        <a href={footerSocial.facebook} className="mobile-nav-v3__social-btn" aria-label="Facebook" target="_blank" rel="noopener noreferrer"><SocialIcon name="facebook" color="#2C3D50" /></a>
                        <a href={footerSocial.instagram} className="mobile-nav-v3__social-btn" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><SocialIcon name="instagram" color="#2C3D50" /></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

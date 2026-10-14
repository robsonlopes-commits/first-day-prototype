import { useCallback, useEffect, useRef, useState } from 'react';
import SiteLink from './SiteLink.jsx';
import NavIcon from './NavIcon.jsx';
import MobileMenuDrawer from './MobileMenuDrawer.jsx';
import { Logo, LogoMobile, CartSvg } from './icons.jsx';
import { useCart } from './CartContext.jsx';
import Img from '../components/Img.jsx';
import { navFamilies, learnLinks, shopLink, learnLink, subscribeLink } from '../data/navigation.js';
import '../styles/theme/fd-divider.css';
import './styles/announcement-bar.css'; // mobile-navbar rules live in the announcement-bar snippet
import './styles/header.css';
import './styles/header.settings.css';

// sections/header.liquid + desktop-nav-* / header-drawer snippets, with the header-group.json settings.
const HOVER_DELAY = 150; // desktop-nav-dropdown.js
const CLOSE_DELAY = 100;

const SECTION_VARS = {
  '--section-padding-top': '0px',
  '--section-padding-bottom': '0px',
  '--gradient-header-background': '#ffffff',
  '--color-header-background': '255, 255, 255',
  '--color-header-foreground': '72, 108, 237',
  '--color-header-border': '72, 108, 237',
  '--icon-weight': '1.7px',
};

const Caret = () => (
  <span className="desktop-nav-v3__menu-caret">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M11.9999 14.2461L8.31543 10.5461H15.6844L11.9999 14.2461Z" fill="currentColor" />
    </svg>
  </span>
);

export function CartButton() {
  const { openCart, count } = useCart();
  return (
    <span className="menu updated-cart-with-icon">
      <button
        type="button"
        className="js-menu__open"
        aria-label={`Open shopping cart${count ? `, ${count} items` : ', empty'}`}
        aria-haspopup="dialog"
        data-menu="#main-nav"
        style={{ background: 'transparent', display: 'flex', padding: 0, border: 'none', color: 'inherit' }}
        onClick={openCart}
      >
        <CartSvg />
        <div className="pulse-container" style={{ pointerEvents: 'none' }}>
          <div className="pulse-box pulse-cart-bubble" style={count > 0 ? undefined : { display: 'none' }}>
            <span className="pulse-cart-bubble-number-of-items" aria-live="polite" aria-atomic="true" role="status">
              <span className="visually-hidden">Cart contains </span>
              <span className="cart-count-number">{count}</span>
              <span className="visually-hidden"> items</span>
            </span>
            <svg className="pulse-svg" id="pulseSvg" width="1.4rem" height="1.4rem" viewBox="0 0 50 50" aria-hidden="true">
              <circle className="circle first-circle" fill="#ff6f4c" cx="25" cy="25" r="25" />
              <circle className="circle second-circle" fill="#ff6f4c" cx="25" cy="25" r="25" />
              <circle className="circle third-circle" fill="#ff6f4c" cx="25" cy="25" r="25" />
              <circle className="circle" fill="#ff6f4c" cx="25" cy="25" r="25" />
            </svg>
          </div>
        </div>
      </button>
    </span>
  );
}

function ProductCard({ product }) {
  return (
    <SiteLink href={product.url} className="desktop-nav-v3__product-card">
      {product.isNew && <span className="desktop-nav-v3__product-badge">New</span>}
      <div className="desktop-nav-v3__product-image">
        <Img src={product.image} alt={product.title} width="64" height="64" loading="lazy" />
      </div>
      <div className="desktop-nav-v3__product-content">
        <span className="desktop-nav-v3__product-title">{product.title}</span>
        {product.description && <span className="desktop-nav-v3__product-description">{product.description}</span>}
      </div>
    </SiteLink>
  );
}

function MenuItem({ title, url, dropdown, active, onEnter, onLeave, onFocus, onKeyDown, itemRef }) {
  const key = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return (
    <li
      ref={itemRef}
      className={`desktop-nav-v3__menu-item${dropdown ? ' desktop-nav-v3__menu-item--has-dropdown' : ''}${active ? ' is-active' : ''}`}
      data-menu-item={key}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <SiteLink href={url} className="desktop-nav-v3__menu-link" aria-expanded={dropdown ? !!active : undefined} onFocus={onFocus} onKeyDown={onKeyDown}>
        <span className="desktop-nav-v3__menu-text">{title}</span>
        {dropdown && <Caret />}
      </SiteLink>
    </li>
  );
}

export default function Header() {
  const [active, setActive] = useState(null); // 'shop' | 'learn' | null
  const [family, setFamily] = useState((navFamilies.find((f) => f.openByDefault) || navFamilies[0]).id);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileHidden, setMobileHidden] = useState(false);
  const openTimer = useRef(null);
  const closeTimer = useRef(null);
  const navRef = useRef(null);
  const wrapperRef = useRef(null);
  const learnItemRef = useRef(null);
  const [learnLeft, setLearnLeft] = useState(0);

  const clearTimers = () => {
    clearTimeout(openTimer.current);
    clearTimeout(closeTimer.current);
  };
  const enter = (key) => () => {
    clearTimeout(closeTimer.current);
    openTimer.current = setTimeout(() => open(key), HOVER_DELAY);
  };
  const leave = () => {
    clearTimeout(openTimer.current);
    closeTimer.current = setTimeout(() => setActive(null), CLOSE_DELAY);
  };
  const open = useCallback((key) => {
    if (key === 'learn' && learnItemRef.current && wrapperRef.current) {
      setLearnLeft(learnItemRef.current.getBoundingClientRect().left - wrapperRef.current.getBoundingClientRect().left);
    }
    setActive(key);
  }, []);
  const keyDown = (key) => (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      active === key ? setActive(null) : open(key);
    }
  };

  // Escape / click outside close the dropdown (desktop-nav-dropdown.js)
  useEffect(() => {
    if (!active) return undefined;
    const onKey = (e) => e.key === 'Escape' && setActive(null);
    const onClick = (e) => navRef.current && !navRef.current.contains(e.target) && !e.target.closest('.desktop-nav-v3__dropdown') && setActive(null);
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
    };
  }, [active]);
  useEffect(() => clearTimers, []);

  // header-scroll-behavior.js: mobile navbar hides on sustained scroll down, returns on scroll up.
  useEffect(() => {
    let last = 0;
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      const delta = y - last;
      if (window.innerWidth < 990) {
        if (y <= 0) { setMobileHidden(false); last = y; }
        else if (delta > 8 && y > 100) { setMobileHidden(true); last = y; }
        else if (delta < -8) { setMobileHidden(false); last = y; }
      } else last = y;
      ticking = false;
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div className="header-wrapper-container">
        <div id="shopify-section-header" className="shopify-section shopify-section-header" style={SECTION_VARS}>
          <div ref={wrapperRef} className="header-wrapper header-wrapper-container-nav-bar">
            <span>
              <header className="header header--middle-left header--mobile-left header-section--padding">
                <div className="header-logo-menu-container">
                  <SiteLink href="/" className="header__heading-link focus-inset" aria-label="Link to homepage">
                    <div className="medium-hide large-up-hide"><Logo height="32" /></div>
                    <div className="small-hide"><Logo height="40" className="header__desktop-logo" /></div>
                  </SiteLink>
                  <div className="fd-divider" style={{ '--fd-divider-height': '20px', '--fd-divider-margin-x': '0px', '--fd-divider-color': '#D7EFFA' }} role="separator" aria-orientation="vertical" />
                  <div className="desktop-nav-v3 ab-nav-v3">
                    <nav ref={navRef} className="desktop-nav-v3- small-hide medium-hide" aria-label="Desktop navigation">
                      <ul className="desktop-nav-v3__list" role="menubar">
                        <MenuItem title={shopLink.title} url={shopLink.url} dropdown active={active === 'shop'} onEnter={enter('shop')} onLeave={leave} onFocus={() => open('shop')} onKeyDown={keyDown('shop')} />
                        <span className="ab-test-nav-learn">
                          <MenuItem itemRef={learnItemRef} title={learnLink.title} url={learnLink.url} dropdown active={active === 'learn'} onEnter={enter('learn')} onLeave={leave} onFocus={() => open('learn')} onKeyDown={keyDown('learn')} />
                        </span>
                        <MenuItem title={subscribeLink.title} url={subscribeLink.url} />
                      </ul>
                    </nav>
                  </div>
                </div>
                <div className="header__right">
                  <CartButton />
                </div>
              </header>
            </span>

            {/* Dropdowns are direct children of the nav bar (desktop-nav-shop-dropdown / learn-dropdown) */}
            <div
              className={`desktop-nav-v3__dropdown${active === 'shop' ? ' is-active' : ''}`}
              data-dropdown="shop"
              onMouseEnter={() => clearTimeout(closeTimer.current)}
              onMouseLeave={() => active && (closeTimer.current = setTimeout(() => setActive(null), CLOSE_DELAY))}
            >
              <div className="desktop-nav-v3__dropdown-inner desktop-nav-v3__dropdown-inner--mega">
                <div className="desktop-nav-v3__mega">
                  <div className="desktop-nav-v3__mega-families" role="tablist" aria-label="Shop by family member">
                    {navFamilies.map((f) => (
                      <SiteLink
                        key={f.id}
                        href={f.url}
                        className={`desktop-nav-v3__family-btn${family === f.id ? ' is-active' : ''}`}
                        role="tab"
                        aria-selected={family === f.id}
                        onMouseOver={() => setFamily(f.id)}
                        onFocus={() => setFamily(f.id)}
                      >
                        <span className="desktop-nav-v3__family-btn-icon" aria-hidden="true"><NavIcon icon={f.icon} /></span>
                        <span className="desktop-nav-v3__family-btn-label">
                          <span className="desktop-nav-v3__family-btn-title">{f.title}</span>
                          {f.subtitle && <span className="desktop-nav-v3__family-btn-subtitle">{f.subtitle}</span>}
                        </span>
                        <span className="desktop-nav-v3__family-btn-arrow" aria-hidden="true">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M13.6313 17.2154L12.985 16.5452L17.0735 12.4567H5.1543V11.5337H17.0735L12.985 7.44517L13.6313 6.78442L18.8468 11.9999L13.6313 17.2154Z" fill="currentColor" />
                          </svg>
                        </span>
                      </SiteLink>
                    ))}
                  </div>
                  <div className="desktop-nav-v3__mega-products">
                    {navFamilies.map((f) => (
                      <div key={f.id} className={`desktop-nav-v3__family-panel${family === f.id ? ' is-active' : ''}`} role="tabpanel">
                        <h3 className="desktop-nav-v3__family-panel-title">
                          <span className="desktop-nav-v3__family-panel-name">{f.title}</span>
                          {f.subtitle && <span className="desktop-nav-v3__family-panel-subtitle">{f.subtitle}</span>}
                        </h3>
                        <div className="desktop-nav-v3__product-grid">
                          {f.products.map((p) => <ProductCard key={p.url} product={p} />)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`desktop-nav-v3__dropdown${active === 'learn' ? ' is-active' : ''}`}
              data-dropdown="learn"
              style={{ left: learnLeft, right: 'auto' }}
              onMouseEnter={() => clearTimeout(closeTimer.current)}
              onMouseLeave={() => active && (closeTimer.current = setTimeout(() => setActive(null), CLOSE_DELAY))}
            >
              <div className="desktop-nav-v3__dropdown-inner desktop-nav-v3__dropdown-inner-nav-learn">
                <div className="desktop-nav-v3__learn-list">
                  {learnLinks.map((l) => <SiteLink key={l.url} href={l.url} className="desktop-nav-v3__learn-link">{l.title}</SiteLink>)}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile-only navbar (hamburger / centered logo / cart) */}
          <div className={`mobile-navbar large-up-hide${mobileHidden ? ' header-scroll--hidden' : ''}`}>
            <div className="mobile-navbar__inner">
              <button className="mobile-navbar__hamburger header__icon header__icon--menu focus-inset" aria-label="Menu" onClick={() => setMenuOpen(true)}>
                <span className="header__icon header__icon--summary">
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" className="icon icon-hamburger" fill="none" viewBox="0 0 32 32">
                    <path d="M0 26.667h32M0 16h26.98M0 5.333h32" stroke="currentColor" />
                  </svg>
                </span>
              </button>
              <SiteLink href="/" className="mobile-navbar__logo focus-inset" aria-label="Link to homepage"><LogoMobile /></SiteLink>
              <div className="mobile-navbar__actions">
                <CartButton />
              </div>
            </div>
          </div>
        </div>
      </div>
      <MobileMenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

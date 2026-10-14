import AnnouncementBar from './AnnouncementBar.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import CartDrawer from './CartDrawer.jsx';

// Mirrors layout/theme.liquid: header-group, <main>, footer-group, cart-drawer-group.
export default function Shell({ children }) {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main id="MainContent" className="content-for-layout focus-none" role="main" tabIndex="-1">
        {children}
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}

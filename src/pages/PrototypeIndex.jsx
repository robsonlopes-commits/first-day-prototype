import { Link } from 'react-router-dom';

// Private index. Intentionally NOT styled with the storefront theme.
const routes = [
  ['/', 'Home', 'index.hp01-v2'],
  ['/products/kids-calming-magnesium', 'Legacy PDP', 'product.unified-default'],
  ['/products/kids-enrichment-vitamin', 'New PDP', 'product.uniified-default-v2'],
  ['/pages/kde-behind-the-science-lp', 'Behind the Science LP (kids)', 'page.lp-BTS-master'],
  ['/pages/tdk-behind-the-science-lp', 'Behind the Science LP (teens)', 'page.lp-BTS-master'],
  ['/pages/bundle-builder-v2', 'Bundle builder v2 (quiz)', 'page.lp-bundle-v2'],
  ['/pages/bundle-quiz', 'Bundle quiz', 'page.lp-bundle-v3'],
  ['/pages/sale', 'Sale', 'page.bfcm-categories'],
];
export default function PrototypeIndex() {
  return (
    <div style={{ font: '15px/1.5 system-ui, sans-serif', maxWidth: 640, margin: '48px auto', padding: '0 20px', color: '#222' }}>
      <h1 style={{ fontSize: 22 }}>First Day prototype</h1>
      <p style={{ color: '#666' }}>Local design sandbox. The cart opens from the header cart icon on any page.</p>
      <ul style={{ padding: 0, listStyle: 'none' }}>
        {routes.map(([to, name, tpl]) => (
          <li key={to} style={{ padding: '10px 0', borderBottom: '1px solid #eee' }}>
            <Link to={to}>{name}</Link> <code style={{ color: '#888' }}>{to}</code>
            <div style={{ color: '#999', fontSize: 12 }}>Shopify template: {tpl}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

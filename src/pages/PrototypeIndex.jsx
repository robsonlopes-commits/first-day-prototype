import { Link } from 'react-router-dom';

// Private index. Intentionally NOT styled with the storefront theme.
// Two groups. EXPLORATIONS: [route, short title, description], the newest on TOP (add a new exploration as the FIRST item of the list, a new version of one goes
// right above it, and write its description: one or two lines on what it does and what it was copied from).
// PAGES: replicas of the live storefront pages, in their usual order.
const explorations = [
  ['/explorations/mixed-bundle-builder-quiz-v2', 'Mixed Bundle Builder v2', 'No quiz. Add To Cart opens the Build Your Family Box with the product of the page already chosen, in the quantity added. Copy of the kids Behind the Science LP.'],
  ['/explorations/mixed-bundle-builder-quiz-v1', 'Mixed Bundle Builder + Quiz v1', 'Add To Cart opens a 1 step quiz. Its answers open the Build Your Family Box with the product of the page plus what the answers add, each with the reason. Copy of the kids Behind the Science LP.'],
  ['/explorations/bundle-add-on', 'Bundle Add-on', 'New add-on modal opened by Add To Cart, with stacks in three layouts (?bundles=a, b or c), items by audience and the free gift progress. Copy of the kids Behind the Science LP.'],
  ['/explorations/all-in-1-bundle', 'All-in-1 Bundle', 'Landing for the four hero products as one bundle, with demo tabs (Kids, Teens, Toddlers) and the option to add each item on its own.'],
];
const pages = [
  ['/', 'Home', 'index.hp01-v2'],
  ['/products/kids-calming-magnesium', 'Legacy PDP', 'product.unified-default'],
  ['/products/kids-enrichment-vitamin', 'New PDP', 'product.uniified-default-v2'],
  ['/pages/kde-behind-the-science-lp', 'Behind the Science LP (kids)', 'page.lp-BTS-master'],
  ['/pages/tdk-behind-the-science-lp', 'Behind the Science LP (teens)', 'page.lp-BTS-master'],
  ['/pages/bundle-builder-v2', 'Bundle builder v2 (quiz)', 'page.lp-bundle-v2'],
  ['/pages/bundle-quiz', 'Bundle quiz', 'page.lp-bundle-v3'],
  ['/pages/sale', 'Sale', 'page.bfcm-categories'],
];
const Group = ({ title, note, items, describe }) => (
  <section style={{ marginTop: 28 }}>
    <h2 style={{ fontSize: 15, letterSpacing: '0.04em', textTransform: 'uppercase', margin: 0, paddingBottom: 6, borderBottom: '2px solid #222' }}>{title}</h2>
    {note ? <p style={{ color: '#888', fontSize: 12, margin: '6px 0 0' }}>{note}</p> : null}
    <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
      {items.map(([to, name, info]) => (
        <li key={to} style={{ padding: '10px 0', borderBottom: '1px solid #eee' }}>
          <Link to={to}>{name}</Link> <code style={{ color: '#888' }}>{to}</code>
          <div style={{ color: describe ? '#666' : '#999', fontSize: describe ? 13 : 12, marginTop: describe ? 2 : 0 }}>{describe ? info : `Shopify template: ${info}`}</div>
        </li>
      ))}
    </ul>
  </section>
);
export default function PrototypeIndex() {
  return (
    <div style={{ font: '15px/1.5 system-ui, sans-serif', maxWidth: 640, margin: '48px auto', padding: '0 20px', color: '#222' }}>
      <h1 style={{ fontSize: 22 }}>First Day prototype</h1>
      <p style={{ color: '#666' }}>Local design sandbox. The cart opens from the header cart icon on any page.</p>
      <Group title="Explorations" note="The newest first. Ideas and concepts, not in production." items={explorations} describe />
      <Group title="Pages" note="Replicas of the live storefront pages." items={pages} />
    </div>
  );
}

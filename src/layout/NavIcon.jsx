import toddler from './svg/nav-icon-toddler.svg?raw';
import kid from './svg/nav-icon-kid.svg?raw';
import teen from './svg/nav-icon-teen.svg?raw';
import woman from './svg/nav-icon-woman.svg?raw';
import man from './svg/nav-icon-man.svg?raw';
import bundles from './svg/nav-icon-bundles.svg?raw';

const ICONS = { toddler, kid, teen, woman, man, bundles };

// snippets/nav-family-icon.liquid: inlined SVG painted with currentColor.
export default function NavIcon({ icon }) {
  const svg = ICONS[icon];
  if (!svg) return null;
  return <span className="nav-family-icon" aria-hidden="true" dangerouslySetInnerHTML={{ __html: svg }} />;
}

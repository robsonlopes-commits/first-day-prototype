import ModernWave from '../../../components/ModernWave.jsx';

// The flat modern wave between two sections of a Sesame page that is made of sections with their own colors (the new template PDP and the Behind the Science landing).
// `from` is the color of the section above, `to` the one below. `flip` + className `ss-seam--up` (or `ss-seam--over` with the default direction) lay the wave over the picture of a hero
// instead of between two colors (the neighbor is then transparent).
export default function Seam({ from, to, className = '', flip }) {
  return <div className={`ss-seam ${className}`}><ModernWave position={flip ? 'top' : 'bottom'} color={from} containerBackground={to} /></div>;
}

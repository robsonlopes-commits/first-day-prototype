import { PLUS_SVG, MINUS_SVG, Raw } from '../../FdBuildBox.jsx';

// "Add +" that turns into a "- 1 +" stepper once the item is in the cart. Same control (markup, classes and CSS) as the product cards of the
// bundle builder popup on /pages/bundle-quiz (fd-build-box-popup__add / __stepper / __step / __qty). qty comes from the cart line of the item.
export default function AddStepper({ qty, label, onAdd, onDec, className = '' }) {
  return (
    <div className={`aio-addstepper${qty > 0 ? ' is-selected' : ''} ${className}`.trim()}>
      <button type="button" className="fd-build-box-popup__add" onClick={onAdd} aria-label={`Add ${label}`}>
        Add <Raw html={PLUS_SVG} style={{ display: 'contents' }} />
      </button>
      <div className="fd-build-box-popup__stepper" role="group" aria-label={`${label} quantity`}>
        <button type="button" className="fd-build-box-popup__step" onClick={onDec} aria-label={`Decrease ${label}`}><Raw html={MINUS_SVG} style={{ display: 'contents' }} /></button>
        <span className="fd-build-box-popup__qty" aria-live="polite">{qty}</span>
        <button type="button" className="fd-build-box-popup__step" onClick={onAdd} aria-label={`Increase ${label}`}><Raw html={PLUS_SVG} style={{ display: 'contents' }} /></button>
      </div>
    </div>
  );
}

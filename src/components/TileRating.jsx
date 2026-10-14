import '../styles/theme/fd-sale-tile-reviews.css';

// snippets/fd-product-tile-rating.liquid. Hidden by the theme CSS unless <html> carries
// `fd-sale-reviews-name` / `fd-sale-reviews-price` (A/B variant), exactly like production.
export default function TileRating({ rating, reviews, placement = 'name', href = '#' }) {
  if (!rating || !reviews) return null;
  const shown = rating.toFixed(1);
  const fill = Math.round(rating * 20 * 10) / 10;
  const count = reviews.toLocaleString('en-US');
  const word = reviews === 1 ? 'Review' : 'Reviews';
  const stars = (cls) => (
    <span className={cls}>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} className="fd-tile-rating__star" viewBox="0 0 16 16" focusable="false" aria-hidden="true">
          <path d="M8 .9l2.2 4.5 4.9.7-3.5 3.5.8 4.9L8 12.2l-4.4 2.3.8-4.9L.9 6.1l4.9-.7z" fill="currentColor" />
        </svg>
      ))}
    </span>
  );
  return (
    <a className={`fd-tile-rating fd-tile-rating--${placement}`} href={href} onClick={(e) => e.preventDefault()} data-placement={placement} aria-label={`${shown} out of 5 stars. ${count} ${word}`}>
      <span className="fd-tile-rating__stars" aria-hidden="true" style={{ '--fd-tile-rating': `${fill}%` }}>
        {stars('fd-tile-rating__stars-base')}
        {stars('fd-tile-rating__stars-fill')}
      </span>
      <span className="fd-tile-rating__score" aria-hidden="true">{shown}</span>
      <span className="fd-tile-rating__count" aria-hidden="true">{count} {word}</span>
    </a>
  );
}

import { Link } from 'react-router-dom';
import Img from '../components/Img.jsx';
import TileRating from '../components/TileRating.jsx';
import { useCart } from '../layout/CartContext.jsx';
import { Blurb, useCardData } from './PbfcmProductCard.jsx';
import '../styles/ui-kit.css';
import '../styles/theme/fd-button.css';
import '../styles/theme/pbfcm-product-carousel-alt.css';

// snippets/alt-product-card.liquid (+ alt-product-card-wave.liquid): used by the "alternative view" carousel (Home).
export default function AltProductCard({
  product, customImage, showBadge, badgeText = 'New!', badgeColor, buttonColor, showDescription = true, descriptionText,
  discount, useShortName,
}) {
  const { openCart } = useCart();
  const d = useCardData(product, { discount, useShortName, customImage, descriptionText });
  const headerBg = badgeColor || buttonColor;
  return (
    <div className="alt-product-card-shell">
      <article className="alt-product-card" data-fd-plp-card data-product-handle={product.handle} style={headerBg ? { '--alt-card-header-bg': headerBg } : undefined}>
        <div className="alt-product-card__media">
          {showBadge && <span className="alt-product-card__badge">{badgeText}</span>}
          <div className="alt-product-card__media-bg" aria-hidden="true" />
          <Link to={product.url} className="alt-product-card__media-link" aria-label={`View ${d.title}`}>
            <Img className="alt-product-card__media-img" src={d.image} alt={product.pdpTitle} loading="lazy" />
          </Link>
          <svg className="alt-product-card__media-wave" viewBox="0 0 308 22" preserveAspectRatio="xMidYMax meet" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M0 0C24.2813 8.75657 48.179 16.9989 80.7852 19.0771C104.585 20.5941 133.036 18.8242 169.651 11.5713C243.819 -3.11841 275.253 0.137392 308 9.97168V21.7471H0V0Z" fill="currentColor" />
          </svg>
        </div>

        <div className="alt-product-card__body">
          <div className="alt-product-card__info">
            <Link to={product.url} className="alt-product-card__title" aria-label={`View ${d.title}`}>{d.title}</Link>
            <TileRating rating={product.rating} reviews={product.reviews} placement="name" href={product.url} />
            <div className="alt-product-card__prices">
              {d.compare && <p className="alt-product-card__compare igPrice">{d.compare}</p>}
              <p className="alt-product-card__price igPrice">{d.price}</p>
            </div>
            <TileRating rating={product.rating} reviews={product.reviews} placement="price" href={product.url} />
            {showDescription && d.description && (
              <p className="alt-product-card__description"><Blurb text={d.description} /></p>
            )}
          </div>

          <div className="alt-product-card__actions">
            {d.ing && (
              <div className="fd-ingredients-host" style={{ display: 'contents' }}>
                <a href="#see-ingredients" className="fd-see-ingredients alt-product-card__ingredients" role="button" aria-haspopup="dialog" onClick={d.showIngredients}>See Ingredients</a>
              </div>
            )}
            <button className="alt-product-card__atc fd-btn fd-btn--small fd-btn--secondary fd-btn-shape--pill" type="button" aria-label={`Add ${d.title} to cart`} onClick={openCart}>
              <span className="fd-btn-text">Add To Cart</span>
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}

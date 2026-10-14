import { Link } from 'react-router-dom';
import Img from '../components/Img.jsx';
import TileRating from '../components/TileRating.jsx';
import { openIngredients } from '../components/IngredientsPopup.jsx';
import { useCart } from '../layout/CartContext.jsx';
import { getIngredients } from '../data/ingredients.js';
import { money, salePrice } from '../data/products.js';
import '../styles/theme/fd-ingredients-popup.css';
import './PbfcmProductCard.css';

// "[bold]" markers in blurbs render as <strong> (same as the Liquid split on '[' / ']').
export function Blurb({ text }) {
  const parts = (text || '').split('[');
  return parts.map((part, i) => {
    if (i === 0) return part;
    const [bold, rest = ''] = part.split(']');
    return <span key={i}><strong>{bold}</strong>{rest}</span>;
  });
}

// Shared by classic + alt cards: price math and the "See Ingredients" drawer trigger.
export function useCardData(product, { discount, useShortName = true, customImage, descriptionText }) {
  const title = useShortName ? product.title : product.pdpTitle;
  const description = product.blurb || descriptionText || '';
  const compare = discount > 0 ? money(product.price) : null;
  const price = money(discount > 0 ? salePrice(product, discount) : product.price);
  const image = customImage || product.saleImage;
  const ing = getIngredients(product.handle);
  const showIngredients = (e) => {
    e.preventDefault();
    e.stopPropagation();
    openIngredients({ title, image: ing?.image, html: ing?.html, price, comparePrice: compare });
  };
  return { title, description, compare, price, image, ing, showIngredients };
}

// snippets/pbfcm-product-card-item.liquid (classic carousel card, used on /pages/sale)
export default function PbfcmProductCard({
  product, customImage, showBadge, badgeText = 'New!', badgeColor = '#078942', showDescription = true, descriptionText,
  discount, useShortName, cardBgColor = '#ffffff', borderRadius = 12, buttonColor = '#078942', imageRatio = 'square',
}) {
  const { openCart } = useCart();
  const d = useCardData(product, { discount, useShortName, customImage, descriptionText });
  return (
    <div
      className="pbfcm-product-card"
      data-ratio={imageRatio}
      data-fd-plp-card
      data-product-handle={product.handle}
      style={{ '--pc-card-bg': cardBgColor, '--pc-card-radius': `${borderRadius}px`, '--pc-badge-bg': badgeColor, '--pc-sale-color': buttonColor }}
    >
      {showBadge && <div className="pbfcm-badge" aria-label={`Product badge: ${badgeText}`}>{badgeText}</div>}

      <div className="pbfcm-card-image">
        <Link to={product.url} aria-label={`View ${d.title} product details`}>
          <Img src={d.image} alt={product.pdpTitle} loading="lazy" />
        </Link>
      </div>

      <div className="pbfcm-card-info">
        <Link to={product.url} style={{ textDecoration: 'none' }} aria-label={d.title}>
          <h3 className="pbfcm-card-title">{d.title}</h3>
        </Link>

        <TileRating rating={product.rating} reviews={product.reviews} placement="name" href={product.url} />

        <div className="pbfcm-price-container">
          {d.compare && <p className="pbfcm-compare-price igPrice">{d.compare}</p>}
          <p className="pbfcm-price igPrice">{d.price}</p>
        </div>

        <TileRating rating={product.rating} reviews={product.reviews} placement="price" href={product.url} />

        {showDescription && d.description && (
          <p className="pbfcm-card-description"><Blurb text={d.description} /></p>
        )}
      </div>

      <div className="pbfcm-card-footer">
        <div className="pbfcm-card-actions">
          {d.ing && (
            <div className="fd-ingredients-host" style={{ display: 'contents' }}>
              <a href="#see-ingredients" className="fd-see-ingredients pbfcm-see-ingredients" role="button" aria-haspopup="dialog" onClick={d.showIngredients}>See Ingredients</a>
            </div>
          )}
          <button className="pbfcm-quick-add" type="button" aria-label={`Add ${d.title} to cart`} onClick={openCart}>
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}

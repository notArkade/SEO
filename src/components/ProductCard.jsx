import { Link } from "react-router-dom";
import { lowest, highest, money } from "../utils/priceUtils";
export default function ProductCard({ product }) {
  return (
    <article className="product-card">
      <div className="ram-icon" aria-hidden="true">
        ▦
      </div>
      <div className="product-info">
        <p className="eyebrow">
          {product.brand} · {product.type} · {product.formFactor}
        </p>
        <h3>
          <Link to={`/compare/${product.id}`}>{product.name}</Link>
        </h3>
        <p className="muted">
          {product.capacity} · {product.speed} · {product.prices.length} stores
        </p>
      </div>
      <div className="prices">
        <div>
          <span>Lowest price</span>
          <strong>{money(lowest(product))}</strong>
        </div>
        <div>
          <span>Highest</span>
          <b>{money(highest(product))}</b>
        </div>
      </div>
      <Link className="button outline" to={`/compare/${product.id}`}>
        Compare prices
      </Link>
    </article>
  );
}

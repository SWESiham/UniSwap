import "./ProductCard.css";
import { Link } from "react-router-dom";
import { Clock, MapPin, Package } from "lucide-react";
import "./ProductCard.css";
interface Product{
    name:string;
    price:string;
    condition:string;
    image?:string;
    faculty:string;
    type: string;
    time: string;
    match: boolean;
}
interface ProductCardProps {
  product: Product;
}
function ProductCard({product}:ProductCardProps){
    return (
  <article className="home-product-card">
    <Link to="/browse" className="home-product-image">
      {product.image ? (
        <img src={product.image} alt={product.name} />
      ) : (
        <div className="home-image-placeholder">
          <Package size={38} />
        </div>
      )}

      {product.match && (
        <span className="home-match-badge">Matches a request</span>
      )}
    </Link>

    <div className="home-product-info">
      <div className="home-product-tags">
        <span className="home-condition">{product.condition}</span>
        {product.type && (
          <span className="home-sale-tag">{product.type}</span>
        )}
      </div>

      <Link to="/browse" className="home-product-name">
        {product.name}
      </Link>

      <div className="home-product-bottom">
        <strong>{product.price}</strong>
        <span>
          <Clock size={13} /> {product.time}
        </span>
      </div>

      <div className="home-product-faculty">
        <MapPin size={13} />
        {product.faculty}
      </div>
    </div>
  </article>
);
};
export default ProductCard;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Clock, MapPin, Package, Heart } from "lucide-react";
import {
    addFavorite,
    deleteFavorite,
    getFavorites
} from "../../services/favorites.api";
import "./ProductCard.css";

interface Product {
    listingId?: string;
    name: string;
    price: string;
    condition: string;
    image?: string;
    faculty: string;
    type: string;
    time: string;
    match: boolean;
}

interface ProductCardProps {
    product: Product;
}

function ProductCard({ product }: ProductCardProps) {
    const [isFavorite, setIsFavorite] = useState(false);
    const [favoriteLoading, setFavoriteLoading] = useState(false);

    useEffect(() => {
        if (!product.listingId) return;

        let active = true;

        getFavorites()
            .then((response) => {
                const favorites = response.data;
                const exists =
                    Array.isArray(favorites) &&
                    favorites.some(
                        (fav: any) =>
                            String(fav.listing) === product.listingId
                    );

                if (active) setIsFavorite(exists);
            })
            .catch((error) => {
                console.error("Failed to load favorite status:", error);
            });

        return () => {
            active = false;
        };
    }, [product.listingId]);

    const handleFavorite = async () => {
        if (!product.listingId || favoriteLoading) return;

        try {
            setFavoriteLoading(true);

            if (isFavorite) {
                await deleteFavorite(product.listingId);
                setIsFavorite(false);
            } else {
                await addFavorite(product.listingId);
                setIsFavorite(true);
            }

            // Notify Navbar that favorites have changed
            window.dispatchEvent(new Event("favorites-updated"));

        } catch (error) {
            console.error("Favorite action failed:", error);
        } finally {
            setFavoriteLoading(false);
        }
    };

    return (
        <article className="home-product-card">
            <Link
                to={product.listingId ? `/product/${product.listingId}` : "/browse"}
                className="home-product-image"
            >
                {product.image ? (
                    <img src={product.image} alt={product.name} />
                ) : (
                    <div className="home-image-placeholder">
                        <Package size={38} />
                    </div>
                )}

                {product.match && (
                    <span className="home-match-badge">
                        Matches a request
                    </span>
                )}
            </Link>

            {product.listingId && (
                <button
                    type="button"
                    className={`favorite-button ${isFavorite ? "active" : ""}`}
                    onClick={handleFavorite}
                    disabled={favoriteLoading}
                    aria-label={
                        isFavorite
                            ? "Remove from favorites"
                            : "Add to favorites"
                    }
                >
                    <Heart
                        size={19}
                        fill={isFavorite ? "currentColor" : "none"}
                    />
                </button>
            )}

            <div className="home-product-info">
                <div className="home-product-tags">
                    <span className="home-condition">
                        {product.condition}
                    </span>

                    {product.type && (
                        <span className="home-sale-tag">
                            {product.type}
                        </span>
                    )}
                </div>

                <Link
                    to={product.listingId ? `/product/${product.listingId}` : "/browse"}
                    className="home-product-name"
                >
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
}

export default ProductCard;

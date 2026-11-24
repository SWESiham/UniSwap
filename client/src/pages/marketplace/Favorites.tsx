
import { useEffect, useState } from "react";
import ProductCard from "../../components/marketplace/ProductCard";
import { getFavorites } from "../../services/favorites.api";
import { getMarketplaceListings } from "../../services/marketplace.api";
import type { Listing } from "../../types";
import "./Favorites.css";

function Favorites() {
    const [listings, setListings] = useState<Listing[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                setLoading(true);

                const [favoritesResponse, listingsResponse] =
                    await Promise.all([
                        getFavorites(),
                        getMarketplaceListings({ page: 1, limit: 1000 }),
                    ]);

                const favorites = favoritesResponse.data;
                const allListings = listingsResponse.data;

                if (!Array.isArray(favorites) || !Array.isArray(allListings)) {
                    setListings([]);
                    return;
                }

                const favoriteIds = new Set(
                    favorites.map((favorite: any) =>
                        String(favorite.listing)
                    )
                );

                setListings(
                    allListings.filter((listing: Listing) =>
                        favoriteIds.has(String(listing._id))
                    )
                );
            } catch (err) {
                console.error("Failed to load favorites:", err);
                setError("Couldn't load your favorites. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, []);

    return (
        <div className="favorites-page">
            <div className="favorites-header">
                <h1>My Favorites</h1>
                <p>Your saved products in one place.</p>
            </div>

            {loading ? (
                <p>Loading favorites...</p>
            ) : error ? (
                <p>{error}</p>
            ) : listings.length === 0 ? (
                <p>You haven't added any favorites yet.</p>
            ) : (
                <div className="browse-products-grid">
                    {listings.map((listing) => (
                        <ProductCard
                            key={listing._id}
                            product={{
                                listingId: listing._id,
                                name: listing.title,
                                price: `${listing.price} EGP`,
                                condition: listing.condition.replaceAll("_", " "),
                                faculty: listing.faculty || "Not specified",
                                type:
                                    listing.type === "sell"
                                        ? "For Sale"
                                        : listing.type === "exchange"
                                        ? "Exchange"
                                        : "Sale or Exchange",
                                time: "Recently",
                                match: false,
                                image: listing.images?.[0],
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Favorites;

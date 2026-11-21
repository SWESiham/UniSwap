
import { useEffect, useState } from "react";
import ProductCard from "../../components/marketplace/ProductCard";
import {
    getMarketplaceListings,
    searchMarketplaceListings,
    filterMarketplaceListings,
    sortMarketplaceListings,
} from "../../services/marketplace.api";
import { getCategories } from "../../services/categories.api";
import type { Listing } from "../../types";
import "./Browse.css";

interface Category {
    _id: string;
    name: string;
}

const uploadedImages = Object.values(
    import.meta.glob("../../uploads/*.{png,jpg,jpeg,webp}", {
        eager: true,
        query: "?url",
        import: "default",
    })
) as string[];

function getFallbackImage(title: string) {
    const productTitle = title.toLowerCase();

    if (productTitle.includes("calculator")) {
        return uploadedImages[0];
    }

    if (productTitle.includes("book")) {
        return uploadedImages[1];
    }

    return undefined;
}

function formatLabel(value: string) {
    return value
        .replaceAll("_", " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
}

function extractListings(response: any): Listing[] {
    return Array.isArray(response?.data) ? response.data : [];
}

function Browse() {
    const [listings, setListings] = useState<Listing[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Categories
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    // Search
    const [searchInput, setSearchInput] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    // Filters
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [condition, setCondition] = useState("");
    const [type, setType] = useState("");
    const [faculty, setFaculty] = useState("");
    const [department, setDepartment] = useState("");

    // Sorting and pagination
    const [sort, setSort] = useState("newest");
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;

    // Load categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getCategories();

                if (Array.isArray(response)) {
                    setCategories(response);
                } else {
                    console.error("Categories response is not an array:", response);
                }
            } catch (err) {
                console.error("Failed to load categories:", err);
            }
        };

        fetchCategories();
    }, []);

    // Load listings
    useEffect(() => {
        let cancelled = false;

        const fetchListings = async () => {
            try {
                setLoading(true);
                setError("");

                const hasFilters =
                    selectedCategory !== "" ||
                    minPrice !== "" ||
                    maxPrice !== "" ||
                    condition !== "" ||
                    type !== "" ||
                    faculty.trim() !== "" ||
                    department.trim() !== "";

                const filterParams: any = {};

                if (selectedCategory) {
                    filterParams.category = selectedCategory;
                }

                if (minPrice !== "") {
                    filterParams.minPrice = Number(minPrice);
                }

                if (maxPrice !== "") {
                    filterParams.maxPrice = Number(maxPrice);
                }

                if (condition) {
                    filterParams.condition = condition;
                }

                if (type) {
                    filterParams.type = type;
                }

                if (faculty.trim()) {
                    filterParams.faculty = faculty.trim();
                }

                if (department.trim()) {
                    filterParams.department = department.trim();
                }

                const requests: Promise<any>[] = [];

                if (searchQuery.trim()) {
                    requests.push(
                        searchMarketplaceListings(searchQuery.trim())
                    );
                }

                if (hasFilters) {
                    requests.push(
                        filterMarketplaceListings(filterParams)
                    );
                }

                if (sort === "newest") {
                    requests.push(sortMarketplaceListings("newest"));
                }

                let results: Listing[];

                if (requests.length > 0) {
                    const responses = await Promise.all(requests);
                    const resultSets = responses.map(extractListings);

                    results = resultSets[0].filter((listing) =>
                        resultSets.every((resultSet) =>
                            resultSet.some(
                                (item) => item._id === listing._id
                            )
                        )
                    );
                } else {
                    const response = await getMarketplaceListings({
                        page: 1,
                        limit: 1000,
                    });

                    results = extractListings(response);
                }

                if (sort === "price-low") {
                    results.sort((a, b) => a.price - b.price);
                } else if (sort === "price-high") {
                    results.sort((a, b) => b.price - a.price);
                }

                if (!cancelled) {
                    setListings(results);
                    setPage(1);
                }
            } catch (err) {
                console.error("Failed to fetch marketplace listings:", err);

                if (!cancelled) {
                    setListings([]);
                    setError("Something went wrong while loading products.");
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        fetchListings();

        return () => {
            cancelled = true;
        };
    }, [
        searchQuery,
        selectedCategory,
        minPrice,
        maxPrice,
        condition,
        type,
        faculty,
        department,
        sort,
    ]);

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSearchQuery(searchInput);
    };

    const clearFilters = () => {
        setSearchInput("");
        setSearchQuery("");
        setSelectedCategory("");
        setMinPrice("");
        setMaxPrice("");
        setCondition("");
        setType("");
        setFaculty("");
        setDepartment("");
        setSort("newest");
        setPage(1);
    };

    const totalPages = Math.ceil(listings.length / itemsPerPage);

    const displayedListings = listings.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    return (
        <div className="browse-page">
            <div className="browse-header">
                <h1>Browse Products</h1>
                <p>
                    Discover and find what you need from your university community.
                </p>
            </div>

            {/* Search */}
            <form className="browse-search" onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search for books, calculators, notes..."
                    value={searchInput}
                    onChange={(event) => setSearchInput(event.target.value)}
                />
                <button type="submit">Search</button>
            </form>

            <div className="browse-content">
                {/* Filters */}
                <aside className="browse-filters">
                    <div className="browse-filter-heading">
                        <h2>Filters</h2>
                        <button type="button" onClick={clearFilters}>
                            Clear all
                        </button>
                    </div>

                    <div className="browse-filter-group">
                        <label htmlFor="category">Category</label>
                        <select
                            id="category"
                            value={selectedCategory}
                            onChange={(event) =>
                                setSelectedCategory(event.target.value)
                            }
                        >
                            <option value="">All Categories</option>
                            {categories.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="browse-filter-group">
                        <label htmlFor="minPrice">Minimum Price (EGP)</label>
                        <input
                            id="minPrice"
                            type="number"
                            min="0"
                            placeholder="Min price"
                            value={minPrice}
                            onChange={(event) => setMinPrice(event.target.value)}
                        />
                    </div>

                    <div className="browse-filter-group">
                        <label htmlFor="maxPrice">Maximum Price (EGP)</label>
                        <input
                            id="maxPrice"
                            type="number"
                            min="0"
                            placeholder="Max price"
                            value={maxPrice}
                            onChange={(event) => setMaxPrice(event.target.value)}
                        />
                    </div>

                    <div className="browse-filter-group">
                        <label htmlFor="condition">Condition</label>
                        <select
                            id="condition"
                            value={condition}
                            onChange={(event) => setCondition(event.target.value)}
                        >
                            <option value="">All Conditions</option>
                            <option value="new">New</option>
                            <option value="like_new">Like New</option>
                            <option value="used">Used</option>
                            <option value="very_good">Very Good</option>
                            <option value="good">Good</option>
                            <option value="acceptable">Acceptable</option>
                        </select>
                    </div>

                    <div className="browse-filter-group">
                        <label htmlFor="type">Listing Type</label>
                        <select
                            id="type"
                            value={type}
                            onChange={(event) => setType(event.target.value)}
                        >
                            <option value="">All Types</option>
                            <option value="sell">For Sale</option>
                            <option value="exchange">Exchange</option>
                            <option value="both">Sale or Exchange</option>
                        </select>
                    </div>

                    <div className="browse-filter-group">
                        <label htmlFor="faculty">Faculty</label>
                        <input
                            id="faculty"
                            type="text"
                            placeholder="Enter faculty"
                            value={faculty}
                            onChange={(event) => setFaculty(event.target.value)}
                        />
                    </div>

                    <div className="browse-filter-group">
                        <label htmlFor="department">Department</label>
                        <input
                            id="department"
                            type="text"
                            placeholder="Enter department"
                            value={department}
                            onChange={(event) => setDepartment(event.target.value)}
                        />
                    </div>
                </aside>

                {/* Products */}
                <section className="browse-products">
                    <div className="browse-products-header">
                        <div>
                            <h2>All Products</h2>
                            <span>{listings.length} products</span>
                        </div>

                        <div className="browse-sort">
                            <label htmlFor="sort">Sort by:</label>
                            <select
                                id="sort"
                                value={sort}
                                onChange={(event) => setSort(event.target.value)}
                            >
                                <option value="newest">Newest</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                            </select>
                        </div>
                    </div>

                    {loading ? (
                        <p>Loading products...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : listings.length === 0 ? (
                        <p>No products found.</p>
                    ) : (
                        <>
                            <div className="browse-products-grid">
                                {displayedListings.map((listing) => {
                                    const backendImage = listing.images?.[0];

                                    const productImage =
                                        backendImage &&
                                        !backendImage.includes("example.com")
                                            ? backendImage
                                            : getFallbackImage(listing.title);

                                    return (
                                        <ProductCard
                                            key={listing._id}
                                            product={{
                                                listingId: listing._id,
                                                name: listing.title,
                                                price: `${listing.price} EGP`,
                                                condition: formatLabel(listing.condition),
                                                image: productImage,
                                                faculty: listing.faculty || "Not specified",
                                                type:
                                                    listing.type === "sell"
                                                        ? "For Sale"
                                                        : listing.type === "exchange"
                                                        ? "Exchange"
                                                        : "Sale or Exchange",
                                                time: "Recently",
                                                match: false,
                                            }}
                                        />
                                    );
                                })}
                            </div>

                            {totalPages > 1 && (
                                <div className="browse-pagination">
                                    <button
                                        type="button"
                                        disabled={page === 1}
                                        onClick={() =>
                                            setPage((current) => current - 1)
                                        }
                                    >
                                        Previous
                                    </button>

                                    <span>
                                        Page {page} of {totalPages}
                                    </span>

                                    <button
                                        type="button"
                                        disabled={page === totalPages}
                                        onClick={() =>
                                            setPage((current) => current + 1)
                                        }
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </section>
            </div>
        </div>
    );
}

export default Browse;

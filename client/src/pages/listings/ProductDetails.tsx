import React, { useEffect, useState } from "react";
import "./ProductDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import {
  dListing,
  rListing,
  rUserListing,
  sListing,
  rCategoryListings,
} from "../../services/listings.api";
import ProductCard from "../../components/marketplace/ProductCard";

const ProductDetails = () => {
  const [actImg, setActImg] = useState(0);
  const imgURL = "http://localhost:5000";
  const [list, setList] = useState<any>(null);
  const [lists, setLists] = useState<any[]>([]);
  const [similarItems, setSimilarItems] = useState<any[]>([]);
  const { id } = useParams<{ id: string }>();
  const nav = useNavigate();
  const [isMarkingSold, setIsMarkingSold] = useState(false);

  const handleDelete = async () => {
    if (!id || !window.confirm("Are you sure you want to delete this listing?"))
      return;
    try {
      await dListing(id);
      nav("/");
    } catch (error) {
      console.error("Failed to delete listing:", error);
    }
  };

  const markSold = async () => {
    if (!id || isMarkingSold) return;
    try {
      setIsMarkingSold(true);
      const updatedListing = await sListing(id);
      if (updatedListing) {
        setList((prev: any) => ({ ...prev, ...updatedListing }));
      }
    } catch (error) {
      console.error("Failed to mark as sold:", error);
    } finally {
      setIsMarkingSold(false);
    }
  };

  useEffect(() => {
    const rOneListing = async () => {
      if (!id) return;
      try {
        const listing = await rListing(id);
        setList(listing);
        setActImg(0);

        const sellerId = listing?.seller?._id;
        if (sellerId) {
          try {
            const uLists = await rUserListing(sellerId);
            setLists(uLists.listings);
          } catch (err) {
            console.error("Failed to fetch seller listings", err);
          }
        }

        const categoryId = listing?.category?._id || listing?.category;
        if (categoryId) {
          try {
            const catData = await rCategoryListings(categoryId);
            const allCatItems = Array.isArray(catData)
              ? catData
              : catData?.listings || [];
            const filtered = allCatItems.filter(
              (item: any) =>
                item._id !== listing._id &&
                (item.category?._id === categoryId ||
                  item.category === categoryId),
            );
            setSimilarItems(filtered.slice(0, 4));
          } catch (err) {
            console.error("Failed to fetch similar items", err);
          }
        }
      } catch (err) {
        console.error("Failed to fetch product details");
      }
    };
    rOneListing();
  }, [id]);

  if (!list) {
    return <div className="product-container">Product not found.</div>;
  }

  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .trim()
      .split(" ")
      .map((word) => word[0].toUpperCase())
      .join("");
  };

  const imgs = list?.images?.map((img: string) => `${imgURL}${img}`) || [];
  const isSold = list.status === "sold" || list.isSold;

  return (
    <div className="product-page-wrapper">
      <div className="product-container">
        <div className="product-left">
          <div className="main-image-wrapper">
            <img src={imgs[actImg]} alt={list.title} className="main-image" />
          </div>
          <div className="thumbnails-wrapper">
            {imgs.length > 0 &&
              imgs.map((img: string, idx: number) => (
                <img
                  key={idx}
                  src={img}
                  alt={`thumb ${idx}`}
                  className={`thumbnail ${actImg === idx ? "active" : ""}`}
                  onClick={() => setActImg(idx)}
                />
              ))}
          </div>
          <div className="description-section">
            <h3>Description</h3>
            <p>{list.description}</p>
          </div>
        </div>
        <div className="product-right">
          <div className="tags-wrapper">
            <span className="tag tag-new">{list.condition}</span>
            {isSold ? (
              <span className="tag tag-sold">Sold</span>
            ) : (
              <span className="tag tag-pending">{list.approvalStatus}</span>
            )}
          </div>
          <h1 className="product-title">{list.title}</h1>
          <h2 className="product-price">{list.price} EGP</h2>
          <div className="details-grid">
            <div className="detail-card glass-card">
              <span className="detail-label">Category</span>
              <span className="detail-value">{list.category?.name}</span>
            </div>
            <div className="detail-card glass-card">
              <span className="detail-label">Brand</span>
              <span className="detail-value">{list.brand}</span>
            </div>
            <div className="detail-card glass-card">
              <span className="detail-label">Preferred Contact</span>
              <span className="detail-value">{list.pContact}</span>
            </div>
            <div className="detail-card glass-card">
              <span className="detail-label">Preferred Spot</span>
              <span className="detail-value">{list.pSpot}</span>
            </div>

            <div
              className={`detail-card glass-card ${
                list.type === "both" || list.type === "exchange"
                  ? ""
                  : "full-width"
              }`}
            >
              <span className="detail-label">Posted</span>
              <span className="detail-value">
                {new Date(list.createdAt)
                  .toLocaleString("en-GB", {
                    day: "numeric",
                    month: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })
                  .replace(/\//g, "-")
                  .replace(",", "")}
              </span>
            </div>

            {(list.type === "both" || list.type === "exchange") && (
              <div className="detail-card glass-card">
                <span className="detail-label">Exchange With</span>
                <span className="detail-value">{list.exWith || "—"}</span>
              </div>
            )}
          </div>
          <div className="action-buttons">
            <button
              className="btn btn-outline"
              onClick={() => nav(`/edit-item/${list._id}`)}
            >
              Edit
            </button>
            <button
              className="btn btn-outline"
              onClick={markSold}
              disabled={isMarkingSold || isSold}
            >
              <span>♡</span>{" "}
              {isSold
                ? "Sold"
                : isMarkingSold
                  ? "Updating..."
                  : "Mark as sold"}
            </button>
            <button className="btn btn-danger" onClick={handleDelete}>
              <span>🗑</span> Delete listing
            </button>
          </div>
          <div className="safety-banner">
            Never pay online. Meet on campus in a public spot and check the item
            first.
          </div>
          <div className="seller-section glass-card">
            <h3 className="section-title">Seller</h3>
            <div className="seller-info">
              <div className="seller-avatar">
                {getInitials(list.seller?.name)}
              </div>
              <div className="seller-details">
                <h4>{list.seller?.name}</h4>
                <p>{list.seller?.faculty}</p>
                <div className="seller-rating">
                  ⭐0 <span>(0)</span>
                </div>
              </div>
            </div>
            <hr className="divider" />
            <h3 className="section-title">Other items from this seller</h3>
            {lists && lists.length > 0 ? (
              lists
                .filter((l: any) => l._id !== list?._id)
                .slice(0, 3)
                .map((l: any) => (
                  <div
                    className="other-item"
                    key={l._id}
                    onClick={() => nav(`/product/${l._id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <img src={`${imgURL}${l.images[0]}`} alt={l.title} />
                    <div className="other-item-details">
                      <p className="item-name">{l.title}</p>
                      <p className="item-price">{l.price} EGP</p>
                    </div>
                  </div>
                ))
            ) : (
              <p className="no-items-text">No other items from this seller.</p>
            )}
          </div>
        </div>
      </div>

      {similarItems.length > 0 && (
        <div className="similar-items-section">
          <h2 className="similar-title">Similar items</h2>
          <div className="similar-grid">
            {similarItems.map((item: any) => (
              <div
                key={item._id}
                onClick={() => nav(`/product/${item._id}`)}
                style={{ cursor: "pointer" }}
              >
                <ProductCard
                  product={{
                    name: item.title,
                    price: `${item.price} EGP`,
                    condition: item.condition,
                    image: item.images?.[0]
                      ? `${imgURL}${item.images[0]}`
                      : undefined,
                    faculty: item.seller?.faculty || item.pSpot || "Campus",
                    type:
                      item.type === "sell"
                        ? "For sale"
                        : item.type === "both"
                          ? "Sale or exchange"
                          : "Exchange",
                    time: new Date(item.createdAt).toLocaleDateString("en-GB"),
                    match: false,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
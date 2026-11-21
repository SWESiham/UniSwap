import React, { useEffect, useState } from "react";
import "./ProductDetails.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  dListing,
  rListing,
  rUserListing,
  sListing,
} from "../../services/listings.api";

const ProductDetails = () => {
  //   const loc = useLocation();
  //   const list = loc.state?.listing;
  //   console.log("prod list", list);
  const [actImg, setActImg] = useState(0);
  const imgURL = "http://localhost:5000";
  const [list, setList] = useState<any>(null);
  const [lists, setLists] = useState<any[]>([]);
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
        setList(updatedListing);
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
        console.log(listing);
        setList(listing);
        const sellerId = listing?.seller?._id;
        console.log("seeller", sellerId);
        if (sellerId) {
          try {
            const uLists = await rUserListing(sellerId);
            setLists(uLists.listings);
            console.log("uListssss", lists);
            console.log("uListssss", uLists);
          } catch (err) {
            console.error("Failed to fetch seller listings", err);
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
  console.log("imgsssss", imgs);
  console.log(imgs.length);
  return (
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
          {/* <span className="tag tag-new">{list.type}</span> */}
          <span className="tag tag-new">{list.condition}</span>
          <span className="tag tag-pending">{list.approvalStatus}</span>
          
        </div>
        <h1 className="product-title">{list.title}</h1>
        <h2 className="product-price">{list.price} EGP</h2>
        <div className="details-grid">
          <div className="detail-card glass-card">
            <span className="detail-label">Category</span>
            <span className="detail-value">{list.category.name}</span>
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
            disabled={isMarkingSold || list.status === "sold" || list.isSold}
          >
            <span>♡</span>{" "}
            {list.status === "sold" || list.isSold
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
            <div className="seller-avatar">{getInitials(list.seller.name)}</div>
            <div className="seller-details">
              <h4>{list.seller.name}</h4>
              <p>{list.seller.faculty}</p>
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
                // onClick={nav(`/product/${l._id}`)}
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
          {/* <hr className="divider" />
          <div className="seller-review">
            <div className="review-stars">⭐⭐⭐⭐⭐</div>
            <p className="review-text">Easy to deal with and very polite.</p>
            <span className="review-date">2 weeks ago</span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

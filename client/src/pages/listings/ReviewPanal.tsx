import { Heart } from "lucide-react";
import React, { useState } from "react";
import "./ReviewPanal.css";

type props = {
  data: any;
  onBack: () => void;
  onPublish:()=> void;
};

export const ReviewPanal = ({ data, onBack,onPublish }: props) => {
  console.log(data);
  const [meetSpot, setMeetSpot] = useState("");
  const [saleType, setSaleType] = useState<"for_sale" | "exchange" | "both">(
    "for_sale",
  );
  const imgURL = data?.images?.[0]
    ? "http://localhost:5000" + data.images[0]
    : "";

  return (
    <div className="details-card">
      <form className="form-grid">
        <div className="form-group">
          <label>Sale or exchange</label>
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                name="saleType"
                value="for_sale"
                checked={saleType === "for_sale"}
                onChange={() => setSaleType("for_sale")}
              />
              For sale
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="saleType"
                value="exchange"
                checked={saleType === "exchange"}
                onChange={() => setSaleType("exchange")}
              />
              Exchange
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="saleType"
                value="both"
                checked={saleType === "both"}
                onChange={() => setSaleType("both")}
              />
              Sale or exchange
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>Preferred contact</label>
          <div className="radio-group">
            <label className="radio-label">
              <input type="radio" name="preferredContact" value="chat" />
              In-app chat
            </label>
            <label className="radio-label">
              <input type="radio" name="preferredContact" value="phone" />
              Phone
            </label>
            <label className="radio-label">
              <input type="radio" name="preferredContact" value="whatsapp" />
              WhatsApp
            </label>
          </div>
        </div>

        {(saleType === "exchange" || saleType === "both") && (
          <div className="form-group">
            <label>What do you want in return?</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. a Calculus textbook or a lab coat"
            />
          </div>
        )}

        <div className="form-group">
          <label>Preferred meeting spot</label>
          <input
            type="text"
            value={meetSpot}
            className="form-input"
            placeholder="e.g. Engineering library entrance"
            onChange={(e) => setMeetSpot(e.target.value)}
          />
        </div>
      </form>

      <div className="preview-section">
        <h3>Live preview</h3>
        <div className="preview-card">
          <div className="image-wrapper">
            {imgURL ? (
              <img src={imgURL} alt={data.title} />
            ) : (
              <img
                src="https://www.discountflooringsupplies.com.au/hard-surface/"
                alt={data.title}
              />
            )}
            <span className="condition-badge">{data.condition}</span>

            {saleType === "exchange" && <span className="tag-badge">Exchange</span>}
            {saleType === "both" && (
              <span className="tag-badge">Sale or exchange</span>
            )}

            <button
              type="button"
              className="favorite-btn"
              aria-label="Favorite"
            >
              <Heart size={20} />
            </button>
          </div>
          <div className="card-details">
            <h4 className="item-title">{data.title}</h4>
            <div className="item-price">{data.price} EGP</div>
            <div className="item-footer">
              <span className="location">📍 {meetSpot}</span>
              <span className="time-ago">now</span>
            </div>
          </div>
        </div>
      </div>

      <div className="form-footer">
        <button type="button" className="back-btn" onClick={onBack}>
          Back
        </button>
        <button type="submit" className="publish-btn" onClick={onPublish}>
          Publish listing
        </button>
      </div>
    </div>
  );
};
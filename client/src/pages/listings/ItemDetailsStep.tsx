import React, { useEffect, useState } from "react";
import { api } from "../../services/api";
import "./ItemDetailsStep.css";
import { useParams } from "react-router-dom";
import { rListing } from "../../services/listings.api";

type Props = {
  initData: any;
  lang: "ar" | "en";
  onNext: (formData: any) => void;
  onBack: () => void;
  onRegenrateLang: (lang: "ar" | "en") => void;
};
export const ItemDetailsStep = ({
  lang,
  initData,
  onNext,
  onBack,
  onRegenrateLang,
}: Props) => {
  const [title, setTitle] = useState(initData?.title || "");
  const [category, setCategory] = useState(initData?.categoryId || "");
  const [brand, setBrand] = useState(initData?.brand || "");
  const [condition, setCondition] = useState(initData?.condition || "Like New");
  const [description, setDescription] = useState(initData?.description || "");
  const [price, setPrice] = useState(initData?.price || "");
  const [categories, setCategories] = useState<any[]>([]);
  const [catsLoading, setCatsLoading] = useState(false);
  const { id } = useParams();
  const isEditMode = Boolean(id);
  useEffect(() => {
    const fetchCats = async () => {
      try {
        setCatsLoading(true);
        const cats = await api.get("api/categories");
        setCategories(cats.data);
        console.log(cats.data);
      } catch (err) {
        console.error("Failed to load categories:", err);
      } finally {
        setCatsLoading(false);
      }
    };
    fetchCats();
  }, []);

  const handleNext = () => {
    onNext({
      title,
      category,
      brand,
      condition,
      description,
      price: Number(price),
    });
  };

  useEffect(() => {
    if (!initData) return;
    setTitle(initData.title || "");
    setCategory(
      initData.categoryId || initData.category?._id || initData.category || "",
    );
    setBrand(initData.brand || "");
    setCondition(formatCondition(initData.condition));
    setDescription(initData.description || "");
    setPrice(initData.price ?? "");
  }, [initData]);
  return (
    <>
      <div className="details-card">
        {!isEditMode && (
          <div className="ai-banner">
            <div className="ai-message">
              <span className="check-icon">✓</span>
              <span>We filled in what we found. Edit anything you like.</span>
            </div>
            <button
              type="button"
              className="regenrate-btn"
              onClick={() => onRegenrateLang(lang === "en" ? "ar" : "en")}
            >
              <i className="fa-solid fa-rotate"></i>
              Regenerate in {lang === "en" ? "Arabic" : "English"}
            </button>
          </div>
        )}
        <div className="form-group">
          <label>
            Title
            <span className="ai-badge">✨AI-generated</span>
          </label>
          <input
            type="text"
            value={title}
            dir="auto"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>
              Category
              <span className="ai-badge">✨AI-generated</span>
            </label>

            <div className="select-wrapper">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="" disabled>
                  Select category
                </option>
                {categories.map((cat) => (
                  <option value={cat._id} key={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <span className="select-arrow">⌄</span>
            </div>
          </div>
          <div className="form-group">
            <label>
              Brand
              <span className="ai-badge">✨AI-generated</span>
            </label>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group condition-group">
            <label>
              Condition
              <span className="ai-badge">✨AI-generated</span>
            </label>

            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  name="condition"
                  value="New"
                  checked={condition === "New"}
                  onChange={(e) => setCondition(e.target.value)}
                />
                <span className="custom-radio"></span>
                New
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="condition"
                  value="Like New"
                  checked={condition === "Like New"}
                  onChange={(e) => setCondition(e.target.value)}
                />
                <span className="custom-radio"></span>
                Like New
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="condition"
                  value="Used"
                  checked={condition === "Used"}
                  onChange={(e) => setCondition(e.target.value)}
                />
                <span className="custom-radio"></span>
                Used
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>
              Price (EGP)
              <span className="ai-badge">✨AI-generated</span>
            </label>
            <input
              type="number"
              min={0}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group description-group">
          <label>
            Description
            <span className="ai-badge">✨AI-generated</span>
          </label>
          <textarea
            value={description}
            dir="auto"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="form-footer">
          <button type="button" className="back-btn" onClick={onBack}>
            Back
          </button>
          <button type="button" className="next-btn" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </>
  );
};
const formatCondition = (val?: string) => {
  if (!val) return "Like New";
  const map: Record<string, string> = {
    new: "New",
    like_new: "Like New",
    used: "Used",
  };
  return map[val.toLowerCase()] || val;
};

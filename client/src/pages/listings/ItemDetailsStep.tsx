import React, { useEffect, useState } from "react";
import api from "../../services/api";
import "./ItemDetailsStep.css";

//TODO Generate in arabic and english
//TODO check the ai analyze; it just read one image -- Be attention of it #

type Props = {
  initData: any;
  onNext: (formData: any) => void;
  onBack: () => void;
  onRegenrateLang: () => void;
};
export const ItemDetailsStep = ({
  initData,
  onNext,
  onBack,
  onRegenrateLang,
}: Props) => {
  const [title, setTitle] = useState(initData?.title || "");
  const [category, setCategory] = useState(initData?.category || "");
  const [brand, setBrand] = useState(initData?.brand || "");
  const [condition, setCondition] = useState(initData?.condition || "Like New");
  const [description, setDescription] = useState(initData?.description || "");
  const [categories, setCategories] = useState<any[]>([]);
  const [catsLoading, setCatsLoading] = useState(false);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        setCatsLoading(true);
        const cats = await api.get("/categories");
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
        });
    };
  return (
    <>
      <div className="details-card">
        <div className="ai-banner">
          <div className="ai-message">
            <span className="check-icon">✓</span>
            <span>We filled in what we found. Edit anything you like.</span>
          </div>
          <button
            type="button"
            className="regenrate-btn"
            onClick={onRegenrateLang}
          >
            <span className="regenerate-icon">⟳</span>
            Regenerate in Arabic
          </button>
        </div>
        <div className="form-group">
          <label>
            Title
            <span className="ai-badge">✨AI-generated</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="from-row">
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
            <input type="text" value={brand} onChange={(e) => e.target.value} />
          </div>

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

          <div className="form-group description-group">
            <label>
              Descrption
              <span className="ai-badge">✨AI-generated</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
                  </div>
                  
                  <div className="form-footer">
                      <button type="button" className="back-btn" onClick={onBack}>Back</button>
                      <button type="button" className="next-btn" onClick={handleNext}>Next</button>
                    
                  </div>
        </div>
      </div>
    </>
  );
};

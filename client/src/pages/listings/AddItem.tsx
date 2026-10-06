import React, { useState } from "react";
import { analyzeImages } from "../../services/ai.api";
import "./AddItem.css";
import { AIAnalysisPanel } from "./AIAnalysisPanel";
import { ItemDetailsStep } from "./ItemDetailsStep";

export const AddItem = () => {
  const [step, setStep] = useState(1);
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState("");
  const [result, setResult] = useState<any>(null);
  const [isDragging, setIsDragging] = useState(false);
  const processFiles = async (list: File[]) => {
    if (list.length > 6) {
      setError("Max 6 photos");
      return;
    }
    const allowed = ["image/png", "image/jpeg"];
    const valid = list.filter((f) => allowed.includes(f.type));
    if (valid.length !== list.length) {
      setError("Only JPG or PNG allowed");
      return;
    }
    setError("");
    setFiles(list);
  };
  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = Array.from(e.target.files ?? []);
    processFiles(list);
  };

  const remove = async (img: File) => {
    setFiles((prev) => prev.filter((f) => f !== img));
  };
  const makeMeCover = async (img: File) => {
    setFiles((prev) => {
      const restImg = prev.filter((f) => f !== img);
      return [img, ...restImg];
    });
  };

  const clearAll = async () => {
    return setFiles([]);
  };

  const handleScan = async () => {
    setStep(2);
    setError("");
    try {
      const data = await analyzeImages(files, "en");
      setResult(data);
      setStep(3);
    } catch {
      setError("Scan failed,try again");
      setStep(1);
    }
  };

  return (
    <div className="add-item-page">
      <div className="panals">
        <div className="panal-1">
          <div className="card">
            {error && <p className="error">{error}</p>}
            <h2 id="add-item">Add a new item</h2>
            <p id="para-add-item">Photos first — our AI writes the rest</p>
            <div className="progress">
              <div
                className={`steps ${step === 1 ? "active" : step > 1 ? "done" : ""}`}
              >
                {step > 1 ? (
                  <p>
                    <i className="fa-solid fa-check"></i>
                  </p>
                ) : (
                  <p>1</p>
                )}
                Photos
              </div>
              <hr className={step >1 ? "done":""}/>
              <div
                className={`steps ${step === 2 ? "active" : step > 2 ? "done" : ""}`}
              >
                {step > 2 ? (
                  <p>
                    <i className="fa-solid fa-check"></i>
                  </p>
                ) : (
                  <p>2</p>
                )}
                AI analysis
              </div>
              <hr className={step >2 ? "done":""}/>
              <div
                className={`steps ${step === 3 ? "active" : step > 3 ? "done" : ""}`}
              >
                {step > 3 ? (
                  <p>
                    <i className="fa-solid fa-check"></i>
                  </p>
                ) : (
                  <p>3</p>
                )}
                Details
              </div>
              <hr className={step >3 ? "done":""}/>
              <div
                className={`steps ${step === 4 ? "active" : step > 4 ? "done" : ""}`}
              >
                {step > 4 ? (
                  <p>
                    <i className="fa-solid fa-check"></i>
                  </p>
                ) : (
                  <p>4</p>
                )}
                Review
              </div>
            </div>
            {step === 1 && (
              <>
                <label
                  className={`dropzone ${isDragging ? "dragging" : ""}`}
                  onDragEnter={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragOver={(e) => e.preventDefault()}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    const list = Array.from(e.dataTransfer.files);
                    processFiles(list);
                  }}
                >
                  <img
                    className="img-icon"
                    width="35"
                    height="35"
                    src="/icons8-image-plus-24.ico"
                  />
                  <input
                    type="file"
                    multiple
                    accept="image/png,image/jpeg"
                    onChange={handleFiles}
                    hidden
                  />
                  <strong>Drag photos here or click to browse</strong>
                  <span>Up to 6 photos, JPG or PNG</span>
                </label>
                <div className="previews">
                  {files.map((f, index) => (
                    <div className="thumb" key={f.name}>
                      <img src={URL.createObjectURL(f)} alt={f.name} />
                      {index === 0 && (
                        <span className="badge badge-cover">Cover</span>
                      )}
                      {index > 0 && (
                        <span
                          className="badge badge-action"
                          onClick={() => makeMeCover(f)}
                        >
                          Make cover
                        </span>
                      )}

                      <button
                        className="remove"
                        title={`Remove ${f.name}`}
                        onClick={() => remove(f)}
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>

                <div className="actions">
                  <button
                    className="btn-primary"
                    disabled={files.length === 0}
                    onClick={handleScan}
                  >
                    Analyze with AI
                  </button>
                </div>
              </>
            )}
          </div>
          {files.length > 0 && step === 1 && (
            <button className="clear-all" onClick={clearAll}>
              <i className="fa-regular fa-trash-can"></i>
              Clear all
            </button>
          )}
        </div>
        <div className="panel-2">
          {step === 2 && <AIAnalysisPanel files={files}/>}
        </div>
        <div className="panel-3">
          {step === 3 && <ItemDetailsStep initData={result} onNext={() => setStep(4)} onBack={() => setStep(1)} onRegenrateLang={ (lang)=> 'ar'} />}
        </div>
      </div>
    </div>
  );
};

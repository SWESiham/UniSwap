import React from "react";
import "./AIAnalysisPanel.css";

type Props = { files: File[] };
export const AIAnalysisPanel = ({ files }: Props) => {
  return (
    <div className="analyzing">
      <img src={URL.createObjectURL(files[0])} alt="" />
      <strong>
        <i className="fa-solid fa-wand-magic-sparkles"></i>
        AI is analyzing your image...
      </strong>
      <span>Detecting product,brand and condition</span>
    </div>
  );
};

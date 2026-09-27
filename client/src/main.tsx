import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./locales/i18n"; // sets up i18next (AR/EN)

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

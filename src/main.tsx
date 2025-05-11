import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

// Import and initialize Tempo Devtools only in development mode
import { TempoDevtools } from "tempo-devtools";
if (import.meta.env.DEV || import.meta.env.VITE_TEMPO === "true") {
  TempoDevtools.init();
}

const basename = import.meta.env.BASE_URL;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename={basename}>
    <App />
  </BrowserRouter>,
);

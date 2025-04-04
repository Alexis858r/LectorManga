import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom"; // Importación corregida
import CssBaseline from "@mui/material/CssBaseline";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CssBaseline />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
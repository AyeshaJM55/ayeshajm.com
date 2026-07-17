import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@tpl/ui";
import { App } from "./App";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultScheme="dark" defaultBrand="amber">
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);

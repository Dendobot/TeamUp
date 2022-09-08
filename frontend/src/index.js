import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import "./styleSheet.css";

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
    <App />
);

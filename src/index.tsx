import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app/view/pages/App/App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

const container: HTMLElement | null = document.getElementById("root");
const root = ReactDOM.createRoot(container || new HTMLElement());
root.render(
  <div>
    <BrowserRouter>
      <p>Test if works</p>
      <App />
    </BrowserRouter>
  </div>
);
const y = document.getElementById("root");
console.log(y);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app/view/pages/App/App";
import "./assets/scss/index.scss";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const container: HTMLElement | null = document.getElementById("root");
const root = ReactDOM.createRoot(container || new HTMLElement());
root.render(
  <div>
    <BrowserRouter>
      <div className="thumbnail">
        <img src="./thumbnail.png" alt="" />
      </div>
      <App />
    </BrowserRouter>
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

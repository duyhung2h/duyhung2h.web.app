import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./assets/scss/index.scss";
import App from "./app/view/pages/App/App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

const ThemeSelector = (modulePath: any)  => {
  var newLocal = "./assets/scss/test.scss";
  console.log(modulePath.modulePath);
  const LightTheme = React.lazy(() => import(`./assets/scss/${"test.scss"}`));
  // const CHOSEN_THEME =
  // localStorage.getItem("TYPE_OF_THEME") || TYPE_OF_THEME.DEFAULT;
  return (
    <>
      <React.Suspense fallback={<>Loading...</>}>
        {true && <p></p>}
        <p>hello</p>
      </React.Suspense>
    </>
  );
};

const container: HTMLElement | null = document.getElementById("root");
const root = ReactDOM.createRoot(container || new HTMLElement());
root.render(
  <div>
    <BrowserRouter>
      <p>Test if works</p>
      <App />
    </BrowserRouter>
    <ThemeSelector modulePath="test.scss"></ThemeSelector>
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

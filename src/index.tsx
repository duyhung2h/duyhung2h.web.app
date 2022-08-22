import React from "react";
import ReactDOM from "react-dom/client";
import { renderToString } from "react-dom/server";
import App from "./app/view/pages/App/App";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "./assets/scss/index.scss";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Favicon from "react-favicon";
import { renderToNodeStream } from 'react-dom/server';
// import { getDataFromTree } from 'react-apollo';
// const app = express();  

export { default as React } from "react";

const container: HTMLElement | null = document.getElementById("root");
const root = ReactDOM.createRoot(container || new HTMLElement());
root.render(
  <div>
    <HelmetProvider>
      <Helmet>
        {/* metadata */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="This is my haven, where I can express myself, post my online tutorials and information about my Youtube channel."
        />
        <meta
          name="robots"
          content="Age of Empires 2 aoe2 personal website duyhung2h nguyễn duy hưng duyhung duy hung"
        />
        <meta property="og:url" content="duyhung2h.web.app" />
        <meta property="og:site_name" content="duyhung2h's personal website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="article" />
        <meta property="fb:app_id" content="ID_APP_FACEBOOK" />
        <script
          src="https://kit.fontawesome.com/fa32aa4cba.js"
          crossOrigin="anonymous"
        ></script>
        <title>duyhung2h's personal website</title>
      </Helmet>
    </HelmetProvider>
      <div className="thumbnail">
        <img src="./thumbnail.png" alt="" />
      </div>
      <App />
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();



const helmetContext = {};
const app = (
  <HelmetProvider context={helmetContext}>
    <App/>
      <Helmet>
        <title>Hello World</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <h1>Hello World</h1>
  </HelmetProvider>
);

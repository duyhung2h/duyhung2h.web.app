import getExampleList from "../../db/example.service";
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "../../../assets/scss/ExampleComponent.scss";
import LikeButton from "../small_components/LikeButton";
import { limitTextLength } from "../../logic_handler/TextHandler";
import "../../logic_handler/ListHandler";
import { sortList } from "../../logic_handler/ListHandler";

const overlay_root = ReactDOM.createRoot(
  document.getElementById("overlay-root") || new HTMLElement()
);
function GetExamplePage(props: any): JSX.Element {
  const getISFilter = () => {
    const value = "exampleTitle";
    return value;
  };
  const getISFilterAsc = () => {
    const value = "asc";
    return value;
  };
  const [allValues, setAllValues] = useState({
    selectorValue: getISFilter(),
    selectorValueAsc: getISFilterAsc(),
    examplePageC: getExampleListContent(),
  });

  // create JSX for each example component
  function GetExampleComponent(props: any) {
    const exampleObject = props.exampleObject;
    const [exampleTitle, setTitle] = useState(exampleObject.exampleTitle);
    // handle for clicking an example item -> show a popup example article
    const examplePageHandler = () => {
      setTitle(exampleTitle + "1");
      console.log(exampleTitle);
    };
    return (
      <div>
        <div onClick={examplePageHandler}>
          <img
            src={require("../../../assets/images/example1.png")}
            alt="example"
            className="width-100"
          />
          <h3>{exampleTitle}</h3>
          <p className="example__short-desc">
            {limitTextLength(exampleObject.exampleShortDesc, 40)}
          </p>
        </div>
        <LikeButton likeCount={exampleObject.exampleLikeCount} />
      </div>
    );
  }

  // from example list turn each example item into JSX
  function getExampleListContent(filter?: string, asc: string = "asc") {
    let listExample = getExampleList();
    switch (filter) {
      case "exampleTitle":
        sortList(listExample, filter, asc);
        // code block
        break;
      case "stars":
        // code block
        break;
      case "date":
        // code block
        break;
      default:
      // code block
    }
    const examplePageContent = listExample.map((element) => {
      return (
        <div className="w3-quarter" key={element.exampleId}>
          <GetExampleComponent exampleObject={element} />
        </div>
      );
    });

    return examplePageContent;
  }
  // handle add new example button event listener
  const addExampleButtonHandler = () => {
    console.log("clicked");
    overlay_root.render(<div className="w3-quarter"></div>);
  };
  // filter options
  function MySelect() {

    function handleSelectorChange(e: any) {
      // set list page value to useState
      setAllValues({
        examplePageC: getExampleListContent(e.target.value, allValues.selectorValueAsc),
        selectorValue: e.target.value,
        selectorValueAsc: allValues.selectorValueAsc,
      });
    }
    function handleSelectorChangeAsc(e: any) {
      // set list page value to useState
      setAllValues({
        examplePageC: getExampleListContent(allValues.selectorValue, e.target.value),
        selectorValue: allValues.selectorValue,
        selectorValueAsc: e.target.value,
      });
    }
    return (
      <div>
        <select
          title="yes"
          onChange={handleSelectorChange}
          value={allValues.selectorValue}
          defaultValue="exampleTitle"
        >
          <option value="exampleTitle">Name</option>
          <option value="stars">Stars</option>
          <option value="date">Date</option>
        </select>
        <select
          title="yes"
          onChange={handleSelectorChangeAsc}
          value={allValues.selectorValueAsc}
          defaultValue="asc"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    );
  }

  // FINAL: compile all components into an example page
  const examplePage = (
    <div>
      <button
        onClick={() => addExampleButtonHandler()}
        className="round__add-button"
      >
        +
      </button>

      {/* filter options */}
      <MySelect />

      <div className="w3-main w3-content w3-padding row container__example-page">
        {allValues.examplePageC}
      </div>
      <div className="w3-center w3-padding-32 width-100">
        <div className="w3-bar">
          <a href="/#" className="w3-bar-item w3-button w3-hover-black">
            «
          </a>
          <a href="/#" className="w3-bar-item w3-black w3-button">
            1
          </a>
          <a href="/#" className="w3-bar-item w3-button w3-hover-black">
            2
          </a>
          <a href="/#" className="w3-bar-item w3-button w3-hover-black">
            »
          </a>
        </div>
      </div>
    </div>
  );
  return examplePage;
}

export default GetExamplePage;

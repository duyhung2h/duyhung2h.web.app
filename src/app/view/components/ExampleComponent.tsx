import getExampleList from "../../db/example.service";
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "../../../assets/scss/ExampleComponent.scss";
import LikeButton from "../small_components/LikeButton";

const overlay_root = ReactDOM.createRoot(
  document.getElementById("overlay-root") || new HTMLElement()
);
function GetExamplePage(props: any): JSX.Element {
  // create JSX for each example component
  function GetExampleComponent(props: any) {
    const exampleObject = props.exampleObject;
    console.log(props.exampleObject);
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
            {exampleObject.exampleShortDesc}
          </p>
        </div>
        <LikeButton likeCount={exampleObject.exampleLikeCount} />
      </div>
    );
  }
  console.log(props);
  // from example list turn each example item into JSX
  function getExampleListContent(filter?: string, asc?: true) {
    const examplePageContent = getExampleList()
      .map((element) => {
        return (
          <div className="w3-quarter" key={element.exampleId}>
            <GetExampleComponent exampleObject={element} />
          </div>
        );
      })
      .reverse();

    if (filter === "name") {
      examplePageContent.reverse();
    } else {
    }

    return examplePageContent;
  }
  // handle add new example button event listener
  const addExampleButtonHandler = () => {
    console.log("clicked");
    overlay_root.render(<div className="w3-quarter"></div>);
  };
  const getISFilter = () => {
    const value = "name";
    return value;
  };

  const [examplePageC, setExamplePage] = useState(getExampleListContent());

  const [selectorValue, setSelectorValue] = useState(getISFilter);
  // filter options
  class MySelect extends React.Component {
    constructor(props: any) {
      super(props);
    }

    changeSelectorValue(e: any) {
      setSelectorValue(selectorValue);
    }

    handleSelectorChange(e: any) {
      // set selector value to useState
      setSelectorValue(selectorValue);
      console.log(e.target.value);
      // set selector value to useState
      try {
        // setExamplePage(getExampleListContent(e.target.value));
        console.log(examplePageC);
      } catch (error) {
        alert(error)
      }
    }
    render() {
      return (
        <div>
          <select title="yes" id="lang" onChange={this.handleSelectorChange}>
            <option value="name">
              Name
            </option>
            <option value="stars">
              Stars
            </option>
            <option value="date">
              Date
            </option>
          </select>
          <p></p>
          <p></p>
        </div>
      );
    }
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
      <MySelect></MySelect>

      <div className="w3-main w3-content w3-padding row container__example-page">
        {examplePageC}
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
// export { GetExampleComponent };

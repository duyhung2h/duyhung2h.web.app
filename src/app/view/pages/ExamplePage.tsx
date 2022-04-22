import getExampleList from "../../db/example.service";
import React, { ReactNode, useState } from "react";
import ReactDOM from "react-dom/client";
import "../../../assets/scss/ExampleComponent.scss";
import LikeButton from "../small_components/LikeButton";
import { limitTextLength } from "../../logic_handler/TextHandler";
import "../../logic_handler/ListHandler";
import { sortList } from "../../logic_handler/ListHandler";
import AddExampleComponent from "../components/AddExampleComponent";
import { Example } from "../../model/Example";
import ReactDOMServer from "react-dom/server";
import { map } from "rxjs";

const backdrop_root = ReactDOM.createRoot(
  document.getElementById("backdrop-root") || new HTMLElement()
);
const overlay_root = ReactDOM.createRoot(
  document.getElementById("overlay-root") || new HTMLElement()
);
function GetExamplePage(): JSX.Element {
  const getISFilter = () => {
    const value = "exampleTitle";
    return value;
  };
  const getISFilterAsc = () => {
    const value = "asc";
    return value;
  };
  const [isLoading, setIsLoading] = useState(true);

  const [allValues, setAllValues] = useState({
    selectorValue: getISFilter(),
    selectorValueAsc: getISFilterAsc(),
    examplePageC: (<div></div>),
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
  async function getExampleListContent(
    filter: string = "exampleTitle",
    asc: string = "asc"
  ) {
    let listExample: Example[] = [];
    // const listExample = async () => {
    //   console.log(await ecc.randomKey())
    // };
    let examplePageContent = {};
    listExample =
      (await getExampleList().then(() => {
        sortList(filter, asc, listExample);
        examplePageContent = listExample.map((element) => {
          return (
            <div className="w3-quarter" key={element.exampleId}>
              <GetExampleComponent exampleObject={element} />
            </div>
          );
        });
      })) || [];

    return examplePageContent;
  }
  // handle add new example button event listener
  const addExampleButtonHandler = () => {
    console.log("clicked");
    backdrop_root.render(<div className="backdrop-container"></div>);
    overlay_root.render(<AddExampleComponent></AddExampleComponent>);
  };
  function ExamplePages() {
    return <div>{ReactDOMServer.renderToString(allValues.examplePageC)}</div>;
  }
  // filter options
  function MySelect() {
    async function handleSelectorChange(e: any) {
      setIsLoading(true);
      let examListContent = await getExampleListContent(e.target.value, allValues.selectorValueAsc)
      console.log(examListContent);
      
      setIsLoading(false);
      // set list page value to useState
      // setAllValues({
      //   examplePageC: examListContent,
      //   selectorValue: e.target.value,
      //   selectorValueAsc: allValues.selectorValueAsc,
      // });
    }
    function handleSelectorChangeAsc(e: any) {
      // set list page value to useState
      // setAllValues({
      //   examplePageC: getExampleListContent(
      //     allValues.selectorValue,
      //     e.target.value
      //   ),
      //   selectorValue: allValues.selectorValue,
      //   selectorValueAsc: e.target.value,
      // });
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
          <option value="exampleLikeCount">Stars</option>
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
        <ExamplePages />
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

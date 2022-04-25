import getExampleList from "../../db/example.service";
import React, { ReactNode, useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "../../../assets/scss/ExampleComponent.scss";
import LikeButton from "../small_components/LikeButton";
import { limitTextLength } from "../../logic_handler/TextHandler";
import "../../logic_handler/ListHandler";
import AddExampleComponent from "../components/AddExampleComponent";

const backdrop_root = ReactDOM.createRoot(
  document.getElementById("backdrop-root") || new HTMLElement()
);
const overlay_root = ReactDOM.createRoot(
  document.getElementById("overlay-root") || new HTMLElement()
);
function GetExamplePage() {
  const getISFilter = () => {
    const value = "exampleTitle";
    return value;
  };
  const getISFilterAsc = () => {
    const value = "asc";
    return value;
  };
  let eList: any[] = [];
  const [exampleList, setExampleList] = useState(eList);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [allValues, setAllValues] = useState({
    selectorValue: getISFilter(),
    selectorValueAsc: getISFilterAsc(),
    examplePageC: ({}),
  });
  console.log(allValues);
  console.log(exampleList);
  /**
   * from example list turn each example item into JSX
   *
   * @function useCallback(): hook to avoid infinite loop by using useState after useEffect
   * @function fetch(): fetch data through API, first argument string to the API address, second argument for adding various options
   * @function then(): promise function to handle function after a request is finished
   */
  const getExampleListContent = useCallback(
    async (filter: string = "exampleTitle", asc: string = "asc") => {
      setIsLoading(true);
      setError(null);
      try {
        let list = await getExampleList();
        console.log(list);

        setExampleList(await getExampleList());

        let examplePageContent = list.map((element) => {
          return (
            <div className="w3-quarter" key={element.exampleId}>
              <GetExampleComponent exampleObject={element} />
            </div>
          );
        });
        console.log(examplePageContent);

        // let listExample: Example[] = [];
        // let examplePageContent = {};
        // listExample =
        //   (await getExampleList().then(() => {
        //     console.log(listExample);
        //     sortList(filter, asc, listExample);
        //     examplePageContent = listExample.map((element) => {
        //       return (
        //         <div className="w3-quarter" key={element.exampleId}>
        //           <GetExampleComponent exampleObject={element} />
        //         </div>
        //       );
        //     });
        //     console.log(examplePageContent);
        //   })) || [];
        // listExample = await getExampleList()
        setAllValues({
          examplePageC: examplePageContent,
          selectorValue: filter,
          selectorValueAsc: asc,
        });
      } catch (error: any) {
        setError(error["message"]);
      }
      setIsLoading(false);
    },
    []
  );

  // initial fetch movie on site load
  useEffect(() => {
    getExampleListContent();
  }, [getExampleListContent]);

  // create JSX for each example component
  function GetExampleComponent(props: any) {
    const exampleObject = props.exampleObject;
    const [exampleTitle, setTitle] = useState(exampleObject.exampleTitle);
    // handle for clicking an example item -> show a popup example article
    const examplePageHandler = () => {
      setTitle(exampleTitle + "1");
      console.log(exampleTitle);
    };
    console.log(exampleList);
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

  // handle add new example button event listener
  const addExampleButtonHandler = () => {
    console.log("clicked");
    backdrop_root.render(<div className="backdrop-container"></div>);
    overlay_root.render(<AddExampleComponent></AddExampleComponent>);
  };
  // filter options
  function MySelect() {
    async function handleSelectorChange(e: any) {
      setIsLoading(true);
      let examListContent = await getExampleListContent(
        e.target.value,
        allValues.selectorValueAsc
      );
      console.log(examListContent);

      setIsLoading(false);
      // set list page value to useState
      getExampleListContent(e.target.value, allValues.selectorValueAsc)
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
  let content = <p>Found no movies.</p>;

  if (exampleList.length > 0) {
    content = <>{allValues.examplePageC}</>;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  console.log(exampleList);
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
        {content}
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

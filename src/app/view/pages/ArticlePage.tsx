import React, { useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { connect } from "react-redux";
import "../../../assets/scss/ExampleComponent.scss";
import {
  addArticle,
  getArticleList,
  getTagList,
} from "../../db/article.service";
import store, { mapStateToProps } from "../../db/_redux";
import "../../logic_handler/ListHandler";
import { sortList } from "../../logic_handler/ListHandler";
import { limitTextLength } from "../../logic_handler/TextHandler";
import AddExampleComponent from "../components/AddExampleComponent";
import { mapDispatchToProps } from "../components/ThemeSelector";
import LikeButton from "../small_components/LikeButton";
import { reRender } from "../small_components/Theme";

const backdrop_root = ReactDOM.createRoot(
  document.getElementById("backdrop-root") || new HTMLElement()
);
const overlay_root = ReactDOM.createRoot(
  document.getElementById("overlay-root") || new HTMLElement()
);
const GetArticlePage = () => {
  let eList: any[] = [];
  const [exampleList, setExampleList] = useState(eList);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);

  const [allValues, setAllValues] = useState({
    selectorValue: "exampleTitle",
    selectorValueAsc: "asc",
    selectorValueTag: "all",
    examplePageC: {},
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
  const getArticleListContent = useCallback(
    async (
      filter: string = "exampleTitle",
      asc: string = "asc",
      tag: string = "all"
    ) => {
      setIsLoading(true);
      setError(null);
      try {
        let list = await getArticleList();
        console.log(list);
        list = sortList(filter, asc, list) || list;

        setExampleList(list);

        // get articles on the list
        let examplePageContent = list.map((element) => {
          return (
            <div className="example__item" key={element.articleId}>
              <GetArticleComponent articleObject={element} />
            </div>
          );
        });
        console.log(examplePageContent);
        setAllValues({
          examplePageC: examplePageContent,
          selectorValue: filter,
          selectorValueAsc: asc,
          selectorValueTag: tag,
        });
      } catch (error: any) {
        setError(error["message"]);
      }
      setIsLoading(false);
    },
    []
  );

  // initial fetch examples on site load
  useEffect(() => {
    getArticleListContent();
  }, [getArticleListContent]);

  // create JSX for each example component
  function GetArticleComponent(props: any) {
    const articleObject = props.articleObject;
    const [articleTitle, setTitle] = useState(articleObject.articleTitle);
    // handle for clicking an example item -> show a popup example article
    const articlePageHandler = () => {
      setTitle(articleTitle + "1");
      console.log(articleTitle);
    };
    console.log(articleObject);
    return (
      <>
        <div className="card__image__wrap" onClick={articlePageHandler}>
          <img
            src={articleObject.articleImageLink + ""}
            alt="example"
            className="card__image"
          />
        </div>
        <div className="card__content__wrap">
          <h3>{articleObject.articleTitle}</h3>
          <p className="example__short-desc">
            {limitTextLength(articleObject.articleShortDesc, 40)}
          </p>
          <LikeButton likeCount={articleObject.articleLikeCount} />
        </div>
      </>
    );
  }

  // handle add new example button event listener
  const addExampleButtonHandler = () => {
    console.log("addExampleButtonHandler clicked");
    reRender(store.getState().theme.theme);

    setShowOverlay(true);
  };
  useEffect(() => {
    if (showOverlay === true) {
      console.log("showOverlay == true");
      backdrop_root.render(
        <div
          className="backdrop-container"
          onClick={() => setShowOverlay(false)}
        ></div>
      );
      overlay_root.render(
        <AddExampleComponent onAddExample={addArticle}></AddExampleComponent>
      );
    }
    if (showOverlay === false) {
      console.log("showOverlay == false");
      backdrop_root.render(<></>);
      overlay_root.render(<></>);
    }
  }, [showOverlay]);

  // filter options
  function MySelect(props: any) {
    const [tags, setTags] = useState([""]);
    async function handleSelectorChange(e: any) {
      // set list page value to useState
      await getArticleListContent(e.target.value, allValues.selectorValueAsc);
    }
    async function handleSelectorChangeAsc(e: any) {
      // set list page value to useState
      await getArticleListContent(allValues.selectorValue, e.target.value);
    }
    async function handleSelectorChangeTag(e: any) {
      // set list page value to useState
      await getArticleListContent(allValues.selectorValue, e.target.value);
    }
    // get tag list
    useEffect(() => {
      getTagList().then((data) => setTags(data));
    }, []);

    return (
      <div>
        {/* filter by attribute values */}
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
        {/* filter by tags */}
        <select
          title="yes"
          onChange={handleSelectorChangeTag}
          value={allValues.selectorValueAsc}
          defaultValue="all"
          className="float-right"
        >
          {tags.map((item, index) => (
            <option value={item}>{item}</option>
          ))}
        </select>
      </div>
    );
  }
  let content = (
    <>
      <h1>Found no example.</h1>
      <br />
      <img
        title="???"
        alt="???"
        src="https://static-cdn.jtvnw.net/emoticons/v1/emotesv2_d53274249a594003ac3bd598a94df7c0/3.0"
      ></img>
    </>
  );

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

      <div className="row container__example-page">
        {content}
        <div className="w3-center example__paginator width-100">
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
    </div>
  );
  return examplePage;
};

export default connect(mapStateToProps, mapDispatchToProps)(GetArticlePage);

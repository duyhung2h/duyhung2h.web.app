import { Pagination, Row } from "antd";
import "antd/dist/antd.css";
import React, { useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { NavLink } from "react-router-dom";
import {
  ArticleItemPanel,
  BackgroundPanel,
  CardContentWrap,
  CardImage,
  CardImageWrap
} from "../../../assets/styled_components/Panel";
import {
  addArticle,
  getArticleList,
  getTagList
} from "../../db/article.service";
import "../../logic_handler/ListHandler";
import { sortList } from "../../logic_handler/ListHandler";
import { limitTextLength } from "../../logic_handler/TextHandler";
import { Article } from "../../model/Article";
import AddArticleComponent from "../components/AddArticleComponent";
import ViewArticleComponent from "../components/ViewArticleComponent";
import {
  displayAlertInfoPopup,
  displayAlertSuccessPopup
} from "../small_components/AlertInfoPopup";
import LikeButton from "../small_components/LikeButton";
import { RoundButton } from "../small_components/ui/RoundButton";
import { Tags } from "../small_components/ui/Tag";

const backdrop_root = ReactDOM.createRoot(
  document.getElementById("backdrop-root") || new HTMLElement()
);
const overlay_root = ReactDOM.createRoot(
  document.getElementById("overlay-root") || new HTMLElement()
);
export const GetArticlePage = () => {
  let initialArticleViewId = -1;
  let initialOverlayState = false;
  let initialOverlayViewArticleState = false;
  let initialOverlayAddArticleState = false;
  let initialSelectorValueTag = "all";
  // get parameter: Check if there's an "articleId" parameter in the URL!

  try {
    let params = new URL(window.location.href).searchParams;
    initialArticleViewId = Number(params.get("article_id"));
  } catch (error) {}
  if (initialArticleViewId > 0) {
    initialOverlayViewArticleState = true;
    initialOverlayState = true;
  }
  // get parameter: Check if there's an "function" parameter in the URL!
  try {
    let params = new URL(window.location.href).searchParams;
    let functionName = params.get("function");

    if (functionName == "add_article_success") {
      displayAlertSuccessPopup("Article successfully added!");
    }
    if (functionName == "add_article") {
      initialOverlayAddArticleState = true;
      initialOverlayState = true;
    }
  } catch (error) {}
  // get parameter: Check if there's an "tagName" parameter in the URL!
  try {
    let params = new URL(window.location.href).searchParams;
    let tagName = String(params.get("tagName"));
    console.log(tagName);
    console.log(initialSelectorValueTag);

    if (tagName == "" || tagName == "null") {
      initialSelectorValueTag = "all";
    } else {
      initialSelectorValueTag = tagName;
    }
  } catch (error) {}

  // set state values
  let eList: any[] = [];

  const [articleList, setArticleList] = useState(eList);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showOverlay, setShowOverlay] = useState(initialOverlayState);
  const [showOverlayAddArticle, setShowOverlayAddArticle] = useState(
    initialOverlayAddArticleState
  );
  const [showOverlayViewArticle, setShowOverlayViewArticle] = useState(
    initialOverlayViewArticleState
  );
  const [articleViewId, setArticleViewId] = useState(initialArticleViewId);

  const [allValues, setAllValues] = useState({
    selectorValue: "articleTitle",
    selectorValueAsc: "asc",
    selectorValueTag: initialSelectorValueTag,
    articlePageC: {},
  });

  // watch for page state changes
  useEffect(() => {
    if (showOverlayAddArticle || showOverlayViewArticle) {
      setShowOverlay(true);
    } else {
      setShowOverlay(false);
    }
  }, [showOverlayViewArticle, showOverlayAddArticle]);

  // after initial set of state value, change state value depends on certain condition
  if (initialOverlayViewArticleState == true) {
    overlayUnrender();
    viewArticle();
  }
  if (initialOverlayAddArticleState == true) {
    overlayUnrender();
    viewAdd();
  }

  /**
   * from article list turn each article item into JSX
   *
   * @function useCallback(): hook to avoid infinite loop by using useState after useEffect. Will reference old state values, unless state values is referenced in []
   * @function fetch(): fetch data through API, first argument string to the API address, second argument for adding various options
   * @function then(): promise function to handle function after a request is finished
   */
  const getArticleListContent = useCallback(
    async (
      filter: string = "articleTitle",
      asc: string = "asc",
      tag: string = allValues.selectorValueTag
    ) => {
      console.log(tag);

      setIsLoading(true);
      setError(null);
      try {
        let list = await getArticleList();
        console.log(list);
        list = sortList(filter, asc, tag, list);
        // || list;
        console.log(list);

        setArticleList(list);

        // get articles on the list
        let articlePageContent = list.map((element) => {
          return (
            <ArticleItemPanel key={element.articleId}>
              <GetArticleComponent articleObject={element} />
            </ArticleItemPanel>
          );
        });
        console.log(articlePageContent);
        if (showOverlay) {
        } else {
          window.history.pushState(null, "null", `articles?tagName=${tag}`);
        }
        setAllValues({
          articlePageC: articlePageContent,
          selectorValue: filter,
          selectorValueAsc: asc,
          selectorValueTag: tag,
        });
      } catch (error: any) {
        setError(error["message"]);
      }
      setIsLoading(false);
    },
    [showOverlay]
  );

  // initial fetch articles on site load (and run again if list changes)
  useEffect(() => {
    getArticleListContent();
    // displayAlertInfoPopup("run again if list changes");
  }, []);

  const titleStyle = {
    minHeight: "4.5rem",
  };
  /**
   * GetArticleComponent
   *
   * create JSX for each article component
   *
   * @param props
   * @returns
   */
  function GetArticleComponent(props: any) {
    const articleObject: Article = props.articleObject;
    // handle for clicking an articles item -> show a popup article
    const articlePageHandler = () => {
      displayAlertInfoPopup(
        "Page scroll shifted to default position! Article page"
      );
      window.scrollTo(0, 0);

      setShowOverlayViewArticle(true);
      setArticleViewId(Number(articleObject.articleId));
    };
    return (
      <BackgroundPanel borderRadius={15} disableBorder={true} borderWidth={1}>
        <CardImageWrap
          onClick={articlePageHandler}
          borderWidth={1}
          borderRadius={15}
          disableBorder={false}
        >
          <CardImage
            src={articleObject.articleImageLink + ""}
            alt="article"
            borderRadius={15}
          />
        </CardImageWrap>
        <CardContentWrap
          borderWidth={1}
          borderRadius={15}
          disableBorder={false}
        >
          <h3 style={titleStyle}>{articleObject.articleTitle}</h3>
          <p className="example__short-desc">
            {limitTextLength(articleObject.articleShortDesc, 40)}
          </p>
          <LikeButton likeCount={articleObject.articleLikeCount} />
          <Tags
            tagList={articleObject.articleTag}
            props={props}
            onTagClick={onTagClick}
          />
        </CardContentWrap>
      </BackgroundPanel>
    );
  }

  /**
   * handle add new article button event listener
   */
  const addArticleButtonHandler = () => {
    console.log("addArticleButtonHandler clicked");
    window.history.pushState(null, "null", "articles?function=add_article");
    displayAlertInfoPopup(
      "Page scroll shifted to default position! Add article page"
    );
    window.scrollTo(0, 0);

    setShowOverlayAddArticle(true);
  };

  /**
   * @param OVERLAY
   *
   * show add article overlay!
   */
  function viewAdd() {
    // setShowOverlay(true)
    if (showOverlayAddArticle === true) {
      console.log("showOverlayAddArticle == true");
      backdrop_root.render(
        <div
          className="backdrop-container"
          onClick={() => setShowOverlayAddArticle(false)}
        ></div>
      );
      overlay_root.render(
        <AddArticleComponent onAddArticle={addArticle}></AddArticleComponent>
      );
    }
  }
  // watch to render overlay view
  useEffect(() => {
    overlayUnrender();
    viewAdd();
  }, [showOverlayAddArticle]);

  /**
   * @param OVERLAY
   *
   * show view article overlay!
   */
  function viewArticle() {
    if (showOverlayViewArticle === true) {
      console.log("showOverlayViewArticle == true");
      backdrop_root.render(
        <div
          className="backdrop-container"
          onClick={() => setShowOverlayViewArticle(false)}
        ></div>
      );
      overlay_root.render(
        <ViewArticleComponent
          articleId={articleViewId}
          onAddArticle={addArticle}
        ></ViewArticleComponent>
      );
    }
  }
  // watch to render overlay view
  useEffect(() => {
    overlayUnrender();
    viewArticle();
  }, [showOverlayViewArticle]);

  function overlayUnrender() {
    console.log(allValues.articlePageC);
    window.history.pushState(
      null,
      "null",
      `articles?tagName=${allValues.selectorValueTag}`
    );
    if (showOverlayViewArticle === false) {
      console.log("showOverlayViewArticle == false");
      backdrop_root.render(<></>);
      overlay_root.render(<></>);
    }
    if (showOverlayAddArticle) {
      window.history.pushState(null, "null", `articles?function=add_article`);
    }
    if (showOverlayViewArticle) {
      window.history.pushState(
        null,
        "null",
        `articles?article_id=${articleViewId}`
      );
    }
  }

  function onTagClick(tagName: any) {
    console.log(tagName);

    window.history.pushState(null, "null", "articles?tagName=" + tagName);
    setAllValues({
      articlePageC: allValues.articlePageC,
      selectorValue: allValues.selectorValue,
      selectorValueAsc: allValues.selectorValueAsc,
      selectorValueTag: tagName,
    });
    getTagByParam();
  }
  /**
   * get parameter: Check if there's an "tagName" parameter in the URL! If not, default to "all"
   */
  async function getTagByParam() {
    let tagName = allValues.selectorValueTag;
    let tagNameParam = "all";
    try {
      let params = new URL(window.location.href).searchParams;
      tagNameParam = String(params.get("tagName"));
      console.log(tagNameParam);

      if (tagNameParam == "") {
        tagNameParam = "all";
      } else if (tagNameParam == "null") {
        return;
      }
      if (allValues.selectorValueTag != tagNameParam) {
        if (tagName != "") {
          tagName = String(tagNameParam);
        } else {
          tagName = "all";
        }
        // displayAlertInfoPopup(
        //   "getTagByParam tagNameParam:" + tagNameParam + "tagName: " + tagName
        // );
        await getArticleListContent(
          allValues.selectorValue,
          allValues.selectorValueAsc,
          tagName
        );
      }
    } catch (error) {}
  }
  // filter options (dropdown)
  function MySelect(props: any) {
    const [tags, setTags] = useState([""]);
    async function handleSelectorChange(e: any) {
      // set list page value to useState
      await getArticleListContent(
        e.target.value,
        allValues.selectorValueAsc,
        allValues.selectorValueTag
      );
    }
    async function handleSelectorChangeAsc(e: any) {
      // set list page value to useState
      await getArticleListContent(
        allValues.selectorValue,
        e.target.value,
        allValues.selectorValueTag
      );
    }
    async function handleSelectorChangeTag(e: any) {
      // set list page value to useState
      await getArticleListContent(
        allValues.selectorValue,
        allValues.selectorValueAsc,
        e.target.value
      );
    }
    // get tag list
    useEffect(() => {
      getTagList(false).then((data) => {
        setTags(data);
      });
    }, [tags]);
    // get tag by Param
    useEffect(() => {
      // displayAlertErrorPopup("get tag by Param");
      getTagByParam();
    }, [allValues]);

    return (
      <div>
        {/* filter by attribute values */}
        <select
          title="yes"
          onChange={handleSelectorChange}
          value={allValues.selectorValue}
          defaultValue="articleTitle"
        >
          <option value="articleTitle">Name</option>
          <option value="articleLikeCount">Stars</option>
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
          value={allValues.selectorValueTag}
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
      <h1>Found no article.</h1>
      <br />
      <img
        title="???"
        alt="???"
        src="https://static-cdn.jtvnw.net/emoticons/v1/emotesv2_d53274249a594003ac3bd598a94df7c0/3.0"
      ></img>
    </>
  );

  if (articleList.length > 0) {
    content = <>{allValues.articlePageC}</>;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }
  // TESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTEST
  let test = false.toString();
  useEffect(() => {
    console.log(allValues);
  }, [allValues]);

  // FINAL: compile all components into an article page
  return (
    <>
      <NavLink to="/">Main</NavLink> {">"}{" "}
      <NavLink
        // style={({ isActive }) => (isActive ? classes.active : {})}
        to="/articles"
      >
        Article Page
      </NavLink>
      <RoundButton onClick={() => addArticleButtonHandler()}>+</RoundButton>
      {/* filter options */}
      <MySelect />
      {test == true.toString() && (
        <>
          <div>articleViewId: {articleViewId}</div>
          <div>initialOverlayState: {initialOverlayState.toString()}</div>
          <div>showOverlay: {showOverlay.toString()}</div>
          <div>showOverlayAddArticle: {showOverlayAddArticle.toString()}</div>
          <div>showOverlayViewArticle: {showOverlayViewArticle.toString()}</div>
          <div>
            allValues.selectorValueTag: {allValues.selectorValueTag.toString()}
          </div>
        </>
      )}
      <div className="row  ">{content}</div>
      <Row>
        <Pagination
          simple
          defaultCurrent={2}
          total={50}
          style={{
            display: "block",
            margin: "0 auto",
            padding: "0",
            paddingInlineStart: "unset",
          }}
        ></Pagination>
      </Row>
    </>
  );
};

export default GetArticlePage;

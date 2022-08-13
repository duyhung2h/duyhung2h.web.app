import { Pagination, Row } from "antd";
import "antd/dist/antd.css";
import React, { useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import {
  ArticleItemPanel,
  BackgroundPanel,
  CardContentWrap,
  CardImage,
  CardImageWrap,
} from "../../../assets/styled_components/Panel";
import {
  addArticle,
  getArticleList,
  getTagList,
} from "../../db/article.service";
import "../../logic_handler/ListHandler";
import { sortList } from "../../logic_handler/ListHandler";
import { limitTextLength } from "../../logic_handler/TextHandler";
import { Article } from "../../model/Article";
import AddArticleComponent from "../components/AddArticleComponent";
import ViewArticleComponent from "../components/ViewArticleComponent";
import {
  displayAlertInfoPopup,
  displayAlertSuccessPopup,
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
const GetArticlePage = () => {
  try {
    let params = new URL(window.location.href).searchParams;
    let functionName = params.get("function");

    if (functionName == "add_article_success") {
      displayAlertSuccessPopup("Article successfully added!");
    }
  } catch (error) {}

  let article_id = -1;
  let initialOverlayViewArticleState = false;
  // get parameter: Check if there's an "articleId" parameter in the URL!
  try {
    let params = new URL(window.location.href).searchParams;
    article_id = Number(params.get("article_id"));
  } catch (error) {}
  if (article_id > 0) {
    initialOverlayViewArticleState = true
  }
  let eList: any[] = [];
  const [exampleList, setExampleList] = useState(eList);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showOverlayAddArticle, setShowOverlayAddArticle] = useState(false);
  const [showOverlayViewArticle, setShowOverlayViewArticle] = useState(initialOverlayViewArticleState);
  const [articleViewId, setArticleViewId] = useState(article_id);
  if (initialOverlayViewArticleState == true) {
    viewArticle()
  }

  const [allValues, setAllValues] = useState({
    selectorValue: "exampleTitle",
    selectorValueAsc: "asc",
    selectorValueTag: "all",
    examplePageC: {},
  });
  // console.log(allValues);
  // console.log(exampleList);
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
        list = sortList(filter, asc, tag, list) || list;

        setExampleList(list);

        // get articles on the list
        let examplePageContent = list.map((element) => {
          return (
            <ArticleItemPanel key={element.articleId}>
              <GetArticleComponent articleObject={element} />
            </ArticleItemPanel>
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

  const titleStyle = {
    minHeight: "4.5rem",
  };
  // create JSX for each article component
  function GetArticleComponent(props: any) {
    const articleObject: Article = props.articleObject;
    const [articleTitle, setTitle] = useState(articleObject.articleTitle);
    // handle for clicking an example item -> show a popup article
    const articlePageHandler = () => {
      // setTitle(articleTitle + "1");
      window.history.pushState(
        null,
        "null",
        `articles?article_id=${articleObject.articleId}`
      );
      console.log(articleTitle);
      displayAlertInfoPopup("Page scroll shifted to default position!");
      // let myWindow=window.open("https://raw.githubusercontent.com/gist/creaktive/781249/raw/2ea60f845a536a29ba15ca235cb52c465cdf4e4c/trollface.png", "", "width=250, height=200");
      window.scrollTo(0, 0);

      setShowOverlayViewArticle(true);
      setArticleViewId(Number(articleObject.articleId));
    };
    console.log(articleObject);
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
          <Tags tagList={articleObject.articleTag} />
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
    displayAlertInfoPopup("Page scroll shifted to default position!");
    // let myWindow=window.open("https://raw.githubusercontent.com/gist/creaktive/781249/raw/2ea60f845a536a29ba15ca235cb52c465cdf4e4c/trollface.png", "", "width=250, height=200");
    window.scrollTo(0, 0);

    setShowOverlayAddArticle(true);
  };
  /**
   * show add article overlay!
   */
  useEffect(() => {
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
    if (showOverlayAddArticle === false) {
      console.log("showOverlay == false");
      backdrop_root.render(<></>);
      overlay_root.render(<></>);
    }
  }, [showOverlayAddArticle]);

  /**
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
    if (showOverlayViewArticle === false) {
      console.log("showOverlayViewArticle == false");
      backdrop_root.render(<></>);
      overlay_root.render(<></>);
    }
  }
  useEffect(() => {
    viewArticle()
  }, [showOverlayViewArticle]);

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

  if (exampleList.length > 0) {
    content = <>{allValues.examplePageC}</>;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }
  // console.log(exampleList);
  // FINAL: compile all components into an example page
  const articlePage = (
    <>
      <RoundButton onClick={() => addArticleButtonHandler()}>+</RoundButton>

      {/* filter options */}
      <MySelect />

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
  return articlePage;
};

export default GetArticlePage;

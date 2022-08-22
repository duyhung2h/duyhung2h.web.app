import React, { useCallback, useEffect, useReducer, useState } from "react";
import {
  CardImageBackground,
  CardOverlayContainer
} from "../../../assets/styled_components/Panel";
import { InputWrapComponent } from "../../../assets/styled_components/SmallComponents";
import getArticleList from "../../db/article.service";
import {
  getLocalStorageTheme,
  initialState,
  reducer
} from "../../db/reducer/reducer";
import { Article } from "../../model/Article";
import { displayAlertErrorPopup } from "../small_components/AlertInfoPopup";
import { SquareButtonProps } from "../small_components/ui/Button";
import { Tag } from "../small_components/ui/Tag";

/**
 * useRef: reference to React html components
 *
 * @param props
 * @returns
 */
const ViewArticleComponent = (props: any) => {
  /**
   * from example list turn each example item into JSX
   *
   * @function useCallback(): hook to avoid infinite loop by using useState after useEffect
   * @function fetch(): fetch data through API, first argument string to the API address, second argument for adding various options
   * @function then(): promise function to handle function after a request is finished
   */
  const getArticleListContent = useCallback(async (articleId: string) => {
    let article: Article = new Article("", "", "", "", -1, [""], "");
    try {
      let list = await getArticleList();
      console.log(list);
      const backupList: Article[] = Object.assign([], list);
      backupList.forEach((item: Article, index) => {
        console.log(item.articleTag);
        if (item?.articleId == articleId) {
          article = item;
        }
      });
    } catch (error: any) {
      displayAlertErrorPopup("load article view error!");
    }
    setArticleValue(article);
  }, []);
  // declare initial value
  let article: Article = new Article("", "", "", "", -1, [""], "");
  const [articleValue, setArticleValue] = useState(article);
  const [articleTag, setArticleTag] = useState("");
  console.log(props.articleId);
  // initial fetch examples on site load
  useEffect(() => {
    getArticleListContent(props.articleId);
  }, [getArticleListContent]);
  // get article value
  useEffect(() => {
    console.log(articleValue);
    try {
      setArticleTag(articleValue.articleTag[0]);
    } catch (error) {}
  }, [articleValue]);

  // click "Edit" button
  function editHandler(event: any) {}

  const [state] = useReducer(reducer, initialState);
  const currentTheme = getLocalStorageTheme();
  console.log(initialState.currentTheme.id);
  console.log(currentTheme.id);

  console.log(articleValue.articleDesc);

  return (
    <>
    <InputWrapComponent padding={0} noAnimation={true}>
      <CardImageBackground noAnimation={true}
        imgSrc={`${articleValue.articleImageLink}`}
        backgroundLoop={true}
        borderRadius={15}
      ></CardImageBackground>
    </InputWrapComponent>
    <CardOverlayContainer
      disableBorder={false}
      themeId={currentTheme.id}
      theme={currentTheme}
      borderRadius={15}
      borderWidth={1}
    >
      <InputWrapComponent padding={5}>
        <SquareButtonProps type="submit">
          Back to Article lists
        </SquareButtonProps>
        <SquareButtonProps type="submit">Edit Article</SquareButtonProps>
      </InputWrapComponent>
      <InputWrapComponent padding={5}>
        <h1>{articleValue.articleTitle}</h1>
        {articleTag != "" && <Tag tagString={articleTag}>{articleTag}</Tag>}
        <div>{articleValue.articleShortDesc}</div>
        <br></br>
        <div style={{ whiteSpace: "pre-line" }}>{articleValue.articleDesc}</div>
      </InputWrapComponent>
    </CardOverlayContainer>
    </>
  );
};

export default ViewArticleComponent;

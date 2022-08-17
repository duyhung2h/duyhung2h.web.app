import { environment } from "../../environments/environment";
import { Article } from "../model/Article";
import { displayAlertErrorPopup } from "../view/small_components/AlertInfoPopup";

/**
 * getExampleList
 * take data from API database through GET request to return a list of articles/posts.
 *
 * @returns list of posts/example
 */
export async function getArticleList() {
  let articleList: Article[] = [];
  try {
    const response = await fetch(`${environment.apiUrl}articles.json`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    var data = await response.json();
    const dataList = Object.keys(data.items).map((item) => data.items[item]);
    console.log(dataList);

    let i = 0;
    articleList = dataList.map((articleData: any) => {
      i++;
      return new Article(
        articleData.articleTitle + "",
        articleData.articleShortDesc + "",
        articleData.articleDesc,
        articleData.articleImageLink,
        articleData.articleLikeCount,
        articleData.articleTag,
        i + "",
      );
    });
    console.log(articleList);

    return articleList;
  } catch (error) {
    // alert("load example database failed!");
    console.log(error);

    return articleList;
  }
}

/**
 * getTagList
 * take data from API database through GET request to return a list of articles/tags
 *
 * @returns list of tags
 */
export async function getTagList(withoutAll: boolean) {
  let tagList: string[] = [];
  try {
    const response = await fetch(`${environment.apiUrl}articles.json`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    var data = await response.json();
    const dataList = Object.keys(data.tags).map((tag) => data.tags[tag]);
    // console.log(dataList);

    let i = 0;
    tagList = dataList.map((tagData: any) => {
      i++;
      if (tagData == "all" && withoutAll == true) {
        tagData = "no tag";
      }

      return tagData;
    });
    // console.log(tagList);

    return tagList;
  } catch (error) {
    // alert("load example database failed!");
    console.log(error);

    return tagList;
  }
}
/**
 * addExample
 * take in an example object to post them into our API database.
 *
 * @param article example object being parsed to JSON to send along with POST API request.
 * @returns
 */
export async function addArticle(article: Article) {
  try {
    console.log(article);
    console.log(article.articleTitle);
    console.log(article.articleShortDesc);
    const bodyPOST = JSON.stringify(
      createArticle(
        article.articleTitle,
        article.articleShortDesc,
        article.articleDesc,
        article.articleImageLink,
        article.articleTag
      )
    );
    console.log(bodyPOST);

    const response = await fetch(
      "https://personal-website-by-duyhung2h-default-rtdb.asia-southeast1.firebasedatabase.app/articles/items.json",
      {
        // mode: 'no-cors',
        method: "POST",
        body: bodyPOST,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      displayAlertErrorPopup("Something went wrong!");
      throw new Error("Something went wrong!");
    }
    // redirect 
    window.location.href = 'articles?function=add_article_success'
    return data;
  } catch (error: any) {
    displayAlertErrorPopup(error);
    return error;
  }
}

/**
 * createExample
 * Turn example data strings into JSON-formatted data
 *
 * @param title
 * @param shortDesc
 * @param desc
 * @returns
 */
export const createArticle = (
  title: string,
  shortDesc: string,
  desc: string,
  imageLink: string,
  articleTag: string[]
) => {
  return {
    articleTitle: title,
    articleShortDesc: shortDesc,
    articleLikeCount: 0,
    articleDesc: desc,
    articleImageLink: imageLink,
    articleTag: articleTag,
  };
};

export default getArticleList;

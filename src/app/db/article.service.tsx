import { environment } from "../../environments/environment";
import { Article } from "../model/Article";
import { IPData } from "../model/IPData";
import {
  displayAlertErrorPopup,
  displayAlertInfoPopup,
} from "../view/small_components/AlertInfoPopup";

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
    const dataList = Object.keys(data.items).map((item) => {
      let returnItem = data.items[item];
      returnItem.coreId = item;
      return returnItem;
    });
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
        articleData.coreId,
        new Date(articleData.articleCreatedDate),
        new Date(articleData.articleLastUpdatedDate),
        articleData.articleViewCount,
        i + ""
      );
    });
    console.log(articleList);
    console.log(new Date());

    return articleList;
  } catch (error) {
    // alert("load example database failed!");
    console.log(error);

    return articleList;
  }
}

/**
 * getArticleById
 * take data from API database through GET request
 * to return a list of articles/posts.
 *
 * @param id: parameter to fetch article by that id.
 * @returns list of posts/example
 */
export async function getArticleById(id?: string) {
  let articleList: Article[] | void;
  let returnData;

  articleList = await getArticleList().then((list_data) => {
    for (let articleData of list_data) {
      if (articleData?.articleId == id) {
        displayAlertInfoPopup(articleData.articleId + "");
        returnData = articleData;
      }
    }
  });

  return returnData;
}

/**
 * updateArticleViewCount
 * take data from API database through GET request to return a list of articles/posts.
 *
 * @returns
 */
export async function updateArticleViewCount(id?: string) {
  let articleAwait = await getArticleById(id).then(
    (returnedArticle: Article) => {
      returnedArticle.articleViewCount = returnedArticle.articleViewCount + 1;
      
      displayAlertInfoPopup(
        "View count: " + returnedArticle.articleViewCount
      );
      updateArticle(returnedArticle);
    }
  );
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
    const bodyPOST = JSON.stringify(createArticle(article));
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
    window.location.href = "articles?function=add_article_success";
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
export const createArticle = (article: Article) => {
  console.log(article);

  return {
    articleTitle: article.articleTitle,
    articleShortDesc: article.articleShortDesc,
    articleLikeCount: article.articleLikeCount,
    articleDesc: article.articleDesc,
    articleImageLink: article.articleImageLink,
    articleTag: article.articleTag,
    articleCreatedDate: article.createdDate,
    articleLastUpdatedDate: article.lastUpdatedDate,
    articleViewCount: article.articleViewCount
  };
};

/**
 * updateArticle
 * take an Article item then update it to the API
 *
 * @returns
 */
export async function updateArticle(article: Article) {
  try {
    const bodyPUT = JSON.stringify(createArticle(article));
    console.log(bodyPUT);
    
    displayAlertErrorPopup("updateArticle(article: Article)" + article.articleViewCount);

    const response = await fetch(
      `${environment.apiUrl}articles/items/${article.coreId}.json`,
      {
        method: "PUT",
        body: bodyPUT,
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
    return data;
  } catch (error) {
    // alert("load example database failed!");
    console.log(error);

    return null;
  }
}

/**
 * Create new IP in case of IP doesn't exist
 *
 * @param IPDataValue
 * @returns
 */
export const createIP = (IPDataValue: IPData) => {
  return {
    IP: IPDataValue.IP,
    LikedArticles: IPDataValue.LikedArticles,
  };
};

/**
 * addNewIP
 * take in an IPData object to post them into our API database.
 *
 * @param IPData IPData object being parsed to JSON to send along with POST API request.
 * @returns
 */
export async function addNewIP(IPData: IPData) {
  try {
    console.log(IPData);
    const bodyPOST = JSON.stringify(createIP(IPData));
    console.log(bodyPOST);

    const response = await fetch(`${environment.apiUrl}IPData.json`, {
      // mode: 'no-cors',
      method: "POST",
      body: bodyPOST,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      displayAlertErrorPopup("Something went wrong!");
      throw new Error("Something went wrong!");
    }
    return data;
  } catch (error: any) {
    displayAlertErrorPopup(error);
    return error;
  }
}
/**
 * getIPDataByIP
 * From the list of IP, get one specific IP (usually your PC IP). If IP is not found, register a new @IPData object to request to the API
 *
 * @param IP
 * @param IPList
 * @returns fetched IP
 */
export function getIPDataByIP(IP: string, IPList: IPData[]) {
  let IPFetch: IPData = new IPData("", "", [-1]);
  IPList.forEach((item: IPData, index) => {
    try {
      if (item.IP == IP) {
        // displayAlertErrorPopup("found IP")
        IPFetch = item;
      }
    } catch {}
  });
  return IPFetch;
}
/**
 * getIPData
 * take data from API database through GET request to return a list of IPData
 *
 * @returns list of IPs
 */
export async function getIPData() {
  let IPDataList: IPData[] = [];
  try {
    const response = await fetch(`${environment.apiUrl}IPData.json`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    var dataListResponse = await response.json();
    console.log(dataListResponse);
    const dataList = Object.keys(dataListResponse).map((item) => {
      let returnItem = dataListResponse[item];
      returnItem.Id = item;
      return returnItem;
    });

    let i = 0;
    IPDataList = dataList.map((data: IPData) => {
      if (data.LikedArticles == undefined) {
        data.LikedArticles = [-1];
      }
      i++;
      return new IPData(data.Id, data.IP, data.LikedArticles);
    });

    console.log(IPDataList);

    return IPDataList;
  } catch (error) {
    // alert("load example database failed!");
    console.log(error);

    return IPDataList;
  }
}
/**
 * updateIPData
 * take an IPData item then update it to the API
 *
 * @returns
 */
export async function updateIPData(IPData: IPData) {
  try {
    const bodyPUT = JSON.stringify(createIP(IPData));
    console.log(bodyPUT);

    const response = await fetch(
      `${environment.apiUrl}IPData/${IPData.Id}.json`,
      {
        method: "PUT",
        body: bodyPUT,
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
    return data;
  } catch (error) {
    // alert("load example database failed!");
    console.log(error);

    return null;
  }
}

export default getArticleList;

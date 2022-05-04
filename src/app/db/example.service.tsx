import { environment } from "../../environments/environment";
import { Example } from "../model/Example";

/**
 * getExampleList
 * take data from API database through GET request to return a list of examples/posts.
 * 
 * @returns list of posts/example
 */
export async function getExampleList() {
  let exampleList: Example[] = [];
  try {
    const response = await fetch(`${environment.apiUrl}examples.json`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    var data = await response.json();
    const dataList = Object.keys(data.items).map((item) => data.items[item]);
    console.log(dataList);

    let i = 0;
    exampleList = dataList.map((exampleData: any) => {
      i++;
      return new Example(
        exampleData.exampleTitle + "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
        exampleData.exampleShortDesc + "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
        exampleData.exampleDesc,
        exampleData.exampleImageLink,
        exampleData.exampleLikeCount,
        i + ""
      );
    });
    console.log(exampleList);

    return exampleList;
  } catch (error) {
    // alert("load example database failed!");
    console.log(error);

    return exampleList;
  }
}
/**
 * addExample
 * take in an example object to post them into our API database.
 * 
 * @param example example object being parsed to JSON to send along with POST API request.
 * @returns 
 */
export async function addExample(example: Example) {
  try {
    console.log(example);
    console.log(example.exampleTitle);
    console.log(example.exampleShortDesc);
    const bodyPOST = JSON.stringify(
      createExample(
        example.exampleTitle,
        example.exampleShortDesc,
        example.exampleDesc,
        example.exampleImageLink
      )
    )
    console.log(bodyPOST);
    
    
    const response = await fetch(
      "https://personal-website-by-duyhung2h-default-rtdb.asia-southeast1.firebasedatabase.app/examples/items.json",
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
      alert("Something went wrong!");
      throw new Error("Something went wrong!");
    }
    return data;
  } catch (error: any) {
    alert(error);
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
export const createExample = (
  title: string,
  shortDesc: string,
  desc: string,
  imageLink: string
) => {
  return {
    exampleTitle: title,
    exampleShortDesc: shortDesc,
    exampleLikeCount: 0,
    exmapleDesc: desc,
    exampleImageLink: imageLink
  };
};

export default getExampleList;

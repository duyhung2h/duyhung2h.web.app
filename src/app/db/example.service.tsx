import React from "react";
import { environment } from "../../environments/environment";
import { Example } from "../model/Example";

function getExampleList_MockUp() {
  let exampleList = [];
  for (let i = 0; i < 10; i++) {
    const title = "[Example #" + i + "] How to add triggers";
    const shortDesc =
      "This is a tutorial on how to add triggers using the Parser. Simply use the template python script or use your own script once you got your scenario file set up.";
    exampleList.push({
      exampleId: i,
      exampleTitle: title,
      exampleShortDesc: shortDesc,
      exampleLikeCount: 10 - i,
      exmapleDesc: (
        <div>
          <h3>{title}</h3>
          <div>{shortDesc}</div>
          <div>{shortDesc}</div>
        </div>
      ),
    });
  }
  return exampleList;
}
const getExampleList = async () => {
  let exampleList: Example[] = [];
  try {
    const response = await fetch(`${environment.apiUrl}examples.json`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const data = await response.json();
    console.log(data);

    exampleList = data.results.map((exampleData: any) => {
      return new Example(
        exampleData.value,
        exampleData.exampleTitle.value,
        exampleData.exampleShortDesc.value,
        exampleData.exampleLikeCount.value
      );
    });
    return exampleList;
  } catch {
    alert("load example database failed!");
    return null;
  }
};
export const createExample = (
  title: string,
  shortDesc: string,
  desc: string
) => {
  return {
    exampleTitle: title,
    exampleShortDesc: shortDesc,
    exampleLikeCount: 0,
    exmapleDesc: desc,
  };
};

export default getExampleList;

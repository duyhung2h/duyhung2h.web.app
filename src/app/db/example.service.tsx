import React from "react";

function getExampleList() {
  let exampleList = [];
  for (let i = 0; i < 10; i++) {
    const title = "[Example #" + i + "] How to add triggers";
    const shortDesc =
      "This is a tutorial on how to add triggers using the Parser. Simply use the template python script or use your own script once you got your scenario file set up.";
    exampleList.push({
      exampleId: i,
      exampleTitle: title,
      exampleShortDesc: shortDesc,
      exampleLikeCount: i,
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

export default getExampleList;

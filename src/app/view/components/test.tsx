import React from "react";

var exampleList: any[] = [];
for (let i = 0; i < 10; i++) {
  exampleList.unshift({
    exampleId: i,
    exampleTitle: "Example #" + i,
    exampleShortDesc:
      "description: Just some random text, lorem ipsum text praesent tincidunt ipsum lipsum.",
  });
  console.log(exampleList[i]);
}

function GetExamplePage(prop: any) {
  const examplePageContent: any[] = [];
  exampleList.forEach((element) => {
    examplePageContent.push(
      <GetExampleComponent
        exampleId={element.exampleId}
        exampleTitle={element.exampleTitle}
        exampleShortDesc={element.exampleShortDesc}
      />
    );
  });
  const examplePage = [
    <div
      className="w3-main w3-content w3-padding row"
    //   style={"max-width:1200px;margin-top:100px"}
    >
      {examplePageContent}
    </div>,
  ];
  examplePage.push(
    <div className="w3-center w3-padding-32">
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
          3
        </a>
        <a href="/#" className="w3-bar-item w3-button w3-hover-black">
          4
        </a>
        <a href="/#" className="w3-bar-item w3-button w3-hover-black">
          »
        </a>
      </div>
    </div>
  );
  return examplePage;
}
function GetExampleComponent(prop: any) {
  return (
    <div className="w3-quarter">
      <img
        src="app/assets/images/example1.png"
        alt="example"
        // style="width:100%"
      />
      <h3>{prop.exampleTitle}</h3>
      <p>{prop.exampleShortDesc}</p>
    </div>
  );
}

export default GetExamplePage;

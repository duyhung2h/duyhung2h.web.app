import getExampleList from "../../db/example.service";
import React from "react";
import "../../../assets/scss/ExampleComponent.scss";

function GetExamplePage(props: any): JSX.Element {
  function GetExampleComponent(props: any) {
    const exampleObject = props.exampleObject;
    console.log(props.exampleObject);
    return (
      <div>
        <img
          src="app/assets/images/example1.png"
          alt="example"
          className="width-100"
        />
        <h3>{exampleObject.exampleTitle}</h3>
        <p>{exampleObject.exampleShortDesc}</p>
      </div>
    );
  }
  console.log(props);
  const examplePageContent = getExampleList()
    .map((element) => {
      return (
        <div className="w3-quarter" key={element.exampleId}>
          <GetExampleComponent exampleObject={element} />
        </div>
      );
    })
    .reverse();
  const examplePage = (
    <div>
      <div className="w3-main w3-content w3-padding row container__example-page">
        {examplePageContent}
      </div>
      <div className="w3-center w3-padding-32 width-100">
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
  );
  return examplePage;
}

export default GetExamplePage;
// export { GetExampleComponent };

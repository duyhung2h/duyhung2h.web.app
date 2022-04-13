import getExampleList from "../../db/example.service";
import React from "react";
import "../../../assets/scss/ExampleComponent.scss";

function GetExamplePage(props: any): JSX.Element {
  // create JSX for each example component
  function GetExampleComponent(props: any) {
    const exampleObject = props.exampleObject;
    // handle for clicking an example item -> show a popup example article
    const examplePageHandler = () => {
      alert(exampleObject.exampleTitle)
    }
    console.log(props.exampleObject);
    return (
      <div onClick={examplePageHandler}>
        <img
          src={require("../../../assets/images/example1.png")}
          alt="example"
          className="width-100"
        />
        <h3>{exampleObject.exampleTitle}</h3>
        <p>{exampleObject.exampleShortDesc}</p>
      </div>
    );
  }
  console.log(props);
  // from example list turn each example item into JSX
  const examplePageContent = getExampleList()
    .map((element) => {
      return (
        <div className="w3-quarter" key={element.exampleId}>
          <GetExampleComponent exampleObject={element} />
        </div>
      );
    })
    .reverse();
  // handle add new example button event listener
  const addExampleButtonHandler = () => {
    console.log("clicked");
    
  };

  // FINAL: compile all components into an example page
  const examplePage = (
    <div>
      <button onClick={() => addExampleButtonHandler()} className="round__add-button">
        +
      </button>
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

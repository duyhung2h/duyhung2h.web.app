import { Route, Redirect} from "react-router-dom";
import React from "react";
import MainHeader from "../../components/Header";

import GetExamplePage from "./../../components/ExampleComponent";
import Home from "./../home";

function App() {
  return (
    <div>
      <p>Test if works App</p>
      <MainHeader>
        <p>Test if works MainHeader</p>
      </MainHeader>
      <Route exact path={"/"}>
        <p>Test if works App /</p>
        <Redirect to="/home" />
      </Route>
      <Route exact path={"/home"}>
        <p>Test if works App /home</p>
        <Home />
      </Route>
      <Route exact path={"/examples"}>
        <p>Test if works App /examples</p>
        <GetExamplePage />
      </Route>
    </div>
  );
}

export default App;

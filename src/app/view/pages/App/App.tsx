import React from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContextProvider } from "../../../db/auth.service";
import MainHeader from "../../components/Header";
import GetExamplePage from "../ExamplePage";
import SecretPage from "../SecretPage";
import Home from "./../home";

function App() {
  return (
    <React.Fragment>
      <p>Test if works App</p>
      <AuthContextProvider>
        Test if works AuthContext
        <MainHeader>
          <p>Test if works MainHeader</p>
        </MainHeader>
        <div className="p-5">
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
          <Route exact path={"/secret"}>
            <p>Test if works App /secret</p>
            <SecretPage />
          </Route>
        </div>
      </AuthContextProvider>
    </React.Fragment>
  );
}

export default App;

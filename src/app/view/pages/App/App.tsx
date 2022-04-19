import React from "react";
import { Redirect, Route } from "react-router-dom";
import {
  AuthContextProvider
} from "../../../db/auth.service";
import MainHeader from "../../components/Header";
import GetExamplePage from "../ExamplePage";
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
      </AuthContextProvider>
    </React.Fragment>
  );
}

export default App;

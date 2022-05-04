import React from "react";
import { NavLink, Redirect, Route } from "react-router-dom";
import { AuthContextProvider } from "../../../db/auth.service";
import classes from "../../../../assets/scss/index.module.scss";
import MainHeader from "../../components/Header";
import GetExamplePage from "../ExamplePage";
import SecretPage from "../SecretPage";
import Home from "./../home";

function App() {
  return (
    <React.Fragment>
      {/* <p>Test if works App</p> */}
      <AuthContextProvider>
        {/* Test if works AuthContext */}
        <MainHeader>
          {/* <p>Test if works MainHeader</p> */}
        </MainHeader>
        <div className="p-5">
          <Route exact path={"/"}>
            {/* <p>Test if works App /</p> */}
            <Redirect to="/home" />
          </Route>
          <Route exact path={"/home"}>
            <NavLink to="/">Main</NavLink> {'>'} <NavLink activeClassName={classes.active} to="/home">Homepage</NavLink> 
            <Home />
          </Route>
          <Route exact path={"/examples"}>
            <NavLink to="/">Main</NavLink> {'>'} <NavLink activeClassName={classes.active} to="/examples">Example Page</NavLink> 
            <GetExamplePage />
          </Route>
          <Route exact path={"/secret"}>
            <NavLink to="/">Main</NavLink> {'>'} <NavLink activeClassName={classes.active} to="/secret">Secret Page</NavLink> 
            <SecretPage />
          </Route>
        </div>
      </AuthContextProvider>
    </React.Fragment>
  );
}

export default App;

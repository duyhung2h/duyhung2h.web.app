import React from "react";
import { NavLink, Redirect, Route } from "react-router-dom";
import { AuthContextProvider } from "../../../db/auth.service";
import classes from "../../../../assets/scss/index.module.scss";
import MainHeader from "../../components/Header";
import GetExamplePage from "../ExamplePage";
import SecretPage from "../SecretPage";
import Home from "./../home";
import { Provider } from "react-redux";
import store from "../../../db/_redux";
import Footer from "../../components/Footer";

function App() {
  return (
    <React.Fragment>
      <AuthContextProvider>
        <MainHeader></MainHeader>
        <div className="p-5">
          <Route exact path={"/"}>
            <Redirect to="/home" />
          </Route>
          <Route exact path={"/home"}>
            <NavLink to="/">Main</NavLink> {">"}{" "}
            <NavLink activeClassName={classes.active} to="/home">
              Homepage
            </NavLink>
            <Home />
          </Route>
          <Route exact path={"/examples"}>
            <NavLink to="/">Main</NavLink> {">"}{" "}
            <NavLink activeClassName={classes.active} to="/examples">
              Example Page
            </NavLink>
            <Provider store={store}>
              <GetExamplePage />
            </Provider>
          </Route>
          <Route exact path={"/secret"}>
            <NavLink to="/">Main</NavLink> {">"}{" "}
            <NavLink activeClassName={classes.active} to="/secret">
              Secret Page
            </NavLink>
            <SecretPage />
          </Route>
        </div>
        <Footer></Footer>
      </AuthContextProvider>
    </React.Fragment>
  );
}

export default App;

import React, { useContext, useEffect } from "react";
import { Provider } from "react-redux";
import { NavLink } from "react-router-dom";
import classes from "../../../assets/scss/index.module.scss";
import AuthContext, { getUserLocalstorage } from "../../db/auth.service";
import store from "../../db/_redux";
import LoginComponent from "./LoginComponent";
import ThemeSelector from "./ThemeSelector";
import { withRouter } from "react-router-dom";

const MainHeader = (props: any) => {
  const authCtx = useContext(AuthContext);
  console.log(
    "AuthContext.Consumer(ctx) => ctx.isLoggedIn = " + authCtx.isLoggedIn
  );
  // const d = {h: ""}
  useEffect(() => {
    // do something on route change
    // for my example, close a drawer
  }, []);
  const { match, location, history } = props;
  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <li>
            <NavLink activeClassName={classes.active} to="/home">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={classes.active} to="/examples">
              Examples
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={classes.active} to="/secret">
              Sekrit
            </NavLink>
          </li>

          {!authCtx.isLoggedIn && (
            <li className={classes.login__hidden + ` ml-3`}>
              <a href="/#">
                <i className="fa fa-user mr-1"></i>
                Login
              </a>
              <LoginComponent onLogin={authCtx.onLogin} />
            </li>
          )}
          {authCtx.isLoggedIn && (
            <li className={classes.login__hidden + ` ml-3 white-text`}>
              <i className="fa fa-user mr-1"></i>
              Welcome, {true && (
                <span>{getUserLocalstorage()._username}</span>
              )}{" "}
              !
            </li>
          )}
          {authCtx.isLoggedIn && (
            <li
              onClick={authCtx.onLogout}
              className={classes.login__hidden + ` ml-3`}
            >
              <a href="/#">
                <i className="fa fa-sign-out mr-1"></i>
                Logout
              </a>
            </li>
          )}
          <li className={classes.login__hidden + ` `}>
            <a>
              <Provider store={store}>
                <ThemeSelector
                  location={location}
                  history={history}
                  match={match}
                />
              </Provider>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default withRouter(MainHeader);

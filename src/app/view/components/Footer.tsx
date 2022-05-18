import React from "react";
import { Provider } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import classes from "../../../assets/scss/index.module.scss";
import { WEB_BRANCH, WEB_VER } from "../../constants";
import store from "../../db/_redux";
import ThemeSelector from "./ThemeSelector";

const Footer = (props: any) => {
  const { match, location, history } = props;
  return (
    <header className={classes.header}>
      <nav>
        <ul className="main-text-color">
          Website Version: {WEB_VER} | Branch: {WEB_BRANCH}
          <li>
            <NavLink activeClassName={classes.active} to="/home">
              Home
            </NavLink>
          </li>
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

export default withRouter(Footer);

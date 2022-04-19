import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import classes from "../../../assets/scss/index.module.scss";
import AuthContext, { getUserLocalstorage } from "../../db/auth.service";
import LoginComponent from "./LoginComponent";

const MainHeader = (props: any) => {
  const ctx = useContext(AuthContext);
  console.log(
    "AuthContext.Consumer(ctx) => ctx.isLoggedIn = " + ctx.isLoggedIn
  );
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

          {!ctx.isLoggedIn && (
            <li className={classes.login__hidden + ` ml-3`}>
              <a>
                <i className="fa fa-user mr-1"></i>
                Login
              </a>
              <LoginComponent onLogin={ctx.onLogin} />
            </li>
          )}
          {ctx.isLoggedIn && (
            <li className={classes.login__hidden + ` ml-3 white-text`}>
              <i className="fa fa-user mr-1"></i>
              Welcome, {true && (
                <span>{getUserLocalstorage()._username}</span>
              )}{" "}
              !
            </li>
          )}
          {ctx.isLoggedIn && (
            <li
              onClick={ctx.onLogout}
              className={classes.login__hidden + ` ml-3`}
            >
              <a>
                <i className="fa fa-sign-out mr-1"></i>
                Logout
              </a>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;

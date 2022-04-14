import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import classes from "../../../assets/scss/index.module.scss";
import LoginComponent from "./LoginComponent";
import { User } from "../../model/User";
import { login, logout } from "../../db/auth.service";

const MainHeader = (props: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    try {
      var user = new User(JSON.parse(localStorage["user"]).userId, JSON.parse(localStorage["user"]).username, JSON.parse(localStorage["user"]).password)
      if(user){
        setIsLoggedIn(true)
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const loginHandler = (username: string, password: string) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    setIsLoggedIn(true);
    login(username, password)
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    logout()
  };
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
          {!isLoggedIn && (
            <li className={classes.login__hidden + ` ml-3`}>
              <a>
                <i className="fa fa-user mr-1"></i>
                Login
              </a>
              <LoginComponent onLogin={loginHandler} />
            </li>
          )}
          {isLoggedIn && (
            <li className={classes.login__hidden + ` ml-3 white-text`}>
                <i className="fa fa-user mr-1"></i>
                Welcome, {true && (<span>{JSON.parse(localStorage["user"])._username}</span>)} !
            </li>
          )}
          {isLoggedIn && (
            <li onClick={logoutHandler} className={classes.login__hidden + ` ml-3`}>
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

import React, { useContext, useEffect } from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import "../../../assets/scss/page_scss/hamburger.scss";
import { Header, LoginHidden } from "../../../assets/styled_components/Panel";
import AuthContext, { getUserLocalstorage } from "../../db/auth.service";
import LoginComponent from "./LoginComponent";

export function withRouter(Component: any): typeof Component {
  function ComponentWithRouterProp(props: any) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }
  return ComponentWithRouterProp(Component.props);
}

export const MainHeader = () => {
  const authCtx = useContext(AuthContext);
  console.log(
    "AuthContext.Consumer(ctx) => ctx.isLoggedIn = " + authCtx.isLoggedIn
  );
  // const d = {h: ""}
  useEffect(() => {
    // do something on route change
    // for my example, close a drawer
  }, []);
  function humbergerMenuOverlayOnClick() {
    $(".humberger__menu__wrapper").removeClass(
      "show__humberger__menu__wrapper"
    );
    $(".humberger__menu__overlay").removeClass("active");
    $("body").removeClass("over_hid");
  }
  function humbergerOnclick() {
    $(".humberger__menu__wrapper").addClass("show__humberger__menu__wrapper");
    $(".humberger__menu__overlay").addClass("active");
    $("body").addClass("over_hid");
  }
  return (
    <Header>
      <nav>
        <div
          className="humberger__menu__overlay"
          onClick={humbergerMenuOverlayOnClick}
        ></div>
        <div className="humberger__menu__wrapper">
          <div className="humberger__menu__logo">
            <a href="#">
              <img src="img/logo2.png" alt="" />
            </a>
          </div>
          <div className="humberger__menu__cart">
            {authCtx.isLoggedIn && (
              <ul className="">
                <li>
                  <NavLink
                    className={({ isActive }) => (isActive ? "active" : "")}
                    to="/examples"
                  >
                    Examples
                  </NavLink>
                </li>
              </ul>
            )}
          </div>
        </div>
        <ul className="main-text-color">
          <li>
            <div className="humberger__open " onClick={humbergerOnclick}>
              <i className="fa fa-bars "></i>
            </div>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "")}
              to="/home"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "")}
              to="/articles"
            >
              Articles
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "")}
              to="/secret"
            >
              Sekrit
            </NavLink>
          </li>

          {!authCtx.isLoggedIn && (
            <LoginHidden className="ml-3">
              <a href="/#">
                <i className="fa fa-user mr-1"></i>
                Login
              </a>
              <LoginComponent onLogin={authCtx.onLogin} />
            </LoginHidden>
          )}
          {authCtx.isLoggedIn && (
            <LoginHidden className="ml-3 main-text-color">
              <i className="fa fa-user mr-1"></i>
              Welcome, {true && (
                <span>{getUserLocalstorage()._username}</span>
              )}{" "}
              !
            </LoginHidden>
          )}
          {authCtx.isLoggedIn && (
            <LoginHidden className="ml-3" onClick={authCtx.onLogout}>
              <a>
                <i className="fa fa-sign-out mr-1"></i>
                Logout
              </a>
            </LoginHidden>
          )}
        </ul>
      </nav>
    </Header>
  );
};

export default MainHeader;

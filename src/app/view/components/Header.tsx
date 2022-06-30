import React, { useContext, useEffect } from "react";
import { NavLink, withRouter } from "react-router-dom";
import classes from "../../../assets/scss/index.module.scss";
import "../../../assets/scss/page_scss/hamburger.scss";
import AuthContext, { getUserLocalstorage } from "../../db/auth.service";
import LoginComponent from "./LoginComponent";

const MainHeader = () => {
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
    <header className={classes.header}>
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
                  <NavLink activeClassName={classes.active} to="/examples">
                    Examples
                  </NavLink>
                </li>
                {/* <li>
                        <a title="Giỏ hàng của bạn" [routerLink]="['/cart']">
                            <i className="fa fa-shopping-bag tooltipHeader">
                                <span className="tooltiptext">Giỏ hàng của bạn</span>
                            </i>
                            <span>{{checkCartAmount()}}</span>
                        </a>
                    </li>
        
                    <li>
                        <div className="header__top__right__auth">
                            <div className="header__item__dropdown">
                                <i className="fa fa-user"></i>
                                <ul className="header__menu__dropdown dropdown_right">
                                    <li><a [routerLink]="['/accountinfo']">Cập Nhật Tài Khoản</a></li>
                                    <li><a onClick="logout()">Đăng Xuất</a></li>
                                </ul>
                            </div>
                        </div>
                    </li> */}
              </ul>
            )}

            {/* <ul className="header__ul" *ngIf="userModel == null">
                    <li className="cursor-auto">
                        <div className="header__item__dropdown cursor-pointer">
                            <i [routerLink]="['/login']" className="fa fa-user mr-2 line-separator-header-mobile">
                                <span className="footer-ybwc-desc"> Đăng Nhập</span>
                            </i>
        
                            <i [routerLink]="['/register']" className="fa ">
                                <span className="footer-ybwc-desc"> Đăng Ký</span>
                            </i>
                        </div>
                    </li>
                </ul> */}
          </div>
          {/* <div id="mobile-menu-wrap ">
                <div className="slicknav_menu ">
                    <nav className="slicknav_nav slicknav_hidden " aria-hidden="true " role="menu " style="display: none; ">
                        <ul className="header__ul ">
                            <li [routerLinkActive]=" 'active' "><a href="# " [routerLink]="['/home'] ">Trang Chủ</a></li>
                            <li [routerLinkActive]=" 'active' "><a href="# " [routerLink]="['/product-list'] ">Sản Phẩm</a></li>
                            <li [routerLinkActive]=" 'active' " *ngIf="userModel?.customer?.role?._roleId==1"><a href="# "
                                    [routerLink]="['/history'] ">Lịch sử</a></li>
                            <li [routerLinkActive]=" 'active' "><a href="# "
                                    onClick={_testCreateLogInAccount()}>_testCreateLogInAcc</a></li>
                        </ul>
                    </nav>
                </div>
            </div> */}
        </div>
        <ul className="main-text-color">
          <li>
            <div className="humberger__open " onClick={humbergerOnclick}>
              <i className="fa fa-bars "></i>
            </div>
          </li>
          <li>
            <NavLink activeClassName={classes.active} to="/home">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={classes.active} to="/articles">
              Articles
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
            <li className={classes.login__hidden + ` ml-3 main-text-color`}>
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

export default withRouter(MainHeader);

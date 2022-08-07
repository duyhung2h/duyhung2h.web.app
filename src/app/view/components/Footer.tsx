import React from "react";
import { Provider } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import classes from "../../../assets/scss/index.module.scss";
import { Header, LoginHidden, Span } from "../../../assets/styled_components/Panel";
import { WEB_BRANCH, WEB_VER } from "../../constants";
import { Nav } from "./ThemeSelector";

const Footer = (props: any) => {
  const { match, location, history } = props;
  return (
    <Header>
      <nav>
        <ul>
          <Span>
            Website Version: {WEB_VER} | Branch: {WEB_BRANCH}
          </Span>
          <li>
            <NavLink activeClassName={classes.active} to="/home">
              Home
            </NavLink>
          </li>
          <LoginHidden>
            <a>
              {/* <Provider store={store}> */}
                <Nav></Nav>
              {/* </Provider> */}
            </a>
          </LoginHidden>
        </ul>
      </nav>
    </Header>
  );
};

export default withRouter(Footer);

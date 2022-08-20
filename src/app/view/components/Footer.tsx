import React from "react";
import { NavLink } from "react-router-dom";
import {
  Header,
  LoginHidden,
  Span
} from "../../../assets/styled_components/Panel";
import { WEB_BRANCH, WEB_VER } from "../../constants";
import { Nav } from "./ThemeSelector";

export const Footer = (props: any) => {
  const { match, location, history } = props;
  return (
    <Header>
      <nav>
        <ul>
          <Span>
            Website Version: {WEB_VER} | Branch: {WEB_BRANCH}
          </Span>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "")}
              to="/home"
            >
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

export default Footer;

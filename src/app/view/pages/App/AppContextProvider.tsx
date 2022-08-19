import { createContext, useReducer } from "react";
import { NavLink, Redirect, Route } from "react-router-dom";
import classes from "../../../../assets/scss/index.module.scss";
import { BackgroundPanel } from "../../../../assets/styled_components/Panel";
import { React } from "../../../../index";
import { AuthContextProvider } from "../../../db/auth.service";
import Footer from "../../components/Footer";
import MainHeader from "../../components/Header";
import { displayAlertSuccessPopup } from "../../small_components/AlertInfoPopup";
import GetArticlePage from "../ArticlePage";
import SecretPage from "../SecretPage";
import Home from "./../home";
export var AppContext = createContext<any>({});

function AppContextProvider() {
  // const notification = useSelector((state: RootState) => state.notification);
  return (
    <AuthContextProvider>
      <MainHeader />
      <BackgroundPanel className="p-5 page__min-height">
        <Route path={"/"}>
          <Redirect to="/home" />
        </Route>
        <Route path={"/home"}>
          <NavLink to="/">Main</NavLink> {">"}{" "}
          <NavLink activeClassName={classes.active} to="/home">
            Homepage
          </NavLink>
          <Home />
        </Route>
        <Route path={"/articles"}>
          <NavLink to="/">Main</NavLink> {">"}{" "}
          <NavLink activeClassName={classes.active} to="/articles">
            Article Page
          </NavLink>
          {/* <Provider store={store}> */}
          <GetArticlePage />
          {/* </Provider> */}
        </Route>
        <Route path={"/secret"}>
          <NavLink to="/">Main</NavLink> {">"}{" "}
          <NavLink activeClassName={classes.active} to="/secret">
            Secret Page
          </NavLink>
          <SecretPage />
        </Route>
      </BackgroundPanel>
      <Footer />
    </AuthContextProvider>
  );
}

export default AppContextProvider;

import { createContext, useReducer } from "react";
import { NavLink, Redirect, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import classes from "../../../../assets/scss/index.module.scss";
import { BackgroundPanel } from "../../../../assets/styled_components/Panel";
import { React } from "../../../../index";
import { AuthContextProvider } from "../../../db/auth.service";
import { initialState, reducer } from "../../../db/reducer/reducer";
import Footer from "../../components/Footer";
import MainHeader from "../../components/Header";
import { displayAlertSuccessPopup } from "../../small_components/AlertInfoPopup";
import GetArticlePage from "../ArticlePage";
import SecretPage from "../SecretPage";
import Home from "./../home";
export var AppContext = createContext<any>({});

function App() {
  try {
    let params = new URL(window.location.href).searchParams;
    let functionName = params.get("function");

    if (functionName == "add_article_success") {
      displayAlertSuccessPopup("Article successfully added!");
    }
  } catch (error) {}
  const [state, dispatch] = useReducer(reducer, initialState);
  const { currentTheme } = state;
  // const notification = useSelector((state: RootState) => state.notification);
  return (
    <React.Fragment>
      <ThemeProvider theme={currentTheme}>
        <AppContext.Provider value={{ ...state, dispatch }}>
          <AuthContextProvider>
            <MainHeader />
            <BackgroundPanel className="p-5 page__min-height">
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
              <Route exact path={"/articles"}>
                <NavLink to="/">Main</NavLink> {">"}{" "}
                <NavLink activeClassName={classes.active} to="/articles">
                  Article Page
                </NavLink>
                {/* <Provider store={store}> */}
                  <GetArticlePage />
                {/* </Provider> */}
              </Route>
              <Route exact path={"/secret"}>
                <NavLink to="/">Main</NavLink> {">"}{" "}
                <NavLink activeClassName={classes.active} to="/secret">
                  Secret Page
                </NavLink>
                <SecretPage />
              </Route>
            </BackgroundPanel>
            <Footer />
          </AuthContextProvider>
        </AppContext.Provider>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;

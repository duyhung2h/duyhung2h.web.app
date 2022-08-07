import { createContext, useReducer } from "react";
import { NavLink, Redirect, Route } from "react-router-dom";
import { AuthContextProvider } from "../../../db/auth.service";
import classes from "../../../../assets/scss/index.module.scss";
import MainHeader from "../../components/Header";
import GetArticlePage from "../ArticlePage";
import SecretPage from "../SecretPage";
import Home from "./../home";
import { Provider } from "react-redux";
import Footer from "../../components/Footer";
import { ThemeProvider } from "styled-components";
import { initialState, reducer } from "../../../db/reducer/reducer";
import { React } from "../../../../index";
import { BackgroundPanel } from "../../../../assets/styled_components/Panel";
import Alert from "../../small_components/alert/ui/Alert";
export var AppContext = createContext<any>({});

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { currentTheme } = state;
  // const notification = useSelector((state: RootState) => state.notification);
  return (
    <React.Fragment>
      <ThemeProvider theme={currentTheme}>
        <AppContext.Provider value={{ ...state, dispatch }}>
          <AuthContextProvider>
            <MainHeader />
            <BackgroundPanel className="p-5">
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
            {/* <Alert
              autoClose={notification.autoClose}
              alignment={notification.alignment}
              type={notification.type}
            >
              {notification.message}
            </Alert> */}
            <Footer />
          </AuthContextProvider>
        </AppContext.Provider>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;

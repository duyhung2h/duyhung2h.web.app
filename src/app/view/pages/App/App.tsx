import { createContext, useReducer } from "react";
import { ThemeProvider } from "styled-components";
import { React } from "../../../../index";
import { initialState, reducer } from "../../../db/reducer/reducer";
import { displayAlertSuccessPopup } from "../../small_components/AlertInfoPopup";
import AppContextProvider from "./AppContextProvider";
import { Helmet } from "react-helmet";
import Favicon from "react-favicon";
// import Favicon from "../../../../assets/images/icon/app/favicon.ico"

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
      <Helmet>
        {/* metadata */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="This is my haven, where I can express myself, post my online tutorials and information about my Youtube channel."
        />
        <meta
          name="robots"
          content="Age of Empires 2 aoe2 personal website duyhung2h nguyễn duy hưng"
        />
        <meta property="og:url" content="duyhung2h.web.app" />
        <meta property="og:site_name" content="duyhung2h's personal website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="article" />
        <meta property="fb:app_id" content="ID_APP_FACEBOOK" />
        <script
          src="https://kit.fontawesome.com/fa32aa4cba.js"
          crossOrigin="anonymous"
        ></script>
        <Favicon url="../../../../assets/images/icon/app/favicon.ico"></Favicon>
        <title>duyhung2h's personal website</title>
      </Helmet>
      <ThemeProvider theme={currentTheme}>
        <AppContext.Provider value={{ ...state, dispatch }}>
          <AppContextProvider></AppContextProvider>
        </AppContext.Provider>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;

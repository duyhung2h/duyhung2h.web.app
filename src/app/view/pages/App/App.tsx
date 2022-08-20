import { createContext, useReducer } from "react";
import { ThemeProvider } from "styled-components";
import { React } from "../../../../index";
import { initialState, reducer } from "../../../db/reducer/reducer";
import { displayAlertSuccessPopup } from "../../small_components/AlertInfoPopup";
import AppContextProvider from "./AppContextProvider";
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
          <AppContextProvider></AppContextProvider>
        </AppContext.Provider>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;

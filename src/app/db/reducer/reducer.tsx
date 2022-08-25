import { IPData } from "../../model/IPData";
import { displayAlertErrorPopup } from "../../view/small_components/AlertInfoPopup";
import { theme } from "./theme";

// save state to localStorage
export function getLocalStorageTheme(): any {
  let localTheme = theme.classic
  const data = window.localStorage.getItem("currentTheme");
  if (data != null) {
    try {
      localTheme = JSON.parse(data);
      console.log(localTheme);
      
    } catch (error) {
      displayAlertErrorPopup("Non existant theme!")
    }
  }
  return JSON.parse(JSON.stringify(localTheme))
}
// save state to localStorage
export function getLocalStorageIPData(): IPData {
  let IPdata: IPData = new IPData("", "", [-1])
  const data = window.localStorage.getItem("IPData");
  if (data != null) {
    try {
      IPdata.IP = JSON.parse(data)._IP;
      IPdata.Id = JSON.parse(data)._Id;
      IPdata.LikedArticles = JSON.parse(data)._LikedArticles;
      console.log(IPdata);
      
    } catch (error) {
      displayAlertErrorPopup("Non existant IPData!")
    }
  }
  return IPdata
}

// export function getCurrent

export const initialState = {
  currentTheme: getLocalStorageTheme(),
};

/**
 *
 * @param state
 * @param action
 * @returns
 */
export function reducer(state, action) {
  switch (action.type) {
    case "setTheme":
      return { ...state, currentTheme: action.value };
    case "updateTheme":
      return {
        ...state,
        currentTheme: { ...theme[state.currentTheme.id], ...action.value },
      };
    case "toggleTheme": {
      console.log(action.value);
      const newThemeKey = action.value;
      state.currentTheme = theme[newThemeKey];
      console.log(state.currentTheme);
      // console.log(`${toggleThemeAction}`);
      // store.dispatch({ type: "toggleTheme", value: newThemeKey});
      window.localStorage.setItem(
        "currentTheme",
        JSON.stringify(state.currentTheme)
      );
      // update theme

      return { ...state, currentTheme: state.currentTheme };
    }
    default:
      throw new Error();
  }
}

// export const bookReducer = createReducer(initialState, (builder) => {
//   builder.addCase(toggleThemeAction, (state, action) => {
//     console.log(action.payload)
//     console.log(state.currentTheme.background);

//   })
// })
/**
 * create store (database in REACT)
 * refer to database function using createAction and import it
 *
 * @param createAction
 * @return value
 */
// export const store = configureStore({ reducer: {currentTheme: bookReducer} });

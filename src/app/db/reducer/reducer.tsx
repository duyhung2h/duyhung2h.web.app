import { theme } from "./theme";

export const initialState = {
  currentTheme: theme.classic,
};

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
      state.currentTheme.id = Number(action.value)
      const newThemeKey = state.currentTheme.id == 0 ? "classic" : "aokh";
      return { ...state, currentTheme: theme[newThemeKey] };
    }
    default:
      throw new Error();
  }
}

import { createSlice } from "@reduxjs/toolkit";

const themeInitialState = { theme: 0};
/**
 * Reducer slice (create a map of reducers)
 */
const themeSlice = createSlice({
  name: "theme",
  initialState: themeInitialState,
  reducers: {
    change_theme(state: any, action: any) {
      state.theme = action.payload;
      console.log(state);
    },
  },
});

export const themeReducer = themeSlice.reducer

export const themeActions = themeSlice.actions;

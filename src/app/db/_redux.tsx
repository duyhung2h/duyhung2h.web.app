import { AnyAction, configureStore } from "@reduxjs/toolkit";
let data: any = { counter: 0, theme: 0 };
const counterReducer = (state = data, action: AnyAction) => {
  console.log(state);
  console.log(action);

  let newState = JSON.parse(JSON.stringify(state));
  console.log(newState);

  if (action.type === "increment") {
    newState.counter = state.counter + action.amount;
    return newState;
  }
  if (action.type === "decrement") {
    newState.counter = state.counter - action.amount;
    return newState;
  }
  if (action.type === "change_theme") {
    newState.theme = action.amount;
    return newState;
  }
  return state;
};
const store = configureStore({
  reducer: counterReducer,
});
export default store;

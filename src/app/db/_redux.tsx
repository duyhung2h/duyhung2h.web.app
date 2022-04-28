import { AnyAction, configureStore } from "@reduxjs/toolkit";

let initialState: any = { counter: 0, theme: 0, showCounter: true };
const counterReducer = (state = initialState, action: AnyAction) => {
  console.log(state);
  console.log(action);
  // console.log(typeof action.amount);

  let newState = JSON.parse(JSON.stringify(state));
  console.log(newState);

  if (action.type === "increment" || action.type === "decrement") {
    try {
      console.log(isNaN(parseInt(action.amount)));
      if (isNaN(parseInt(action.amount))) {
        action.amount = 0;
        throw "invalid NaN";
      } else {
        action.amount = parseInt(action.amount);
      }
    } catch (error) {
      console.log(error);
      action.amount = 0;
      console.log(
        "Nice one jackass, the field is invalids, but I'll fix that for you :-)"
      );
    }
  }
  if (action.type === "increment") {
    newState.counter = state.counter + action.amount;
    return newState;
  }
  if (action.type === "decrement") {
    newState.counter = state.counter - action.amount;
    return newState;
  }
  if (action.type === "show_counter") {
    if (newState.showCounter) {
      newState.showCounter = false;
    } else {
      newState.showCounter = true;
    }
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

export const mapStateToProps = (state: any) => {
  return {
    counter: state.counter,
    theme: state.theme,
    showCounter: state.showCounter,
  };
};
export default store;

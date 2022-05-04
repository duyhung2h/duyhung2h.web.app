import { AnyAction } from "@reduxjs/toolkit";

const counterInitialState = { counter: 0, showCounter: true };

/**
 *
 * Manually created reducer to handle nested functionalities
 *
 * @param state contain reducer state
 * @param action action which contains action data
 * @returns
 */
export const counterReducer = (state = counterInitialState, action: AnyAction) => {
  console.log(state);
  console.log(action);

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
    newState.showCounter = !newState.showCounter;
    return newState;
  }
  return state;
};
import React, { useContext, useEffect, useReducer, useState } from "react";
import classes from "../../../assets/scss/index.module.scss";
import Button from "../small_components/Button";
import Card from "../small_components/Card";
import AuthContext from "../../db/auth.service";

/**
 * an useReducer to prevent using multiple useState so it wouldn't cause conflict
 *
 * @param state
 * @param action
 * @returns
 */
const loginReducer = (state: any, action: any) => {
  // check action type to initiate `isValid` value
  const state2 = JSON.parse(JSON.stringify(state));
  let isValid = false;
  if (action["type"].includes("USER")) {
    isValid = action.value.includes("@");
    state2.username.isValid = isValid;
  }
  if (action["type"].includes("PASSWORD")) {
    isValid = action.value.trim().length > 6;
    state2.password.isValid = isValid;
  }
  switch (action["type"]) {
    case "USER_INPUT":
      console.log("USER_INPUT");
      state2.username.value = action.value;
      break;
    case "USER_INPUT_BLUR":
      console.log("USER_INPUT_BLUR");
      break;
    case "PASSWORD_INPUT":
      console.log("PASSWORD_INPUT");
      state2.password.value = action.value;
      break;
    case "PASSWORD_INPUT_BLUR":
      console.log("PASSWORD_INPUT_BLUR");
      break;
    default:
      return state2;
  }
  return state2;
};

/**
 * LoginComponent: Handles login form validity
 *
 * @param props
 * @returns
 */
const LoginComponent = (props: any) => {
  // useState: when set...(value) function is fired, take that value snapshot and assign it to the former variable inside the nest
  // used to store when set dynamic values need to be updated by certain events
  const [formIsValid, setFormIsValid] = useState(false);

  const stateValues = { value: "", isValid: false };
  const [loginInfoState, dispatchLogin] = useReducer(loginReducer, {
    username: JSON.parse(JSON.stringify(stateValues)),
    password: JSON.parse(JSON.stringify(stateValues)),
  });

  const authCtx = useContext(AuthContext);

  /**
   * useEffect: only rerun when certain data changes (used in response of some event)
   * only fire useEffect when emailState.value or loginInfoState.value changed value in the last cycle
   *
   * @returns
   */
  useEffect(() => {
    const valid_identifier = setTimeout(() => {
      console.log(
        "writing login\n username: " +
          loginInfoState.username.value +
          "\n password: " +
          loginInfoState.password.value
      );
      setFormIsValid(
        loginInfoState.username.isValid && loginInfoState.password.isValid
      );
    }, 500);
    // Clean up function
    return () => {
      console.log("clean up");
      clearTimeout(valid_identifier);
    };
  }, [loginInfoState.username.value, loginInfoState.password.value]);
  const emailChangeHandler = (event: any) => {
    dispatchLogin({ type: "USER_INPUT", value: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchLogin({
      type: "USER_INPUT_BLUR",
      value: loginInfoState.username.value,
    });
  };

  const passwordChangeHandler = (event: any) => {
    dispatchLogin({ type: "PASSWORD_INPUT", value: event.target.value });
  };

  const validatePasswordHandler = () => {
    dispatchLogin({
      type: "PASSWORD_INPUT_BLUR",
      value: loginInfoState.password.value,
    });
  };

  const submitHandler = (event: any) => {
    event.preventDefault();
    authCtx.onLogin(loginInfoState.username.value, loginInfoState.password.value);
  };
  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            loginInfoState.username.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={loginInfoState.username.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            loginInfoState.password.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={loginInfoState.password.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};
export default LoginComponent;

import React, { useEffect, useState } from "react";
import Button from "../small_components/Button";
import classes from "../../../assets/scss/index.module.scss";
import Card from "../small_components/Card";

const LoginComponent = (props: any) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);

  // useEffect: only rerun when certain data changes (used in response of some event)
  // only fire useEffect when enteredEmail or enteredPassword changed value in the last cycle
  useEffect(() => {
    const valid_identifier = setTimeout(() => {
      console.log(
        "writing login\n username: " +
          enteredEmail +
          "\n password: " +
          enteredPassword
      );
      setFormIsValid(
        enteredEmail.includes("@") && enteredPassword.trim().length > 6
      );
    }, 500);
    // Clean up function
    return () => {
      console.log("clean up");
      clearTimeout(valid_identifier)
    };
  }, [enteredEmail, enteredPassword]);
  const emailChangeHandler = (event: any) => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event: any) => {
    setEnteredPassword(event.target.value);
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes("@"));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event: any) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };
  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
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

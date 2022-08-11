import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState
} from "react";
import { CardLogin, Span } from "../../../assets/styled_components/Panel";
import AuthContext, { LoginFromAPI } from "../../db/auth.service";
import { displayAlertErrorPopup } from "../small_components/AlertInfoPopup";
import { Input } from "../small_components/Input";
import { SquareButtonProps } from "../small_components/ui/Button";

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

  const stateValues = { value: "", isValid: true };
  const [loginInfoState, dispatchLogin] = useReducer(loginReducer, {
    username: JSON.parse(JSON.stringify(stateValues)),
    password: JSON.parse(JSON.stringify(stateValues)),
  });

  // useContext to connect to global AuthContext
  const authCtx = useContext(AuthContext);

  const emailInputRef: React.MutableRefObject<any> = useRef();
  const passwordInputRef: React.MutableRefObject<any> = useRef();

  const firstUpdate = useRef(true);
  /**
   * useEffect: only rerun when certain data changes (used in response of some event)
   * only fire useEffect when emailState.value or loginInfoState.value changed value in the last cycle
   *
   * @returns
   */
  useEffect(() => {
    // this useEffect wont run at initial render
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
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
  }, [
    loginInfoState.username.value,
    loginInfoState.password.value,
    loginInfoState.username.isValid,
    loginInfoState.password.isValid,
  ]);
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

  /**
   * submit handler, pass data to login function if all forms are correct, otherwise shift input focus on invalid input component
   *
   * @param event
   */
  const submitHandler = async (event: any) => {
    event.preventDefault();
    if (formIsValid) {
      const data = await LoginFromAPI(
        loginInfoState.username.value,
        loginInfoState.password.value
      ).then(() => {
        window.location.reload();
      });
      // authCtx.onLogin(loginInfoState.username.value, loginInfoState.password.value, '')
      console.log(data);
    } else if (!loginInfoState.username.isValid) {
      emailInputRef.current.focus();
    } else if (!loginInfoState.password.isValid) {
      passwordInputRef.current.focus();
    }
  };
  /**
   * submit handler, pass data to login function if all forms are correct, otherwise shift input focus on invalid input component
   *
   * @param event
   */
  const submitHandlerPOST = (event: any) => {
    event.preventDefault();
    if (formIsValid) {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAfiF5A7sEixx9AnEw6xMikDwQzBEYUvCA",
        {
          method: "POST",
          body: JSON.stringify({
            email: loginInfoState.username.value,
            password: loginInfoState.password.value,
            returnSecureToken: true,
          }),
          headers: {
            "content-type": "application/json",
          },
        }
      ).then((res) => {
        if (res.ok) {
        } else {
          return res.json().then((data) => {
            // show error or something idk
            console.log(data);
            let errorMessage = "Authentication failed!";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            displayAlertErrorPopup(errorMessage)
          });
        }
      });
    } else if (!loginInfoState.username.isValid) {
      emailInputRef.current.focus();
    } else if (!loginInfoState.password.isValid) {
      passwordInputRef.current.focus();
    }
  };
  return (
    <CardLogin borderRadius={15} borderWidth={1}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          id="email"
          label="Username"
          type="email"
          isValid={loginInfoState.username.isValid}
          value={loginInfoState.username.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          ref={passwordInputRef}
          id="password"
          label="Password"
          type="password"
          isValid={loginInfoState.password.isValid}
          value={loginInfoState.password.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div style={{textAlign: 'center'}}>
          <SquareButtonProps type="submit">Login</SquareButtonProps>
          <a onClick={submitHandlerPOST}>
            <Span isImportant={true} isSecondaryColor={true}>
              Sign up new account
            </Span>
          </a>
        </div>
      </form>
    </CardLogin>
  );
};
export default LoginComponent;

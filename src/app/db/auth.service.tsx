import { User } from "../model/User";
import React, { useContext, useEffect, useState } from "react";
import { setTimeout } from "timers/promises";

/**
 * handles login
 *
 * @param username
 * @param password
 * @param token
 */
export function login(username: string, password: string, token: string) {
  console.log("logging in");
  
  const user = new User(1, username, password, token);
  console.log(user);
  
  localStorage.setItem("user", JSON.stringify(user));
}
/**
 * handles logout
 */
export function logout() {
  localStorage.removeItem("user");
}
export async function LoginFromAPI(username: string, password: string) {
  // useContext to connect to global AuthContext
  return await  
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAfiF5A7sEixx9AnEw6xMikDwQzBEYUvCA",
      {
        method: "POST",
        body: JSON.stringify({
          email: username,
          password: password,
          returnSecureToken: true,
        }),
        headers: {
          "content-type": "application/json",
        },
      }
    ).then(async (res) => {
      if (res.ok) {
        login(username, password, 'data.idToken');
        return res.json()
        res.json().then(async (data: any) => {
          // show error or something idk
          login(username, password, data.idToken);
          console.log(data);
          return data
        });
      } else {
        res.json().then((data) => {
          // show error or something idk
          console.log(data);
          let errorMessage = "Authentication failed!";
          if (data && data.error && data.error.message) {
            errorMessage = data.error.message;
          }
          alert(errorMessage);
          return data
        });
      }
  })
}
/**
 * Get User class stored inside local storage
 *
 * @returns
 */
export function getUserLocalstorage() {
  let user: any;
  try {
    user = JSON.parse(localStorage["user"]);
  } catch {
    user = new User(-1, "guest", "password", "");
  }
  return user;
}

/**
 * AuthContext object for AuthContextProvider
 */
var AuthContext = React.createContext({
  isLoggedIn: false,
  onLogin: (username: string, password: string, token: string) => {},
  onLogout: () => {},
});

/**
 * provider for all AuthContext values through props
 *
 * @param props
 * @returns
 */
export const AuthContextProvider = (props: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [random, setRandom] = useState(Math.random());
  useEffect(() => {
    try {
      var user = getUserLocalstorage();
      const awaitedUser = async () => {
        await LoginFromAPI(user._username, user._password).then((data) => {
          // loginHandler(data._username, data._password, data._token)
          console.log(data);
          login(user._username, user._password, data.idToken);

          if (user._userId > -1) {
            setIsLoggedIn(true);
          } else {
            setIsLoggedIn(false);
          }
        });
      };
      awaitedUser().catch(console.error);
    } catch (error) {
      console.log(error);
      setIsLoggedIn(false);
    }
    console.log("useEffect app");
    console.log(props);
    setRandom(Math.random());
  }, []);
  const loginHandler = (username: string, password: string, token: string) => {
    login(username, password, token);
    setIsLoggedIn(true);
  };
  const logoutHandler = () => {
    logout();
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogin: loginHandler,
        onLogout: logoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

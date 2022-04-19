import { User } from "../model/User";
import React, { useEffect, useState } from "react";

export function login(username: string, password: string) {
  const user = new User(1, username, password);
  localStorage.setItem("user", JSON.stringify(user));
}
export function logout() {
  localStorage.removeItem("user");
}
export function getUserLocalstorage() {
  let user: any;
  try {
    user = JSON.parse(localStorage["user"]);
  } catch {
    user = new User(-1, "guest", "password");
  }
  return user;
}

var AuthContext = React.createContext({
  isLoggedIn: false,
  onLogin: (username: string, password: string) => {},
  onLogout: () => {},
});

export const AuthContextProvider = (props: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    try {
      var user = getUserLocalstorage();
      if (user._userId > -1) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoggedIn(false);
    }
    console.log("useEffect app");
  }, []);
  const loginHandler = (username: string, password: string) => {
    login(username, password);
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

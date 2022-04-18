import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import AuthContext, { getUserLocalstorage } from "../../../db/auth.service";
import MainHeader from "../../components/Header";
import GetExamplePage from "../ExamplePage";
import Home from "./../home";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    try {
      var user = getUserLocalstorage();
      if (user._userId > -1) {
        setIsLoggedIn(true);
      }else{
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoggedIn(false);
    }
    console.log("useEffect app");
  }, []);
  const loginHandler = (loggedIn: boolean) => {
    setIsLoggedIn(loggedIn);
  };
  return (
    <React.Fragment>
      <p>Test if works App</p>
      <AuthContext.Provider
        value={{
          isLoggedIn: isLoggedIn,
        }}
      >
        Test if works AuthContext
        <MainHeader onLogin={loginHandler}>
          <p>Test if works MainHeader</p>
        </MainHeader>
        <Route exact path={"/"}>
          <p>Test if works App /</p>
          <Redirect to="/home" />
        </Route>
        <Route exact path={"/home"}>
          <p>Test if works App /home</p>
          <Home />
        </Route>
        <Route exact path={"/examples"}>
          <p>Test if works App /examples</p>
          <GetExamplePage />
        </Route>
      </AuthContext.Provider>
    </React.Fragment>
  );
}

export default App;

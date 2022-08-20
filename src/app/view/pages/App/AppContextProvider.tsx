import React from "react";
import { createContext } from "react";
import { Route, Routes } from "react-router-dom";


export var AppContext = createContext({});

function AppContextProvider() {
  const Panel = require('../../../../assets/styled_components/Panel');
  const Auth = require('../../../db/auth.service');
  const Footer = require('../../components/Footer');
  const Header = require('../../components/Header');
  const GetArticlePage = require('../ArticlePage');
  const SecretPage = require('../SecretPage');
  const Home = require('./../home');
  return (
    <Auth.AuthContextProvider>
      <Header.MainHeader />
      <Panel.BackgroundPanel className="p-5 page__min-height">
      <Routes>
        <Route path={"/"} element={<Home.Home />} />
        <Route path={"/home"} element={<Home.Home />} />
        <Route path={"/articles"} element={<GetArticlePage.GetArticlePage />} />
        <Route path={"/secret"} element={<SecretPage.SecretPage />} />
      </Routes>
      </Panel.BackgroundPanel>
      <Footer.Footer />
    </Auth.AuthContextProvider>
  );
}

export default AppContextProvider;

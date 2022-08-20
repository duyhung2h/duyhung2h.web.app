import React from "react";
import { Route, Routes } from "react-router-dom";
const RoutesTest = () => {
  return (
    <Routes>
      <Route path="/about" />
      <Route path="/projects" />
      <Route path="/contact" />
      <Route path="/" />
    </Routes>
  );
};
export default RoutesTest;

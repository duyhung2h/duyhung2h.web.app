// import "../../../assets/scss/test2.scss";
import React from "react";

export const ThemeLoader2 = (props: any) => {
  import("../../../assets/scss/test2.scss")
  return <>theme 2</>;
};
export default ThemeLoader2

import React from "react";

import classes from "./../../../assets/scss/index.module.scss";

const Button = (props: any) => {
  return (
    <button
      className={classes.button}
      type={props.type || "button"}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;

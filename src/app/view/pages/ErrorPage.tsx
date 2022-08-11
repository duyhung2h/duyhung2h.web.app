import { Card } from "antd";
import React from "react";

import { ButtonProps } from "../small_components/ui/Button";
import classes from "./ErrorModal.module.css";

const ErrorModal = (props: any) => {
  return (
    <div>
      <div className={classes.backdrop} onClick={props.onConfirm} />
      <Card className={classes.modal}>
        <header className={classes.header}>
          <h2>{props.title}</h2>
        </header>
        <div className={classes.content}>
          <p>{props.message}</p>
        </div>
        <footer style={{ textAlign: "center" }}>
          <ButtonProps onClick={props.onConfirm}>Okay</ButtonProps>
        </footer>
      </Card>
    </div>
  );
};

export default ErrorModal;

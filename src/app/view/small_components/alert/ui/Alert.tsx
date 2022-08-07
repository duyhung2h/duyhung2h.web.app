import { FC, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { closeAlert, AlertTypes, AlertAlignment } from "../store/alert";
import { Root } from "./style";
import CloseIcon from "../../icons/CloseIcon";
import React from "react";
import { ButtonProps } from "./Button";

export interface AlertProps {
  children: React.ReactNode;
  type: AlertTypes;
  autoClose: boolean;
  alignment: AlertAlignment;
}

const Alert: FC<AlertProps> = ({ children, type, autoClose, alignment }) => {
  const dispatch = useDispatch();

  const close = useCallback(() => {
    dispatch(closeAlert());
  }, [dispatch]);

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        close();
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [dispatch, autoClose, close]);

  return (
    <Root type={type} alignment={alignment}>
      {children}
      <ButtonProps ghost onClick={close}>
        <CloseIcon color="white" width="10" />
      </ButtonProps>
    </Root>
  );
};

export default Alert;
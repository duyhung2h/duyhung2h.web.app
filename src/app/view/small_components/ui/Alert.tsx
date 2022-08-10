import React, { FC, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import CloseIcon from "../icons/CloseIcon";
import { AlertAlignment, AlertTypes, closeAlert } from "../store/alert";
import { ButtonProps } from "./Button";
import { Root } from "./style";

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

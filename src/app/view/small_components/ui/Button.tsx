import React from "react";
import styled from "styled-components";

type ButtonVar = {
  disableBorder?: boolean;
  marginLeft?: string;
};
export const Button = styled.button`
  margin-left: ${(props: ButtonVar) => props.marginLeft};
  font: inherit;
  border: ${(props) => props.theme.border};
  background: ${(props) => props.theme.buttonBG};
  color: ${(props) => props.theme.headerA};
  padding: 0.75rem 3.5rem;
  cursor: pointer;
  font-size: 1.15rem;
  border-radius: 30px;

  &:hover,
  &:active {
    background: ${(props) => props.theme.buttonActiveBG};
    /* border-color: ${(props) => props.theme.buttonActiveBG}; */
  }

  &:focus {
    outline: none;
  }

  &:disabled,
  &:focus:disabled,
  &:hover:disabled,
  &:active:disabled {
    background: #ccc;
    border-color: #ccc;
    color: #666666;
    cursor: not-allowed;
  }
`;
export const SquareButton = styled(Button)`
  border-radius: 6px;
  padding: 0.25em 1em;
`;

export const ButtonProps = (props: any) => {
  return (
    <Button
      type={props.type || "button"}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </Button>
  );
};

export const SquareButtonProps = (props: any) => {
  return (
    <SquareButton
      type={props.type || "button"}
      onClick={props.onClick}
      // disabled={props.disabled}
    >
      {props.children}
    </SquareButton>
  );
};

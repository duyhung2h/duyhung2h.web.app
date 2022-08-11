import React, { useImperativeHandle, useRef } from "react";
import classes from "../../../assets/scss/index.module.scss";
import { InputWrapComponent } from "../../../assets/styled_components/SmallComponents";

/**
 * Input form
 * forwardRef return a react component capable being bound to a @param ref
 *
 * @param props
 * @param ref establish connection, allow binding with @function useImperativeHandle()
 * @returns
 */
export const Input = React.forwardRef((props: any, ref: any) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const activate = () => {
    inputRef.current?.focus();
  };

  /**
   * useImperativeHandle
   * transitional object between internal functionality and the outside world
   */
  useImperativeHandle(ref, () => {
    return {
      focus: activate,
    };
  });
  return (
    <InputWrapComponent
      className={`
      ${classes.control} 
      ${props.isValid === false ? "invalid" : ""}
      `}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        ref={inputRef}
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </InputWrapComponent>
  );
});

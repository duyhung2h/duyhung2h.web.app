import styled from "styled-components";
import { Color } from "./Constants/Color";

export const InputWrapComponent = styled.div`
  label,
  input {
    display: block;
  }

  label {
    font-weight: bold;
    display: block;
    color: #464646;
    margin-bottom: 0.5rem;
  }

  input {
    display: block;
    font: inherit;
    padding: 0.35rem 0.35rem;
    border-radius: 6px;
    border: 1px solid #ccc;
  }

  input:focus {
    outline: none;
    border-color: #4f005f;
    background: #f6dbfc;
  }

  &.invalid input {
    border-color: red;
    background: #fbdada;
  }
`;

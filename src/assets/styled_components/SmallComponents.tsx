import { Card } from "antd";
import styled from "styled-components";

export const InputWrapComponent = styled(Card)`
  border: none;
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

  &.invalid {
    input {
      border-color: red;
      background: #fbdada;
    }
  }
  @media (min-width: 768px) {
    align-items: center;
    flex-direction: row;
  }
`;
export const InfoCardIcon = styled.div`
  flex: 0 0 33.333333%;
  background: none;
  background-repeat: no-repeat !important;
  height: 12vh !important;
  width: 12vh !important;
  margin: 2vh;
  min-width: 16vh !important;
  min-height: 16vh !important;
  max-width: 16vh !important;
  max-height: 16vh !important;
  position: relative;
  right: 0;
  padding: 0;
  background-size: 100% auto !important;
`;

import styled, { css } from "styled-components";
import { Variables } from "./Constants/CSS";

export const NO_ANIMATION = css`
  ${(props: Variables) => props.borderRadius + "pxs"}; /* dummy text */
  ${({ noAnimation }) =>
    noAnimation == true &&
    `
    animation: none !important;
    -webkit-animation: none !important;
`}
`;
export const BackdropContainer = styled.div`
  width: 100vw;
  //   height: 100vh;
  background-color: rgba(0,0,0,0.3);
  position: fixed; /* Sit on top of the page content */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
  ${NO_ANIMATION}
`;

export const InputWrapComponent = styled.div`
  padding: ${(props: Variables) => `${props.padding}%`};
  align-items: ${(props: Variables) => `${props.align}`};
  ${NO_ANIMATION}
  border: none;
  label,
  input,
  .DraftEditor-editorContainer {
    display: block;
  }

  label {
    font-weight: bold;
    display: block;
    color: ${(props) => props.theme.textColor2};
    margin-bottom: 0.5rem;
  }

  input,
  textarea,
  .DraftEditor-editorContainer {
    display: block;
    font: inherit;
    padding: 0.35rem 0.35rem;
    border-radius: 6px;
    border: 1px solid #ccc;
    width: 100%;
  }

  input,
  .DraftEditor-editorContainer,
  textarea:focus {
    outline: none;
    border-color: #4f005f;
    background: #f6dbfc;
  }

  &.invalid {
    input,
    textarea,
    .DraftEditor-editorContainer {
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

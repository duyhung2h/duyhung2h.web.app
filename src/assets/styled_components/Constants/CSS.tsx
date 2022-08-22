import { css } from "styled-components";
import img from "../../images/bg.jpg";
import { Color } from "./Color";

export type Variables = {
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  disableBorder?: boolean;
  align?: string;
  themeId?: number;
  disableBorderShadow?: boolean;
  padding?: number;
  imgSrc?: string;
  backgroundLoop?: boolean;
  noAnimation?: boolean;
};
export type PProp = {
  color?: string;
  themeId?: number;
  theme?: any;
  isImportant?: boolean;
  isSecondaryColor?: boolean;
};
export const TEXT_COMPONENT = css`
  color: ${(props) => props.theme.textColor}${(props: PProp) => (props.isImportant == true ? " !important" : "")};
  ${({ isSecondaryColor }) =>
    isSecondaryColor == true &&
    `
    color: black !important;
`}
  border-radius: ${(props: PProp) => props.isSecondaryColor + "px"};
  color: ${(props: PProp) => props.color}${(props: PProp) => (props.isImportant == true ? " !important" : "")};
`;
export const BORDER_COMPONENT = css`
  ${({ borderColor }) =>
    `
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    border: 0px solid;
  border-color: ${Color.BLACK};
  border-color: ${borderColor};
`}
  /* mac dinh de disableBorder = false ( + border width 0px) */
  ${({ disableBorder }) =>
    disableBorder == true &&
    `
    border: 0px solid;
`}
  ${({ disableBorder, borderWidth }) =>
    disableBorder != true &&
    `
    border-width: ${borderWidth}px;
  `}
  ${({ disableBorderShadow }) =>
    disableBorderShadow == true &&
    `
    box-shadow: none;
  `}

  border-radius: 0px;
  border-radius: ${(props: Variables) => props.borderRadius + "px"};
`;
export const BORDER_NOHORIZONTAL_BOTTOM = css`
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
`;
export const BORDER_NOHORIZONTAL_TOP = css`
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
`;
export const SPACING = css`
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
`;
export const OVERLAY_CONTAINER = css`
  overflow: auto;
  color: ${(props: PProp) => props.color};
  background: ${(props) => props.theme.background};
  background: ${(props) =>
    props.theme.background == "aokh" ? `url(${img})` : props.theme.background};
  max-width: 40rem;
  margin: 2.5% auto;
  position: fixed; /* Sit on top of the page content */
  padding: 2.5%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 200; /* Specify a stack order in case you're using a different order for other elements */
`;

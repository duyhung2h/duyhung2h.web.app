import styled from "styled-components";
import img from "../../assets/images/bg.jpg";
import { Color } from "./Constants/Color";
import {
  BORDER_COMPONENT,
  BORDER_NOHORIZONTAL_BOTTOM,
  BORDER_NOHORIZONTAL_TOP,
  OVERLAY_CONTAINER,
  PProp,
  TEXT_COMPONENT,
  Variables,
} from "./Constants/CSS";

export const P = styled.p`
  ${TEXT_COMPONENT}
  ${(props: PProp) => props.isImportant + "pxs"}; /* dummy text */
`;
export const Span = styled.span`
  ${TEXT_COMPONENT}
  ${(props: PProp) => props.isImportant + "pxs"}; /* dummy text */
`;

export const CardDiv = styled.div`
  ${BORDER_COMPONENT}
  ${(props: Variables) => props.borderRadius + "pxs"}; /* dummy text */
  border-color: ${(props) => props.theme.borderColor};
`;
export const CardImage = styled.img`
  ${BORDER_COMPONENT}
  ${BORDER_NOHORIZONTAL_BOTTOM}
  position: absolute; /* Take your picture out of the flow */
  top: 0;
  bottom: 0;
  left: 0;
  right: 0; /* Make the picture taking the size of it's parent */
  width: 100%; /* This if for the object-fit */
  height: 100%; /* This if for the object-fit */
  object-fit: cover; /* Equivalent of the background-size: cover; of a background-image */
  object-position: center;
  ${(props: Variables) => props.borderRadius + "pxs"}; /* dummy text */
`;
export const CardImageBackground = styled.div`
  ${BORDER_COMPONENT}
  background-image: url(${(props: Variables) => props.imgSrc}) !important;
  background-repeat: ${(props: Variables) =>
    props.backgroundLoop ? "repeat" : "no-repeat"};
  position: fixed; /* Take your picture out of the flow */
  top: 0;
  bottom: 0;
  left: 0;
  right: 0; /* Make the picture taking the size of it's parent */
  background-size: 100%;
  width: 100vw; /* This if for the object-fit */
  height: auto; /* This if for the object-fit */
  object-fit: cover; /* Equivalent of the background-size: cover; of a background-image */
  object-position: center;
  z-index: 1;
  ${(props: Variables) => props.borderRadius + "pxs"}; /* dummy text */
`;
export const CardWrap = styled(CardDiv)`
  background: ${(props) => props.theme.cardWrap};
  padding: 10px;
  position: relative;
`;
export const BackgroundPanel = styled(CardDiv)`
  /* background: ${(props) => props.theme.background}; */
  background: ${(props) =>
    props.theme.background == "aokh" ? `url(${img})` : props.theme.background};
`;
export const CardContentWrap = styled(CardWrap)`
  ${BORDER_NOHORIZONTAL_TOP}
`;
export const CardImageWrap = styled(CardWrap)`
  ${BORDER_NOHORIZONTAL_BOTTOM}
  border-bottom-width: 0px;

  &:after {
    content: "";
    display: block;
    padding-bottom: 60%;
  }
`;

export const InfoCard = styled(CardDiv)`
  align-items: ${(props: Variables) => (props.align ? props.align : "center")};
  background: ${(props) => props.theme.infoCardBG};
  min-height: 20vh;

  a {
    text-decoration: none !important;
    color: ${Color.BLACK};
  }
  &.info_card__left {
    padding: 2vh;
  }
`;
export const LoginHidden = styled.li`
  height: 1.5em;
  width: auto !important;
  right: 0;
  position: initial;
  a {
    float: right;
  }
  div {
    z-index: 20000;
    opacity: 0;
    position: relative;
    left: 0;
    overflow: hidden;
    width: 100%;
    height: auto;
    padding: 0.5rem;
    -webkit-transition: all, 0.3s;
    -moz-transition: all, 0.3s;
    -ms-transition: all, 0.3s;
    -o-transition: all, 0.3s;
    transition: all, 0.3s;
    visibility: hidden;
    background: ${(props) => props.theme.loginHiddenBG};
  }
  &:hover div {
    visibility: visible;
    opacity: 1;
  }
`;

export const Header = styled.header`
  width: 100%;
  height: 5rem;
  padding: 0 10%;
  border: ${(props) => props.theme.border};
  background: ${(props) => props.theme.headerBG};
  nav {
    height: 100%;
  }

  ul {
    height: 100%;
    list-style: none;
    display: flex;
    padding: 0;
    margin: 0;
    align-items: center;
    justify-content: center;
  }

  li {
    margin: 0 1rem;
    width: 5rem;
  }

  a {
    text-decoration: none;
    cursor: pointer;
    color: ${(props) => props.theme.headerA};
  }

  a:hover,
  a:active,
  a.active {
    color: #95bcf0;
    padding-bottom: 0.25rem;
    border-bottom: 4px solid #95bcf0;
  }
`;
export const ControlWrap = styled(CardWrap)`
  margin: 1rem 0;
  display: block;
`;
export const ArticleItemPanel = styled.div`
  padding: 5%;
  @media (max-width: 768px) and (min-width: 0px) {
    width: 100% !important;
    max-width: 100% !important;
  }
  @media (max-width: 1536px) and (min-width: 768px) {
    width: 50% !important;
    max-width: 50% !important;
  }
  @media (min-width: 1536px) {
    width: 33% !important;
    max-width: 33% !important;
  }
  & .example__short-desc {
    overflow: hidden;
    max-height: 5ch;
  }
`;
export const Select = styled.select`
  color: ${(props) => props.theme.textColor};
  color: ${(props: PProp) => props.color};
  background: ${(props) =>
    props.theme.background == "aokh" ? `url(${img})` : props.theme.background};
`;

export const CardLogin = styled(InfoCard)`
  color: ${(props) => props.theme.textColor};
  color: ${(props: PProp) => props.color};
  background: ${(props) =>
    props.theme.background == "aokh" ? `url(${img})` : props.theme.background};
  width: 90%;
  max-width: 40rem;
  margin: 2rem auto;
  padding: 2rem;

  ${({ themeId, theme }) =>
    themeId == 1 &&
    `
  background: ${theme.background}
  color: ${theme.textColor};
    `}
  ${({ themeId, theme }) =>
    themeId != 1 &&
    `
  background: ${theme.background}
  color: ${theme.textColor};
    `}
`;

export const CardOverlayContainer = styled(InfoCard)`
  ${OVERLAY_CONTAINER}
`;

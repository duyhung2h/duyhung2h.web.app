import styled from "styled-components";
import img from "../../assets/images/bg.jpg";
import { Color } from "./Constants/Color";

export const BackgroundPanel = styled.div`
  /* background: ${(props) => props.theme.background}; */
  background: ${(props) =>
    props.theme.background == "aokh" ? `url(${img})` : props.theme.background};
`;
export const P = styled.p`
  color: ${(props) => props.theme.textColor};
`;
export const Span = styled.span`
  color: ${(props) => props.theme.textColor};
`;
export const CardImage = styled.img`
  border-radius: 15px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  position: absolute; /* Take your picture out of the flow */
  top: 0;
  bottom: 0;
  left: 0;
  right: 0; /* Make the picture taking the size of it's parent */
  width: 100%; /* This if for the object-fit */
  height: 100%; /* This if for the object-fit */
  object-fit: cover; /* Equivalent of the background-size: cover; of a background-image */
  object-position: center;
`;
export const CardWrap = styled.div`
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 15px;
  padding: 10px;
  position: relative;
  border: ${(props) => props.theme.border} !important;
  background: ${(props) => props.theme.cardWrap};
  border-color: ${(props) => props.theme.colorBlack};
`;
export const CardContentWrap = styled(CardWrap)`
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
`;
export const CardImageWrap = styled(CardWrap)`
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  border-bottom-width: 0px;

  &:after {
    content: "";
    display: block;
    padding-bottom: 60%;
  }
`;

type InfoCardVar = {
  disableBorder?: boolean;
  align?: string;
};
export const InfoCard = styled.div`
  align-items: ${(props: InfoCardVar) =>
    props.align ? props.align : "center"};
  border-radius: 10px;
  background: ${(props) => props.theme.infoCardBG};
  min-height: 20vh;
  ${({ disableBorder }) =>
    disableBorder == false &&
    `
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
      border: 1px solid;
      border-color: ${Color.BLACK};
    `}

  a {
    text-decoration: none !important;
    color: ${Color.BLACK};
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
    color: ${(props) =>
      props.theme.headerA};
  }

  a:hover,
  a:active,
  a.active {
    color: #95bcf0;
    padding-bottom: 0.25rem;
    border-bottom: 4px solid #95bcf0;
  }
`;

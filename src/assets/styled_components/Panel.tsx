import React from "react";
import styled from "styled-components";
import img from "../../assets/images/bg.jpg";

export const BackgroundPanel = styled.div`
  /* background: ${(props) => props.theme.background}; */
  background: ${(props) =>
    props.theme.background == "aokh" ? `url(${img})` : props.theme.background};
`;

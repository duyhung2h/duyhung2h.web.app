import styled from "styled-components";
import { Button } from "./Button";

export const RoundButton = styled(Button)`
  bottom: 0;
  right: 0;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  font-size: 60px;
  padding-top: 0px;
  height: auto;
  width: 100px;
  margin: 5%;
  cursor: pointer;
  border-radius: 50%;
  float: right;
  position: fixed;
  z-index: 10000;
`;

import React from "react";
import { BrowserRouter, NavLink, Route, Router } from "react-router-dom";
import useNavigate from "react-use-navigate";
import styled from "styled-components";
import { displayAlertInfoPopup } from "../AlertInfoPopup";
import { SquareButton } from "./Button";

export const Tags = (props: any) => {
  console.log(props);

  // const navigate = useNavigate();
  try {
    function OnTagClick(tagName: string) {
      displayAlertInfoPopup("Redirected to article tab!");
      try {
        props.onTagClick(tagName);
      } catch (error) {}
      // function goToPosts() {
      //   if (tagName == "null") {
      //     alert()
      //     tagName = "all"
      //   }
      //   navigate.push({ goTo: "articles?tagName=" + tagName });
      // }
      // goToPosts();
    }
    let queryString = "/articles";
    return (
      <>
        {props.tagList.map((tag: any) => (
          <NavLink to={"/articles?tagName=" + tag}>
            <Tag
              marginLeft="9px"
              tagString={tag}
              onClick={(event) => OnTagClick(tag)}
            >
              {tag}
            </Tag>
          </NavLink>
        ))}
      </>
    );
  } catch {
    return <></>;
  }
};
export function tagStringToColor(tagString: string, background: boolean) {
  let returnColor: string;
  background ? (returnColor = "black") : (returnColor = "white");
  switch (tagString) {
    case "personal": {
      background ? (returnColor = "purple") : (returnColor = "white");
      break;
    }
    case "tutorial": {
      background ? (returnColor = "red") : (returnColor = "white");
      break;
    }
    case "software": {
      background ? (returnColor = "Blue") : (returnColor = "white");
      break;
    }
    case "technology": {
      background ? (returnColor = "cyan") : (returnColor = "black");
      break;
    }
    case "updates": {
      background ? (returnColor = "green") : (returnColor = "white");
      break;
    }
    case "writings": {
      background ? (returnColor = "yellow") : (returnColor = "black");
      break;
    }
  }
  return returnColor;
}
export function displayTag(tagString: string) {
  let returnValue = "inherit";
  if (tagString == "") {
    returnValue = "none";
  }
  return returnValue;
}
export const Tag = styled(SquareButton)<{ tagString: string }>`
  background: ${(props) => tagStringToColor(props.tagString, true)};
  color: ${(props) => tagStringToColor(props.tagString, false)};
  &:hover {
    background: ${(props) => tagStringToColor(props.tagString, true)};
  }
  display: ${(props) => displayTag(props.tagString)};
`;

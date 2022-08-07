import React from "react";
import styled from "styled-components";
import { SquareButton } from "./Button";

export const Tags = ({ tagList }) => {
  try {
    return (
      <>
        {tagList.map((tag) => (
          <Tag marginLeft="9px" tagString={tag}>{tag}</Tag>
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
export const Tag = styled(SquareButton)<{ tagString: string }>`
  background: ${(props) => tagStringToColor(props.tagString, true)};
  color: ${(props) => tagStringToColor(props.tagString, false)};
  &:hover{
    background: ${(props) => tagStringToColor(props.tagString, true)};
  }
`;

import React from "react";
import styled from "styled-components";
import { reRender } from "../../app/view/small_components/Theme";
import store, { mapStateToProps } from "../../app/db/_redux";
import { Color } from "./Constants/Color";

export function getMainColor(themeId: any) {
  switch (themeId) {
    case 0: {
      return Color.BLACK
    }
    case 1: {
      return Color.WHITE
    }
  }
}

export const Button = styled.button`
  background: ${props => props.theme.textColor};
  border-radius: 3px;
  border: 2px solid ${getMainColor(store.getState().theme.theme)};
  color: ${getMainColor(store.getState().theme.theme)};
  padding: 0.25em 1em;
`;

export const Tags = ({ tagList }) => {
  try {
    return (
      <>
        {tagList.map((tag) => (
          <Tag tagString={tag}>{tag}</Tag>
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
      background ? (returnColor = "purple") : (returnColor = "white");
      break;
    }
  }
  return returnColor;
}
export const Tag = styled(Button)<{ tagString: string }>`
  background: ${(props) => tagStringToColor(props.tagString, true)};
  color: ${(props) => tagStringToColor(props.tagString, false)};
`;

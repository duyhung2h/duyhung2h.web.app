import { useReducer } from "react";
import { Color } from "../../../assets/styled_components/Constants/Color";
import { Select } from "../../../assets/styled_components/Panel";
import { React } from "../../../index";
import { getLocalStorageTheme, initialState, reducer } from "../../db/reducer/reducer";
import { AppContext } from "../pages/App/App";

export const Nav = (props: any) => {
  const { dispatch } = React.useContext(AppContext);
  const [state] = useReducer(reducer, initialState);
  const currentTheme = getLocalStorageTheme();
  console.log(initialState.currentTheme.id);
  console.log(currentTheme.id);
  

  const toggleTheme = (event) => {
    dispatch({ type: "toggleTheme", value: event?.target.value });
    // console.log(state.currentTheme);
  };

  return (
    <>
      <Select
        title="themeSwitcher"
        name="toggleSwitch"
        id="toggleSwitch"
        placeholder="placeholder"
        onChange={(event) => toggleTheme(event)}
        style={{ color: Color.BLACK }}
      >
        {true && "selected"}
        <option value="classic" selected={currentTheme.id == 0}>
          Classic theme
        </option>
        <option value="aokh" selected={currentTheme.id == 1}>
          AoKH themes
        </option>
        <option value="2" selected={currentTheme.id == 2}>
          id = 2
        </option>
      </Select>
    </>
  );
};

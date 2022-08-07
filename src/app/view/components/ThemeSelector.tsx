import { useReducer } from "react";
import { Color } from "../../../assets/styled_components/Constants/Color";
import { Select } from "../../../assets/styled_components/Panel";
import { React } from "../../../index";
import { initialState, reducer } from "../../db/reducer/reducer";
import { AppContext } from "../pages/App/App";

export const Nav = (props: any) => {
  const { dispatch } = React.useContext(AppContext);
  const [state] = useReducer(reducer, initialState);
  const { currentTheme } = state;

  const toggleTheme = (event) => {
    dispatch({ type: "toggleTheme", value: event?.target.value });
  };
  console.log(currentTheme);

  return (
    <>
      <Select
        title="themeSwitcher"
        className="toggle-switch-checkbox"
        name="toggleSwitch"
        id="toggleSwitch"
        placeholder="placeholder"
        onChange={(event) => toggleTheme(event)}
        style={{color: Color.BLACK}}
      >
        {true && "selected"}
        <option value="0" selected={currentTheme.id == 0}>
          Classic theme
        </option>
        <option value="1" selected={currentTheme.id == 1}>
          AoKH themes
        </option>
        <option value="2" selected={currentTheme.id == 2}>
          id = 2
        </option>
      </Select>
    </>
  );
};

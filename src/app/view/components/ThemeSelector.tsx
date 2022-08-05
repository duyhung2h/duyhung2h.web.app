import PropTypes from "prop-types";
import { React } from "../../../index";
import { connect } from "react-redux";
import { themeActions } from "../../db/slice/themeSlice";
import store, { mapStateToProps } from "../../db/_redux";
import { Theme } from "../small_components/Theme";
import styled from "styled-components";
import { AppContext } from "../pages/App/App";
import { useReducer } from "react";
import { initialState, reducer } from "../../db/reducer/reducer";

/**
 * ThemeSelector
 * Use Redux component to save theme preference on session
 *
 * @returns
 */
export const ThemeSelector = () => {
  const TestStyle = styled.span`
    background: ${store.getState().theme.theme == 1 ? "black" : "white"};
  `;
  class ThemeComponent extends Theme {
    static propTypes = {
      match: PropTypes.object.isRequired,
      location: PropTypes.object.isRequired,
      history: PropTypes.object.isRequired,
    };
    render() {
      const { match, location, history } = this.props;
      this.reRender();
      console.log(this.props);
      console.log(history);

      return (
        <>
          <React.Suspense fallback={<>Loading...</>}>
            <select
              title="themeSwitcher"
              className="toggle-switch-checkbox"
              name="toggleSwitch"
              id="toggleSwitch"
              placeholder="placeholder"
              onChange={this.themeHandler.bind(this)}
              value={this.props.theme.theme}
            >
              {true && "selected"}
              <option value="0" selected={this.props.theme.theme === "0"}>
                Classic theme
              </option>
              <option value="1" selected={this.props.theme.theme === "1"}>
                AoKH themes
              </option>
            </select>
            <input
              title="rememberTheme"
              type={"radio"}
              style={{
                position: "sticky",
                left: 0,
                background: "$background_color",
              }}
            />
            Remember my theme
            <TestStyle>test{store.getState().theme.theme}</TestStyle>
          </React.Suspense>
        </>
      );
    }
  }
  return ThemeComponent;
};
/////////////////////////////////////////////////////////////

export const mapDispatchToProps = (dispatch: any) => {
  return {
    change_theme: (value: number) => {
      dispatch(themeActions.change_theme(value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ThemeSelector());

export const Nav = (props: any) => {
  const { dispatch } = React.useContext(AppContext);
  const [state] = useReducer(reducer, initialState);
  const { currentTheme } = state;

  const toggleTheme = (event) => {
    dispatch({ type: "toggleTheme", value: event?.target.value });
  };
  console.log(currentTheme);

  return (
    <select
      title="themeSwitcher"
      className="toggle-switch-checkbox"
      name="toggleSwitch"
      id="toggleSwitch"
      placeholder="placeholder"
      onChange={(event) => toggleTheme(event)}
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
    </select>
  );
};

import PropTypes from "prop-types";
import React from "react";
import ReactDOM from "react-dom/client";

import { connect } from "react-redux";
import { Theme } from "../small_components/Theme";

/**
 * ThemeSelector
 * Use Redux component to save theme preference on session
 *
 * @returns
 */
export const ThemeSelector = () => {
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
            >
              <option value="0">Classic theme</option>
              <option value="1">AoKH themes</option>
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
          </React.Suspense>

          <div>You are now at {location.pathname}</div>
        </>
      );
    }
  }
  return ThemeComponent;
};
/////////////////////////////////////////////////////////////

const mapStateToProps = (state: any) => {
  return {
    counter: state.counter,
    theme: state.theme,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    change_theme: (value: number) =>
      dispatch({ type: "change_theme", amount: value }),
  };
};
export const checkHistory = (props: any) => {
  return <></>;
};

export default connect(mapStateToProps, mapDispatchToProps)(ThemeSelector());

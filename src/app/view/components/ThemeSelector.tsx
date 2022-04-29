import PropTypes from "prop-types";
import React from "react";
import { connect, useSelector } from "react-redux";
import { themeActions } from "../../db/slice/themeSlice";
import { mapStateToProps } from "../../db/_redux";
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
              value={this.props.theme.theme}
            >
              {true && "selected"}
              <option value="0" selected={this.props.theme.theme == "0"}>
                Classic theme
              </option>
              <option value="1" selected={this.props.theme.theme == "1"}>
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
          </React.Suspense>

          <div>You are now at {location.pathname}</div>
        </>
      );
    }
  }
  return ThemeComponent;
};
/////////////////////////////////////////////////////////////

const mapDispatchToProps = (dispatch: any) => {
  return {
    change_theme: (value: number) => {
      dispatch(themeActions.change_theme(value));
    },
  };
};
export const CheckHistory = (props: any) => {
  const useSelectorValue = useSelector((state: any) => state.theme.theme);
  return <>{/* <div>{useSelectorValue}</div> */}</>;
};

export default connect(mapStateToProps, mapDispatchToProps)(ThemeSelector());

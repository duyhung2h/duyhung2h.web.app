import PropTypes from "prop-types";
import React from "react";
import ReactDOM from "react-dom/client";
import { connect } from "react-redux";

/**
 * ThemeSelector
 *
 * @returns
 */
export const ThemeSelector = () => {
  let themeValue = 0;
  class Counter extends React.Component<any> {
    static propTypes = {
      match: PropTypes.object.isRequired,
      location: PropTypes.object.isRequired,
      history: PropTypes.object.isRequired,
    };
    static themes = {
      dark: "/src/assets/scss/test2.scss",
      light: "test.module.scss",
    };
    static container: HTMLElement | null = document.getElementById("root");
    static root = ReactDOM.createRoot(this.container || new HTMLElement());
    themeHandler(e: any) {
      //   const newThemeValue = e.target.value || themeValue;

      var all = document.getElementsByTagName("*");
      if (themeValue == 0) {
        themeValue = 1;
        this.props.change_theme(themeValue);
      } else {
        themeValue = 0;
        this.props.change_theme(themeValue);
      }
      for (var i = 0, max = all.length; i < max; i++) {
        all[i].classList.remove("theme_color" + 0);
        all[i].classList.remove("theme_color" + 1);
        all[i].classList.add("theme_color" + themeValue);
      }
    }
    reRender() {
      setTimeout(function () {
        var all = document.getElementsByTagName("*");
        for (var i = 0, max = all.length; i < max; i++) {
          all[i].classList.remove("theme_color" + 0);
          all[i].classList.remove("theme_color" + 1);
          all[i].classList.add("theme_color" + themeValue);
        }
      }, 0);
    }
    render() {
      const { match, location, history } = this.props;
      this.reRender();
      console.log(this.props);
      console.log(history);

      return (
        <>
          <React.Suspense fallback={<>Loading...</>} >
              <select
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
  return Counter;
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
    increment: (value: number) =>
      dispatch({ type: "increment", amount: value }),
    decrement: (value: number) =>
      dispatch({ type: "decrement", amount: value }),
    change_theme: (value: number) =>
      dispatch({ type: "change_theme", amount: value }),
  };
};
export const checkHistory = (props: any) => {
  return <></>;
};

export default connect(mapStateToProps, mapDispatchToProps)(ThemeSelector());

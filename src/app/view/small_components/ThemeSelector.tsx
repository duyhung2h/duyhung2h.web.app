import React, { useEffect, useState } from "react";
import "../../../assets/scss/toggle_switch.scss";
import { getThemeIndexLocalstorage } from "../../context/ThemeContext";

/**
 * ThemeSelector
 *
 * @param props
 * @returns
 */
export const ThemeSelector = (props: any) => {
  const [themeIndex, setThemeIndex] = useState(1);
  useEffect(() => {
    try {
      console.log(themeIndex);

      //   setThemeIndex(getThemeIndexLocalstorage());
    } catch (error) {
      console.log(error);
      setThemeIndex(1);
    }
    console.log("useEffect ThemeSelector");
  }, []);
  var kek = (event: any) => {
    console.log(event.target.checked);
    console.log("testddd");
    if (event.target.checked) {
      setThemeIndex(2);
    } else {
      setThemeIndex(1);
    }
  };
  const Theme = (props: any) => {
    let ThemeLoader = React.lazy(() =>import("./Button").then((module) => ({
        default: module.default,
      }))
    );
    if (themeIndex == 1) {
      ThemeLoader = React.lazy(() =>
        import("./ThemeLoader").then((module) => ({
          default: module.ThemeLoader,
        }))
      );
      alert()
    }
    // const CHOSEN_THEME =
    // localStorage.getItem("TYPE_OF_THEME") || TYPE_OF_THEME.DEFAULT;
    console.log(themeIndex);

    return (
      <>
        <React.Suspense fallback={<>Loading...</>}>
          <input
            type="checkbox"
            className="toggle-switch-checkbox"
            name="toggleSwitch"
            id="toggleSwitch"
            placeholder="placeholder"
            // checked={true}
            onChange={props.onChange}
            defaultChecked={themeIndex == 2}
          />
          <label className="toggle-switch-label">
            {themeIndex}
            <span className="toggle-switch-inner"></span>
            <span className="toggle-switch-switch"></span>
          </label>
          {themeIndex == 1 && (
            //   <p>asd</p>
            <ThemeLoader></ThemeLoader>
          )}
        </React.Suspense>
      </>
    );
  };
  return (
    <div className="toggle-switch">
      <Theme onChange={kek}></Theme>
    </div>
  );
};
export default ThemeSelector;

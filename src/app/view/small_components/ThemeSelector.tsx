import loadable from "@loadable/component";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

const container: HTMLElement | null = document.getElementById("theme");
const root = ReactDOM.createRoot(container || new HTMLElement());
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
  }, [themeIndex]);
  var kek = (event: any) => {
    console.log(event.target.checked);
    console.log("testddd");
    if (event.target.checked) {
      setThemeIndex(2);
    } else {
      setThemeIndex(1);
    }
  };
  /**
   * Theme tag
   * lazy loading: Only load component when it's needed, using certain condition (dynamic)
   *
   * @param props
   * @returns
   */
  const Theme = (props: any) => {
    // console.log(component);
    const TL = loadable(() =>
      import(`./ThemeLoader${themeIndex}`).then((module) => ({
        default: module[`ThemeLoader${themeIndex}`],
      }))
    );
    // var TL = React.lazy(() =>
    //   import("./ThemeLoader1").then((module) => ({
    //     default: module.ThemeLoader1,
    //   }))
    // );
    // if (themeIndex == 1) {
    //   TL = React.lazy(() =>
    //     import("./ThemeLoader1").then((module) => ({
    //       default: module.ThemeLoader1,
    //     }))
    //   );
    //   alert(1);
    // } else {
    //   TL = React.lazy(() =>
    //     import("./ThemeLoader2").then((module) => ({
    //       default: module.ThemeLoader2,
    //     }))
    //   );
    //   alert(2);
    // }
    // const CHOSEN_THEME =
    // localStorage.getItem("TYPE_OF_THEME") || TYPE_OF_THEME.DEFAULT;
    console.log(themeIndex);
    var linkNode = document.querySelector('link[href*="test2.scss"]');
    console.log(linkNode);
    
    linkNode?.removeChild(linkNode);
    root.render(<TL root={true}/>);
    linkNode?.removeChild(linkNode);
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
            defaultChecked={themeIndex === 2}
          />
          <label className="toggle-switch-label">
            {themeIndex}
            <span className="toggle-switch-inner"></span>
            <span className="toggle-switch-switch"></span>
          </label>
          {/* {themeIndex == 1 && <TL />}
          {themeIndex == 2 && <TL />} */}
        </React.Suspense>
      </>
    );
  };
  console.log(`./ThemeLoader${themeIndex}1`);

  return (
    <div className="toggle-switch">
      <Theme onChange={kek}></Theme>
    </div>
  );
};
export default ThemeSelector;

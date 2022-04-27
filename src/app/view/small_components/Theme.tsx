import React from "react";

export class Theme extends React.Component<any> {
  static themeValue = 0;
  themeHandler(e: any) {
    if (Theme.themeValue == 0) {
      Theme.themeValue = 1;
      this.props.change_theme(Theme.themeValue);
    } else {
      Theme.themeValue = 0;
      this.props.change_theme(Theme.themeValue);
    }
    this.reRender();
  }
  reRender() {
    setTimeout(function () {
      var all = document.getElementsByTagName("*");
      for (var i = 0, max = all.length; i < max; i++) {
        all[i].classList.remove("theme_color" + 0);
        all[i].classList.remove("theme_color" + 1);
        all[i].classList.add("theme_color" + Theme.themeValue);
      }
    }, 0);
  }
}

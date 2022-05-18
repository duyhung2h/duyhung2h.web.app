import React from "react";

export function reRender(themeValue: any) {
  setTimeout(function () {
    var all = document.getElementsByTagName("*");
    for (var i = 0, max = all.length; i < max; i++) {
      all[i].classList.remove("theme_color" + 0);
      all[i].classList.remove("theme_color" + 1);
      all[i].classList.add("theme_color" + themeValue);
    }
  }, 0);
}
export class Theme extends React.Component<any> {
  themeValue = 0;
  themeHandler(e: any) {
    if (this.themeValue === 0) {
      this.themeValue = 1;
      this.props.change_theme(this.themeValue);
    } else {
      this.themeValue = 0;
      this.props.change_theme(this.themeValue);
    }
    this.reRender();
  }
  reRender() {
    reRender(this.props.theme.theme)
  }
}

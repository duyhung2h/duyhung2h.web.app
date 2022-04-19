export function getThemeIndexLocalstorage() {
  let themeIndex: any;
  try {
    themeIndex = JSON.parse(localStorage["themeIndex"]);
  } catch {
    themeIndex = 1;
  }
  return themeIndex;
}

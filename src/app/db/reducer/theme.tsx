const base = {
    easeOutBack: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    colorWhite: "rgb(255, 255, 255)",
    colorBlack: "rgb(0, 0, 0)"
  };
  
  const classic = {
    id: 0,
    ...base,
    background: "#999999",
    textColor: 'black',
    navColor: "indianred"
  };
  
  const aokh = {
    id: 1,
    ...base,
    // background: "#ffa216",
    background: "aokh",
    textColor: 'white',
    navColor: "lightcoral"
  };
  
  export const theme = { classic: classic, aokh: aokh };
import { Color } from "../../../assets/styled_components/Constants/Color";

const base = {
    easeOutBack: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    colorWhite: Color.WHITE,
    colorBlack: "rgb(0, 0, 0)"
  };
  
  const classic = {
    id: 0,
    ...base,
    background: "#f0f0f0",
    cardWrap: Color.WHITE,
    infoCardBG: Color.WHITE,
    textColor: 'black',
    navColor: "indianred"
  };
  
  const aokh = {
    id: 1,
    ...base,
    background: "aokh",
    cardWrap: Color.SECONDARY_BACKGROUND_LIGHTER_1,
    infoCardBG: Color.SECONDARY_BACKGROUND_LIGHTER_1,
    textColor: 'white',
    navColor: "lightcoral"
  };
  
  export const theme = { classic: classic, aokh: aokh };
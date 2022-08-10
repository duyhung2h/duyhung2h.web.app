import { Color } from "../../../assets/styled_components/Constants/Color";

const base = {
    easeOutBack: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    colorWhite: Color.WHITE,
    colorBlack: "rgb(0, 0, 0)",
  };
  
  const classic = {
    id: 0,
    name: "classic",
    ...base,
    background: "#f0f0f0",
    cardWrap: Color.WHITE,
    infoCardBG: Color.WHITE,
    headerBG: Color.SECONDARY_BACKGROUND_0,
    headerA: Color.WHITE,
    loginHiddenBG: Color.SEMI_WHITE,
    buttonBG: Color.SECONDARY_BACKGROUND_0,
    buttonActiveBG: Color.SECONDARY_BACKGROUND_LIGHTER_0,
    textColor: Color.WHITE,
    textColor2: Color.BLACK,
    border: `1px solid ${Color.WHITE}`,
    borderColor: `${Color.WHITE}`,
    navColor: "indianred"
  };
  
  const aokh = {
    id: 1,
    name: "aokh",
    ...base,
    background: "aokh",
    cardWrap: Color.SECONDARY_BACKGROUND_LIGHTER_1,
    infoCardBG: Color.SECONDARY_BACKGROUND_LIGHTER_1,
    headerBG: Color.SECONDARY_BACKGROUND_1,
    headerA: Color.BLACK,
    loginHiddenBG: Color.SECONDARY_BACKGROUND_LIGHTER_1,
    buttonBG: Color.SECONDARY_BACKGROUND_1,
    buttonActiveBG: Color.SECONDARY_BACKGROUND_LIGHTER_1,
    textColor: Color.BLACK,
    textColor2: Color.BLACK,
    border: `1px solid ${Color.BLACK}`,
    borderColor: `${Color.BLACK}`,
    navColor: "lightcoral"
  };
  
  export const theme = { classic: classic, aokh: aokh };
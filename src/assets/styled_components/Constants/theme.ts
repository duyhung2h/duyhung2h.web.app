export type FontWeight = 'light' | 'normal' | 'medium' | 'bold';
export type FontSize = 'tiny' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'| 'xxl';
export type Radius = 'sm' | 'md' | 'lg' | 'xl' | 'none';
export type Shadows = 'sm' | 'md' | 'lg' | 'xl';
export type Screen = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
export type Spacing = 'none' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ZIndex = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type BorderColors = 'light' | 'main' | 'dark';
export type GreyColors = 5 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90;
export type BlueColors = 5 | 10 ;
export type PurpleColors = 5 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90;
export type SocialColors = 'facebook' | 'twitter' | 'linkedIn' | 'github';
export type GeneralColors =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'info'
  | 'error'
  | 'link'
  | 'body'
  | 'white'
  | 'text'
  | 'textSecondary'
  | 'disabled'
  | 'transparent'
  | 'darkMode'
  | 'blue'
  | 'active'
  | 'inherit';
export type ButtonColors =
  | 'primary'
  | 'secondary'

interface IFont {
  family: string;
  weight: { [key in FontWeight]: string };
  size: { [key in FontSize]: string };
  lineHeight: { [key in FontSize]: string };
}
type IShadows = { [key in Shadows]: string };
type IScreen = { [key in Screen]: string };
type ISpacing = { [key in Spacing]: string };
type IRadius = { [key in Radius]: string };
type IZIndex = { [key in ZIndex]: number };
export interface IColors {
  general: { [key in GeneralColors]: string };
  button: { [key in ButtonColors]: string };
  border: { [key in BorderColors]: string };
  grey: { [key in GreyColors]: string };
  purple: { [key in PurpleColors]: string };
  blue: { [key in BlueColors]: string };
  social: { [key in SocialColors]: string };
}

export interface Theme {
  font: IFont;
  screen: IScreen;
  spacing: ISpacing;
  shadows: IShadows;
  radius: IRadius;
  zIndex: IZIndex;
  colors: IColors;
}

const theme: Theme = {
  font: {
    family:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Poppins"',
    weight: {
      light: '300',
      normal: '400',
      medium: '500',
      bold: '600',
    },
    size: {
      tiny: '8px',
      xxs: '12px',
      xs: '14px',
      sm: '16px',
      md: '18px',
      lg: '24px',
      xl: '32px',
      xxl: '40px',
    },
    lineHeight: {
      tiny: '14px',
      xxs: '18px',
      xs: '20px',
      sm: '22px',
      md: '24px',
      lg: '32px',
      xl: '40px',
      xxl: '50px',
    },
  },

  colors: {
    general: {
      primary: '',
      secondary: 'rgba(228, 228, 228, 0.1)',
      success: '#7FBA7A',
      warning: '#FF754C',
      info: '#4169E1',
      error: '#F44335',
      link: '#0073F5',
      body: '#F5F6F7',
      white: '#FFFFFF',
      darkMode: '#1F2128',
      text: '#808191',
      textSecondary: '#E4E4E4',
      disabled: '#CDD0D4',
      transparent: 'transparent',
      blue: '#3F8CFF ',
      active: '#6C5DD3',
      inherit: 'inherit'
    },
    button: {
      primary: '#6C5DD3',
      secondary: 'rgba(228, 228, 228, 0.1)',
    },
 
    border: {
      light: '#f5f5f5',
      main: 'rgba(228, 228, 228, 0.1)',
      dark: '#bdbdbd',
    },

    social: {
      facebook: '#385898',
      twitter: '#1DA1F2',
      linkedIn: '#2867B2',
      github: '#171515',
    },
    blue : {
      5: '#3F8CFF',
      10: '#0049C6',
    },
    purple: {
      5: 'rgb(108, 93, 211)',
      10: 'rgba(108, 93, 211, 0.1)',
      20: 'rgba(108, 93, 211, 0.2)', //todo..
      30: 'rgba(108, 93, 211, 0.3)',
      40: 'rgba(108, 93, 211, 0.4)',
      50: 'rgba(108, 93, 211, 0.5)',
      60: 'rgba(108, 93, 211, 0.6)',
      70: 'rgba(108, 93, 211, 0.7)',
      80: 'rgba(108, 93, 211, 0.8)',
      90: 'rgba(108, 93, 211, 0.9)',
    },
    grey: {
      5: '#E4E4E4',
      10: 'rgba(228, 228, 228, 0.1)',
      20: '#242731', //todo..
      30: '#CCD0D5',
      40: '#BEC3C9',
      50: '#8D949E',
      60: '#606770',
      70: '#444950',
      80: '#303338',
      90: '#1C1E21',
    },
  },

  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.14)',
    md: 'rgba(0, 0, 0, 0.3) 0px 1px 8px 0px',
    lg: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    xl: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
  },

  screen: {
    xxs: '390px',
    xs: '540px',
    sm: '640px',
    md: '1007px',
    lg: '1100px',
    xl: '1230px',
    xxl: '1440px',
    xxxl: '1920px',
  },

  spacing: {
    none: '0', 
    xxs: '8px',
    xs: '16px',
    sm: '24px',
    md: '32px',
    lg: '40px',
    xl: '64px',
  },

  radius: {
    none: '0',
    sm: '8px',
    md: '14px',
    lg: '16px',
    xl: '24px',
  },

  zIndex: {
    xs: 10,
    sm: 20,
    md: 30,
    lg: 40,
    xl: 50,
  },
};

export default theme;

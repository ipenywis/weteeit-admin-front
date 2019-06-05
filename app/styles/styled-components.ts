import * as styledComponents from 'styled-components';

// theme.ts
// your theme variables
export interface IThemeInterface {
  primary: string;
  componentBackground: string;
  componentBackgroundSecondary: string;
}

export const theme = {
  default: {
    primary: '#007bff',
    mainBackground: '#F5F6F8',
    componentBackground: '#fff',
    componentBackgroundSecondary: '#fbfbfb',
    light: '#bdc3c7',
    semiLight: '#adadad',
    semiDark: '#828181',
    darkText: '#3d5170',
    dark: '#343b3c',
    muted: '#818ea3',
  },
};

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
} = styledComponents as styledComponents.ThemedStyledComponentsModule<
  IThemeInterface
>;

export { css, createGlobalStyle, keyframes, ThemeProvider };
export default styled;

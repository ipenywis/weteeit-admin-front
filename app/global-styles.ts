import { createGlobalStyle } from 'styles/styled-components';

const GlobalStyle = createGlobalStyle`

  * {
    box-sizing: border-box;
  }

  html,
  body {
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
  }

  @import url('https://fonts.googleapis.com/css?family=Open+Sans&display=swap');

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    height: 100%;
    width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }

  a {
    text-decoration: none;
    color: inherit;
    &:hover {
      text-decoration: none;
    }
  }
`;

export default GlobalStyle;

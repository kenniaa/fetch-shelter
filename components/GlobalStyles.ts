import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  html {
    height: 100vh;
    scroll-behavior: smooth;
  }

  body {
    padding: 0;
    margin: 0;
    background: #ffffff;
    color: #1f1f1f;
    font-family: 'Fira Sans', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
    height: 100vh;
    box-sizing: border-box;
    overflow-x: hidden;
    min-height: 100vh;
    font-size: 1rem;
    line-height: 1;
  }

  * {
    -webkit-tap-highlight-color: transparent;
  }

  a {
    color: #555ab9;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
`;

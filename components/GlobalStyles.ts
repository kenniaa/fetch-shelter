import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  html {
    height: 100%;
    width: 100%;
  }

  body {
    padding: 0;
    margin: 0;
    background: #181818;
    color: #DDD;
    font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    overflow-x: hidden;
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

import { createGlobalStyle } from 'styled-components'
import { normalize } from 'styled-normalize'

export const GlobalStyles = createGlobalStyle`
  ${normalize}

  * {
    font-family: 'Roboto', sans-serif;
    box-sizing: border-box;
  }

  h1, h2, h3, h4, h5, h6, p {
    margin: 0;
  }

  button {
    outline: none;
    background: transparent;
    border: none;
    padding: 0;
  }

  body {
    color: ${({ theme }) => theme.palette.main5};
    background: ${({ theme }) => theme.palette.base};
    line-height: 1.5;
  }

  input, button {
    -webkit-tap-highlight-color: transparent;
  }

  pre {
    border: none;
    outline-color: ${({ theme }) => theme.palette.main2};
  }

  a {
    outline: none;
    border: none;
    text-decoration: none;
  }

  div {
    box-sizing: border-box;
  }

  // Remove the blue highlight of button on mobile
  a:active, button:active, div:active {
    -webkit-tap-highlight-color: transparent;
  }

  // scrollbar
  *::-webkit-scrollbar {
    width: 6px;
    height: 6px;

  }
  *::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0);
  }
  *::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.palette.main2};
    border-radius: 2px;
  }
  *::-webkit-scrollbar-button {
    display: none;
  }

  // recharts styles override 
  .recharts-legend-item {
    align-items: center !important;
    margin-right: 16px !important;
    
    svg {
      margin-right: 10px !important;
    }
  }
`

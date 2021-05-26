import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import 'semantic-ui-css/semantic.min.css';

import background from '../assets/images/background.svg';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html {
    @media(max-width: 920px) {
        font-size: 80%;
    }
  }

  ::-webkit-scrollbar {
      width: 4px !important;
      height: 4px !important;
  }

  ::-webkit-scrollbar-thumb {
      background-color: #6D6E71 !important;
  }

  ::-webkit-scrollbar-track {
      background: transparent !important;
  }


  body {
    background: #191920 url(${background}) no-repeat center top;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 0.875rem Roboto, sans-serif;
  }

  #root {
    max-width: 1020px;
    margin: 0 auto;
    padding: 0 20px 50px;
  }

  button {
    cursor: pointer;
  }
`;

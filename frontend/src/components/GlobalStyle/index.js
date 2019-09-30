import { createGlobalStyle } from 'styled-components';

import bg from '../../assets/bg_big.svg'
import small from '../../assets/bg_small.svg'

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Lato:300,400,700&display=swap');

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    width: 100%;
    height: 120px;
    background-repeat: no-repeat;
    background-image: url(${bg});
    background-color: #F6F6F4;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }

  html,
  body,
  input,
  button {
    font-family: 'Lato', sans-serif;
  }

  h3 {
    font-size: 30px;
    color: #FFF;
  }

  label {
    color: #5A5A5A
  }
`;

export const ChangeBackground = createGlobalStyle`
  body {
    background-image: url(${small});
  }
`

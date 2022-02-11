import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
body {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    width: 350px;
    height: 600px;
    
  }
  *{
    box-sizing: border-box;
  }
`;

export default GlobalStyle;

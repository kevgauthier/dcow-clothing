import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    body {
        margin: 0;
        font-family: 'Open Sans', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        padding: 20px 40px;
    }
    
    
    *{
        box-sizing: border-box;
    }
    
    a {
        text-decoration: none;
        color: #000;
        box-sizing: border-box;
        &:hover{
        color: #323232;
        text-decoration: none;
        }
    }
`;
import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;		
    }
    body {
        overflow: hidden;
        font-size: 32px;
        letter-spacing: 1px;
        background: #1D1C21;
        font-family: 'Ubuntu', sans-serif;
    }
`;

export default GlobalStyles;

import { createGlobalStyle } from "styled-components";
import { dark } from "./Themes";
import FontSize from "./FontSizes.json";

export const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    html, body {
        background: ${dark.background.application};
        font-size: ${FontSize.ROOT};
        line-height: 1.15;
        font-family: 'Roboto', sans-serif;
        -webkit-text-size-adjust: 100%;
    }
    button, input {
        font-family: inherit;
    }

`;

export default GlobalStyles;

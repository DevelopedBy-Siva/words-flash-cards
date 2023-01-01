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
        font-family: 'Ubuntu', sans-serif;
        line-height: 1.15;
        -webkit-text-size-adjust: 100%;
    }
`;

export default GlobalStyles;

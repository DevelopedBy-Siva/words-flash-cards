import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import GlobalStyles from "./assets/styles/GlobalStyles";
import { dark } from "./assets/styles/Themes";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ThemeProvider theme={dark}>
      <GlobalStyles />
      <App />
    </ThemeProvider>
  </BrowserRouter>
);

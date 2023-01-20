import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

import Store from "./redux/store";
import GlobalStyles from "./assets/styles/GlobalStyles";
import { dark } from "./assets/styles/Themes";
import App from "./App";
import Toast from "./components/toast";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={Store}>
    <BrowserRouter>
      <ThemeProvider theme={dark}>
        <GlobalStyles />
        <App />
        <Toast />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
);

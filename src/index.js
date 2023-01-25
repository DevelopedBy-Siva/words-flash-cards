import React from "react";
import ReactDOM from "react-dom/client";
import store from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

import GlobalStyles from "./assets/styles/GlobalStyles";
import App from "./App";
import Toast from "./components/toast";
import { dark } from "./assets/styles/Themes";
import { initialiseWords } from "./redux/reducer/Words";

store.dispatch(initialiseWords);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={dark}>
        <GlobalStyles />
        <App />
        <Toast />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
);

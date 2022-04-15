import "core-js/stable";
import "regenerator-runtime/runtime";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";

import store from "./store";
import { theme } from "constants/theme";

function render(Component) {
  ReactDOM.render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Component />
      </ThemeProvider>
    </Provider>,
    document.getElementById("root")
  );
}

export function mountApp() {
  const NextApp = require("./App.js").default;
  render(NextApp);
}

mountApp();

if (module.hot) {
  module.hot.accept("./App.js", () => mountApp());
}

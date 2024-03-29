import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import AppContainer from "./containers/AppContainer";
import dotenv from "dotenv";

import "./scss/index.scss";

dotenv.config();

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </Router>,
  document.getElementById("root")
);

window.store = store;

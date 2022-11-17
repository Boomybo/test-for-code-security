import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "antd/dist/antd.css";

import { App } from "./Components/App/App";
import { createStore } from "./Redux/store";
import "./index.scss";

const store = createStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

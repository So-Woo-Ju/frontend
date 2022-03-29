import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "antd/dist/antd.css";
import { LoginProvider } from "contexts";

ReactDOM.render(
  <BrowserRouter>
    <LoginProvider>
      <App />
    </LoginProvider>
  </BrowserRouter>,
  document.getElementById("root"),
);

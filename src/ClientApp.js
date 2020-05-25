import React from "react";
import ReactDOM from "react-dom";
import { hydrate } from "react-dom";
import App from "./index";

process.env.NODE_ENV === "development"
  ? ReactDOM.render(<App />, document.getElementById("root"))
  : hydrate(<App />, document.getElementById("root"));

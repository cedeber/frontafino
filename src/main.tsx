import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

/* use hydrate for ssr */
ReactDOM.render(<App />, document.querySelector("#app"));

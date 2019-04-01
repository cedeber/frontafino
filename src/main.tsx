import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";

console.log("Hello, sourcemaps!");
import("./async").then(module => module.default("Hello, async!"));
ReactDOM.render(<App who="Cédric" />, document.querySelector("#app"));

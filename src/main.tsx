import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";

if (document.body) {
    import("./async").then(module => module.default("Hello, async!"));
}

console.log("Hello, sourcemaps!");

ReactDOM.render(<App who="Cédric" />, document.querySelector("#app"));

import * as React from "react";
import * as ReactDOM from "react-dom";

import App from "./App";

/* use hydrate instead of render for ssr */
ReactDOM.hydrate(<App />, document.querySelector("#app"));

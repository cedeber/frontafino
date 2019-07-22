import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

/* use hydrate instead of render for ssr */
if (process.env.NODE_ENV === 'production') {
    ReactDOM.hydrate(<App />, document.querySelector("#app"));
} else {
    ReactDOM.render(<App />, document.querySelector("#app"))
}

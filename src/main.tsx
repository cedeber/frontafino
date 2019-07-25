import "regenerator-runtime/runtime";
import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

// Service Worker
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.ts").then(
        function(registration) {
            // Registration was successful
            console.log("ServiceWorker registration successful with scope: ", registration.scope);

            fetch("/.ping/whatever")
                .then(response => response.text())
                .then(data => alert(data));
        },
        function(err) {
            // registration failed :(
            console.log("ServiceWorker registration failed: ", err);
        },
    );
}

// Web Assembly
import { add } from './assembly/math.rs'

console.log(add(4, 1));

/* use hydrate instead of render for SSR */
if (process.env.NODE_ENV === "production") {
    ReactDOM.hydrate(<App />, document.querySelector("#app"));
} else {
    ReactDOM.render(<App />, document.querySelector("#app"));
    (module as any).hot.accept();
}

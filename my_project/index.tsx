import connect from "./utils/connect";

if (process.env.NODE_ENV === "development") {
    // require("preact/debug");
}

import React from "react";
import ReactDOM from "react-dom";

import { MainPage } from "../shell_app/views";
import "./styles/global.scss";

import { FocusStyleManager } from "@blueprintjs/core";
FocusStyleManager.onlyShowFocusOnTabs();

import { Hello } from "../web_components_app/views";
connect("hello-you", Hello, ["who"]);

// Service Worker
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./service_worker.ts").then(
        function(registration) {
            // Registration was successful
            console.log("ServiceWorker registration successful with scope: ", registration.scope);

            fetch("/.ping/whatever")
                .then(response => response.text())
                .then(data => console.log("sw", data));
        },
        function(err) {
            // registration failed :(
            console.log("ServiceWorker registration failed: ", err);
        },
    );
}

ReactDOM.render(<MainPage />, document.querySelector("#app"));

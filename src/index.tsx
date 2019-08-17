if (process.env.NODE_ENV === "development") {
    // require("preact/debug");
}

import React from "react";
import ReactDOM from "react-dom";

// import { Customizer } from 'office-ui-fabric-react/lib/Utilities'
// import { FluentCustomizations } from '@uifabric/fluent-theme/lib/FluentCustomizations'
// import { loadTheme } from "office-ui-fabric-react/lib/Styling";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";

import { initializeIcons } from "@uifabric/icons";
initializeIcons();

import { MainPage } from "./app/views";

import "./boilerplate/styles/global.scss";

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

ReactDOM.render(
    <Fabric>
        <MainPage />
    </Fabric>,
    document.querySelector("#app"),
);

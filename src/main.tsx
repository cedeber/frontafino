import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";

import("./async").then(module => module.default("Hello, async!"));

console.log("Hello, sourcemaps!");
ReactDOM.render(<App who="Cédric" />, document.querySelector("#app"));

const worker = new Worker("./workers/ping");

worker.onmessage = event => {
    const { message } = event.data;

    console.log(message);
};

worker.postMessage({message: "Hello, worker"});

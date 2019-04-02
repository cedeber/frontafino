import React from "react";
import ReactDOM from "react-dom";
import { Router, Link } from "@reach/router"

import App from "./components/App";

import("./async").then(module => module.default("Hello, async!"));

console.log("Hello, sourcemaps!");

let About = (_: any) => <div>About</div>;

ReactDOM.render(
    <>
        <nav>
          <Link to="/">Home</Link> |{" "}
          <Link to="about">About</Link>
        </nav>
        <Router>
            <App who="You" path="/" />
            <About path="about" />
      </Router>
    </>,
    document.querySelector("#app")
);

const worker = new Worker("./workers/ping");

worker.onmessage = event => {
    const { message } = event.data;

    console.log(message);
};

worker.postMessage({ message: "Hello, worker" });

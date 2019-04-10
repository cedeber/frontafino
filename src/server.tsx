import * as express from "express";
import * as path from "path";
import * as fs from "fs";
import * as React from "react";
// import { renderToString } from "react-dom/server";
import { renderToNodeStream } from "react-dom/server";
import { ServerLocation } from "@reach/router";
import App from "./App";

const port = process.env.PORT || 8000;
const app = express();
const htmlParts = fs.readFileSync("./index.html").toString().split("<!-- ssr -->");

// Ensure secure connection
app.use(function(req, res, next) {
    if (req.hostname === "localhost") {
        return next();
    }

    req.headers["x-forwarded-proto"] === "https"
        ? next()
        : res.redirect(`https://${req.headers.host}${req.url}`);
});

// Serve static
app.use(express.static(path.resolve("static")));

// Serve JavaScript
app.get(/.+\.(js|js.map)$/, function(req, res) {
    res.sendFile(path.resolve(path.join("__build__", req.path)));
});

// Single Page Application
app.get("*", function(req, res) {
    res.write(htmlParts[0]);

    const reactMarkup = (
        <ServerLocation url={req.url}>
            <App/>
        </ServerLocation>
    );
    const stream = renderToNodeStream(reactMarkup);

    stream.pipe(res, { end: false });
    stream.on("end", () => {
        res.write(htmlParts[1]);
        res.end();
    });

    // res.send(html.replace("<!-- ssr -->", renderToString(reactMarkup)));
    // res.end();
});

app.listen(port);

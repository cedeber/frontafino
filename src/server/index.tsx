import express from "express";
import path from "path";
import fs from "fs";
import React from "react";
// import { renderToString } from "react-dom/server";
import { renderToNodeStream } from "react-dom/server";
import { ServerLocation } from "@reach/router";
import App from "../App";

const port = process.env.PORT || 8080;
const app = express();
const htmlParts = fs.readFileSync("./dist/index.html").toString().split("<!-- ssr -->");

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
app.use(express.static(path.resolve("dist")));

// Single Page Application
app.get("*", function(req, res) {
    res.send(fs.readFileSync("./dist/index.html").toString());
    res.end();
    return;

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

console.log(port);
app.listen(port);

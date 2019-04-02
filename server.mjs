import express from "express";
import path from "path";

const port = process.env.PORT || 8000;
const app = express();

// Ensure secure connection
app.use(function(req, res, next) {
    console.log(req.secure, req.headers["x-forwarded-proto"]);
    if (req.hostname === "localhost") {
        return next();
    }

    req.secure ? next() : res.redirect(`https://${req.headers.host}${req.url}`);
});

// Serve assets
app.use(express.static(path.resolve("assets")));

// Serve JS and Web Manifest
app.get(/.+\.(js|js.map|webmanifest)$/, function(req, res) {
    res.sendFile(path.resolve(path.join("www", req.path)));
});

// Single Page Application
app.get("*", function(req, res) {
    res.sendFile(path.resolve("www/index.html"));
});

app.listen(port);

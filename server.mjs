import express from "express";
import path from "path";

const port = process.env.PORT || 8000;
const app = express();

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

// Serve JS and Web Manifest
app.get(/.+\.(js|js.map)$/, function(req, res) {
    res.sendFile(path.resolve(path.join("build", req.path)));
});

// Single Page Application
app.get("*", function(req, res) {
    res.sendFile(path.resolve("index.html"));
});

app.listen(port);

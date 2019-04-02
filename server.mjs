import express from "express";
import path from "path";

const port = process.env.PORT || 8000;
const app = express();

app.use(express.static(path.resolve("assets")));

app.get("*", ensureSecure);

app.get(/.+\.(js|js.map|webmanifest)$/, function(request, response) {
    response.sendFile(path.resolve(path.join("www", request.path)));
});

app.get("*", function(request, response) {
    response.sendFile(path.resolve("www/index.html"));
});

app.listen(port);

function ensureSecure(request, response, next) {
    if (
        request.secure ||
        request.hostname === "localhost" ||
        request.hostname === "127.0.0.1"
    ) {
        return next();
    }

    response.redirect("https://" + request.hostname + request.url);
}

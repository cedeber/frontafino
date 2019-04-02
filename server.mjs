import express from "express";
import path from "path";

const port = process.env.PORT || 8000;
const app = express();

app.use(express.static(path.resolve("assets")));

app.get(/.+\.(js|webmanifest)$/, function(request, response) {
    response.sendFile(path.resolve(path.join("www", request.path)));
});

app.get("*", function(request, response) {
    response.sendFile(path.resolve("www/index.html"));
});

app.listen(port);

const http = require("http");
const micro = require("micro");
const handler = require("serve-handler");

const PORT = process.env.PORT || 3000;

const server = http.createServer(
    micro(async (request, response) => {
        return await handler(request, response, {
            public: "./dist",
            rewrites: [{ source: "app/**", destination: "/index.html" }],
        });
    }),
);

console.log("Listening on port:", PORT);
server.listen(PORT);

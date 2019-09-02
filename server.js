const http = require("http");
const micro = require("micro");
const handler = require("serve-handler");

const server = http.createServer(
    micro(async (request, response) => {
        return await handler(request, response, {
            public: "./dist",
            rewrites: [{ source: "app/**", destination: "/index.html" }],
        });
    }),
);

server.listen(process.env.PORT || 3000);

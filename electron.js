require("@babel/register")({
    extensions: [".ts", ".tsx", ".js", ".jsx", ".mjs"],
    presets: [
        ["@babel/preset-env", {
            "targets": {
                "node": "12",
            },
        }],
        "@babel/preset-typescript",
        "@babel/preset-react",
    ],
    plugins: [
        "@babel/proposal-class-properties",
        "@babel/proposal-object-rest-spread",
    ],
});

require("./src/electron/index.tsx");

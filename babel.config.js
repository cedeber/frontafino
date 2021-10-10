module.exports = {
    presets: [
        "@docusaurus/core/lib/babel/preset",
        ["@babel/preset-env", { targets: { node: "current" } }],
        "@babel/preset-typescript",
        "@babel/preset-react",
    ],
};

module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                useBuiltIns: "usage",
                corejs: { version: 2, proposals: true },
                targets: {
                    esmodules: true,
                },
            },
        ],
    ],
};

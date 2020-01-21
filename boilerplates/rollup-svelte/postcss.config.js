const production = !process.env.ROLLUP_WATCH;

module.exports = {
    plugins: [
        require("postcss-import")(),
        require("tailwindcss"),
        require("autoprefixer"),
        production && require("@fullhuman/postcss-purgecss")({
            content: ["./src/**/*.svelte", "./public/**/*.html"],
            defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
        }),
        production && require('cssnano')({
            preset: 'default',
            calc: false,
            discardComments: {
                removeAll: true,
            },
        }),
    ]
};

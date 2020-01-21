import resolve from "@rollup/plugin-node-resolve";
import svelte from "rollup-plugin-svelte";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";
import postcss from "rollup-plugin-postcss";

let production = !process.env.ROLLUP_WATCH;

export default {
    input: "src/main.js",
    output: {
        sourcemap: true,
        format: "esm",
        name: "app",
        file: "build/bundle.js",
    },
    plugins: [
        postcss({
            extract: "./build/utils.css",
        }),
        svelte({
            dev: production,
            css: css => {
                css.write("build/bundle.css");
            },
        }),
        resolve({
            browser: true,
            dedupe: importee => importee === "svelte" || importee.startsWith("svelte/")
        }),
        !production && serve({
            contentBase: ["public", "build"],
            port: 5000,
            historyApiFallback: true,
        }),
        !production && livereload("build"),
        production && terser({
            mangle: false,
        }),
    ],
    watch: {
        clearScreen: false,
    },
};

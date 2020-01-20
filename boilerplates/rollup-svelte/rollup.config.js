import resolve from "@rollup/plugin-node-resolve";
import svelte from "rollup-plugin-svelte";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";
import postcss from "rollup-plugin-postcss";
import sass from 'node-sass';

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
            extract: "build/utils.css",
        }),
        svelte({
            dev: production,
            css: css => {
                css.write("build/bundle.css");
            },
            preprocess: {
                style: ({ content, attributes }) => {
                    if (attributes.type !== 'text/scss') return;

                    return new Promise((fulfil, reject) => {
                        sass.render({
                            data: content,
                            includePaths: ['src'],
                            sourceMap: true,
                            outFile: 'x' // this is necessary, but is ignored
                        }, (err, result) => {
                            if (err) return reject(err);

                            fulfil({
                                code: result.css.toString(),
                                map: result.map.toString()
                            });
                        });
                    });
                }
            }
        }),
        resolve({
            browser: true,
            dedupe: importee => importee === "svelte" || importee.startsWith("svelte/")
        }),
        !production && serve({
            contentBase: ["static", "build"],
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

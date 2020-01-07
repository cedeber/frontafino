import { terser } from "rollup-plugin-terser";

export default [{
    input: "./pkg/hello_wasm.js",
    output: {
        file: "./pkg/hello_wasm.min.js",
        format: "esm"
    },
    plugins: [
        terser({
            mangle: false
        })
    ]
}]
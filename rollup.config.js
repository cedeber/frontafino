import replace from "rollup-plugin-replace";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import { terser } from "rollup-plugin-terser";

export default {
    input: "__out__/main.js",
    cache: process.env.BUILD === "development",
    plugins: [
        replace({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
        }),
        resolve(),
        commonjs({
            include: "node_modules/**",
            sourcemap: process.env.BUILD === "development",
            namedExports: {
                "node_modules/react/index.js": [
                    "createElement",
                    "createContext",
                    "forwardRef",
                    "Component",
                    "Fragment",
                ],
            },
        }),
        process.env.BUILD === "production" ? terser() : null,
    ],
    output: {
        dir: "static",
        format: "esm",
        sourcemap: process.env.BUILD === "development",
    },
};

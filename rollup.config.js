import typescript from "rollup-plugin-typescript";
import replace from "rollup-plugin-replace";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import workz0r from "rollup-plugin-workz0r";
import { terser } from "rollup-plugin-terser";

const devMode = process.env.NODE_ENV === "development";

export default {
    input: "src/main.tsx",
    cache: devMode,
    plugins: [
        typescript(),
        replace({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
        }),
        resolve(),
        commonjs({
            include: "node_modules/**",
            sourcemap: devMode,
            namedExports: {
                "node_modules/react/index.js": [
                    "createElement",
                    "createContext",
                    "forwardRef",
                    "Component",
                    "Fragment",
                    "Suspense",
                    "useEffect",
                    "useRef",
                    "useState",
                ],
            },
        }),
        workz0r(),
        devMode ? null : terser(),
    ],
    output: {
        dir: "__build__",
        format: "esm",
        sourcemap: devMode,
    },
};

import * as reactPlugin from "vite-plugin-react";
import type { UserConfig } from "vite";

const config: UserConfig = {
    jsx: "react",
    plugins: [reactPlugin],
    outDir: "../build/",
};

export default config;

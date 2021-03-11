import "./global.css";
import loader from "@assemblyscript/loader";
import type ASModule from "../types/wasm";

async function loadWasm<T extends Record<string, unknown>>(
    path: string,
    imports?: Record<string, unknown>,
): Promise<loader.ASUtil & T> {
    let loaderImports: loader.Imports = {};

    if (imports != undefined) {
        loaderImports = { index: imports };
    }

    const { exports } = await loader.instantiate<T>(fetch(path), loaderImports);

    return exports;
}

async function main() {
    const { add, __getString } = await loadWasm<typeof ASModule>("/app.wasm", {
        consoleLog: (res: number) => console.log("from wasm", __getString(res)),
    });

    const result = add(3, 2);

    console.log("from js", result);
}

main();

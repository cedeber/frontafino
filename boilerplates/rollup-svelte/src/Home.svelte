<script>
    import init from "../wasm_modules/hello_wasm";
    import * as Comlink from "../web_modules/comlink";

    init("/wasm/hello_wasm_bg.wasm");

    (async function () {
        let worker = Comlink.wrap(new Worker("/workers/worker.js"));

        alert(`Counter: ${await worker.counter}`);
        await worker.inc();
        alert(`Counter: ${await worker.counter}`);
    }());

    export let params;
</script>

<main>
    <h1 class="text-6xl font-thin text-center text-blue-600">Hello {params && params.name || "world"}!</h1>
    <h2>Test</h2>
    <div class="flex justify-center">
        <button class="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded">
            Button
        </button>
    </div>
</main>

<style>
    h2 {
        color: crimson;
    }
</style>

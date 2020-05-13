import connect from "./utils/connect";
import App from "./App.svelte";
import "./main.css";

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker.js");
}

// --- With Web Components ---
// You can connect as much Web Components as you want.
connect("svelte-app", App, ["foo"]);

// --- Single Page App ---
/*
const app = new App({
    target: document.body,
    props: {},
});
*/

// export default app;

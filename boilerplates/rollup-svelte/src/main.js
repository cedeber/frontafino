import App from "./App.svelte";
import "./main.css";

const app = new App({
    target: document.body,
    props: {},
});

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker.js");
}

export default app;

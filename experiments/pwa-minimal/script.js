let localInput = document.querySelector("#local-input");
let sessionInput = document.querySelector("#session-input");

localInput.value = localStorage.getItem("local-value") || "";
localInput.addEventListener("change", event => localStorage.setItem("local-value", event.target.value));

sessionInput.value = sessionStorage.getItem("session-value") || "";
sessionInput.addEventListener("change", event => sessionStorage.setItem("session-value", event.target.value));

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./service-worker.js");
}

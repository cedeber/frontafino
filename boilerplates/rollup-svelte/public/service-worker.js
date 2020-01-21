async function networkOnly(fetchEvent) {
    return fetch(fetchEvent.request);
}

self.addEventListener("fetch", networkOnly);

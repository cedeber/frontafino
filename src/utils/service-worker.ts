/* --- Strategies --- */

//=> network ? save : cache
export async function networkFirst(cacheName, fetchEvent) {
    const request = fetchEvent.request;
    let fetchResponse;

    return fetch(request)
        .then(response => toCache(cacheName, request, fetchResponse = response))
        .then(response => response
            ? Promise.resolve(response)
            : fromCache(cacheName, request))
        .then(response => response || fetchResponse);
}

//=> cache ? cache : (network ? save)
export async function cacheFirst(cacheName, fetchEvent) {
    return fromCache(cacheName, fetchEvent.request)
        .then(response => response || networkFirst(cacheName, fetchEvent));
}

//=> cache ? cache : network => network ? save
export async function staleWhileRevaliate(cacheName, fetchEvent) {
    return fromCache(cacheName, fetchEvent.request)
        .then(response => response
            ? Promise.race([
                Promise.resolve(response),
                networkFirst(cacheName, fetchEvent),
            ])
            : networkFirst(cacheName, fetchEvent));
}

//=> network
export async function networkOnly(fetchEvent) {
    return fetch(fetchEvent.request);
}

//=> cache
export async function cacheOnly(cacheName, fetchEvent) {
    return fromCache(cacheName, fetchEvent.request);
}


/* --- Helpers --- */

export async function toCache(cacheName, request, response) {
    return response.ok
        ? caches.open(cacheName)
            .then(cache => cache.put(request, response.clone()))
            .then(() => response)
        : Promise.resolve(undefined);
}

export async function fromCache(cacheName, request) {
    return caches.match(request, { cacheName });
}

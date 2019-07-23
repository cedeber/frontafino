import "regenerator-runtime/runtime";
/* --- Configuration --- */

const appCacheName = "cache-v1";
const preCacheFiles = [];


/* --- Manage requests --- */

self.addEventListener("fetch", fetchEvent => {
    const requestUrl = new URL(fetchEvent.request.url);

    // Apply SW strategies here
    if (/(.+)\.cache\.(.+)/.test(requestUrl.pathname)) {
        fetchEvent.respondWith(cacheFirst(appCacheName, fetchEvent));
    } else {
        fetchEvent.respondWith(networkFirst(appCacheName, fetchEvent));
    }
});


/* --- Pre-cache some files --- */

self.addEventListener("install", extandableEvent => {
    extandableEvent.waitUntil(
        caches.open(appCacheName)
            .then(cache => cache.addAll(preCacheFiles),
            ),
    );
});


/* --- Clear all unused caches --- */

self.addEventListener("activate", extandableEvent => {
    extandableEvent.waitUntil(
        caches
            .keys()
            .then(cacheNames =>
                cacheNames
                    .filter(cacheName => cacheName !== appCacheName)
                    .map(cacheName => caches.delete(cacheName)),
            ),
    );
});


/* --- Strategies --- */

//=> network ? save : cache
async function networkFirst(cacheName, fetchEvent) {
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
async function cacheFirst(cacheName, fetchEvent) {
    return fromCache(cacheName, fetchEvent.request)
        .then(response => response || networkFirst(cacheName, fetchEvent));
}

//=> cache ? cache : network => network ? save
async function staleWhileRevaliate(cacheName, fetchEvent) {
    return fromCache(cacheName, fetchEvent.request)
        .then(response => response
            ? Promise.race([
                Promise.resolve(response),
                networkFirst(cacheName, fetchEvent),
            ])
            : networkFirst(cacheName, fetchEvent));
}

//=> network
async function networkOnly(fetchEvent) {
    return fetch(fetchEvent.request);
}

//=> cache
async function cacheOnly(cacheName, fetchEvent) {
    return fromCache(cacheName, fetchEvent.request);
}


/* --- Helpers --- */

async function toCache(cacheName, request, response) {
    return response.ok
        ? caches.open(cacheName)
            .then(cache => cache.put(request, response.clone()))
            .then(() => response)
        : Promise.resolve(undefined);
}

async function fromCache(cacheName, request) {
    return caches.match(request, { cacheName });
}

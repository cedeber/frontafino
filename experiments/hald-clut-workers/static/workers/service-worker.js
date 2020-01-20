importScripts("/static/workers/sw-utils.js");

const appCacheName = "cache-v2";


// Clear all unused caches
self.addEventListener("activate", /** @type ExtendableEvent */event => {
    event.waitUntil(
        caches
            .keys()
            .then(cacheNames =>
                cacheNames
                    .filter(cacheName => cacheName !== appCacheName)
                    .map(cacheName => caches.delete(cacheName)),
            ),
    );
});


// Pre-cache somme files
self.addEventListener("install", /** @type ExtendableEvent */event => {
    event.waitUntil(
        caches.open(appCacheName)
            .then(cache => cache.addAll([
                    "/",
                    "/static/fonts/3904C6_0_0.woff2",
                    "/static/fonts/3904C6_1_0.woff2",
                    "/static/haldclut/haldclut.json",
                    "/static/workers/pimio.js",
                ]),
            ),
    );
});


// All requests
self.addEventListener("fetch", /** @type FetchEvent */event => {
    const requestUrl = new URL(event.request.url);

    // Apply SW strategies here
    if (
        /^\/assets\/(.+)\.(woff2)$/.test(requestUrl.pathname) ||
        /^\/haldclut\/(.+)\.(png|json)$/.test(requestUrl.pathname) ||
        /^\/static\/(.+)\.(js)$/.test(requestUrl.pathname) ||
        /^\/$/.test(requestUrl.pathname)
    ) {
        event.respondWith(cacheFirst(appCacheName, event));
    } else {
        console.log("worker", requestUrl.pathname);
        event.respondWith(networkFirst(appCacheName, event));
    }
});

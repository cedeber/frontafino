import { cacheFirst, networkFirst } from "./utils/service-worker";

/* --- Configuration --- */

const appCacheName = "cache-v1";
const preCacheFiles: string[] = [];

/* --- Manage requests --- */

self.addEventListener("fetch", (fetchEvent: FetchEvent) => {
    const requestUrl = new URL(fetchEvent.request.url);

    // Apply SW strategies here
    if (/(.+)\.cache\.(.+)/.test(requestUrl.pathname)) {
        return fetchEvent.respondWith(cacheFirst(appCacheName, fetchEvent));
    }

    if (/(.+)\.ping\/(.+)/.test(requestUrl.pathname)) {
        const response = new Response(requestUrl.pathname);

        return fetchEvent.respondWith(response);
    }

    fetchEvent.respondWith(networkFirst(appCacheName, fetchEvent));
});

/* --- Pre-cache some files --- */

self.addEventListener("install", (extandableEvent: ExtendableEvent) => {
    extandableEvent.waitUntil(caches.open(appCacheName).then(cache => cache.addAll(preCacheFiles)));
});

/* --- Clear all unused caches --- */

self.addEventListener("activate", (extandableEvent: ExtendableEvent) => {
    extandableEvent.waitUntil(
        caches
            .keys()
            .then(cacheNames =>
                cacheNames.filter(cacheName => cacheName !== appCacheName).map(cacheName => caches.delete(cacheName)),
            ),
    );
});

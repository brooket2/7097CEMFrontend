const CACHE_NAME = "v2";
const urlsToCache = [
    "/",
    "/css/site.css",
    "/js/site.js",
    "/ShoppingMallLogoV2.png"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(urlsToCache))
            .then(() => {
                console.log("Service Worker: Installed and cached resources");
            })
            .catch((error) => console.error("Error caching resources: ", error))
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request)
                    .then((fetchResponse) => {
                        return caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, fetchResponse.clone());
                            return fetchResponse;
                        });
                    });
            })
            .catch((error) => {
                console.error("Error fetching resource: ", error);
                return new Response("Network error", { status: 408 });
            })
    );
});

self.addEventListener("activate", (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

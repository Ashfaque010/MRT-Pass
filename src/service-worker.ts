/// <reference lib="webworker" />

// This service worker can be customized
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("dhaka-mrt-v1").then((cache) => {
      return cache.addAll(["/", "/index.html", "/manifest.json"]);
    }),
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }),
  );
});

self.addEventListener("activate", (event) => {
  const cacheWhitelist = ["dhaka-mrt-v1"];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
          return null;
        }),
      );
    }),
  );
});

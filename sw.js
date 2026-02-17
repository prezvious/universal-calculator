const CACHE_NAME = 'universal-calc-v1';

const PRECACHE_URLS = [
    './',
    './index.html',
    './style.css',
    './js/core.js',
    './js/ui.js',
    './js/utils.js',
    './js/math.js',
    './js/mathUtils.js',
    './js/physics.js',
    './js/chemistry.js',
    './js/statistics.js',
    './js/converters.js',
    'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js'
];

// Install: pre-cache all essential resources
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(PRECACHE_URLS);
        }).then(() => self.skipWaiting())
    );
});

// Activate: clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME)
                    .map((name) => caches.delete(name))
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch: cache-first, then update cache from network in background
self.addEventListener('fetch', (event) => {
    const request = event.request;

    // Only handle GET requests
    if (request.method !== 'GET') return;

    event.respondWith(
        caches.match(request).then((cachedResponse) => {
            // Start a network fetch in the background to update the cache
            const networkFetch = fetch(request).then((networkResponse) => {
                // Only cache valid responses
                if (networkResponse && networkResponse.status === 200) {
                    const responseClone = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(request, responseClone);
                    });
                }
                return networkResponse;
            }).catch(() => {
                // Network failed — that's fine, we'll use cache
                return cachedResponse;
            });

            // Return cached version immediately if available, otherwise wait for network
            return cachedResponse || networkFetch;
        })
    );
});

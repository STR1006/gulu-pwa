const CACHE_NAME = 'gulu-pwa-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  // Vite's built assets are usually in the root of the 'dist' folder after build.
  // During development, they are served via the dev server.
  // For production, you'll need to update this to include the actual built JS/CSS files.
  // For now, let's precache the essential static files.
  '/pwa-icon-192.png',
  '/pwa-icon-512.png',
  '/manifest.json',
  // You might want to add /src/index.css or other initial CSS files, but Vite
  // typically bundles CSS into the JS during build.
];

self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching assets.');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('Service Worker: Cache addAll failed:', error);
      })
  );
  self.skipWaiting(); // Activates the new service worker immediately
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Clearing old cache:', cacheName);
            return caches.delete(cacheName);
          }
          return null;
        }).filter(Boolean) // Filter out nulls
      );
    })
  );
  clients.claim(); // Makes the service worker control all clients immediately
});

self.addEventListener('fetch', (event) => {
  // console.log('Service Worker: Fetching', event.request.url); // Uncomment for debugging
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        // If not in cache, fetch from network
        return fetch(event.request)
          .then(networkResponse => {
            // Check if we received a valid response
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and can only be consumed once. We must clone it so that
            // both the browser and the cache can consume it.
            const responseToCache = networkResponse.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return networkResponse;
          })
          .catch(error => {
            console.error('Service Worker: Fetch failed:', error);
            // You can return an offline page here if needed
            // return caches.match('/offline.html');
          });
      })
  );
});
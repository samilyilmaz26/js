const CACHE_NAME = 'wc-app-cache-v1';
const urlsToCache = ['/', '/index.html', '/src/app-root.js', '/src/event-bus.js', '/src/store.js',
  '/src/components/nav-bar.js', '/src/components/toast-container.js',
  '/src/pages/page-home.js', '/src/pages/page-about.js'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)));
});

self.addEventListener('fetch', (event) => {
  event.respondWith(caches.match(event.request).then((response) => response || fetch(event.request)));
});

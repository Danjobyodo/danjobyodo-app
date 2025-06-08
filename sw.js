const CACHE_NAME = 'danjobyodo-app-cache-v3';

const urlsToCache = [
  '/danjobyodo-app/',
  '/danjobyodo-app/index.html',
  '/danjobyodo-app/page1.html',
  '/danjobyodo-app/page2.html',
  '/danjobyodo-app/detail.html',
  '/danjobyodo-app/style.css',
  '/danjobyodo-app/main.js',
  '/danjobyodo-app/images/icon-byodo512x512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});

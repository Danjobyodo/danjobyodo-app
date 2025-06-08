const CACHE_NAME = 'danjo-byodo-app-cache-v1';
// ↓ キャッシュするファイルを更新
const urlsToCache = [
  '.',
  'index.html',
  'page1.html',
  'page2.html',
  'page2-detail.html',
  'style.css',
  'main.js',
  'images/icon-512x512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
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

const CACHE_NAME = 'danjo-byodo-app-cache-v2'; // バージョンを更新
// キャッシュするファイルを絶対パスで明記
const urlsToCache = [
  '/danjobyodo-app/',
  '/danjobyodo-app/index.html',
  '/danjobyodo-app/page1.html',
  '/danjobyodo-app/page2.html',
  '/danjobyodo-app/detail.html',
  '/danjobyodo-app/style.css',
  '/danjobyodo-app/main.js',
  '/danjobyodo-app/images/icon-512x512.png'
];

// インストール時にファイルをキャッシュする
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// リクエスト時にキャッシュを返す
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // キャッシュがあればそれを返し、なければネットワークから取得する
        return response || fetch(event.request);
      })
  );
});

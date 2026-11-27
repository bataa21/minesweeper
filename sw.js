const CACHE_NAME = 'minesweeper-mn-v1.8';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Суулгах үед кэшлэх
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Кэш нээгдлээ');
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Идэвхжүүлэх үед хуучин кэшийг устгах
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// Файл хүсэх үед кэшээс авах
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
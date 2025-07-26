const CACHE_NAME = 'eventos-favanu-v1';
const FILES_TO_CACHE = [
  './',
  './index.html',
  './css/style.css',
  './js/app.js',
  './js/eventos.js',
  './js/ui.js',
  './js/modal.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).then(response => {
      // Actualiza la caché con la última versión
      return caches.open(CACHE_NAME).then(cache => {
        cache.put(e.request, response.clone());
        return response;
      });
    }).catch(() => {
      // Si falla la red, usa la caché
      return caches.match(e.request);
    })
  );
});
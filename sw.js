// ==========================================================================
// SERVICE WORKER - GESTOR CONGREGACIÓN (PWA OFFLINE ENGINE)
// ==========================================================================
const CACHE_NAME = 'congregacion-pwa-v4';

// Recursos esenciales que se guardan durante la instalación
const STATIC_ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './css/styles.css',
    './js/db.js',
    './js/hermanos.js',
    './js/ajustes.js',
    './js/informes.js',
    './js/asignaciones.js',
    './js/territorios.js',
    './js/asistencia.js',
    './js/ui.js',
    './js/main.js',
    './icons/icon-192.png',
    './icons/icon-512.png',
    './icons/icon-maskable-192.png',
    './icons/icon-maskable-512.png',
    './icons/favicon-48.png',
    './icons/icon-apple-180.png',
    'https://cdn.jsdelivr.net/npm/xlsx@0.18.1/dist/xlsx.full.min.js'
];

// Instalación: Precarga todos los recursos en Cache Storage
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[Service Worker] Precargando recursos de la aplicación...');
            // Intentar cachear individualmente para evitar que un fallo en un CDN bloquee el resto
            return Promise.allSettled(
                STATIC_ASSETS.map((asset) =>
                    cache.add(asset).catch((err) => {
                        console.warn(`[Service Worker] No se pudo cachear ${asset}:`, err);
                    })
                )
            );
        }).then(() => self.skipWaiting())
    );
});

// Activación: Limpieza de versiones antiguas de caché
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        console.log('[Service Worker] Eliminando caché antigua:', key);
                        return caches.delete(key);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Interceptor de peticiones (Fetch)
self.addEventListener('fetch', (event) => {
    const req = event.request;

    // Solo interceptar peticiones GET HTTP/HTTPS
    if (req.method !== 'GET' || !req.url.startsWith('http')) return;

    // Estrategia para navegación (HTML): Network first con fallback a caché
    if (req.mode === 'navigate') {
        event.respondWith(
            fetch(req).then((networkResponse) => {
                return caches.open(CACHE_NAME).then((cache) => {
                    cache.put(req, networkResponse.clone());
                    return networkResponse;
                });
            }).catch(() => {
                return caches.match('./index.html').then((cached) => cached || caches.match('./') || caches.match(req));
            })
        );
        return;
    }

    // Estrategia Cache First con actualización en segundo plano para recursos estáticos
    event.respondWith(
        caches.match(req).then((cachedResponse) => {
            if (cachedResponse) {
                // Actualizar en segundo plano si hay conexión
                fetch(req).then((networkResponse) => {
                    if (networkResponse && networkResponse.status === 200) {
                        caches.open(CACHE_NAME).then((cache) => cache.put(req, networkResponse));
                    }
                }).catch(() => {});
                return cachedResponse;
            }

            // Si no está en caché, buscar en la red
            return fetch(req).then((networkResponse) => {
                if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic' && networkResponse.type !== 'cors') {
                    return networkResponse;
                }
                const responseToCache = networkResponse.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(req, responseToCache);
                });
                return networkResponse;
            }).catch((err) => {
                console.warn('[Service Worker] Falló la petición de red y no hay caché para:', req.url);
            });
        })
    );
});

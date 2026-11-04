/**
 * Sanatan Dharma PWA Service Worker
 * Provides offline capabilities, asset caching, and fast app-like experience
 */

const CACHE_NAME = 'sanatan-pwa-v1';

// Core assets to pre-cache immediately
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable.png',
  './icons/apple-touch-icon.png',
  './icons/icon.svg'
];

// Install Event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('Some pre-cache assets could not be cached immediately:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate Event: Clean up outdated caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            console.log('Clearing old cache:', name);
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event: Smart Caching Strategy
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // 1. Only handle GET requests
  if (req.method !== 'GET') return;

  // 2. Never cache external AI APIs or Analytics
  if (
    url.hostname.includes('openrouter.ai') ||
    url.hostname.includes('generativelanguage.googleapis.com') ||
    url.hostname.includes('pollinations.ai') ||
    url.protocol.startsWith('chrome-extension')
  ) {
    return;
  }

  // 3. Navigation requests (HTML / SPAs): Network first, fall back to cached index.html
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
          }
          return response;
        })
        .catch(() => {
          return caches.match('./index.html') || caches.match('./');
        })
    );
    return;
  }

  // 4. Same-origin static assets (JS, CSS, Images, Fonts): Stale-While-Revalidate
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(req).then((cachedResponse) => {
        const fetchPromise = fetch(req)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const clone = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
            }
            return networkResponse;
          })
          .catch(() => {
            // Ignore fetch errors if cachedResponse exists
          });

        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // 5. External static assets (Google Fonts, CDNs, Leaflet tiles): Cache first with network fallback
  if (
    url.hostname.includes('fonts.googleapis.com') ||
    url.hostname.includes('fonts.gstatic.com') ||
    url.hostname.includes('tile.openstreetmap.org') ||
    url.hostname.includes('unpkg.com')
  ) {
    event.respondWith(
      caches.match(req).then((cached) => {
        if (cached) return cached;
        return fetch(req)
          .then((res) => {
            if (res && res.status === 200) {
              const clone = res.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
            }
            return res;
          })
          .catch(() => cached);
      })
    );
  }
});


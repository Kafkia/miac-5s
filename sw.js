const CACHE = '5s-miac-rev01';
const FILES = ['./', './index.html', 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js', './manifest.webmanifest', './icon-192.png', './icon-512.png', './maskable-192.png', './maskable-512.png', './apple-touch-icon.png', './icon-32.png', './pdf.min.js', './pdf.worker.min.js'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => { const r = e.request; if (r.method !== 'GET') return;
  if (r.mode === 'navigate') { e.respondWith(fetch(r).then(res => { const c = res.clone(); caches.open(CACHE).then(x => x.put('./index.html', c)); return res; }).catch(() => caches.match('./index.html'))); return; }
  e.respondWith(caches.match(r).then(m => m || fetch(r).then(res => { if (res.ok && new URL(r.url).origin === location.origin) { const c = res.clone(); caches.open(CACHE).then(x => x.put(r, c)); } return res; }).catch(() => m))); });

// แบบเดียวกับ PuiHome&Tax: โหลดจากเน็ตก่อน (อัปเดตเห็นทันที) ถ้าออฟไลน์ใช้ของที่เก็บไว้
// ไม่เก็บคำขอ Supabase
const CACHE = 'investman-v3';
const ASSETS = ['./', './index.html', './manifest.json?v=3', './logo.svg', './icon-192.png', './icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || req.url.includes('.supabase.co')) return;
  e.respondWith(
    fetch(req).then(res => {
      if (res.ok && req.url.startsWith(self.location.origin)) {
        const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy));
      }
      return res;
    }).catch(() => caches.match(req).then(r => r || caches.match('./index.html')))
  );
});

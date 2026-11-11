// ให้เบราว์เซอร์ถือว่าเป็นแอปที่ติดตั้งได้ (ต้องมีตัวรับ fetch)
// แต่ไม่ยุ่งกับการเปิดหน้าเว็บ — การเปิดหน้าที่ผ่านตัวนี้แล้วเจอ redirect ทำให้เปิดแอปไม่ได้
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', (e) => {
  if (e.request.mode === 'navigate' || e.request.method !== 'GET') return;
  if (new URL(e.request.url).origin !== self.location.origin) return;
  e.respondWith(fetch(e.request));
});

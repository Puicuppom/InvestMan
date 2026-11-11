// ไม่ดักคำขอใดๆ — ปล่อยให้เบราว์เซอร์โหลดตามปกติ
// (เดิมดัก fetch แล้วส่งต่อเอง ทำให้ iPhone เปิดแอปจากหน้าจอโฮมไม่ได้เมื่อมีการ redirect)
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

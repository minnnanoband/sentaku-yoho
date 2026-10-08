// カレンダー登録用：/ics/～.ics?d=<base64url> を text/calendar のファイルとして返す（iPhoneのSafari向け）
// それ以外の通信には手を出さない
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", e => {
  const u = new URL(e.request.url);
  if (u.origin !== location.origin || !/\/ics\/[^/]+\.ics$/.test(u.pathname) || !u.searchParams.has("d")) return;
  const b64 = u.searchParams.get("d").replace(/-/g, "+").replace(/_/g, "/");
  const bytes = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
  e.respondWith(new Response(bytes, {headers: {"Content-Type": "text/calendar; charset=utf-8"}}));
});

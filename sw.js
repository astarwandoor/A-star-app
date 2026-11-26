// A-Star Industry - offline cache. Network first, falls back to cache when offline.
const CACHE='astar-mwx0p1ex';
const CORE=['./','./index.html','./config.js','./manifest.webmanifest',"./img/AS01.jpg","./img/AS02.jpg","./img/AS03.jpg","./img/AS04.jpg","./img/AS05.jpg","./img/AS06.jpg","./img/AS07.jpg","./img/AS08.jpg","./img/AS09.jpg","./img/AS10.jpg","./img/AS11.jpg","./img/AS12.jpg","./img/AS13.jpg","./img/AS14.jpg","./img/AS15.jpg","./img/AS16.jpg","./img/AS17.jpg","./img/AS18.jpg","./img/AS19.jpg","./img/AS20.jpg","./img/AS21.jpg","./img/AS22.jpg","./img/AS23.jpg","./img/AS24.jpg","./img/AS25.jpg","./img/AS26.jpg","./img/AS27.jpg","./img/AS28.jpg","./img/AS29.jpg","./img/AS30.jpg","./img/AS31.jpg","./img/AS32.jpg","./img/AS33.jpg","./img/AS34.jpg","./img/AS35.jpg","./img/AS36.jpg","./img/icon-192.png","./img/icon-512.png","./img/icon-maskable-512.png","./img/logo.png"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>Promise.all(CORE.map(u=>c.add(u).catch(()=>0)))).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  const req=e.request; if(req.method!=='GET')return;
  const u=new URL(req.url);
  if(u.hostname.endsWith('googleapis.com')&&!u.hostname.startsWith('fonts'))return;
  if(u.hostname.endsWith('firebaseio.com')||(u.hostname.endsWith('firebaseapp.com')&&u.pathname.startsWith('/__/')))return;
  e.respondWith(fetch(req,{cache:'no-cache'}).then(res=>{if(res&&(res.ok||res.type==='opaque')){const cp=res.clone();caches.open(CACHE).then(c=>c.put(req,cp));}return res;}).catch(()=>caches.match(req).then(h=>h||caches.match('./index.html'))));
});

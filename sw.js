var C="tur27-v1";
self.addEventListener("install",function(e){self.skipWaiting();e.waitUntil(caches.open(C).then(function(c){return c.addAll(["./","index.html","data.json"]).catch(function(){})}))});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!=C}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener("fetch",function(e){var r=e.request;if(r.method!="GET")return;var u=new URL(r.url);if(u.origin!=location.origin)return;
e.respondWith(fetch(r).then(function(res){if(res.ok){var cp=res.clone();caches.open(C).then(function(c){c.put(u.origin+u.pathname,cp)})}return res}).catch(function(){return caches.match(u.origin+u.pathname,{ignoreSearch:true}).then(function(m){return m||caches.match("index.html")})}))});

// const API_CACHE_NAME = "api_cache";

// self.addEventListener('install', function (evt) {
//     console.log('The service worker is being installed.');
// });

// self.addEventListener('activate',  event => {
//   event.waitUntil(self.clients.claim());
// });

// self.addEventListener('fetch', function (event) {
//     if (!event.request.url.includes('/api/')) {
//         return;
//     }

//     event.respondWith(
//         fetch(event.request)
//             .then((networkResponse) => {
//                 if (networkResponse) {
//                     caches.open(API_CACHE_NAME).
//                         then((cache) => cache.put(cloneReq, networkResponse.clone()));
//                     return networkResponse;
//                 }
//                 return getReponseByCache(event.request);
//             }).catch((err) => {
//                 return getReponseByCache(event.request) || err;
//             })
//     )
// });

// function getReponseByCache(request){
//     return caches.open(API_CACHE_NAME).then(cache =>
//                 cache.match(request));
// }


importScripts('./ngsw-worker.js');
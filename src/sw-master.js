// const APP_CACHE_NAME = "app_cache";

// self.addEventListener('install', function (evt) {
//     evt.waitUntil(caches.open(APP_CACHE_NAME).then(function (cache) {
//         cache.addAll([
//           './svg/md-arrow-back.svg'
//         ]);
//     }));
//     console.log('The service worker is being installed.');
// });


importScripts('./ngsw-worker.js');
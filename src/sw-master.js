// let prefetches = [];
// self.addEventListener('fetch', fetchEvent);

// function fetchEvent(event) {
//     let startPromiseFetch = new Promise((resolveStartPromiseFetch) => {
//         const fetchCompleted = Promise.resolve()
//                             .then(() => setTimeout(resolveStartPromiseFetch, 200));
//         event.waitUntil(fetchCompleted)});
//     console.log(event.request);
//     prefetches.push(CustomPromise(startPromiseFetch, event.request));
//     setTimeout(roundPrefetches, 2000);
// }

// let prefetchesStarted = false;
// async function roundPrefetches(){
//     if(prefetchesStarted){
//         return;
//     }
//     prefetchesStarted = true;
//     while(prefetches.length != 0){
//         let prom = prefetches.splice(0, 1);
//         if(!prom.isResolved){
//             await prom;
//         }
//     }
//     sendMessage('PREFETCHES_COMPLETE');
//     self.removeEventListener('fetch', fetchEvent);
// }


// function sendMessage(message) {
//     const channel = new BroadcastChannel('sw-master');
//     channel.postMessage(message);
// }

// function CustomPromise(promise, request){
//     promise.isResolved = false;
//     promise.request = request;
//     promise.
//         then(() => promise.isResolved = true).
//         catch(() => promise.isResolved = true);
//     return promise;
// }


importScripts('./ngsw-worker.js');
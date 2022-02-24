'use strict';

// Adapted from:
// https://gist.github.com/adactio/3717b7da007a9363ddf21f584aae34af
// https://frontendian.co/service-workers

const cacheName = 'files';

self.addEventListener('install', () => { console.log('install'); });
self.addEventListener('activate', () => { console.log('activate'); });

self.addEventListener('fetch',  fetchEvent => {
  const request = fetchEvent.request;

  // Provide a status URL with a synthetic response
  const statusURL = `${self.location.origin}/status`;
  if (request.url === statusURL) {
    let status = 'online';
    if (!navigator.onLine) {
      status = 'offline';
    }

    fetchEvent.respondWith(new Response(status));
    return;
  }

  // Run other requests through a local cache
  fetchEvent.respondWith(async function() {
    try {
      // Try to fetch over the network
      let response = await fetch(request);

      // If that works, cache it and return it
      const responseCopy = response.clone();
      const myCache = await caches.open(cacheName);
      await myCache.put(request, responseCopy);

      return response;
    } catch (e) {
      // If it fails, try to return from cache
      console.log(`Error doing network fetch: ${e}`);

      return caches.match(request);
    }
  }());
});

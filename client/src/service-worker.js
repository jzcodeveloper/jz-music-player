///////////////////////////
///// GLOBAL SETTINGS /////
///////////////////////////

workbox.core.skipWaiting();
workbox.core.clientsClaim();

///////////////////////////////////
///// STATIC CACHING - ASSETS /////
///////////////////////////////////
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

///////////////////////////////////
///// DYNAMIC CACHING - FONTS /////
///////////////////////////////////
workbox.routing.registerRoute(
  /.*fontawesome\.com.*/,
  new workbox.strategies.CacheFirst({
    cacheName: "fonts",
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 30
      })
    ]
  })
);

///////////////////////////////////
///// DYNAMIC CACHING - SONGS /////
///////////////////////////////////
workbox.routing.registerRoute(
  /.*\.mp3$/,
  new workbox.strategies.CacheFirst({
    cacheName: "songs",
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      }),
      new workbox.expiration.Plugin({
        maxEntries: 20
      })
    ]
  })
);

///////////////////////////
///// BACKGROUND SYNC /////
///////////////////////////
const networkWithBackgroundSync = new workbox.strategies.NetworkOnly({
  plugins: [
    new workbox.backgroundSync.Plugin("sync", {
      maxRetentionTime: 60 * 24
    })
  ]
});

workbox.routing.registerRoute(/\/api\/.*/, networkWithBackgroundSync, "POST");
workbox.routing.registerRoute(/\/api\/.*/, networkWithBackgroundSync, "PUT");
workbox.routing.registerRoute(/\/api\/.*/, networkWithBackgroundSync, "DELETE");

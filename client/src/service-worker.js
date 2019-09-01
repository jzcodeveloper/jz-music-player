///////////////////////////
///// GLOBAL SETTINGS /////
///////////////////////////

workbox.skipWaiting();
workbox.clientsClaim();

///////////////////////////////////
///// STATIC CACHING - ASSETS /////
///////////////////////////////////
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

///////////////////////////////////
///// DYNAMIC CACHING - FONTS /////
///////////////////////////////////
workbox.routing.registerRoute(
  /.*fontawesome\.com.*/,
  new workbox.strategies.CacheFirst({
    cacheName: "fonts",
    cacheExpiration: { maxAgeSeconds: 60 * 60 * 24 * 30 }
  })
);

///////////////////////////////////
///// DYNAMIC CACHING - SONGS /////
///////////////////////////////////
workbox.routing.registerRoute(
  /\.mp3$/,
  new workbox.strategies.CacheFirst({
    cacheName: "songs",
    cacheExpiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 30 }
  })
);

///////////////////////////
///// BACKGROUND SYNC /////
///////////////////////////
const bgSyncPlugin = new workbox.backgroundSync.Plugin("sync", {
  maxRetentionTime: 60 * 24, // According to the documentation, time here is in minutes
  callbacks: {
    queueDidReplay: e => console.log("Background Sync completed successfully!")
  }
});

const networkWithBackgroundSync = new workbox.strategies.NetworkOnly({
  plugins: [bgSyncPlugin]
});

workbox.routing.registerRoute(/\/api\/.*/, networkWithBackgroundSync, "POST");
workbox.routing.registerRoute(/\/api\/.*/, networkWithBackgroundSync, "PUT");
workbox.routing.registerRoute(/\/api\/.*/, networkWithBackgroundSync, "DELETE");

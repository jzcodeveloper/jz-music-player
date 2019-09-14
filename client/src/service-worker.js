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
    cacheExpiration: { maxAgeSeconds: 60 * 60 * 24 * 30 }
  })
);

////////////////////////////////////
///// DYNAMIC CACHING - IMAGES /////
////////////////////////////////////
workbox.routing.registerRoute(
  /\.(?:jpg|jpeg|png)$/,
  new workbox.strategies.CacheFirst({
    cacheName: "images",
    cacheExpiration: { maxEntries: 20 }
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

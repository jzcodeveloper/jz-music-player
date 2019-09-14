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
const strategy = new workbox.strategies.NetworkFirst({
  cacheName: "songs",
  plugins: [
    new workbox.expiration.Plugin({
      maxEntries: 20
    })
  ]
});

const customHandler = async ({ url, event, params }) => {
  try {
    const response = await caches.match(url);
    if (response) {
      return response;
    } else {
      return strategy.makeRequest({ event, request: event.request });
    }
  } catch (error) {
    console.log(error);
  }
};

workbox.routing.registerRoute(/.*\.mp3$/, customHandler);

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

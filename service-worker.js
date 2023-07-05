// self.addEventListener("install", function (event) {
//   event.waitUntil(
//     caches.open("my-cache").then(function (cache) {
//       return cache.addAll(["index.html", "style.css", "script.js"]);
//     })
//   );
// });

// self.addEventListener("fetch", function (event) {
//   event.respondWith(
//     caches.match(event.request).then(function (response) {
//       return response || fetch(event.request);
//     })
//   );
// });

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open("my-cache").then(function (cache) {
      return cache.addAll(["index.html", "style.css", "script.js"]);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches
      .match(event.request)
      .then(function (response) {
        // Mengembalikan respons dari cache jika ada
        if (response) {
          return response;
        }
        // Melakukan permintaan jaringan jika tidak ada respons dari cache
        return fetch(event.request);
      })
      .catch(function (error) {
        console.error("Gagal memuat:", error);
      })
  );
});

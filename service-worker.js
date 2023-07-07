self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open("my-cache").then(function (cache) {
      return cache.addAll([
        "index.html",
        "style.css",
        "script.js",
        "offline.html",
        "https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css",
        "https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js",
        "https://code.jquery.com/jquery-3.5.1.min.js",
        "https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js",
      ]);
    })
  );
});

self.addEventListener("fetch", function (event) {
  // Mengecek apakah permintaan berasal dari domain eksternal
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches
        .match(event.request)
        .then(function (response) {
          if (response) {
            return response;
          }

          if (!navigator.onLine) {
            return caches.match("offline.html");
          }

          return fetch(event.request).then(function (response) {
            let responseToCache = response.clone();
            caches.open("my-cache").then(function (cache) {
              cache.put(event.request, responseToCache);
            });
            return response;
          });
        })
        .catch(function () {
          return caches.match("offline.html");
        })
    );
  }
});

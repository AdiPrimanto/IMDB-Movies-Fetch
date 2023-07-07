//FETCH
let isLoading = false;

const searchButton = document.querySelector(".search-btn");
const movieContainer = document.querySelector(".movie-container");
searchButton.addEventListener("click", function () {
  const inputKeyword = document.querySelector(".input-keyword");
  const keyword = inputKeyword.value;
  searchMovies(keyword);
});

window.addEventListener("DOMContentLoaded", function () {
  const inputKeyword = document.querySelector(".input-keyword");
  inputKeyword.value = "naruto"; // Set value input menjadi "naruto"
  searchMovies(inputKeyword.value);
});

function searchMovies(keyword) {
  isLoading = true;
  showLoading();
  fetch("https://www.omdbapi.com/?apikey=2fc72f8b&s=" + keyword, {
    referrerPolicy: "strict-origin-when-cross-origin",
  })
    .then((response) => response.json())
    .then((response) => {
      const movies = response.Search;
      let cards = "";
      movies.forEach((m) => (cards += showCards(m)));

      const movieContainer = document.querySelector(".movie-container");
      movieContainer.innerHTML = cards;

      const modalDetailButton = document.querySelectorAll(".modal-detail-btn");
      modalDetailButton.forEach((btn) => {
        btn.addEventListener("click", function () {
          const imdbid = this.dataset.imdbid;
          fetch("https://www.omdbapi.com/?apikey=2fc72f8b&i=" + imdbid)
            .then((response) => response.json())
            .then((m) => {
              const movieDetail = showMovieDetail(m);
              const modalBody = document.querySelector(".modal-body");
              modalBody.innerHTML = movieDetail;
            });
        });
      });
    })
    .finally(() => {
      isLoading = false;
    });
}

function showLoading() {
  movieContainer.innerHTML =
    // '<div class="col-12 p-2 bg-info rounded-lg text-white text-center fo">Loading...</div>';
    `<div class="col-12 p-2 d-flex justify-content-center align-content-center">
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>`;
}

function showCards(m) {
  return `<div class="col-md-4 my-3">
                <div class="card">
                    <img src="${m.Poster}" class="card-img-top">
                    <div class="card-body">
                    <h5 class="card-title">${m.Title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                    <a href="#" class="btn btn-primary modal-detail-btn" data-toggle="modal"
                        data-target="#movieDetailModal" data-imdbid="${m.imdbID}">Details</a>
                    </div>
                </div>
            </div>`;
}

function showMovieDetail(m) {
  return `<div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                        <img src="${m.Poster}" class="img-fluid">
                    </div>
                    <div class="col-md">
                        <ul class="list-group">
                            <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
                            <li class="list-group-item"><strong>Direstor : </strong>${m.Director}</li>
                            <li class="list-group-item"><strong>Actors: </strong>${m.Actors}</li>
                            <li class="list-group-item"><strong>Writer: </strong>${m.Writer}</li>
                            <li class="list-group-item"><strong>Plot: </strong><br>${m.Plot}</li>
                        </ul>
                    </div>
                </div>
            </div>`;
}

// Mengaktifkan Layar Beranda (Add to Home Screen)
window.addEventListener("beforeinstallprompt", function (event) {
  event.preventDefault(); // Mencegah tampilan prompt instalasi otomatis
  // Simpan event ke variabel untuk digunakan nanti
  deferredPrompt = event;
  // Tampilkan tombol atau UI lain untuk memicu prompt instalasi
  installButton.style.display = "block";
});

installButton.addEventListener("click", function () {
  deferredPrompt.prompt(); // Menampilkan prompt instalasi
  deferredPrompt.userChoice.then(function (choiceResult) {
    if (choiceResult.outcome === "accepted") {
      console.log("Aplikasi diinstal");
    }
    deferredPrompt = null; // Setelah prompt ditampilkan, atur kembali ke null
  });
});

// const searchButton = document.querySelector(".search-btn");
// searchButton.addEventListener("click", function () {
//   //mendapatkan value input
//   const inputKeyword = document.querySelector(".input-keyword");
//   fetch("https://www.omdbapi.com/?apikey=2fc72f8b&s=" + inputKeyword.value, {
//     referrerPolicy: "strict-origin-when-cross-origin",
//   })
//     //fetch mengembalikan promise, ketika dijlnkn tdk langsung mendapatkan data

//     //kalau data fetch sudah dikembalikan dan jk berhasil ambil responsenya
//     // .then(response => console.log(response.json()));
//     .then((response) => response.json())
//     // .then(response => console.log(response));
//     .then((response) => {
//       const movies = response.Search;
//       let cards = "";
//       movies.forEach((m) => (cards += showCards(m)));

//       const movieContainer = document.querySelector(".movie-container");
//       movieContainer.innerHTML = cards;

//       //ketika tombol detail di klik
//       const modalDetailButton = document.querySelectorAll(".modal-detail-btn");
//       modalDetailButton.forEach((btn) => {
//         btn.addEventListener("click", function () {
//           const imdbid = this.dataset.imdbid;
//           // console.log(imdbid);
//           fetch("https://www.omdbapi.com/?apikey=2fc72f8b&i=" + imdbid)
//             .then((response) => response.json())
//             .then((m) => {
//               const movieDetail = showMovieDetail(m);
//               const modalBody = document.querySelector(".modal-body");
//               modalBody.innerHTML = movieDetail;
//             });
//         });
//       });
//     });
// });

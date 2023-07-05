//FETCH
const searchButton = document.querySelector('.search-btn');
searchButton.addEventListener('click', function() {

    //mendapatkan value input
    const inputKeyword = document.querySelector('.input-keyword');
    fetch('http://www.omdbapi.com/?apikey=2fc72f8b&s=' + inputKeyword.value)
    //fetch mengembalikan promise, ketika dijlnkn tdk langsung mendapatkan data

    //kalau data fetch sudah dikembalikan dan jk berhasil ambil responsenya
        // .then(response => console.log(response.json()));
        .then(response => response.json())
            // .then(response => console.log(response));
            .then(response => {
                const movies = response.Search;
                let cards = '';
                movies.forEach(m => cards += showCards(m));

                const movieContainer = document.querySelector('.movie-container');
                movieContainer.innerHTML = cards;

                //ketika tombol detaik di klik
                const modalDetailButton = document.querySelectorAll('.modal-detail-btn');
                modalDetailButton.forEach(btn => {
                    btn.addEventListener('click', function() {
                        const imdbid = this.dataset.imdbid;
                        // console.log(imdbid);
                        fetch('http://www.omdbapi.com/?apikey=2fc72f8b&i=' + imdbid)
                        .then(response => response.json())
                            .then(m => {
                                const movieDetail = showMovieDetail(m);
                                const modalBody = document.querySelector('.modal-body');
                                modalBody.innerHTML = movieDetail;
                            })
                    })
                })
            });

});


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
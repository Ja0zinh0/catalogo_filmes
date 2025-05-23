const apiKey = '3c87f01b';
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    const moviesGrid = document.getElementById('moviesGrid');
    const modal = document.getElementById('modal');
    const modalDetails = document.getElementById('modalDetails');
    const closeModal = document.getElementById('closeModal');

    searchBtn.addEventListener('click', () => {
      const query = searchInput.value.trim();
      if (query) {
        fetchMovies(query);
      }
    });

    function fetchMovies(query) {
      fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`)
        .then(response => response.json())
        .then(data => {
          if (data.Response === "True") {
            displayMovies(data.Search);
          } else {
            moviesGrid.innerHTML = `<p>Nenhum resultado encontrado.</p>`;
          }
        })
        .catch(err => {
          console.error(err);
          moviesGrid.innerHTML = `<p>Erro ao buscar filmes.</p>`;
        });
    }

    function displayMovies(movies) {
      moviesGrid.innerHTML = '';
      movies.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('movie-item');
        movieDiv.innerHTML = `
          <img src="${movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/150'}" alt="${movie.Title}">
          <h3>${movie.Title}</h3>
          <p>${movie.Year} - ${movie.Type}</p>
        `;
        movieDiv.addEventListener('click', () => {
          fetchMovieDetails(movie.imdbID);
        });
        moviesGrid.appendChild(movieDiv);
      });
    }

    function fetchMovieDetails(id) {
      fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${id}&plot=full`)
        .then(response => response.json())
        .then(data => {
          displayModal(data);
        })
        .catch(err => {
          console.error(err);
          modalDetails.innerHTML = `<p>Erro ao buscar detalhes do filme.</p>`;
        });
    }

    function displayModal(movie) {
      modalDetails.innerHTML = `
        <h2>${movie.Title}</h2>
        <img src="${movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/150'}" alt="${movie.Title}">
        <p><strong>Ano:</strong> ${movie.Year}</p>
        <p><strong>Tipo:</strong> ${movie.Type}</p>
        <p><strong>Gênero:</strong> ${movie.Genre}</p>
        <p><strong>Sinopse:</strong> ${movie.Plot}</p>
      `;
      modal.classList.remove('hidden');
    }

    closeModal.addEventListener('click', () => {
      modal.classList.add('hidden');
    });
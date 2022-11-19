'use strict';

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const CONTAINER = document.querySelector(".container");

// Don't touch this function please
const autorun = async () => {
  const movies = await fetchMovies();
  renderMovies(movies.results);
};

// Don't touch this function please
const constructUrl = (path) => {
  return `${TMDB_BASE_URL}/${path}?api_key=${atob(
    "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
  )}`;
};

// You may need to add to this function, definitely don't delete it.
const movieDetails = async (movie) => {
  const movieRes = await fetchMovie(movie.id);
  renderMovie(movieRes);
};


const getGenre = async () => {
  const dropDownlist = document.querySelector("#filter")
  const url = constructUrl("genre/movie/list");
  const res = await fetch(url);
  const data = await res.json();
  
data.genres.forEach(element => {
  const genreLink = document.createElement("a");
  genreLink.textContent = element.name
  genreLink.classList.add("genre")
  dropDownlist.appendChild(genreLink);

   
genreLink.addEventListener("click", () => {
  fetch(`${TMDB_BASE_URL}/discover/movie?api_key=${atob(
  "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
  )}&with_genres=${element.id}`)
  .then(resp => resp.json())
  .then(data => renderMovies(data.results))
})

});

};
getGenre();

const fetchPopularMovies = async () => {
  const url = constructUrl(`movie/popular`);
  const res = await fetch(url);
  const data = await res.json();
  renderpopularmovies(data.results)
}

const renderpopularmovies = (movies) =>{
  CONTAINER.innerHTML= ""
  movies.map((movie)=>
  {const movies = document.createElement("div");
 console.log(movie);
  movies.innerHTML = `
  <div>
  <img src="${BACKDROP_BASE_URL + movie.backdrop_path}">
  </div>
  <h3>${movie.title}</h3>
  `
  movies.addEventListener("click", () => {
    movieDetails(movie);
  });
  CONTAINER.appendChild(movies);
  })
}

const topMovie = async () => {
  const url = constructUrl(`movie/top_rated`);
  const res = await fetch(url);
  const data = await res.json();
  rendTopmovies(data.results);
}

const rendTopmovies = (movies) =>{
  CONTAINER.innerHTML= ""
  movies.map((movie)=>
  {const movies = document.createElement("div");
  movies.innerHTML = `
  <div>
  <img src="${BACKDROP_BASE_URL + movie.backdrop_path}">
  </div>
  <h3>${movie.title}</h3>
  
  `;
  movies.addEventListener("click", () => {
    movieDetails(movie);
  });
  CONTAINER.appendChild(movies);
  })
}

const upComing = async () => {
  const url = constructUrl(`movie/upcoming`);
  const res = await fetch(url);
  const data = await res.json();
  rendTopmovies(data.results);
}

const upComingMovies = (movies) => {
  CONTAINER.innerHTML=""
  movies.map((movie)=> 
  {const movies = document.createElement("div");
  movies.innerHTML = `
  <div>
  <img src="${BACKDROP_BASE_URL + movie.backdrop_path}">
  </div>
  <h3>${movie.title}</h3>
  `;
  movies.addEventListener("click", () => {
    movieDetails(movie);
  });
}
  )}

const nawPlaying = async () => {
  const url = constructUrl(`movie/now_playing`);
  const res = await fetch(url);
  const data = await res.json();
  rendTopmovies(data.results);
}

const nowplaying = (movies) => {
  CONTAINER.innerHTML=""
  movies.map((movie)=> 
  {const movies = document.createElement("div");
  movies.innerHTML = `
  <div>
  <img src="${BACKDROP_BASE_URL + movie.backdrop_path}">
  </div>
  <h3>${movie.title}</h3>
  `;
  movies.addEventListener("click", () => {
    movieDetails(movie);
  });
}
  )}


// This function is to fetch movies. You may need to add it or change some part in it in order to apply some of the features.
const fetchMovies = async () => {
  const url = constructUrl(`movie/now_playing`);
  const res = await fetch(url);
  return res.json();
};

// Don't touch this function please. This function is to fetch one movie.
const fetchMovie = async (movieId) => {
  const url = constructUrl(`movie/${movieId}`);
  const res = await fetch(url);
  return res.json();
};

// You'll need to play with this function in order to add features and enhance the style.
const renderMovies = (movies) => {
  movies.map((movie) => {
    const movieDiv = document.createElement("div");
    movieDiv.innerHTML = `
        <img src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="${
      movie.title
    } poster">
        <h3>${movie.title}</h3>`;
    movieDiv.addEventListener("click", () => {
      movieDetails(movie);
    });
    CONTAINER.appendChild(movieDiv);
  });

};

// You'll need to play with this function in order to add features and enhance the style.
const renderMovie = (movie) => {
  CONTAINER.innerHTML = `
    <div class="row">
        <div class="col-md-4">
             <img id="movie-backdrop" src=${
               BACKDROP_BASE_URL + movie.backdrop_path
             }>
        </div>
        <div class="col-md-8">
            <h2 id="movie-title">${movie.title}</h2>
            <p id="movie-release-date"><b>Release Date:</b> ${
              movie.release_date
            }</p>
            <p id="movie-runtime"><b>Runtime:</b> ${movie.runtime} Minutes</p>
            <h3>Overview:</h3>
            <p id="movie-overview">${movie.overview}</p>
        </div>
        </div>
            <h3>Actors:</h3>
            <ul id="actors" class="list-unstyled"></ul>
    </div>`;
};

document.addEventListener("DOMContentLoaded", autorun);
//There is the navebar it is done  and the  dropdown list it is done but we ned to add some details
const divNavBar = document.createElement('div');
divNavBar.innerHTML = `
<header>
 <div class="container2">
  <img src="pics/pirateflix.png" alt="logo" class="logo">
  <nav>
  <ul>
     <li id='home'> <a href= "#">Home</a> </li>
     <li> <a href= "#">Movies</a>
     <ul class="dropdown">
    <li id='li1'> <a id="pop" href= "#"> Popular Movies </a> </li>
    <li id='li1'> <a id="top_movie" href= "#"> top movies </a> </li>
    <li id='li1'> <a id="up" href= "#">Up Coming </a> </li>
    <li id='li1'> <a id="naw" href= "#">now playing </a> </li>
    
</ul> 
     </li>
     <li id='actors' > <a href= "#">Actor List </a></li>
     <li> <a href= "#">About</a> </li>
     <li id='filter'> <a href="#"> genra </a> </li>
     <li> <form id="form">
        <input type="text" placeholder="search" id="search"
        class="search">
    </form></li>
    
   </ul>
  </nav>
 </div>
</header>
`
document.body.prepend(divNavBar);

//There is the event listener for home button whene you press on it it will refresh the page 
const Home = document.getElementById('home');
Home.addEventListener('click',function(){location.reload()} );

const pop = document.getElementById("pop");
pop.addEventListener('click',fetchPopularMovies);

const topmovie = document.getElementById("top_movie");
top_movie.addEventListener('click',topMovie); 

const moviesUpComing = document.getElementById("up");
up.addEventListener('click',upComing); 

const nawplAying = document.getElementById("naw");
naw.addEventListener('click',nawPlaying);

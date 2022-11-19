'use strict';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const PROFILE_BASE_URL = 'http://image.tmdb.org/t/p/w185';
const BACKDROP_BASE_URL = 'http://image.tmdb.org/t/p/w780';
const CONTAINER = document.querySelector('.container');

// Don't touch this function please
const autorun = async () => {
  const movies = await fetchMovies();
  renderMovies(movies.results);
  //console.log(movies)
};

// Don't touch this function please
const constructUrl = (path) => {
  return `${TMDB_BASE_URL}/${path}?api_key=${atob(
    'NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI='
  )}`;
};

// You may need to add to this function, definitely don't delete it.
const movieDetails = async (movie) => {
  const movieRes = await fetchMovie(movie.id);
  renderMovie(movieRes);
};
const actorDetails = async (actor) => {
  const actorRes = await fetchPopularActor(actor.id);
  renderActorDetail(actorRes);
};

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

const fetchPopularActor = async (actorId) => {
  const url = `https://api.themoviedb.org/3/person/${actorId}?api_key=542003918769df50083a13c415bbc602&language=en-US&page=1`;
  const res = await fetch(url);
  return res.json();
};
const fetchPopularPeople = async () => {
  const url = `https://api.themoviedb.org/3/person/popular?api_key=542003918769df50083a13c415bbc602&language=en-US&page=1`;
  const res = await fetch(url);
  renderActors(await res.json());
};

const fetchPerson = async (personId) => {
  const url = constructUrl(`person/${personId}`);
  const res = await fetch(url);
  return res.json();
};
// You'll need to play with this function in order to add features and enhance the style.
const renderMovies = (movies) => {
  movies.map((movie) => {
    const movieDiv = document.createElement('div');
    movieDiv.innerHTML = `
        <img src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="${
      movie.title
    } poster">
        <h3>${movie.title}</h3>`;
    movieDiv.addEventListener('click', () => {
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

const renderActors = (actors) => {
  const myactors = actors.results;
  CONTAINER.innerHTML = '';
  CONTAINER.classList.add('container');
  console.log(myactors, 'gg');
  myactors.map((actor) => {
    const actorsDiv = document.createElement('div');
    actorsDiv.classList.add('actorContainer');
    actorsDiv.innerHTML = `
    
    <h4>${actor.name}</h4>
    <img src="${BACKDROP_BASE_URL + actor.profile_path}" alt="" />

  `;
    actorsDiv.addEventListener('click', () => {
      actorDetails(actor);
    });

    CONTAINER.appendChild(actorsDiv);
  });
};
const renderActorDetail = (actor) => {
  CONTAINER.innerHTML = '';
  CONTAINER.classList.add('container');
  const actorDiv = document.createElement('div');
  actorDiv.classList.add('actorDiv');
  actorDiv.innerHTML = `
    
    <h4>${actor.name}</h4>
    <img src="${BACKDROP_BASE_URL + actor.profile_path}" alt="" />

  `;

  CONTAINER.appendChild(actorDiv);
};
document.addEventListener('DOMContentLoaded', autorun);
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
    <li id='li1'> <a href= "#"> </a> </li>
    <li id='li1'> <a href= "#"> </a> </li>
    <li id='li1'> <a href= "#"> </a> </li>
    <li id='li1'> <a href= "#"> </a> </li>
    <li id='li1'> <a href= "#"> </a> </li>
</ul> 
     </li>
     <li id='actors' > <a href= "#">Actor List </a>
     </li>
     <li> <a href= "#">About</a> </li>
     <li id='filter'> 
     <a href= "#">Filter</a> 
      <ul class="dropdown">
      <li id='li1'> <a href= "#"> </a> </li>
      <li id='li1'> <a href= "#"> </a> </li>
      <li id='li1'> <a href= "#"> </a> </li>
      <li id='li1'> <a href= "#"> </a> </li>
      <li id='li1'> <a href= "#"> </a> </li>
 </ul>
 </li>
     <li> <form id="form">
        <input type="text" placeholder="search" id="search"
        class="search">
    </form></li>
    
   </ul>
  </nav>
 </div>
</header>
`;
document.body.prepend(divNavBar);

//There is the event listener for home button whene you press on it it will refresh the page
const Home = document.getElementById('home');
Home.addEventListener('click', function () {
  location.reload();
});

const pop = document.getElementById('pop');
pop.addEventListener('click', fetchPopularMovies);

const topmovie = document.getElementById('top_movie');
top_movie.addEventListener('click', topMovie);

const moviesUpComing = document.getElementById('up');
up.addEventListener('click', upComing);

const nawplAying = document.getElementById('naw');
naw.addEventListener('click', nawPlaying);

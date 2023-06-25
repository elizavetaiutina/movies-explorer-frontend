import "./MoviesCardList.css";

import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ movies, savedMovies, onSaveFilm, onUnsaveFilm }) {
  // console.log("movies", movies);

  return (
    <div className="card-list">
      <ul className="gallery">
        {movies.map((film) => {
          return (
            <MoviesCard
              key={film.id || film._id}
              film={film}
              savedMovies={savedMovies}
              onSaveFilm={onSaveFilm}
              onUnsaveFilm={onUnsaveFilm}
            />
          );
        })}
      </ul>
      <button className="card-list__button">Ещё</button>
    </div>
  );
}

export default MoviesCardList;

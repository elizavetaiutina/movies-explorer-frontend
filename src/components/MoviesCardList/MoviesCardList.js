import "./MoviesCardList.css";

import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ movies, onSaveFilm, onUnsaveFilm }) {
  return (
    <div className="card-list">
      <ul className="gallery">
        {movies.map((film) => {
          return (
            <MoviesCard
              key={film.id || film._id}
              film={film}
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

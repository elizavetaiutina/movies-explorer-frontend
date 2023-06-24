import "./MoviesCardList.css";

import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ movies }) {
  return (
    <div className="card-list">
      <ul className="gallery">
        {movies.map((film) => {
          return <MoviesCard key={film.id} film={film} />;
        })}
      </ul>
      <button className="card-list__button">Ещё</button>
    </div>
  );
}

export default MoviesCardList;

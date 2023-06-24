import "./Movies.css";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({ movies, onSaveFilm }) {
  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList movies={movies} onSaveFilm={onSaveFilm} />
    </section>
  );
}

export default Movies;

import "./Movies.css";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({ movies, savedMovies, onSaveFilm }) {
  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList movies={movies} savedMovies={savedMovies} onSaveFilm={onSaveFilm} />
    </section>
  );
}

export default Movies;

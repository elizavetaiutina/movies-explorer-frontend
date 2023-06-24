import "./SavedMovies.css";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies({ movies, onUnsaveFilm }) {
  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList movies={movies} onUnsaveFilm={onUnsaveFilm} />
    </section>
  );
}

export default SavedMovies;

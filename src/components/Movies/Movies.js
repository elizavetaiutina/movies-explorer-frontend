import "./Movies.css";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({ movies }) {
  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList movies={movies} />
    </section>
  );
}

export default Movies;

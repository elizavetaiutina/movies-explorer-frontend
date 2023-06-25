import "./Movies.css";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

import { useState, useEffect } from "react";

function Movies({ movies, savedMovies, onSaveFilm }) {
  const [isLoading, setIsLoading] = useState(false);

  const [valueSearch, setValueSearch] = useState("");

  const [arrSearch, setArrSearch] = useState([]);

  /* ПОИСК */
  function handleSearch() {
    setIsLoading(true);
    setTimeout(() => {
      const newmovies = movies.filter((item) => {
        return item.nameRU.toLowerCase().includes(valueSearch.toLowerCase());
      });
      setArrSearch(newmovies);
      setIsLoading(false);
    }, 500);
  }

  useEffect(() => {
    handleSearch();
  }, [valueSearch]);

  return (
    <section className="movies">
      <SearchForm valueSearch={valueSearch} setValueSearch={setValueSearch} />
      {isLoading ? (
        <Preloader />
      ) : arrSearch.length ? (
        <MoviesCardList movies={arrSearch} savedMovies={savedMovies} onSaveFilm={onSaveFilm} />
      ) : (
        <p className="movies__text">Ничего не найдено</p>
      )}
    </section>
  );
}

export default Movies;

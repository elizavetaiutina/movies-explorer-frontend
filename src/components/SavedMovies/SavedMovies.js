import "./SavedMovies.css";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

import { useState, useEffect } from "react";

function SavedMovies({ movies, onUnsaveFilm }) {
  const [isLoading, setIsLoading] = useState(false);

  const [valueSearch, setValueSearch] = useState("");

  const [arrSearchInSave, setArrSearchInSave] = useState([]);

  /* ПОИСК */
  function handleSearch() {
    const newmovies = movies.filter((item) => {
      return item.nameRU.toLowerCase().includes(valueSearch.toLowerCase());
    });
    setArrSearchInSave(newmovies);
  }

  /* ПОИСК */
  function handleSearch() {
    setIsLoading(true);
    setTimeout(() => {
      const newmovies = movies.filter((item) => {
        return item.nameRU.toLowerCase().includes(valueSearch.toLowerCase());
      });
      setArrSearchInSave(newmovies);
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
      ) : arrSearchInSave.length ? (
        <MoviesCardList movies={arrSearchInSave} onUnsaveFilm={onUnsaveFilm} />
      ) : (
        <p className="movies__text">Ничего не найдено</p>
      )}
    </section>
  );
}

export default SavedMovies;

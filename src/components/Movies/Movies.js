import "./Movies.css";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import { durationForFilter } from "../../utils/constants";

import { useState, useEffect } from "react";

function Movies({ movies, savedMovies, onSaveFilm }) {
  const [isLoading, setIsLoading] = useState(false);

  const [valueSearch, setValueSearch] = useState("");

  const [arrSearch, setArrSearch] = useState([]);

  const [isChecked, setIsChecked] = useState(false);

  /* ЧЕКБОКС */
  function handleCheck() {
    setIsChecked(!isChecked);
  }

  /* ПОИСК С ФИЛЬТРОМ */
  function filteredMovies() {
    if (!isChecked && !valueSearch) {
      console.log("фильтр не сделан и значения нет");
    }

    /* ФИЛЬТР ВКЛЮЧЕН*/
    if (isChecked && valueSearch) {
      const filterMovies = movies.filter((item) => {
        return (
          item.nameRU.toLowerCase().includes(valueSearch.toLowerCase()) &&
          item.duration <= durationForFilter
        );
      });

      setArrSearch(filterMovies);
    }

    /* ФИЛЬТР ВЫКЛЮЧЕН*/
    if (isChecked && valueSearch) {
      const newmovies = movies.filter((item) => {
        return item.nameRU.toLowerCase().includes(valueSearch.toLowerCase());
      });

      setArrSearch(newmovies);
    }
  }

  return (
    <section className="movies">
      <SearchForm
        valueSearch={valueSearch}
        setValueSearch={setValueSearch}
        isChecked={isChecked}
        handleCheck={handleCheck}
        filteredMovies={filteredMovies}
      />
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

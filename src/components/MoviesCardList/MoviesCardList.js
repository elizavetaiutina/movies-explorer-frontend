import "./MoviesCardList.css";

import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";

import { useState, useEffect } from "react";

function MoviesCardList({ movies, savedMovies, onSaveFilm, onUnsaveFilm }) {
  // console.log("movies", movies);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [isLoading, setIsLoading] = useState(false);

  const [countAddedMovies, setCountAddedMovies] = useState(0);
  const [moviesOnWindow, setMoviesOnWindow] = useState([]);
  const [innitalMoviesForSizeWindow, setInnitalMoviesForSizeWindow] = useState([]);

  function getSizeWindow() {
    /*setTimeout(() => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }, 1000);*/
    setSize({ width: window.innerWidth, height: window.innerHeight });
  }

  useEffect(() => {
    setCountAddedMovies(0);

    getSizeWindow();

    //вешаем слушатель resize
    window.addEventListener("resize", getSizeWindow);
    return () => window.removeEventListener("resize", getSizeWindow);
  }, []);

  useEffect(() => {
    //console.log(size);
    if (size.width >= 320 && size.width <= 480) {
      // Ширина от 320px до 480px — 5 карточек по 1 в ряд. Кнопка «Ещё» загружает по 2 карточки
      console.log("d");
      setInnitalMoviesForSizeWindow(5);
    } else if (size.width > 480 && size.width < 1280) {
      // Ширина 768px — 8 карточек по 2 в ряд. Кнопка «Ещё» загружает по 2 карточки
      setInnitalMoviesForSizeWindow(8);
    } else if (size.width > 1280) {
      // Ширина 1280px — 12 карточек по 3 в ряд. Кнопка «Ещё» загружает по 3 карточки
      setInnitalMoviesForSizeWindow(12);
    }

    let moviesAfterClickButton = movies.slice(0, innitalMoviesForSizeWindow + countAddedMovies);
    setMoviesOnWindow(moviesAfterClickButton);
  }, [movies, countAddedMovies, size, innitalMoviesForSizeWindow]);

  function handleAddCard() {
    let countAdd;
    if (size.width > 1280) {
      countAdd = 3;
    } else countAdd = 2;

    setCountAddedMovies((prev) => prev + countAdd);
  }

  return (
    <div className="card-list">
      {isLoading ? (
        <Preloader />
      ) : (
        <ul className="gallery">
          {moviesOnWindow.map((film) => {
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
      )}
      {movies.length <= innitalMoviesForSizeWindow ? (
        ""
      ) : (
        <button className="card-list__button" onClick={handleAddCard}>
          Ещё
        </button>
      )}
    </div>
  );
}

export default MoviesCardList;

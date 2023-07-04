import "./MoviesCardList.css";

import MoviesCard from "../MoviesCard/MoviesCard";

import { useState, useEffect, useMemo } from "react";

function MoviesCardList({ movies, savedMovies, onSaveFilm, onUnsaveFilm }) {
  // console.log("movies", movies);
  const [size, setSize] = useState({ width: 0, height: 0 });

  const [countAddedMovies, setCountAddedMovies] = useState(0);
  const [initialMoviesForSizeWindow, setInitialMoviesForSizeWindow] = useState(0);

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
    setCountAddedMovies(0);
  }, [movies]);

  const moviesAfterClickButton = useMemo(() => {
    const paginationCounter = size.width < 480 ? 5 : size.width < 1280 ? 8 : 12;
    setInitialMoviesForSizeWindow(paginationCounter);
    return movies.slice(0, paginationCounter + countAddedMovies);
  }, [movies, countAddedMovies, size]);

  function handleAddCard() {
    let countAdd;
    if (size.width > 1280) {
      countAdd = 3;
    } else countAdd = 2;

    setCountAddedMovies((prev) => prev + countAdd);
  }

  return (
    <div className="card-list">
      <ul className="gallery">
        {moviesAfterClickButton.map((film) => {
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
      {movies.length >= initialMoviesForSizeWindow &&
      movies.length !== moviesAfterClickButton.length ? (
        <button className="card-list__button" onClick={handleAddCard}>
          Ещё
        </button>
      ) : (
        ""
      )}
    </div>
  );
}

export default MoviesCardList;

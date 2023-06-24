import "./MoviesCard.css";

import { useLocation } from "react-router-dom";

function MoviesCard({ film, savedMovies, onSaveFilm, onUnsaveFilm }) {
  const { pathname } = useLocation();
  const isSaveButton = pathname === "/movies";
  const isDeleteButton = pathname === "/saved-movies";

  const imageUrl = film.image.url ? `https://api.nomoreparties.co/${film.image.url}` : film.image;
  const isSavedFilm = savedMovies ? savedMovies.some((i) => i.movieId === film.id) : false;
  const infoSaveFilm = savedMovies ? savedMovies.find((i) => i.movieId === film.id) : false;

  function handleSaveClick() {
    onSaveFilm(film, isSavedFilm, infoSaveFilm);
  }

  function handleUnsaveClick() {
    onUnsaveFilm(film);
  }

  return (
    <li className="card">
      <div className="card__info">
        <div className="card__description">
          <h2 className="card__name">{film.nameRU}</h2>
          <p className="card__duration">{`${film.duration} min`}</p>
        </div>
        {isSaveButton && (
          <button
            type="button"
            className={`card__button ${
              isSavedFilm ? "card__button_type_save_active" : "card__button_type_save"
            }`}
            aria-label="Добавить фильм в спискок сохранённых фильмов"
            onClick={handleSaveClick}
          />
        )}
        {isDeleteButton && (
          <button
            type="button"
            className="card__button card__button_type_delete"
            aria-label="Удалить фильм из списка сохранённых фильмов"
            onClick={handleUnsaveClick}
          />
        )}
      </div>
      <img className="card__image" src={imageUrl} alt="Картинка" />
    </li>
  );
}

export default MoviesCard;

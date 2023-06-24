import "./MoviesCard.css";

import { useLocation } from "react-router-dom";

function MoviesCard({ film, onSaveFilm, onUnsaveFilm }) {
  const { pathname } = useLocation();
  const isSaveButton = pathname === "/movies";
  const isDeleteButton = pathname === "/saved-movies";

  const imageUrl = film.image.url ? `https://api.nomoreparties.co/${film.image.url}` : film.image;

  function handleSaveClick() {
    onSaveFilm(film);
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
            className="card__button card__button_type_save_active"
            aria-label="Кнопка сохранить фильм"
            onClick={handleSaveClick}
          />
        )}
        {isDeleteButton && (
          <button
            type="button"
            className="card__button card__button_type_delete"
            aria-label="Кнопка сохранить фильм"
            onClick={handleUnsaveClick}
          />
        )}
      </div>
      <img className="card__image" src={imageUrl} alt="Картинка" />
    </li>
  );
}

export default MoviesCard;

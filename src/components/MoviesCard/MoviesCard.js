import "./MoviesCard.css";
import img from "../../images/card.jpg";

import { useLocation } from "react-router-dom";

function MoviesCard() {
  const { pathname } = useLocation();

  return (
    <li className="card">
      <div className="card__info">
        <div className="card__description">
          <h2 className="card__name">33 слова о дизайне</h2>
          <p className="card__duration">1ч 47м</p>
        </div>
        <button
          type="button"
          className={`card__button ${
            pathname === "/saved-movies"
              ? "card__button_type_delete"
              : "card__button_type_save_active"
          }`}
          aria-label="Кнопка"
        />
      </div>
      <img className="card__image" src={img} alt="Картинка" />
    </li>
  );
}

export default MoviesCard;

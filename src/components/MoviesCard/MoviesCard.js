import "./MoviesCard.css";
import img from "../../images/card.jpg";

function MoviesCard() {
  return (
    <li className="card">
      <div className="card__info">
        <div className="card__description">
          <h2 className="card__name">33 слова о дизайне</h2>
          <p className="card__duration">1ч 47м</p>
        </div>
        <button
          type="button"
          className="card__save-button card__save-button_active"
          aria-label="Соханить Фильм"
        />
      </div>
      <img className="card__image" src={img} alt="Картинка" />
    </li>
  );
}

export default MoviesCard;

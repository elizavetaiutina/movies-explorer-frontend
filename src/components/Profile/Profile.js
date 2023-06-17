import "./Profile.css";

import { Link } from "react-router-dom";

function Profile() {
  return (
    <section className="profile">
      <h1 className="profile__title">Привет, Виталий!</h1>
      <form name="profile" className="form form_type_edit-profile">
        <fieldset className="form__wrapper">
          <label className="form__label" htmlFor="name">
            Имя
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="form__input"
            autoComplete="off"
            required
          />
        </fieldset>
        <fieldset className="form__wrapper">
          <label className="form__label" htmlFor="email">
            E-mail
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="form__input"
            autoComplete="off"
            required
          />
        </fieldset>
        <button type="submit" className="form__button">
          Редактировать
        </button>
      </form>
      <Link to="/signin" className="profile__link-out">
        Выйти из аккаунта
      </Link>
    </section>
  );
}

export default Profile;

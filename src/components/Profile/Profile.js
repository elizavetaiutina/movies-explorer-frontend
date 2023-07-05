import "./Profile.css";

import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function Profile({
  onUpdateUserInfo,
  onSignOut,
  isStatusErrorServer,
  setIsStatusErrorServer,
  isStatusOKServer,
  setIsStatusOKServer,
}) {
  const { values, handleChange, errors, isValid, setValues } = useFormWithValidation({});

  const currentUser = useContext(CurrentUserContext);
  useEffect(() => {
    setValues(currentUser);
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUserInfo({
      name: values.name,
      email: values.email,
    });
  }

  useEffect(() => {
    setIsStatusErrorServer(false);
  }, [isValid]);

  useEffect(() => {
    setIsStatusOKServer(false);
  }, [isStatusErrorServer]);

  return (
    <section className="profile">
      <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>
      <form name="profile" className="form form_type_edit-profile" onSubmit={handleSubmit}>
        <fieldset className="form__wrapper">
          <label className="form__label" htmlFor="name">
            Имя
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Введите имя"
            className="form__input"
            autoComplete="off"
            value={values.name || ""}
            onChange={handleChange}
            required
          />
        </fieldset>
        <span className="profile__span-error">{errors.name}</span>
        <fieldset className="form__wrapper">
          <label className="form__label" htmlFor="email">
            E-mail
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Введите email"
            className="form__input"
            autoComplete="off"
            value={values.email || ""}
            onChange={handleChange}
            required
          />
        </fieldset>
        <span className="profile__span-error">{errors.email}</span>
        <span
          className={`profile__span-success ${
            isStatusOKServer ? "profile__span-success_active" : ""
          }`}
        >
          Данные успешно обновлены !
        </span>
        <span
          className={`form-profile__span-error-server ${
            isStatusErrorServer ? "form-profile__span-error-server_active" : ""
          }`}
        >
          Что-то пошло не так! Попробуйте ещё раз
        </span>
        <button
          type="submit"
          className={`form__button form__button_type_profile ${
            !isValid || (values.name === currentUser.name && values.email === currentUser.email)
              ? "form__button_type_profile_disabled"
              : ""
          }`}
        >
          Редактировать
        </button>
      </form>
      <Link to="/" className="profile__link-out" onClick={onSignOut}>
        Выйти из аккаунта
      </Link>
    </section>
  );
}

export default Profile;

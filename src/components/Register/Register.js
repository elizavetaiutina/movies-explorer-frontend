import "./Register.css";
import logo from "../../images/logo.svg";

import { Link } from "react-router-dom";

function Register() {
  return (
    <>
      <main className="sign-up">
        <div className="sign-up__content">
          <Link to="/" className="sign-up__link">
            <img src={logo} alt="Логотип- Место" className="logo" />
          </Link>
          <h1 className="sign-up__title">Добро пожаловать!</h1>
          <form name="register" className="form form_type_sign-up">
            <label className="form__label">Имя</label>
            <input
              type="text"
              name="name"
              id="name"
              className="form__input"
              autoComplete="off"
              required
            />
            <span className="name-input-error form__span-error"></span>
            <label className="form__label">E-mail</label>
            <input
              type="email"
              name="email"
              id="email"
              className="form__input"
              autoComplete="off"
              required
            />
            <span className="email-input-error form__span-error"></span>
            <label className="form__label">Пароль</label>
            <input
              type="password"
              name="password"
              id="password"
              className="form__input form__input_type_error"
              autoComplete="off"
              required
            />
            <span className="password-input-error form__span-error">Что-то пошло не так...</span>
            <button type="submit" className="form__button">
              Зарегистрироваться
            </button>
          </form>
          <p className="sign-up__text">
            Уже зарегистрированы?{" "}
            <Link to="/signin" className="sign-up__link">
              Войти
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}

export default Register;

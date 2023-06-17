import "./Login.css";
import logo from "../../images/logo.svg";

import { Link } from "react-router-dom";

function Login({ onLogin }) {
  return (
    <>
      <main className="sign-in">
        <div className="sign-in__content">
          <Link to="/" className="sign-in__link">
            <img src={logo} alt="Логотип- Место" className="logo" />
          </Link>
          <h1 className="sign-in__title">Рады видеть!</h1>
          <form name="login" className="form form_type_sign-in">
            <label className="form__label">E-mail</label>
            <input type="email" name="email" className="form__input" autoComplete="off" required />
            <span className="email-input-error form__span-error"></span>
            <label className="form__label">Пароль</label>
            <input
              type="password"
              name="password"
              className="form__input form__input_type_error"
              autoComplete="off"
              required
            />
            <span className="password-input-error form__span-error">Что-то пошло не так...</span>
            <button type="submit" className="form__button">
              Войти
            </button>
          </form>
          <p className="sign-in__text">
            Ещё не зарегистрированы?
            <Link to="/signup" className="sign-in__link">
              Регистрация
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
export default Login;

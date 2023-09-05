import "./Login.css";
import logo from "../../images/logo.svg";

import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

function Login({ onLogin, isStatusErrorServer, setIsStatusErrorServer }) {
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation({});

  const handleSubmit = (event) => {
    event.preventDefault();

    onLogin(values.password, values.email);
  };

  useEffect(() => {
    resetForm();
    setIsStatusErrorServer(false);
  }, []);

  return (
    <>
      <section className="sign-in">
        <div className="sign-in__content">
          <Link to="/" className="sign-in__link">
            <img src={logo} alt="Логотип" className="logo" />
          </Link>
          <h1 className="sign-in__title">Рады видеть!</h1>
          <form name="login" className="form-login form_type_sign-in" onSubmit={handleSubmit}>
            <label className="form-login__label" htmlFor="name">
              E-mail
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Введите email"
              className="form-login__input"
              autoComplete="off"
              value={values.email || ""}
              onChange={handleChange}
              required
            />
            <span className="email-input-error form-login__span-error">{errors.email}</span>
            <label className="form-login__label" htmlFor="password">
              Пароль
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Введите пароль"
              className="form-login__input"
              autoComplete="off"
              value={values.password || ""}
              onChange={handleChange}
              required
            />
            <span className="password-input-error form-login__span-error ">{errors.password}</span>
            <span
              className={`form-login__span-error-server ${
                isStatusErrorServer ? "form-login__span-error-server_active" : ""
              }`}
            >
              Неправильный логин или пароль! Попробуйте ещё раз
            </span>
            <button
              type="submit"
              className={`form-login__button ${!isValid ? "form-login__button_disabled" : ""}`}
            >
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
      </section>
    </>
  );
}
export default Login;

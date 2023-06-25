import "./Register.css";
import logo from "../../images/logo.svg";

import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

function Register({ onRegister }) {
  /*const { values, handleChange, setValues } = useForm({});*/
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation({});

  /*
  const resetForm = () => {
    setValues({ name: "", email: "", password: "" });
  };*/

  const handleSubmit = (event) => {
    event.preventDefault();

    onRegister(values.email, values.name, values.password);
  };

  useEffect(() => {
    resetForm();
  }, []);

  return (
    <>
      <main className="sign-up">
        <div className="sign-up__content">
          <Link to="/" className="sign-up__link">
            <img src={logo} alt="Логотип" className="logo" />
          </Link>
          <h1 className="sign-up__title">Добро пожаловать!</h1>
          <form name="register" className="form-register form_type_sign-up" onSubmit={handleSubmit}>
            <label className="form-register__label" htmlFor="name">
              Имя
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Введите имя"
              className="form-register__input"
              autoComplete="off"
              value={values.name || ""}
              onChange={handleChange}
              required
            />
            <span className="name-input-error form-register__span-error"></span>
            <label className="form-register__label" htmlFor="email">
              E-mail
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Введите email"
              className="form-register__input"
              autoComplete="off"
              value={values.email || ""}
              onChange={handleChange}
              required
            />
            <span className="email-input-error form-register__span-error"></span>
            <label className="form-register__label" htmlFor="password">
              Пароль
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Введите пароль"
              className="form-register__input"
              autoComplete="off"
              value={values.password || ""}
              onChange={handleChange}
              required
            />
            <span className="password-input-error form-register__span-error"></span>
            <button type="submit" className="form-register__button" disabled={!isValid}>
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

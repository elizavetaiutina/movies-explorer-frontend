import "./Register.css";

import { Link } from "react-router-dom";

function Register() {
  return (
    <>
      <main className="sign">
        <h1 className="sign__title">Регистрация</h1>

        <p className="sign__text">
          Уже зарегистрированы?{" "}
          <Link to="/signin" className="sign__link">
            Войти
          </Link>
        </p>
      </main>
    </>
  );
}

export default Register;

import "./Header.css";
import logo from "../../images/logo.svg";

import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <Link to="/movies" className="header__link">
        <img src={logo} alt="Логотип- Место" className="logo" />
      </Link>
      <div className="header__links">
        <Link to="/signup" className="header__signup">
          Регистрация
        </Link>
        <Link to="/signin" className="header__signin">
          Войти
        </Link>
      </div>
    </div>
  );
}

export default Header;

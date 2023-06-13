import "./Header.css";
import logo from "../../images/logo.svg";

import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <img src={logo} alt="Логотип- Место" className="logo" />
      <div className="header__links">
        <Link to="/" className="header__signup">
          Регистрация
        </Link>
        <Link to="/" className="header__signin">
          Войти
        </Link>
      </div>
    </div>
  );
}

export default Header;

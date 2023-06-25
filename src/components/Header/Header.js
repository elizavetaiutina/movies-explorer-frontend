import "./Header.css";
import logo from "../../images/logo.svg";
import Navigation from "../Navigation/Navigation";

import { Link, useLocation } from "react-router-dom";

function Header({ isLogged }) {
  const { pathname } = useLocation();

  return (
    <header className={`header ${pathname === "/" ? "header_page_main" : "header_page_films"}`}>
      <Link to="/" className="header__link">
        <img src={logo} alt="Логотип- Место" className="logo" />
      </Link>
      <Navigation isLogged={isLogged} />
    </header>
  );
}

export default Header;

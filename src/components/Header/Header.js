import "./Header.css";
import logo from "../../images/logo.svg";
import Navigation from "../Navigation/Navigation";

import { Link, useLocation } from "react-router-dom";

function Header() {
  const { pathname } = useLocation();

  return (
    <header className={pathname === "/" ? "header" : "header-for-burger"}>
      <Link to="/movies" className="header__link">
        <img src={logo} alt="Логотип- Место" className="logo" />
      </Link>
      <Navigation />
    </header>
  );
}

export default Header;

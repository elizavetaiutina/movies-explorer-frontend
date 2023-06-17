import "./Header.css";
import logo from "../../images/logo.svg";
import Navigation from "../Navigation/Navigation";

import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <Link to="/movies" className="header__link">
        <img src={logo} alt="Логотип- Место" className="logo" />
      </Link>
      <Navigation />
    </div>
  );
}

export default Header;

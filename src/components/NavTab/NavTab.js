import "./NavTab.css";

import { NavLink } from "react-router-dom";

function NavTab() {
  return (
    <nav className="nav">
      <NavLink to="/#about" className="nav__link">
        О проекте
      </NavLink>
      <NavLink to="#Techs" className="nav__link">
        Технологии
      </NavLink>
      <NavLink to="/#AboutMe" className="nav__link">
        Студент
      </NavLink>
    </nav>
  );
}

export default NavTab;

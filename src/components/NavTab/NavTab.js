import "./NavTab.css";

import { NavLink } from "react-router-dom";

function NavTab() {
  return (
    <nav className="navtab">
      <NavLink to="#About" className="navtab__link">
        О проекте
      </NavLink>
      <NavLink to="#Techs" className="navtab__link">
        Технологии
      </NavLink>
      <NavLink to="#aboutme" className="navtab__link">
        Студент
      </NavLink>
    </nav>
  );
}

export default NavTab;

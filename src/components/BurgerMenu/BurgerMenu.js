import "./BurgerMenu.css";

import { NavLink, useLocation } from "react-router-dom";

function BurgerMenu({ close }) {
  const { pathname } = useLocation();

  return (
    <div className="burger-menu">
      <div className="burger-menu__container">
        <button className="burger-menu__close" onClick={close} />
        <nav className="menu">
          <div className="menu__links">
            <NavLink to="/" className={`menu__link ${pathname === "/" ? "menu__link_active" : ""}`}>
              Главная
            </NavLink>
            <NavLink
              to="/movies"
              className={`menu__link ${pathname === "/movies" ? "menu__link_active" : ""}`}
            >
              Фильмы
            </NavLink>
            <NavLink
              to="/saved-movies"
              className={`menu__link ${pathname === "/saved-movies" ? "menu__link_active" : ""}`}
            >
              Сохранённые фильмы
            </NavLink>
          </div>
          <NavLink to="/profile" className="menu__button">
            Аккаунт
          </NavLink>
        </nav>
      </div>
    </div>
  );
}

export default BurgerMenu;

import "./Navigation.css";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

function Navigation() {
  const { pathname } = useLocation();
  const [isOpenBurgerMenu, setIsOpenBurgerMenu] = useState(false);

  const openBurgerMenu = () => {
    setIsOpenBurgerMenu(true);
  };

  const closeBurgerMenu = () => {
    setIsOpenBurgerMenu(false);
  };

  return (
    <>
      {pathname === "/" ? (
        <nav className="navsign">
          <NavLink to="/signup" className="navsign__signup">
            Регистрация
          </NavLink>
          <NavLink to="/signin" className="navsign__signin">
            Войти
          </NavLink>
        </nav>
      ) : (
        <nav className="navigation">
          <div className="navigation__links">
            <NavLink
              to="/movies"
              className={`navigation__link ${
                pathname === "/movies" ? "navigation__link_active" : ""
              }`}
            >
              Фильмы
            </NavLink>
            <NavLink
              to="/saved-movies"
              className={`navigation__link ${
                pathname === "/saved-movies" ? "navigation__link_active" : ""
              }`}
            >
              Сохранённые фильмы
            </NavLink>
          </div>
          <NavLink to="/profile" className="navigation__button">
            Аккаунт
          </NavLink>
          {isOpenBurgerMenu ? (
            <BurgerMenu close={closeBurgerMenu} />
          ) : (
            <ul className="burger" onClick={openBurgerMenu}>
              <li className="burger__item" />
              <li className="burger__item" />
              <li className="burger__item" />
            </ul>
          )}
        </nav>
      )}
    </>
  );
}

export default Navigation;

import "./Promo.css";

import { NavLink } from "react-router-dom";

function Promo() {
  return (
    <section className="promo">
      <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
      <nav className="promo__nav">
        <NavLink to="/#about" className="promo__link">
          О проекте
        </NavLink>
        <NavLink to="#Techs" className="promo__link">
          Технологии
        </NavLink>
        <NavLink to="/#AboutMe" className="promo__link">
          Студент
        </NavLink>
      </nav>
    </section>
  );
}

export default Promo;

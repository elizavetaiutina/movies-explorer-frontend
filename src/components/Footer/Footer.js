import "./Footer.css";

import { Link, useLocation } from "react-router-dom";

function Footer() {
  const { pathname } = useLocation();

  return (
    <footer className={pathname === "/" ? "footer" : "footer-for-main"}>
      <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className={pathname === "/" ? "footer__info" : "footer-for-main__info"}>
        <p className="footer__text">© 2023</p>
        <div className="footer__links">
          <Link to="https://practicum.yandex.ru" className="footer__link">
            Яндекс.Практикум
          </Link>
          <Link to="https://github.com/elizavetaiutina" className="footer__link">
            Github
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

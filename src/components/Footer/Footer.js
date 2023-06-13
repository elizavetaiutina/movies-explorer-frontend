import "./Footer.css";

import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className="footer__info">
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
    </div>
  );
}

export default Footer;

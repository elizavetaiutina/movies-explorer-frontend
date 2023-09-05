import "./Portfolio.css";
import arrowLink from "../../images/linkarrow.svg";

import { Link } from "react-router-dom";

function Portfolio() {
  return (
    <section className="portfolio">
      <h4 className="portfolio__title">Портфолио</h4>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <Link to="https://github.com/elizavetaiutina/how-to-learn" className="portfolio__link">
            <p className="portfolio__textlink">Статичный сайт</p>
            <img src={arrowLink} alt="arrow link" className="portfolio__arrow" />
          </Link>
        </li>
        <li className="portfolio__item">
          <Link to="https://github.com/elizavetaiutina/russian-travel" className="portfolio__link">
            <p className="portfolio__textlink">Адаптивный сайт</p>
            <img src={arrowLink} alt="arrow link" className="portfolio__arrow" />
          </Link>
        </li>
        <li className="portfolio__item">
          <Link
            to="https://github.com/elizavetaiutina/react-mesto-api-full-gha"
            className="portfolio__link"
          >
            <p className="portfolio__textlink">Одностраничное приложение</p>
            <img src={arrowLink} alt="arrow link" className="portfolio__arrow" />
          </Link>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;

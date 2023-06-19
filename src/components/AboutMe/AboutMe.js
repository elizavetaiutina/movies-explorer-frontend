import "./AboutMe.css";
import avatar from "../../images/avatar.png";

import { Link } from "react-router-dom";

function AboutMe() {
  return (
    <section className="aboutme" id="aboutme">
      <h2 className="aboutme__title">Студент</h2>
      <div className="aboutme__wrapper">
        <div className="aboutme__info">
          <h3 className="aboutme__name">Виталий</h3>
          <h4 className="aboutme__subtitle">Фронтенд-разработчик, 30 лет</h4>
          <p className="aboutme__text">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь.
            Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал
            в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься
            фриланс-заказами и ушёл с постоянной работы.
          </p>
          <Link to="https://github.com/elizavetaiutina" className="aboutme__github">
            Github
          </Link>
        </div>
        <img src={avatar} alt="avatar" className="aboutme__avatar" />
      </div>
    </section>
  );
}

export default AboutMe;

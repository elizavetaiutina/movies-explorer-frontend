import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="about" id="about">
      <h2 className="about__title">О проекте</h2>
      <div className="about__info">
        <div className="about__wrapper">
          <h3 className="about__subtitle">Дипломный проект включал 5 этапов</h3>
          <p className="about__text">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные
            доработки.
          </p>
        </div>
        <div className="about__wrapper">
          <h3 className="about__subtitle">На выполнение диплома ушло 5 недель</h3>
          <p className="about__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы
            успешно защититься.
          </p>
        </div>
      </div>
      <div className="about__duration">
        <div className="about__front">
          <div className="about__time about__time_front">1 неделя</div>
          <div className="about__name">Back-end</div>
        </div>
        <div className="about__back">
          <div className="about__time about__time_back">4 недели</div>
          <div className="about__name">Front-end</div>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;

import "./NavTab.css";

function NavTab() {
  return (
    <nav className="navtab">
      <a href="#about" className="navtab__link">
        О проекте
      </a>
      <a href="#techs" className="navtab__link">
        Технологии
      </a>
      <a href="#aboutme" className="navtab__link">
        Студент
      </a>
    </nav>
  );
}

export default NavTab;

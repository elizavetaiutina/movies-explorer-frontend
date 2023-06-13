import "./PageNotFound.css";

import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <>
      <main className="not-found">
        <div className="not-found__wrapper">
          <h1 className="not-found__title">404</h1>
          <h1 className="not-found__subtitle">Страница не найдена</h1>
        </div>
        <Link to="/" className="not-found__link-back">
          Назад
        </Link>
      </main>
    </>
  );
}

export default PageNotFound;

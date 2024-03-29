import "./PageNotFound.css";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function PageNotFound({ loggedIn }) {
  const navigate = useNavigate();

  return (
    <>
      <section className="not-found">
        <div className="not-found__wrapper">
          <h1 className="not-found__title">404</h1>
          <p className="not-found__subtitle">Страница не найдена</p>
        </div>
        <Link
          onClick={() => {
            loggedIn ? navigate(-2) : navigate(-1);
          }}
          className="not-found__link-back"
        >
          Назад
        </Link>
      </section>
    </>
  );
}

export default PageNotFound;

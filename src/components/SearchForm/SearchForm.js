import "./SearchForm.css";
import searchicon from "../../images/search.svg";

import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm() {
  return (
    <section className="search">
      <div className="search__box">
        <form className="search-form">
          <input
            className="search-form__input"
            type="text"
            name="search"
            id="search"
            placeholder="Фильм"
            required
          />
          <button type="submit" className="search-form__button" />
        </form>
        <img className="search__icon" src={searchicon} alt="Искать" />
        <div className="search__filter">
          <FilterCheckbox />
          <p className="search__text">Короткометражки</p>
        </div>
      </div>
    </section>
  );
}

export default SearchForm;

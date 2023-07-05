import "./SearchForm.css";
import searchicon from "../../images/search.svg";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

import { useState } from "react";

function SearchForm({ valueSearch, setValueSearch, isChecked, handleCheck, filteredMovies }) {
  const [textError, setTextError] = useState("");

  const handleChange = (e) => {
    setValueSearch(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    filteredMovies();
    if (!valueSearch) {
      setTextError("Введите название фильма");
      return;
    } else {
      setValueSearch(valueSearch);
    }
  };

  return (
    <div className="search">
      <div className="search__box">
        <form className="search-form" onSubmit={handleSubmit}>
          <input
            className="search-form__input"
            type="text"
            name="search"
            id="search"
            placeholder="Фильм"
            value={valueSearch || ""}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className={`search-form__button ${!valueSearch ? "search-form__button_disabled" : ""}`}
          />
        </form>
        <img className="search__icon" src={searchicon} alt="Искать" />
        <div className="search__filter">
          <FilterCheckbox isChecked={isChecked} handleCheck={handleCheck} />
          <p className="search__text">Короткометражки</p>
        </div>
      </div>
      <span className="search-form__span-error ">{textError}</span>
    </div>
  );
}

export default SearchForm;

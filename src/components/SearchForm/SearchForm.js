import "./SearchForm.css";
import searchicon from "../../images/search.svg";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

import { useEffect } from "react";

function SearchForm({ valueSearch, setValueSearch, isChecked, handleCheck, filteredMovies }) {
  const handleChange = (e) => {
    setValueSearch(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    filteredMovies();
    if (!valueSearch) {
      console.log("Введите название фильма !!");
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
          <button type="submit" className="search-form__button" />
        </form>
        <img className="search__icon" src={searchicon} alt="Искать" />
        <div className="search__filter">
          <FilterCheckbox isChecked={isChecked} handleCheck={handleCheck} />
          <p className="search__text">Короткометражки</p>
        </div>
      </div>
    </div>
  );
}

export default SearchForm;

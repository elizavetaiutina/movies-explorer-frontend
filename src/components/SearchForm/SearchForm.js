import "./SearchForm.css";
import searchicon from "../../images/search.svg";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

import { useEffect } from "react";
import { useForm } from "../../hooks/useForm";

function SearchForm({ valueSearch, setValueSearch }) {
  const { values, handleChange, setValues } = useForm({});

  const resetForm = () => {
    setValues({ name: "", email: "", password: "" });
  };

  useEffect(() => {
    resetForm();
  }, []);

  useEffect(() => {
    // console.log(values.search);
    // setValueSearch(values.search);
  }, [values]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!values.search) {
      console.log("Введите название фильма !!");
      return;
    } else {
      setValueSearch(values.search);
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
            value={values.search || ""}
            onChange={handleChange}
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
    </div>
  );
}

export default SearchForm;

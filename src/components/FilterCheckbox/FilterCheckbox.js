import "./FilterCheckbox.css";

function FilterCheckbox() {
  return (
    <div className="checkbox">
      <input className="checkbox__input" id="checkbox" type="checkbox" />
      <label className="checkbox__label" htmlFor="checkbox" />
    </div>
  );
}

export default FilterCheckbox;

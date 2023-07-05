import "./FilterCheckbox.css";

function FilterCheckbox({ isChecked, handleCheck }) {
  return (
    <div className="checkbox">
      <input
        className="checkbox__input"
        id="checkbox"
        type="checkbox"
        onChange={handleCheck}
        checked={isChecked || ""}
      />
      <label className="checkbox__label" htmlFor="checkbox" />
    </div>
  );
}

export default FilterCheckbox;

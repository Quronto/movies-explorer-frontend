import React from 'react';

function FilterCheckboxSavedMovies(props) {
  const { isChecked, onCheckboxChange } = props;

  const handleCheckboxChange = () => {
    const newValue = !isChecked;
    onCheckboxChange(newValue);
  };

  return (
    <div className='filterCheckbox'>
      <label className='filterCheckbox__label' aria-label="Короткометражки">
        <input
          type="checkbox"
          className='filterCheckbox__checkbox'
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <span className='filterCheckbox__slider' />
      </label>
      <p className='filterCheckbox__films'>Короткометражки</p>
    </div>
  )
}

export default FilterCheckboxSavedMovies;
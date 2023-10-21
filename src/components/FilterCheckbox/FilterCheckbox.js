import './FilterCheckbox.css';
import React, { useEffect } from 'react';

function FilterCheckbox(props) {
  const { isChecked, onCheckboxChange } = props;

  const handleCheckboxChange = () => {
    const newValue = !isChecked;
    onCheckboxChange(newValue);
    localStorage.setItem('isCheckedMovies', newValue.toString());
  };

  useEffect(() => {
    const savedCheckboxState = localStorage.getItem('isCheckedMovies');
    if (savedCheckboxState === 'true') {
      onCheckboxChange(true);
    }
  }, [onCheckboxChange]);
  
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

export default FilterCheckbox;
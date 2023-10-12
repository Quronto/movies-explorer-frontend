import './FilterCheckbox.css';
import React from 'react';

function FilterCheckbox() {
  return (
    <div className='filterCheckbox'>
      <label className='filterCheckbox__label' aria-label="Короткометражки">
        <input type="checkbox" className='filterCheckbox__checkbox' />
        <span className='filterCheckbox__slider' />
      </label>
      <p className='filterCheckbox__films'>Короткометражки</p>
    </div>
  )
}

export default FilterCheckbox;
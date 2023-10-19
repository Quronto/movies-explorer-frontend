import './Portfolio.css';
import React from 'react';

function Portfolio() {
  return (
    <section className='portfolio'>
      <h4 className='portfolio__title'>Портфолио</h4>
      <ul className='portfolio__list'>
        <li className='portfolio__item'>
          <a target="_blank" href="https://quronto.github.io/how-to-learn/index.html" className="portfolio__link" rel="noreferrer">Статичный сайт<i className='portfolio__link-icon'></i></a>
        </li>
        <li className='portfolio__item'>
          <a target="_blank" href="https://quronto.github.io/russian-travel/index.html" className="portfolio__link" rel="noreferrer">Адаптивный сайт<i className='portfolio__link-icon'></i></a>
        </li>
        <li className='portfolio__item'>
          <a target="_blank" href="https://quronto.nomoreparties.co" className="portfolio__link" rel="noreferrer">Одностраничное приложение<i className='portfolio__link-icon'></i></a>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio;
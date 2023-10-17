import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className='footer'>
      <h4 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h4>
      <div className='footer__info'>
        <p className='footer__date'>&copy;2023</p>
        <nav className='footer__links'>
          <ul className='footer__list'>
            <li className='footer__item'>
              <a className='footer__link' href="https://practicum.yandex.ru" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
            </li>
            <li className='footer__item'>
              <a className='footer__link' href="https://github.com/Quronto" target="_blank" rel="noreferrer">Github</a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}

export default Footer;
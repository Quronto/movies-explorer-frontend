import React, { useState, useEffect } from 'react';
import Navigation from '../Navigation/Navigation';
import PopupNavigation from '../PopupNavigation/PopupNavigation';
import './Header.css';
import headerLogo from '../../images/headerLogo.svg';
import AccIcon from '../../images/AccIcon.svg';
import { Link, NavLink } from 'react-router-dom';



function Header(props) {
  const [isOpen, setOpen] = useState(false);

  function PopupNavigationOpen() {
    setOpen(true);
  }

  function closePopup() {
    setOpen(false);
  }

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closePopup();
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])

  return (
    <header style={{ backgroundColor: `${props.backgroundColor}` }} className='header'>
      <div className='header__content'>
        <Link to={props.iconLink}>
          <img className='header__icon' src={headerLogo} alt='логотип проекта'></img>
        </Link>
        <div className='header__container'>
          <nav className='header__nav'>
            {props.loggedIn ? (
              <>
                <Navigation
                  text="Фильмы"
                  textSave="Сохранённые фильмы"
                  linkText="/movies"
                  linkTextSave="/saved-movies"
                />
                <div className='header__container-account'>
                  <NavLink to={'/profile'} className='header__account hover'>Аккаунт</NavLink>
                  <NavLink to={props.linkProfile} className='header__cover'>
                    <img src={AccIcon} alt='Аккаунт-иконка' className='header__account-icon hover'></img>
                  </NavLink>
                </div>
              </>
            ) : (
              <ul className='header__auth'>
                <li><NavLink to={props.linkSignUp} className='header__sign-up'>{props.signUp}</NavLink></li>
                <li><NavLink to={props.linkSignIn} className='header__sign-in'>{props.signIn}</NavLink></li>
              </ul>
            )}
          </nav>
          {isOpen && (
            <PopupNavigation
              text="Фильмы"
              textSave="Сохранённые фильмы"
              linkText="/movies"
              linkTextSave="/saved-movies"
              linkProfile="/profile"
              title="Главная"
              linkMain="/"
              onClose={closePopup}
            />
          )}
          <div className={!props.loggedIn ? 'header__menu-hidden' : 'header__menu'} onClick={PopupNavigationOpen}>
            <span className='header__line'></span>
            <span className='header__line'></span>
            <span className='header__line'></span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header;
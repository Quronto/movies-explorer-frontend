import './SearchForm.css';
import React, { useState, useEffect } from 'react';
import SearchIcon from '../../images/SearchIcon.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import apiMovies from "../../utils/MoviesApi";
import MainApi from "../../utils/MainApi";

function SearchForm(props) {
  const [film, setFilm] = useState(localStorage.getItem('searchTextMovie') || '');
  const [shortFilm, setShortFilm] = useState(false);
  const [error, setError] = useState('');
  const [isFilteringRequired, setIsFilteringRequired] = useState(false);

  const [isFirstSubmit, setIsFirstSubmit] = useState(false);

  useEffect(() => {
    if (isFirstSubmit) {
      MainApi.getMovies()
        .then((allMovies) => {
          allMovies.movies.forEach((movie) => {
            localStorage.setItem(`like-${movie.movieId}`, 'true');
          });

        })
        .catch((error) => {
          console.error('Ошибка при получении фильмов:', error);
        });
    }
  }, [isFirstSubmit]);

  useEffect(() => {
    const cardsAreAlreadyDisplayed = props.cards.length > 0;

    if (cardsAreAlreadyDisplayed) {
      if (isFilteringRequired) {
        const filterDataFil = props.cards.filter(({ duration }) =>
          (!shortFilm || duration <= 40)
        );
        props.filterCards(filterDataFil);
        localStorage.setItem("filterMovies", JSON.stringify(filterDataFil));
        setIsFilteringRequired(false);
      }
    }
  }, [shortFilm, props.cards, isFilteringRequired]);

  useEffect(() => {
    const searchMovies = async () => {
      if (!film.trim()) {
        setError('Нужно ввести ключевое слово');
        return;
      }

      localStorage.setItem('searchTextMovie', film);
      setError('');

      const isFirstSearch = localStorage.getItem('firstSearch') === 'false';

      if (isFirstSearch) {
        setIsFirstSubmit(true);
        props.setIsLoading(true);

        try {
          const newCards = await apiMovies.getCards();
          localStorage.setItem('AllMovies', JSON.stringify(newCards));
          const filterData = newCards.filter(({ nameRU, nameEN, duration }) =>
            (nameRU.toLowerCase().includes(film.toLowerCase()) || nameEN.toLowerCase().includes(film.toLowerCase())) && (!shortFilm || duration <= 40)
          );

          props.filterCards(filterData);
          localStorage.setItem("filterMovies", JSON.stringify(filterData));
          localStorage.setItem('firstSearch', 'true');
        } catch (error) {
          props.setErrorMovie(`Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз`);
        } finally {
          props.setIsLoading(false);
        }
      } else if (!isFirstSearch) {
        props.setIsLoading(true);
        const getAllMovies = localStorage.getItem('AllMovies');
        const allMovies = JSON.parse(getAllMovies);

        const filterData = allMovies.filter(({ nameRU, nameEN, duration }) =>
          (nameRU.toLowerCase().includes(film.toLowerCase()) || nameEN.toLowerCase().includes(film.toLowerCase())) && (!shortFilm || duration <= 40)
        );

        props.filterCards(filterData);
        localStorage.setItem("filterMovies", JSON.stringify(filterData));
        props.setIsLoading(false);
      }
    };

    if (isFilteringRequired) {
      searchMovies();
    }
  }, [film, shortFilm, isFilteringRequired]);

  function handleFilmChange(evt) {
    const newFilmValue = evt.target.value;
    setFilm(newFilmValue);
    localStorage.setItem('searchTextMovie', newFilmValue);
    setError('');
    setIsFilteringRequired(true);
  }

  function handleFilterChange(isChecked) {
    setShortFilm(isChecked);
    setIsFilteringRequired(true);
  }

  return (
    <section className='search'>
      <form className='search__form'>
        <div className='search__container'>
          <img src={SearchIcon} alt='лупа' className='search__icon'></img>
          <input
            className='search__input'
            type="text"
            placeholder={error || "Фильм"}
            value={film || ''}
            onChange={handleFilmChange}
          />
          <div className='search__button-cover'>
            <button type='button' className='search__button' onClick={() => setIsFilteringRequired(true)}>Найти</button>
          </div>
        </div>
        <FilterCheckbox onCheckboxChange={handleFilterChange} isChecked={shortFilm} />
      </form>
    </section>
  );
}

export default SearchForm;

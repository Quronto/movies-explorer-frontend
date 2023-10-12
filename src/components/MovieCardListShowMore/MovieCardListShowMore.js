import './MovieCardListShowMore.css';
import React from 'react';

function MovieCardListShowMore(props) {
  return (
      <button type='button' style={props.style} className='button-more'>Ещё</button>
  )
}

export default MovieCardListShowMore;
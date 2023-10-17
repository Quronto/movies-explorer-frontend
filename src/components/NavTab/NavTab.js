import React from 'react';
import './NavTab.css';

function NavTab(props) {
  return (
    <h2 className='navTab'>{props.title}</h2>
  )
}

export default NavTab;
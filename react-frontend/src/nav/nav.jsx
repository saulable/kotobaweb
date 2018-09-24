import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
        <button class='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbar'>
          <span class="navbar-toggler-icon"></span>
        </button>
        <span class='navbar-brand'>KotobaWeb</span>
        <div class='collapse navbar-collapse' id='navbar'>
          <ul class='navbar-nav mr-auto'>
            <li class='nav-item dropdown'>
              <a class='nav-link dropdown-toggle' id='gameDropdown' data-toggle='dropdown'>
                Kanji Game
              </a>
              <div class='dropdown-menu'>
                <NavLink exact activeClassName='active' className='dropdown-item' to='/start'>Start</NavLink>
                <NavLink exact activeClassName='active' className='dropdown-item' to='/join'>Join</NavLink>
              </div>
            </li>
            <li class='nav-item'>
              <NavLink exact activeClassName='active' className='nav-link' to='/strokeorder'>Stroke Order</NavLink>
            </li>
            <li class='nav-item'>
              <NavLink exact activeClassName='active' className='nav-link' to='/bot'>Discord Bot</NavLink>
            </li>
            <li class='nav-item'>
              <NavLink exact activeClassName='active' className='nav-link' to='/about'>About</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default App;

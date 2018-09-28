import React from 'react';
import { NavLink } from 'react-router-dom';

function render() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar">
        <span className="navbar-toggler-icon" />
      </button>
      <span className="navbar-brand">KotobaWeb</span>
      <div className="collapse navbar-collapse" id="navbar">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item dropdown">
            <span className="nav-link dropdown-toggle" id="gameDropdown" data-toggle="dropdown">
              Kanji Game
            </span>
            <div className="dropdown-menu">
              <NavLink exact activeClassName="active" className="dropdown-item" to="/kanjigame/create">Create</NavLink>
              <NavLink exact activeClassName="active" className="dropdown-item" to="/kanjigame/join">Join</NavLink>
            </div>
          </li>
          <li className="nav-item">
            <NavLink exact activeClassName="active" className="nav-link" to="/strokeorder">Stroke Order</NavLink>
          </li>
          <li className="nav-item">
            <NavLink exact activeClassName="active" className="nav-link" to="/bot">Discord Bot</NavLink>
          </li>
          <li className="nav-item">
            <NavLink exact activeClassName="active" className="nav-link" to="/about">About</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default render;

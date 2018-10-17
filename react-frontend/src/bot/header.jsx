import React from 'react';
import Avatar from '../img/kotoba_avatar.png';
import { NavLink } from 'react-router-dom';

function render() {
  return (
    <div className="row pl-5 pt-5 mb-5 bg-light">
      <div className="col-sm-12">
        <img className="align-top" alt="bot avatar" id="avatar" src={Avatar} />
        <div className="inline-block ml-4">
          <h5 className="mb-2">Kotoba Discord Bot</h5>
          <a href="https://discordbots.org/bot/251239170058616833"><img src="https://discordbots.org/api/widget/status/251239170058616833.svg" alt="Discord Bots" /></a>
          &nbsp;
          <a href="https://discordbots.org/bot/251239170058616833"><img src="https://discordbots.org/api/widget/servers/251239170058616833.svg" alt="Discord Bots" /></a>
          <br />
          <div className="mt-3">
            <a href="https://discordapp.com/oauth2/authorize?client_id=251239170058616833&scope=bot" target="_blank">INVITE</a>
            <a className="ml-4" href="https://github.com/mistval/kotoba" target="_blank">GITHUB</a>
            <a className="ml-4" href="https://discord.gg/zkAKbyJ" target="_blank">HELP</a>
          </div>
        </div>
        <ul className="nav nav-tabs bg-light mt-5">
          <li className="nav-item">
            <NavLink exact activeClassName="active" className="nav-link submenu-nav-link" to="/bot">COMMANDS</NavLink>
          </li>
          <li className="nav-item">
            <NavLink exact activeClassName="active" className="nav-link submenu-nav-link" to="/bot/quiz">QUIZ MANUAL</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default render;

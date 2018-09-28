import React from 'react';
import '../main.css';
import Avatar from './../img/kotoba_avatar.png';

function Header() {
  return (
    <div>
      <img alt="bot avatar" className="scaled-image" src={Avatar} /> Test
    </div>
  );
}

function render() {
  return (
    <Header />
  );
}

export default render;

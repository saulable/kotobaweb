import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Nav from '../nav/nav';
import About from '../about/about';
import Bot from '../bot/bot';
import './App.css';

function renderNotFound() {
  return <p>Not Found</p>;
}

function render() {
  return (
    <BrowserRouter>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/about" component={About} />
          <Route exact path="/bot" component={Bot} />
          <Route render={renderNotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default render;
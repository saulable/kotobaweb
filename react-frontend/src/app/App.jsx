import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Nav from '../nav/nav';
import About from '../about/about';
import './App.css';

function renderNotFound() {
  return <p>Not Found</p>;
}

function render() {
  return (
    <BrowserRouter>
      <div>
        <Nav />
        <div className="container-fluid p-5">
          <Switch>
            <Route exact path="/about" component={About} />
            <Route render={renderNotFound} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default render;

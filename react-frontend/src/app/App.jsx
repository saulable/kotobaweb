import React, { Component } from 'react';
import Nav from './../nav/nav.jsx';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Nav />
          <div className='container-fluid'>
            <Switch>
              <Route render={function () {
                return <p>Not Found</p>
              }} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

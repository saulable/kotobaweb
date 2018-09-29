import React, { Component } from 'react';
import './create.css';
import decks from './decks.js';
import usernames from './usernames.js';

const defaultUsername = usernames[Math.floor(Math.random() * usernames.length)];

class DeckSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDecks: {},
    };
  }

  toggle = shortName => {
    this.setState(function(previousState) {
      if (previousState.selectedDecks[shortName]) {
        delete previousState.selectedDecks[shortName];
      } else {
        previousState.selectedDecks[shortName] = true;
      }

      return previousState;
    });
  }

  render() {
    return (
      <div>
        <div className="list-group" id="deckList">
          {decks.map(deckInformation =>
            <a
              href="#"
              className={`list-group-item list-group-item-action${this.state.selectedDecks[deckInformation.shortName] ? ' active' : ''}`}
              onClick={() => this.toggle(deckInformation.shortName)}
              key={deckInformation.shortName}>
                {deckInformation.longName}
            </a>
          )}
        </div>
        <div className="pt-1">
          { Object.keys(this.state.selectedDecks)[0] &&
            <hr />
          }
          {decks.filter(deckInformation => this.state.selectedDecks[deckInformation.shortName]).map(deckInformation =>
            <button type="button" className="btn btn-outline-primary mr-2" onClick={() => this.toggle(deckInformation.shortName)}>
              {deckInformation.longName} <span aria-hidden="true">&times;</span>
            </button>
          )}
        </div>
      </div>
    );
  }
}

function render() {
  return (
    <div className="container-fluid p-5">
      <div className="row">
        <div className="col-lg-4">
          <div className="card">
            <div className="card-block-title">
              <h5 className="card-title">Select Categories</h5>
            </div>
            <div className="card-body">
              <DeckSelector />
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card">
            <div className="card-block-title">
              <h5 className="card-title">Configuration</h5>
            </div>
            <div className="card-body">
              <label className="bmd-label-static" htmlFor="answerTimeLimit">Answer time limit (seconds)</label>
              <input className="form-control" id="answerTimeLimit" defaultValue="30" />
              <label className="bmd-label-static mt-3" htmlFor="answerLeeway">Answer leeway (milliseconds)</label>
              <input className="form-control" id="answerLeeway" defaultValue="0" />
              <div className="checkbox mt-4">
                <label>
                  <input type="checkbox" /> Private game
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card">
            <div className="card-block-title">
              <h5 className="card-title">User</h5>
            </div>
            <div className="card-body">
              <label className="bmd-label-static" htmlFor="username">Username</label>
              <input className="form-control" id="username" defaultValue={defaultUsername} />
              <button className="btn btn-raised btn-primary mt-3">Start game</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default render;

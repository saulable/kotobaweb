import React, { Component } from 'react';
import './create.css';
import decks from './decks.js';

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
        <div class="pt-1">
          { Object.keys(this.state.selectedDecks)[0] &&
            <hr />
          }
          {decks.filter(deckInformation => this.state.selectedDecks[deckInformation.shortName]).map(deckInformation =>
            <button type="button" class="btn btn-outline-primary mr-2" onClick={() => this.toggle(deckInformation.shortName)}>
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
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card">
            <div className="card-block-title">
              <h5 className="card-title">User</h5>
            </div>
            <div className="card-body">
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default render;

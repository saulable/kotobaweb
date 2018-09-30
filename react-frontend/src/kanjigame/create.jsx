import React, { Component } from 'react';
import './create.css';
import decks from './decks.js';
import usernames from './usernames.js';
import ListPicker from '../controls/list_picker'

const listPickerItems = decks.map(deckInformation => ({
  key: deckInformation.shortName,
  value: deckInformation.longName,
}));

const defaultUsername = usernames[Math.floor(Math.random() * usernames.length)];

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
              <ListPicker maxHeight="500px" items={listPickerItems} selectionUpdated={() => {}} />
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

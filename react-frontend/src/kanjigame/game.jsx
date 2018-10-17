import React, { Component } from 'react';
import socketIO from 'socket.io-client';
import constants from './constants.js';
import socketEvents from '../common/socket_events.js';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import './game.css';

function NoSuchGameModal() {
  return (
    <div>
      <div className="modal" id="noSuchGameModal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">No game found</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>There is no game in progress at this location. Please check the join link, and confirm with the inviter whether the game is still in progress.</p>
            </div>
            <div className="modal-footer">
              <a href="/kanjigame/create" className="btn btn-primary">Create a game</a>
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EventBox(props) {
  return props.events.map((message, index) => (
    <div className="mb-1" key={index}>
      {message.text}
    </div>
  ));
}

class AnswerArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    };
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-12">
          <div className="card fixed-bottom" id="answerArea">
            <h3 className="card-title mt-3">{this.props.instructions}</h3>
            <div class="card-body">
              Test
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: socketIO(constants.SOCKET_SERVER_URI),
      events: [],
    };
  }

  render() {
    return (
      <div class="container">
        <NoSuchGameModal />
        <EventBox events={this.state.events} />
        <AnswerArea />
      </div>
    );
  }

  addEventAsChatMessage(eventData) {
    this.setState((previousState) => {
      previousState.events.push({ text: JSON.stringify(eventData) });
      return previousState;
    });
  }

  componentDidMount() {
    const query = queryString.parse(this.props.location.search);

    this.state.socket.on(socketEvents.Server.NO_SUCH_GAME, () => {
      window.$('#noSuchGameModal').modal();
    });

    this.state.socket.on(socketEvents.Server.CHAT, data => this.addEventAsChatMessage(data));
    this.state.socket.on(socketEvents.Server.PLAYER_LEFT, data => this.addEventAsChatMessage(data));
    this.state.socket.on(socketEvents.Server.SCORE_UPDATE, data => this.addEventAsChatMessage(data));
    this.state.socket.on(socketEvents.Server.UNANSWERED, data => this.addEventAsChatMessage(data));
    this.state.socket.on(socketEvents.Server.ANSWERED, data => this.addEventAsChatMessage(data));
    this.state.socket.on(socketEvents.Server.GAME_ENDED_NO_USERS, data => this.addEventAsChatMessage(data));
    this.state.socket.on(socketEvents.Server.GAME_ENDED_TOO_MANY_UNANSWERED_QUESTIONS, data => this.addEventAsChatMessage(data));
    this.state.socket.on(socketEvents.Server.GAME_ENDED_ERROR, data => this.addEventAsChatMessage(data));
    this.state.socket.on(socketEvents.Server.GAME_ENDED_MAINTENANCE, data => this.addEventAsChatMessage(data));
    this.state.socket.on(socketEvents.Server.PLAYER_LEFT, data => this.addEventAsChatMessage(data));
    this.state.socket.on(socketEvents.Server.PLAYER_JOINED, data => this.addEventAsChatMessage(data));
    this.state.socket.on(socketEvents.Server.NEW_QUESTION, data => this.addEventAsChatMessage(data));

    this.state.socket.emit(socketEvents.Client.JOIN_GAME, query);
  }
}

export default withRouter(Game);

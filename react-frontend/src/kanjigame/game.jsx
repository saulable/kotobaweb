import React, { Component, PureComponent } from 'react';
import socketIO from 'socket.io-client';
import constants from './constants.js';
import socketEvents from '../common/socket_events.js';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import 'bootstrap-material-design-icons/css/material-icons.css';
import './game.css';

const EventType = {
  CORRECT_ANSWER: 'correct answer',
  NO_ANSWER: 'incorrect answer',
  CHAT: 'chat',
};

function arrayBufferToBase64(buffer) {
  var binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[ i ]);
  }
  return window.btoa(binary);
}

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

function getEventSpecificJsx(ev) {
  const eventType = ev.eventType;
  const eventData = ev.eventData;

  if (eventType === EventType.CORRECT_ANSWER) {
    return (
      <div>
        <i class="material-icons correct-icon">check_circle</i>
        {' '}
        <a target="_blank" href={`https://jisho.org/search/${encodeURIComponent(eventData.question)}`}>{eventData.question}</a>
        <br />
        <span>Correct answers: {eventData.answers.join(', ')}</span>
        <br />
        <span>Answerers: {eventData.answerers.join(', ')}</span>
        <br />
        <span>Meaning: {eventData.meaning}</span>
      </div>
    );
  } else if (eventType === EventType.NO_ANSWER) {
    return (
      <div>
        <i class="material-icons incorrect-icon">close</i>
        {' '}
        <a target="_blank" href={`https://jisho.org/search/${encodeURIComponent(eventData.question)}`}>{eventData.question}</a>
        <br />
        <span>Correct answers: {eventData.answers.join(', ')}</span>
        <br />
        <span>Meaning: {eventData.meaning}</span>
      </div>
    );
  } else if (eventType === EventType.CHAT) {
    return (
      <div>
        <span>{eventData.username}</span>
        <br />
        <span>{eventData.text}</span>
      </div>
    );
  } else {
    return <div></div>
  }
}

class EventBox extends Component {
  componentDidUpdate() {
    this.refs.eventBoxContainer.scrollTop = this.refs.eventBoxContainer.scrollHeight;
  }

  render() {
    const props = this.props;
    return (
      <div id="eventBox">
        <div className="container" id="eventBoxContainer" ref="eventBoxContainer">
          { props.events.map((ev, index) => (
            <div className="row">
              <div className="col-sm-12" key={index}>
                {getEventSpecificJsx(ev)}
                <hr />
              </div>
            </div>
            ))
          }
        </div>
      </div>
    );
  }
}

class AnswerArea extends Component {
  handleSubmit = ev => {
    ev.preventDefault();

    const input = this.refs.answerInput.value;
    if (!input) {
      this.props.onSkip();
    } else {
      this.props.onSubmit(input);
      this.refs.answerInput.value = '';
    }
  }

  handleSkip = ev => {
    ev.preventDefault();
    this.refs.answerInput.value = '';
    this.props.onSkip();
  }

  render() {
    return (
      <div className="container fixed-bottom">
        <div className="row">
          <div className="col-sm-12">
            <div className="card mb-3" id="answerArea">
              <div className="card-body">
                <h3 className="card-title">{this.props.instructions}</h3>
                <div height="150">
                  <img src={this.props.imageDataUri} height="110"></img>
                </div>
                <form className="mb-0">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-lg-9 col-md-8 pl-0">
                        <div className="form-group mb-0">
                          <label htmlFor="answerInput" className="bmd-label-floating">Answer</label>
                          <input className="form-control" id="answerInput" ref="answerInput" />
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-4 pt-4">
                        <button type="submit" className="btn btn-primary active mr-2" onClick={this.handleSubmit}>Send</button>
                        <button type="submit" className="btn btn-primary active" onClick={this.handleSkip}>Skip</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
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
      currentQuestionData: {
        instructions: 'Next Question',
      },
    };
  }

  handleNewQuestion = questionData => {
    this.setState({
      currentQuestionData: {
        instructions: questionData.instructions,
        imageDataUri: 'data:image/png;base64,' + arrayBufferToBase64(questionData.bodyAsPngBuffer),
      },
    });
  };

  handleEventBoxEvent = (eventType, eventData) => {
    this.setState((previousState) => {
      previousState.events.push({ eventType, eventData });
      return previousState;
    });
  }

  onSubmit = answer => {
    this.state.socket.emit(socketEvents.Client.CHAT, answer);
    this.setState(previousState => {
      previousState.events.push({
        eventType: EventType.CHAT,
        eventData: {
          username: queryString.parse(this.props.location.search).username,
          text: answer,
        }
      });

      return previousState;
    });
  }

  onSkip = () => {
    this.state.socket.emit(socketEvents.Client.SKIP);
  }

  render() {
    return (
      <div>
        <div className="container">
          <NoSuchGameModal />
        </div>
        <EventBox events={this.state.events} />
        <AnswerArea {...this.state.currentQuestionData} onSubmit={this.onSubmit} onSkip={this.onSkip} />
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

    this.state.socket.on(socketEvents.Server.CHAT, data => this.handleEventBoxEvent(EventType.CHAT, data));
    this.state.socket.on(socketEvents.Server.PLAYER_LEFT, data => this.addEventAsChatMessage(data));
    this.state.socket.on(socketEvents.Server.SCORE_UPDATE, data => this.addEventAsChatMessage(data));
    this.state.socket.on(socketEvents.Server.UNANSWERED, data => this.handleEventBoxEvent(EventType.NO_ANSWER, data));
    this.state.socket.on(socketEvents.Server.ANSWERED, data => this.handleEventBoxEvent(EventType.CORRECT_ANSWER, data));
    this.state.socket.on(socketEvents.Server.GAME_ENDED_NO_USERS, data => this.addEventAsChatMessage(data));
    this.state.socket.on(socketEvents.Server.GAME_ENDED_TOO_MANY_UNANSWERED_QUESTIONS, data => this.addEventAsChatMessage(data));
    this.state.socket.on(socketEvents.Server.GAME_ENDED_ERROR, data => this.addEventAsChatMessage(data));
    this.state.socket.on(socketEvents.Server.GAME_ENDED_MAINTENANCE, data => this.addEventAsChatMessage(data));
    this.state.socket.on(socketEvents.Server.PLAYER_LEFT, data => this.addEventAsChatMessage(data));
    this.state.socket.on(socketEvents.Server.PLAYER_JOINED, data => this.addEventAsChatMessage(data));
    this.state.socket.on(socketEvents.Server.NEW_QUESTION, data => this.handleNewQuestion(data));

    this.state.socket.emit(socketEvents.Client.JOIN_GAME, query);
  }
}

export default withRouter(Game);

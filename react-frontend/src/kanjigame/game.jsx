import React, { Component } from 'react';
import socketIO from 'socket.io-client';
import constants from './constants.js';
import socketEvents from '../common/socket_events.js';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: socketIO(constants.SOCKET_SERVER_URI),
      chatMessages: [],
    };
  }

  render() {
    return (
      <div>
      </div>
    );
  }

  componentDidMount() {
    const query = queryString.parse(this.props.location.search);
    console.log(query);
    this.state.socket.emit(socketEvents.Client.JOIN_GAME, query.gameID);
  }
}

export default withRouter(Game);

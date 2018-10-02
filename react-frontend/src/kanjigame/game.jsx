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
        <div class="modal" id="noSuchGameModal" tabindex="-1" role="dialog">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">No game found</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <p>There is no game in progress at this location. Please check the join link, and confirm with the inviter whether the game is still in progress.</p>
              </div>
              <div class="modal-footer">
                <a href="/kanjigame/create" class="btn btn-primary">Create a game</a>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    const query = queryString.parse(this.props.location.search);

    this.state.socket.on(socketEvents.Server.NO_SUCH_GAME, () => {
      window.$('#noSuchGameModal').modal();
    });

    this.state.socket.emit(socketEvents.Client.JOIN_GAME, query);
  }
}

export default withRouter(Game);

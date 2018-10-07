const quizManager = require('./common/manager.js');
const Session = require('./common/session.js');
const DeckCollection = require('./common/deck_collection.js');
const DeckLoader = require('./common/deck_loader.js');
const normalGameMode = require('./common/normal_mode.js');
const socketIo = require('socket.io');
const errors = require('./../../src_common/socket_errors.js');
const events = require('./../../src_common/socket_events.js');
const namespace = require('./../../src_common/socket_namespaces.js').KANJI_GAME;
const assert = require('assert');

const MAX_EVENT_HISTORY_LENGTH = 50;
const roomForRoomID = {};

let uniqueIDIndex = 0;

// Considered using UUIDs for this but they were longer than I'd like,
// since this is exposed to the user in the game join URI.
// This algorithm will generate unique IDs that are sufficiently
// unguessable for this application.
function generateUniqueID() {
  const randomNumber = Math.floor(Math.random() * 10000000);
  ++uniqueIDIndex;
  return `${randomNumber}-${uniqueIDIndex}`;
}

class UserInfo {
  constructor(username) {
    this.username = username;
  }
}

class Room {
  constructor(roomID, sockets, isPrivate) {
    this.inPrivate = isPrivate;
    this.roomID = roomID;
    this.sockets = sockets;
    this.eventHistory = [];
    this.userInfoForUserID = {};
    this.latestInternalScores = {};

    roomForRoomID[roomID] = this;
  }

  addEventToHistory(eventName, data) {
    this.eventHistory.push({ eventName, data });
    if (this.eventHistory.length > MAX_EVENT_HISTORY_LENGTH) {
      this.eventHistory.shift();
    }
  }

  emitEventToAll(eventName, data) {
    console.log(`Emitting '${eventName}' to all`);
    this.sockets.to(this.roomID).emit(eventName, data);
    this.addEventToHistory(eventName, data);
  }

  emitEventFromSender(socket, eventName, data) {
    console.log(`Emitting '${eventName}' from sender`);
    socket.to(this.roomID).emit(eventName, data);
    this.addEventToHistory(eventName, data);
  }

  usernameTaken(username) {
    return Object.values(this.userInfoForUserID).some(userInfo => userInfo.username === username);
  }

  coerceUsername(desiredUsername) {
    if (!desiredUsername) {
      desiredUsername = 'Anonymous';
    }

    if (!this.usernameTaken(desiredUsername)) {
      return desiredUsername;
    }

    const index = 1;
    while (true) {
      const coercedUsername = index === 0 ? desiredUsername : `${desiredUsername}${index}`;
      if (!this.usernameTaken(coercedUsername)) {
        return coercedUsername;
      }

      index += 1;
    }
  }

  addPlayer(socket, username) {
    username = this.coerceUsername(username);

    socket.join(this.roomID);
    this.userInfoForUserID[socket.id] = new UserInfo(username);

    this.eventHistory.forEach(historicalEvent => {
      socket.emit(historicalEvent.eventName, historicalEvent.data);
    });

    this.emitLatestScores();
    this.emitEventFromSender(socket, events.Server.PLAYER_JOINED, { username });

    socket.on(events.Client.SKIP, () => {
      quizManager.skip(this.roomID);
    });

    socket.on(events.Client.CHAT, text => {
      this.emitEventFromSender(socket, events.Server.CHAT, { text, username });
      quizManager.processUserInput(this.roomID, socket.id, username, msg);
    });

    socket.on('disconnect', () => {
      this.removePlayer(socket);
    });
  }

  removePlayer(socket) {
    const username = this.userInfoForUserID[socket.id].username;
    this.emitEventFromSender(socket, events.Server.PLAYER_LEFT, { username });
    socket.leave(this.roomID);
    delete this.userInfoForUserID[socket.id];
    this.emitLatestScores();
    this.closeIfEmpty();
  }

  empty() {
    return !Object.keys(this.userInfoForUserID)[0];
  }

  closeIfEmpty() {
    if (this.empty()) {
        quizManager.stopQuiz(this.roomID, undefined, true);
    }
  }

  handleGameEnded(reason, unansweredQuestions) {
    this.emitEventToAll(reason, { unansweredQuestions });

    Object.keys(this.userInfoForUserID).forEach(userID => {
      const unqualifiedUserID = userID.replace(`${namespace}#`, '');
      const client = this.sockets.in(this.roomID).connected[unqualifiedUserID];
      client.leave(this.roomID);
    });

    delete roomForRoomID[this.roomID];
  }

  emitLatestScores() {
    const scoreForUserName = {};
    Object.keys(this.userInfoForUserID).forEach(userID => {
      scoreForUserName[this.userInfoForUserID[userID].username] = this.latestInternalScores[userID] || 0;
    });

    this.emitEventToAll(events.Server.SCORE_UPDATE, scoreForUserName);
  }

  // ClientDelegate callbacks
  notifyStarting(inMs, quizName, quizArticle) {
    console.log('Starting game');
  }

  showWrongAnswer(card, skipped) {
    this.emitEventToAll(events.Server.UNANSWERED, {
      question: card.question,
      answers: card.answer,
      meaning: card.meaning,
      skipped: skipped,
    });
  }

  outputQuestionScorers(card, answerersInOrder, answersForUser, pointsForAnswer, scoreForUserID) {
    let usernames = answerersInOrder.map(userID => this.userInfoForUserID[userID].username);
    this.emitEventToAll(events.Server.ANSWERED, {
      question: card.question,
      answers: card.answer,
      meaning: card.meaning,
      answerers: usernames,
    });

    this.latestInternalScores = scoreForUserID;
    this.emitLatestScores();
  }

  showQuestion(question) {
    this.emitEventToAll(events.Server.NEW_QUESTION, { question });
  }

  notifySaveSuccessful() {
    assert(false, 'Save is not supported on web');
  }

  notifySaveFailedNoSpace(maxSaves) {
    assert(false, 'Save is not supported on web');
  }

  notifySaveFailedIsReview() {
    assert(false, 'Save is not supported on web');
  }

  notifySaving() {
    assert(false, 'Save is not supported on web');
  }

  notifySaveFailedNotOwner() {
   assert(false, 'Save is not supported on web');
  }

  notifyQuizEndedScoreLimitReached(
    quizName,
    scoreForUserID,
    unansweredQuestions,
    aggregateLink,
    canReview,
    scoreLimit
  ) {
    assert(false, 'No score limit for web games');
  }

  notifyQuizEndedUserCanceled(
    quizName,
    scoreForUserID,
    unansweredQuestions,
    aggregateLink,
    canReview,
    cancelingUserID
  ) {
    this.handleGameEnded(events.Server.GAME_ENDED_NO_USERS, unansweredQuestions);
  }

  notifyQuizEndedTooManyWrongAnswers(
    quizName,
    scoreForUserId,
    unansweredQuestions,
    aggregateLink,
    canReview,
    wrongAnswers
  ) {
    this.handleGameEnded(
      events.Server.GAME_ENDED_TOO_MANY_UNANSWERED_QUESTIONS,
      unansweredQuestions
    );
  }

  notifyQuizEndedError(quizName, scoreForUserId, unansweredQuestions, aggregateLink, canReview) {
    this.handleGameEnded(events.Server.GAME_ENDED_ERROR, unansweredQuestions);
  }

  notifyQuizEndedNoQuestionsLeft(quizName, scoreForUserId, unansweredQuestions, aggregateLink, canReview, gameMode) {
    assert(false, 'In theory this could happen but I\'m not going to worry about it now');
  }

  notifyStoppingAllQuizzes(quizName, scoreForUserId, unansweredQuestions, aggregateLink, canReview) {
    this.handleGameEnded(events.Server.GAME_ENDED_MAINTENANCE, unansweredQuestions);
  }

  notifyStopFailedUserNotAuthorized() {
    assert(false, 'no way to stop from web');
  }
}

async function createRoom(config, sockets, socket) {
  const deckInformations = config.decks.map(deckName => {
    return {
      deckNameOrUniqueId: deckName,
    };
  });

  const decksStatus = await DeckLoader.getQuizDecks(deckInformations);
  const decks = decksStatus.decks;

  if (!decks || decks.length === 0) {
    return;
  }

  const deckCollection = DeckCollection.createNewFromDecks(decks, normalGameMode);

  const settings = {
    scoreLimit: Number.MAX_SAFE_INTEGER,
    unansweredQuestionLimit: 10,
    answerTimeLimitInMs: Math.min(Math.max(config.answerTimeLimitInMs, 5000), 180000),
    newQuestionDelayAfterUnansweredInMs: 500,
    newQuestionDelayAfterAnsweredInMs: 500,
    additionalAnswerWaitTimeInMs: Math.max(Math.min(config.answerForgivenessWindow, 10000), 0),
  };

  const roomID = generateUniqueID();
  const room = new Room(roomID, sockets, config.private);

  const session = Session.createNew(roomID, undefined, deckCollection, room, undefined, settings, normalGameMode);
  quizManager.startSession(session, roomID);

  return room;
}

function registerCreate(sockets, socket) {
  socket.on(events.Client.CREATE_GAME, config => {
    createRoom(config, sockets, socket).then(room => {
      socket.emit(events.Server.CREATED_GAME, room.roomID);
    });
  });
}

function registerJoin(socket) {
  socket.on(events.Client.JOIN_GAME, args => {
    const { gameID, username } = args;
    const game = roomForRoomID[gameID];
    if (!game) {
      socket.emit(events.Server.NO_SUCH_GAME);
    } else {
      game.addPlayer(socket, username);
    }
  });
}

function startListen(sockets) {
  const socketNamespace = sockets.of(namespace);

  socketNamespace.on('connection', socket => {
    registerCreate(sockets, socket);
    registerJoin(socket);
  });
}

module.exports = {
  startListen,
};

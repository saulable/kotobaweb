const quizManager = require('./../common/quiz/manager.js');
const Session = require('./../common/quiz/session.js');
const DeckCollection = require('./../common/quiz/deck_collection.js');
const DeckLoader = require('./../common/quiz/deck_loader.js');
const normalGameMode = require('./../common/quiz/normal_mode.js');
const socketIo = require('socket.io');
const errors = require('./../../src_common/socket_errors.js');
const events = require('./../../src_common/socket_events.js');
const namespace = require('./../../src_common/socket_namespaces.js').KANJI_GAME;
const generateUniqueID = require('uuid/v4');
const assert = require('assert');

const MAX_EVENT_HISTORY_LENGTH = 50;

const roomIDForUserID = {};
const roomForRoomID = {};

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
  }

  addEventToHistory(eventName, data) {
    this.eventHistory.push({ eventName, data });
    if (this.eventHistory.length > MAX_EVENT_HISTORY_LENGTH) {
      this.eventHistory.shift();
    }
  }

  emitEventToAll(eventName, data) {
    this.sockets.to(this.roomID, data);
    this.addEventToHistory(eventName, data);
  }

  emitEventFromSender(socket, eventName, data) {
    socket.to(this.roomID).emit(eventName, data);
    this.addEventToHistory(eventName, data);
  }

  addPlayer(socket, username) {
    socket.join(this.roomID);
    this.userInfoForUserID[socket.id] = new UserInfo(username);

    this.eventHistory.forEach(historicalEvent => {
      socket.emit(historicalEvent.eventName, historicalEvent.data);
    });

    this.emitEventFromSender(socket, { username });
  }

  removePlayer(socket) {
    const username = this.userInfoForUserID[socket.id].username;
    this.emitEventFromSender(socket, events.Server.PLAYER_LEFT, { username });
    delete this.userInfoForUserID[socket.id];

    if (!Object.keys(this.userInfoForUserID)[0]) {
      quizManager.stopQuiz(this.roomID, undefined, true);
    }
  }

  handleGameEnded(reason, unansweredQuestions) {
    this.emitEventToAll(reason, { unansweredQuestions });

    Object.keys(this.userInfoForUserID).forEach(userID => {
      delete roomIDForUserID[userID];
    });

    delete roomForRoomID[this.roomID];
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

    const scoreForUserName = {};
    Object.keys(this.userInfoForUserID).forEach(userID => {
      scoreForUserName[this.userInfoForUserID[userID].username] = scoreForUserID[userID] || 0;
    });

    this.emitEventToAll(events.Server.SCORE_UPDATE, scoreForUserName);
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
      events.SERVER.GAME_ENDED_TOO_MANY_UNANSWERED_QUESTIONS,
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

function createErrorResponse(error) {
  return {
    success: false,
    error,
  };
}

function createSuccessResponse(result) {
  return {
    success: true,
    result,
  };
}

async function createRoom(config, sockets, socket) {
  const deckInformations = config.decks.map(deckName => {
    return {
      deckNameOrUniqueID: deckName,
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
  const room = new Room(sockets, config.private);
  roomForRoomID[roomID] = roomInformation;

  const session = Session.createNew(roomID, undefined, deckCollection, room, undefined, settings, normalGameMode);
  quizManager.startSession(session, roomID);

  return room;
}

function registerCreate(sockets, socket) {
  socket.on(events.Client.CREATE_GAME, config => {
    const alreadyInRoom = !!roomIDForUserID[socket.id];
    if (alreadyInRoom) {
      return socket.emit(
        events.Server.CREATED_GAME,
        createErrorResponse(errors.CreateGame.ALREADY_IN_GAME)
      );
    }

    createRoom(config, sockets, socket).then(room => {
      room.addPlayer(socket, config.username);
      roomIDForUserID[socket.id] = room.roomID;
      return socket.emit(
        events.Server.CREATED_GAME,
        createSuccessResponse({ roomID });
      );
    });
  });
}

function registerDisconnect(socket) {
  socket.on('disconnect' () => {
    const roomID = roomIDForUserID[socket.id];
    if (roomID) {
      const room = roomForRoomID[roomID];
      room.removePlayer(socket);
    }
  });
}

function startListen(httpServer) {
  const socketNamespace = sockets.of(namespace);

  socketNamespace.on('connection', socket => {
    registerCreate(sockets, socket);
    registerDisconnect(socket);
  });
}

module.exports = {
  startListen,
  broadcast,
};

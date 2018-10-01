const express = require('express');
const logger = require('morgan');
const app = express();
const socketIO = require('socket.io');
const http = require('http').Server(app);
const kanjiGame = require('./quiz/start.js');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const sockets = socketIO(http);
kanjiGame.startListen(sockets);

module.exports = app;

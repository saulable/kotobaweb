const express = require('express');
const logger = require('morgan');

const app = express();
const server = require('http').Server(app);
const sockets = require('socket.io')(server);
const kanjiGame = require('./quiz/start.js');
const routes = require('./routes');

server.listen(3002);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', routes);

kanjiGame.startListen(sockets);

module.exports = app;

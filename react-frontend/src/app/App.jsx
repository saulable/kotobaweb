import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Nav from '../nav/nav';
import About from '../about/about';
import BotMain from '../bot/bot';
import StrokeOrder from '../strokeorder/strokeorder';
import KanjiGameCreate from '../kanjigame/create';
import KanjiGameRoom from '../kanjigame/game';
import BotQuizManual from '../bot/quiz_manual'

function renderNotFound() {
  return <p className="mt-2 ml-2">That page was not found</p>;
}

function render() {
  return (
    <BrowserRouter>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/about" component={About} />
          <Route exact path="/bot" component={BotMain} />
          <Route exact path="/bot/quiz" component={BotQuizManual} />
          <Route exact path="/strokeorder" component={StrokeOrder} />
          <Route exact path="/kanjigame/create" component={KanjiGameCreate} />
          <Route exact path="/kanjigame/game" component={KanjiGameRoom} />
          <Route render={renderNotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default render;

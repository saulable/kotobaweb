import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import './bot.css';
import '../main.css';
import Avatar from '../img/kotoba_avatar.png';
import commands from './commands';

function modalIdForExample(example) {
  return `modal-${example.imageName}`;
}

function createModals(commands) {
  return commands.map((command) => {
    return command.examples.filter(example => example.imageName).map((example) => {
      return (
        <div class="modal fade" id={modalIdForExample(example)}>
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="center-block">
                <div class="modal-header">
                  <h5 class="modal-title">{example.exampleText}</h5>
                  <button type="button" class="close" data-dismiss="modal" />
                </div>
                <div class="modal-body">
                  <img src={require(`./../img/command_example_images/${example.imageName}`)} alt="command example" />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  });
}

function createExamplesJsx(examples) {
  return examples.filter(example => example.imageName).map((example) => {
    return (
      <a href='#' data-toggle="modal" data-target={`#${modalIdForExample(example)}`} className="card-link" key={example.key}>{example.exampleText}</a>
    );
  });
}

function createCommandsJsx() {
  return commands.map((command) => {
    return (
      <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 pl-0 pr-4 pb-4" key={command.key}>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{command.primaryCommand}</h5>
            {command.shortCommand
              && (
                <h6 className="card-subtitle mb-2 text-muted">
                  short:&nbsp;
                  {command.shortCommand}
                </h6>
              )
            }
            <p className="card-text">{command.description}</p>
            {createExamplesJsx(command.examples)}
          </div>
        </div>
      </div>
    );
  });
}

function Commands() {
  return (
    <div>
      <div className="row pl-5 pb-4 pt-5">
        <div className="col-sm-12 pl-0">
          <h3 className>Commands</h3>
        </div>
      </div>
      <div className="row pl-5 pr-5">
        {createCommandsJsx()}
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="row p-5">
      <img alt="bot avatar" id="avatar" src={Avatar} />
      <div className="pl-3">
        <div className="pl-3">
          Kotoba Discord Bot
          <br />
          <a href="https://discordbots.org/bot/251239170058616833"><img src="https://discordbots.org/api/widget/status/251239170058616833.svg" alt="Discord Bots" /></a>
          &nbsp;
          <a href="https://discordbots.org/bot/251239170058616833"><img src="https://discordbots.org/api/widget/servers/251239170058616833.svg" alt="Discord Bots" /></a>
          <br />
        </div>
        <a className="btn btn-primary" href="https://discordapp.com/oauth2/authorize?client_id=251239170058616833&scope=bot">Discord Invite</a>
        <a className="btn btn-primary" href="https://github.com/mistval/kotoba">Github</a>
        <a className="btn btn-primary" href="https://discord.gg/zkAKbyJ">Help</a>
      </div>
    </div>
  );
}

function render() {
  return (
    <div id="container-fluid">
      {createModals(commands)}
      <Header />
      <Commands />
    </div>
  );
}

export default render;

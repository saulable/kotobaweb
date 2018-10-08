import React from 'react';
import './bot.css';
import '../main.css';
import Avatar from '../img/kotoba_avatar.png';
import commands from './commands';
import SubmenuBar from './../controls/submenu_bar.jsx';
import manualSections from './manual_sections.jsx';

function modalIdForExample(example) {
  return `modal-${example.imageName}`;
}

function createModals(commands) {
  return commands.map((command) => {
    return command.examples.filter(example => example.imageName).map((example) => {
      return (
        <div className="modal fade" id={modalIdForExample(example)} key={example.key}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="center-block">
                <div className="modal-header">
                  <h5 className="modal-title">{example.exampleText}</h5>
                  <button type="button" className="close" data-dismiss="modal" />
                </div>
                <div className="modal-body">
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
      <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 pr-2 pb-4" key={command.key}>
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
      <div className="row pt-3 pl-5 pr-5">
        {createCommandsJsx()}
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="row pl-5 pt-5 pb-5 bg-light">
      <div className="col-sm-12">
        <img className="align-top" alt="bot avatar" id="avatar" src={Avatar} />
        <div className="inline-block ml-4">
          <h5 className="mb-2">Kotoba Discord Bot</h5>
          <a href="https://discordbots.org/bot/251239170058616833"><img src="https://discordbots.org/api/widget/status/251239170058616833.svg" alt="Discord Bots" /></a>
          &nbsp;
          <a href="https://discordbots.org/bot/251239170058616833"><img src="https://discordbots.org/api/widget/servers/251239170058616833.svg" alt="Discord Bots" /></a>
          <br />
          <div className="mt-3">
            <a href="https://discordapp.com/oauth2/authorize?client_id=251239170058616833&scope=bot" target="_blank">INVITE</a>
            <a className="ml-4" href="https://github.com/mistval/kotoba" target="_blank">GITHUB</a>
            <a className="ml-4" href="https://discord.gg/zkAKbyJ" target="_blank">HELP</a>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuizManual() {
  return (
    <div className="row p-5 mr-5">
      <div className="col-lg-2 col-md-3 col-sm-12">
        { manualSections.map(section => {
          return (
            <p className="toc-item text-muted" key={section.title}>
              <a href={`#${section.title}`}>{ section.title }</a>
            </p>
          );
        }) }
      </div>
      <div className="col-lg-10 col-md-9 col-sm-12">
        { manualSections.map(section => {
          const Instructions = section.content;
          return (
            <div className="mb-5" id={section.title} key={section.title}>
              <h3>{ section.title }</h3>
              <Instructions />
            </div>
          );
        }) }
      </div>
    </div>
  );
}

const contentForTabName = {
  COMMANDS: Commands,
  "QUIZ MANUAL": QuizManual,
};

function render() {
  return (
    <div id="container-fluid">
      {createModals(commands)}
      <Header />
      <SubmenuBar initialTabName="QUIZ MANUAL" contentForTabName={contentForTabName} />
    </div>
  );
}

export default render;

import React from 'react';
import './bot.css';
import '../main.css';
import commands from './commands';
import Header from './header.jsx';

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

function render(props) {
  return (
    <div id="container-fluid">
      {createModals(commands)}
      <Header />
      <Commands />
    </div>
  );
}

export default render;

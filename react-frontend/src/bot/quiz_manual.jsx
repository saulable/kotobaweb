import React from 'react';
import './bot.css';
import '../main.css';
import manualSections from './manual_sections.jsx';
import Header from './header.jsx';

function QuizManual() {
  return (
    <div className="row pl-5 pr-5 mr-5">
      <div className="col-lg-2 col-md-3 col-sm-12 mb-5">
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

function render(props) {
  return (
    <div id="container-fluid">
      <Header />
      <QuizManual />
    </div>
  );
}

export default render;

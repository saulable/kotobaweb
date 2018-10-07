import React from 'react';

class ManualSection {
  constructor(title, content) {
    this.title = title;
    this.content = () => content;
  }
}

const manualSections = [];

manualSections.push(new ManualSection(
  'Score Limit',
  (<div>The score limit of a quiz can be configured by specifying a number after the quiz name. For example: <span class="example">k!quiz N1 20</span> for a JLPT N1 quiz with a score limit of 20. Note that this does not apply to conquest or inferno mode quizzes (because they do not have a score limit). For those, the first number after the deck name is the question delay. This setting can also be set with the <span class="example">k!settings</span> command.</div>),
));

manualSections.push(new ManualSection(
  'Question Delay',
  (<div>The delay between questions can be configured by specifying a number in seconds after the score limit. For example: <span class="example">k!quiz N1 20 1</span> for a JLPT N1 quiz with a score limit of 20 and a delay of 1 second in between questions. For conquest and inferno mode, omit the score limit, for example: <span class="example">k!quiz-conquest N1 1</span>. You can also use the <b>nodelay</b> keyword to set the delay to zero. For example: <span class="example">k!quiz N1 nodelay</span>. That is the same as <span class="example">k!quiz N1 10 0</span>. This setting can also be set with the <span class="example">k!settings</span> command.</div>),
));

manualSections.push(new ManualSection(
  'Time Limit',
  (<div>he amount of time that you have to answer each question can be configured by specifying a number in seconds after the question delay. For example: <span class="example">k!quiz N1 20 1 10</span> for a JLPT N1 quiz with a score limit of 20, a delay of 1 second in between questions, and a time limit of 10 seconds to answer each question. For conquest and inferno mode, omit the score limit, for example: <span class="example">k!quiz-conquest N1 1 10</span>. This setting can also be set with the <span class="example">k!settings</span> command.</div>),
));

manualSections.push(new ManualSection(
  'Reviewing',
  (<div>You can replay the questions you got wrong. To replay the questions no one got correct during the most recent game in the current channel, say <span class="example">k!quiz review</span>. To replay the questions that <b>you</b> did not get correct in the most recent game that you've played, say <span class="example">k!quiz reviewme</span>. Reviewme doesn't have to be used in the same channel that you played in. You can do it elsewhere, or in a DM.</div>),
));

manualSections.push(new ManualSection(
  'Saving and Loading',
  (<div>While a quiz is in progress, you can use <span class="example">k!quiz save</span> to save and pause it. When you're ready to play again, you can use <span class="example">k!quiz load</span> to load your save. This is mostly used for conquest mode.</div>),
));

manualSections.push(new ManualSection(
  'Conquest Mode',
  (<div>Conquest mode tries to teach you by repeating questions that you don't correctly answer. If you answer a question correctly the first time, you won't see it again. If you get it wrong, you'll see it again at least several more times. You can save and load your progress so that you don't have to do a whole deck in one sitting. You can start quiz in conquest mode like this: <span class="example">k!quiz-conquest N1</span>.</div>),
));

manualSections.push(new ManualSection(
  'Fonts',
  (<div>You can customize fonts and colors by using the <span class="example">k!settings</span> command and going into the fonts submenu by entering <span class="example">4</span>.</div>),
));

manualSections.push(new ManualSection(
  'Mixing Decks',
  (<div>You can mix any decks by using the + sign. For example: <span class="example">k!quiz N1+N2+N3</span>.</div>),
));

manualSections.push(new ManualSection(
  'Question Range',
  (<div>If you want to draw questions from a part of a deck instead of the whole thing, you can do that by specifying a range in parantheses. For example: <span class="example">k!quiz N1(1-100)</span> to draw questions only from the first 100 questions in the N1 deck.</div>),
));

manualSections.push(new ManualSection(
  'Multiple Choice',
  (<div>Some decks are multiple choice by default, and you can make most other decks multiple choice by adding <b>-mc</b> to the deck name. For example: <span class="example">k!quiz N1-mc</span> for a multiple choice N1 quiz.</div>),
));

manualSections.push(new ManualSection(
  'Importing Custom Decks',
  (<div></div>),
));

export default manualSections;

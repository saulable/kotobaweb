import React from 'react';

class ManualSection {
  constructor(title, content) {
    this.title = title;
    this.content = () => content;
  }
}

const manualSections = [];

manualSections.push(new ManualSection(
  'Basic help',
  (<div>To see available quiz decks, start a quiz, and see other basic help, just say <span class="example">k!quiz</span>.</div>),
));

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
  (<div>You can replay the questions you got wrong. To replay the questions no one got correct during the most recent game in the current channel, say <span class="example">k!quiz review</span>. To replay the questions that <b>you</b> did not get correct in the most recent game that you scored at least one point in, say <span class="example">k!quiz reviewme</span>. Reviewme doesn't have to be used in the same channel that you played in. You can do it elsewhere, like in a DM. Note that if I reboot, I'll forget your previous game and you won't be able to review it.</div>),
));

manualSections.push(new ManualSection(
  'Saving and Loading',
  (<div>While a quiz is in progress, you can use <span class="example">k!quiz save</span> to save and pause it. When you're ready to play again, you can use <span class="example">k!quiz load</span> to load your save. This is mostly used for conquest mode.</div>),
));

manualSections.push(new ManualSection(
  'Conquest Mode',
  (<div>Conquest mode tries to teach you by repeating questions that you don't correctly answer. If you answer a question correctly the first time, you won't see it again. If you get it wrong, you'll see it again at least several more times. You can save and load your progress so that you don't have to do a whole deck in one sitting (that would be pretty hardcore). You can start quiz in conquest mode like this: <span class="example">k!quiz-conquest N1</span>.</div>),
));

manualSections.push(new ManualSection(
  'Changing fonts and colors',
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
  (
    <div>
      <p>I can import decks that you upload to <a href="http://pastebin.com" target="_blank">pastebin.com</a>.</p>
      <p>To use such a deck in a server, that server must have internet decks enabled. If you're a server admin, you can enable internet decks with <span class="example">k!settings quiz/japanese/internet_decks_enabled true</span>. Understand that someone may put explicit content in a deck and use it in your server.</p>
      <p>Here is an example of a deck with three questions:</p>
      <div className="pl-4 mb-4">
        <code className="text-primary">
          FULL NAME: My Easy Deck!<br />
          SHORT NAME: myeasy<br />
          INSTRUCTIONS: Type the reading of the Kanji in Hiragana!<br />
          QUESTION TYPE: Image<br />
          <br />
          --QuestionsStart--<br />
          犬,いぬ,dog<br />
          1日,いちにち/ついたち,first of the month/one day<br />
          太陽,たいよう
        </code>
      </div>
      <p>After putting that on <a href="https://pastebin.com/Lu9SUGxY">pastebin</a>, you can take your pastebin link and say <span class="example">k!quiz pastebin.com/xxxxx</span>. After I load the deck successfully the first time, you can use your deck's short name instead: <span class="example">k!quiz myeasy</span>. If there is an error loading it, I will tell you what's wrong and you can fix it and make a new pastebin paste (don't edit the old one, make a new one) and try again.</p>
      <p>The <b>QUESTION TYPE</b> can be either "Image" or "Text", depending on if you want your question to be shown as a rendered image or just plain text. Image questions must be 10 characters or fewer. Text questions can be up to 300 characters long.</p>
      <p>You can delete your decks with <span class="example">k!quiz delete deckname</span>. If you want to edit your deck, you must delete it and recreate it with a new pastebin paste.</p>
      <p>Programs like Excel and Google Sheets can export to CSV format (comma separated values) so it might be easier to create your list of questions in a program like that and export to CSV.</p>
    </div>
  ),
));

export default manualSections;

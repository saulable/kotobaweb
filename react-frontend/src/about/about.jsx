import React from 'react';
import { NavLink } from 'react-router-dom';

function render() {
  return (
    <div className="container-fluid p-5">
      <div className="row">
        <div className="col-lg-8">
          <p>
            KotobaWeb is an extension of work I&#39;ve done for&nbsp;
            <NavLink exact activeClassName="active" to="/bot">my Discord Bot</NavLink>
            . In addition to the features here on the website, the bot has SRS,
            saving/loading, leaderboards, more question categories, plus other
            Japanese-related functions including dictionary searching, kanji
            searching, furigana rendering, and more.
          </p>
          <p>
            If you have feedback or ideas, please let me know using the contact form.
            The code for the website is&nbsp;
            <a href="https://github.com/mistval/kotobaweb">
              open source
            </a>
            &nbsp;and contributions are welcome.
          </p>
          <p>
            This site is built using <a href="https://reactjs.org/">React.js</a>,&nbsp;
            <a href="https://fezvrasta.github.io/bootstrap-material-design/">Bootstrap Material Design</a>,
            and <a href="http://expressjs.com/">Express.js</a>.
          </p>
          <p>
            The game data comes from various sources including <a href="https://jisho.org/">Jisho</a>,&nbsp;
            <a href="http://www.edrdg.org/wiki/index.php/KANJIDIC_Project">KANJIDIC</a>, and Patrick Roos's&nbsp;
            <a href="https://github.com/darkgray1981/kanjiquizbot">kanjiquizbot</a>.
          </p>
          <p>
            The kanji stroke order graphics were generated using <a href="https://github.com/maurimo/kanimaji">Kanimaji</a>&nbsp;
            and <a href="https://kanjivg.tagaini.net/">KanjiVG</a>.
          </p>
        </div>
        <div className="col-lg-4 card">
          <div className="card-body">
            <form method="post" action="contact">
              <h1 className="card-title mt-3">Contact</h1>
              <div className="form-group">
                <label className="bmd-label-floating" id="emailLabel" htmlFor="emailaddress">Email address</label>
                <input type="email" className="form-control" id="emailaddress" />
              </div>
              <div className="form-group">
                <label className="bmd-label-floating" htmlFor="message" id="messageLabel">Message</label>
                <textarea className="form-control" id="message" rows="5" />
              </div>
              <button type="submit" className="btn btn-primary active">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default render;

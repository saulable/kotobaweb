import React from 'react';
import '../main.css';
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
        </div>
        <div className="col-lg-4 card">
          <div className="card-body">
            <form method="post" action="contact">
              <h1 className="card-title">Contact</h1>
              <div className="form-group">
                <label className="bmd-label-static" id="emailLabel" htmlFor="emailaddress">Email</label>
                <input type="email" className="form-control" id="emailaddress" placeholder="Your email address" />
              </div>
              <div className="form-group">
                <label className="bmd-label-static" htmlFor="message" id="messageLabel">Message</label>
                <textarea className="form-control" id="message" placeholder="Your message" rows="5" />
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

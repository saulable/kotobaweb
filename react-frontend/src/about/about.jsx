import React from 'react';
import '../main.css';

function render() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-8 contentboxPadding">
          <div className="card textcontentbox">
            <p>
              KotobaWeb is an extension of work I&#39;ve done for
              <a href="http://kotoba.k33.we.bs/"> my Discord Bot</a>
              . In addition to the features here on the website, the bot has SRS,
              saving/loading, leaderboards, more question categories, plus other
              Japanese-related functions including dictionary searching, kanji
              searching, furigana rendering, and more.
            </p>
          </div>
        </div>
        <div className="col-lg-4 contentboxPadding">
          <div className="card formcontentbox">
            <form method="post" action="contact">
              <div className="form-group">
                <label htmlFor="emailaddress">Email</label>
                <input type="email" className="form-control" id="emailaddress" placeholder="Your email address" />
              </div>
              <div className="form-group">
                <label htmlFor="message" id="messageLabel">Message</label>
                <textarea className="form-control" id="message" placeholder="Your message" rows="5" />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default render;

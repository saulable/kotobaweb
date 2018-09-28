import React from 'react';
import '../main.css';

function render() {
  return (
    <div className="container-fluid p-5">
      <div className="row">
        <div className="col-lg-8">
          <p>
            KotobaWeb is an extension of work I&#39;ve done for
            <a href="http://kotoba.k33.we.bs/"> my Discord Bot</a>
            . In addition to the features here on the website, the bot has SRS,
            saving/loading, leaderboards, more question categories, plus other
            Japanese-related functions including dictionary searching, kanji
            searching, furigana rendering, and more.
          </p>
        </div>
        <div className="col-lg-4 card">
          <div className="card-body">
            <form method="post" action="contact">
              <h1 class="card-title">Contact</h1>
              <h6 class="card-subtitle mb-2 text-muted">Drop us a line</h6>
              <div className="form-group">
                <label class="bmd-label-static" id="emailLabel" htmlFor="emailaddress">Email</label>
                <input type="email" className="form-control" id="emailaddress" placeholder="Your email address" />
              </div>
              <div className="form-group">
                <label class="bmd-label-static" htmlFor="message" id="messageLabel">Message</label>
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

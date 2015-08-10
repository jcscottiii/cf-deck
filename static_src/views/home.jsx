
import React from 'react';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() { return (
      <article className="hero hero-sm">
        <h1>Welcome to cf-deck</h1>
        <h4>Please login to continue</h4>
        <button href="/handshake">Login</button>
        <aside className="right-content">
          <h5>Version: <span className="label">Alpha</span></h5>
          <a href="https://github.com/18F/cf-deck">
            <span>
              Contribute
            </span>
          </a>
        </aside>
        <hr />
      </article>
    );
  }
}

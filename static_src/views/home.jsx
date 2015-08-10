
import React from 'react';

import {cf} from '../cloud_foundry';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authorized: 'unauthorized'
    }
  }

  componentDidMount() {
    var self = this;

    cf.getAuthStatus().then((status) => {
      self.setState({
        authorized: status
      });
    });
  }

  render() {
    return (
      <article className="hero hero-sm">
        <h1>Welcome to cf-deck</h1>
        {this.state.authorized == 'unauthorized' ? (
          <div>
            <h4>Please login to continue</h4>
            <button href="/handshake">Login</button>
          </div>
          ) : (
          <h4>Logged in</h4>
        )}
        <aside className="right-content">
          <h5>Version: <span className="label">Alpha</span></h5>
          <a className="link-block"
              href="https://github.com/18F/cf-deck">
            Contribute
          </a>
        </aside>
        <hr />
      </article>
    );
  }
}

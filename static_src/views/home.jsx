
import React from 'react';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <article>
        <h2>Please login to continue</h2>
        <button href="/handshake">Login</button>
      </article>
    );
  }
}

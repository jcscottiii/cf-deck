
import React from 'react';

export default class App extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.render = this.render.bind(this);
    this.state = {
      visible: false
    };
  }

  render() {
    return (
      <main>
        <h1>CF Deck</h1>
      </main>
    );
  }

}

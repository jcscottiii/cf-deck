
import React from 'react';
import Router from 'react-router';

var RouteHandler = Router.RouteHandler;

export default class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <h1>CF Deck</h1>
        <main>
          <RouteHandler/>
        </main>
      </div>
    );
  }

}


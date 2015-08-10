
import React from 'react';
import Router from 'react-router';

import styles from './css/components/header.css';

var RouteHandler = Router.RouteHandler;

export default class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <header className={ styles.header }>
          <h3>cf-deck</h3>
        </header>
        <aside className="side_bar">
          <h4>Navigation</h4>
        </aside>
        <main className="main_bar">
          <RouteHandler/>
        </main>
      </div>
    );
  }

}


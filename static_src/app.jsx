
import React from 'react';
import Router from 'react-router';

import Home from './views/home.jsx';

import OrgList from './components/org_list.jsx';


import styles from './css/components/header.css';

var RouteHandler = Router.RouteHandler,
    Route = Router.Route,
    DefaultRoute = Router.DefaultRoute;

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
          <h4>Organizations</h4>
          <OrgList />
        </aside>
        <main className="main_bar">
          <RouteHandler/>
        </main>
      </div>
    );
  }
}

var routes = (
  <Route path="/" handler={App}>
    <DefaultRoute handler={Home}/>
  </Route>
);

export function run(selector) {
  Router.run(routes, Router.HistoryLocation, (Root) => {
    React.render(<Root/>, selector);
  });
};


import React from 'react';
import Router from 'react-router';

import Home from './views/home.jsx';

import OrgList from './components/org_list.jsx';
import Space from './components/space.jsx';
import Spaces from './components/spaces.jsx';


import styles from './css/components/header.css';

var RouteHandler = Router.RouteHandler,
    Route = Router.Route,
    DefaultRoute = Router.DefaultRoute;

export default class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    var params = this.context.router.getCurrentParams();

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
          <RouteHandler { ...params }/>
        </main>
      </div>
    );
  }
}
App.contextTypes = { router: React.PropTypes.func.isRequired };

var routes = (
  <Route handler={ App }>
    <DefaultRoute handler={ Home }/>
    <Route name="org" path="org/:orgGuid" handler={ Spaces }/>
    <Route name="space" path="spaces/:spaceGuid" handler={ Space }/>
  </Route>
);

export function run(selector) {
  Router.run(routes, Router.HashLocation, (Root) => {
    React.render(<Root/>, selector);
  });
};

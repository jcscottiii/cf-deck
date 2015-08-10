
import 'normalize.css';

import './css/main.css';


import React from 'react';
import Router from 'react-router';

import App from './app.jsx'
import Home from './views/home.jsx';


var Route = Router.Route,
    DefaultRoute = Router.DefaultRoute;

var routes = (
  <Route path="/" handler={App}>
    <DefaultRoute handler={Home}/>
  </Route>
);

Router.run(routes, Router.HistoryLocation, (Root) => {
  React.render(<Root/>, document.querySelector('.js-app'));
});

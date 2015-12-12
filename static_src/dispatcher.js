/* @flow */

import {Dispatcher} from 'flux';

class AppDispatcher extends Dispatcher {
  handleViewAction(action: any) {
    action.source = 'VIEW_ACTION';
    this.dispatch(action);
    console.log('::action::', action);
  }
  handleServerAction(action: any) {
    action.source = 'SERVER_ACTION';
    this.dispatch(action);
    console.log('::action::', action);
  }
}

let _AppDispatcher = new AppDispatcher();

export default _AppDispatcher;

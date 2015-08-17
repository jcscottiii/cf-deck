
import {Dispatcher} from 'flux';

class AppDispatcher extends Dispatcher {
  handleViewAction(action) {
    action.source = 'VIEW_ACTION';
    this.dispatch(action);
  }
  handleServerAction(action) {
    action.source = 'SERVER_ACTION';
    this.dispatch(action);
  }
}

let _AppDispatcher = new AppDispatcher();

export default _AppDispatcher;

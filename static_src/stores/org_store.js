
import {EventEmitter} from 'events';

import AppDispatcher from '../dispatcher';
import orgActionTypes from '../constants.js';

let _data = {};

class OrgStore extends EventEmitter {
  constructor() {
    super();
  }

  getAll() {
    return _data;
  }

  emitChange() {
    this.emit('CHANGE');
  }

  addChangeListener(cb) {
    this.on('CHANGE', cb);
  }

  removeChangeListener(cb) {
    this.removeListener('CHANGE', cb);
  }
}

let _OrgStore = new OrgStore();

AppDispatcher.register(function(action) {
  switch (action.type) {
    case orgActionTypes.ORGS_RECEIVED:
      _data = action.orgs;
      _OrgStore.emitChange();
      break;

    default:
      // Nothing
  }
});

export default _OrgStore;


import {EventEmitter} from 'events';

import AppDispatcher from '../dispatcher';
import { addUpdate } from './helpers.js';
import { spaceActionTypes } from '../constants.js';

class SpaceStore extends EventEmitter {
  constructor() {
    super();
    this._data = [];
  }

  get(guid) {
    return this._data.find((space) => {
      return space.guid === guid;
    });
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

let _SpaceStore = new SpaceStore();

AppDispatcher.register(function(action) {
  switch (action.type) {
    case spaceActionTypes.SPACE_RECEIVED:
      addUpdate(action.space, _SpaceStore);
      _SpaceStore.emitChange();
      break;

    default:
      // Nothing
  }
});

export default _SpaceStore;


import {EventEmitter} from 'events';

import AppDispatcher from '../dispatcher';
import { orgActionTypes } from '../constants.js';

let _data = [];

function formatData(resources) {
  return resources.map((resource) => {
    return Object.assign(resource.entity, resource.metadata);
  });
}

class OrgStore extends EventEmitter {
  constructor() {
    super();
  }

  get(guid) {
    return Array.find(_data, (org) => {
      return org.guid === guid;
    });
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
    case orgActionTypes.ORG_RECEIVED:
      var toUpdate = Array.find(_data, (org) => {
        return org.guid === action.org.guid;
      }) || {};
      toUpdate = Object.assign(toUpdate, action.org);
      _OrgStore.emitChange();
      break;

    case orgActionTypes.ORGS_RECEIVED:
      _data = formatData(action.orgs);
      _OrgStore.emitChange();
      break;

    default:
      // Nothing
  }
});

export default _OrgStore;

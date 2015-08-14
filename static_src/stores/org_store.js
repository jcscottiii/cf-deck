
import {EventEmitter} from 'events';

let data = {};

class OrgStore extends EventEmitter {
  constructor() {
    super();
  }

  getState() {
    return data;
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

/*
Dispaterher.register(function(action) {
  switch (action.type) {
    case 'ORGS_RECIEVED':
      data = action.orgs;
      _OrgStore.emitChange();
      break;

    default:
      //

  }
});

export default _OrgStore;

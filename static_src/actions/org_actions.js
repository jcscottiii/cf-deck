
import Dispatcher from '../dispatcher.js';

export default {
  fetch(guid) {
    AppDispatcher.handleAction({
      type: 'ORGS_FETCH',
      guid: guid
    });

    cf.fetOrgs(guid);
  },

  receivedOrgs(orgs) {
    AppDispatcher.handleAction({
      type: 'ORGS_RECEIVED',
      orgs: orgs
    });
  }
};

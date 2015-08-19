
import AppDispatcher from '../dispatcher.js';
import cfApi from '../utils/cf_api.js';
import { orgActionTypes } from '../constants';

export default {
  fetch(orgGuid) {
    AppDispatcher.handleViewAction({
      type: orgActionTypes.ORG_FETCH,
      orgGuid: orgGuid
    });

    cfApi.fetchOrg(orgGuid);
  },

  fetchAll() {
    AppDispatcher.handleViewAction({
      type: orgActionTypes.ORGS_FETCH
    });

    cfApi.fetchOrgs();
  },

  receivedOrg(org) {
    AppDispatcher.handleServerAction({
      type: orgActionTypes.ORG_RECEIVED,
      org: org
    });
  },

  receivedOrgs(orgs) {
    AppDispatcher.handleServerAction({
      type: orgActionTypes.ORGS_RECEIVED,
      orgs: orgs
    });
  }
};

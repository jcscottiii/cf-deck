
import http from 'axios';

import orgActions from '../actions/org_actions.js';
import spaceActions from '../actions/space_actions.js';
import errorActions from '../actions/error_actions.js';

const APIV = '/v2';

var returnAuthStatus = function(response) {
  return response.data.status
};

export default {
  getAuthStatus() {
    return http.get(APIV + '/authstatus')
      .then(returnAuthStatus, returnAuthStatus);
  },

  fetchOrgs() {
    return http.get(APIV + '/organizations').then((res) => {
      orgActions.receivedOrgs(res.data.resources);
    }, (err) => {
      errorActions.errorFetch(err);
    });
  },

  fetchOrg(guid) {
    return http.get(APIV + '/organizations/' + guid + '/summary').then((res) => {
      orgActions.receivedOrg(res.data);
    }, (err) => {
      errorActions.errorFetch(err);
    });
  },

  fetchSpace(guid) {
    return http.get(APIV + '/spaces/' + guid + '/sumary').then((res) => {
      spaceActions.receivedSpace(res.data);
    }, (err) => {
      errorActions.errorFetch(err);
    });
  }
};

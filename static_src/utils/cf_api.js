
import http from 'axios';

import orgActions from '../actions/org_actions.js';

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
  }
};

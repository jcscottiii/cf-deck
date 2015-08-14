
import http from 'axios';

import OrgActions from './actions/org_actions.js';

const APIV = '/v2';

var returnAuthStatus = function(response) {
  return response.data.status
};

export var cf = {
  getAuthStatus() {
    return http.get(APIV + '/authstatus')
      .then(returnAuthStatus, returnAuthStatus);
  },

  fetchOrgs() {
    return http.get(APIV + '/authstatus').then((res) => {
      OrgActions.recievedOrgs(res.data.response);
    }, (err) => {
      // ErrorActions.errorFetch(err);
    });
  }
};

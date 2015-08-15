
import http from 'axios';

import errorActions from '../actions/error_actions.js';
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
    return http.get(APIV + '/authstatus').then((res) => {
      orgActions.recievedOrgs(res.data.response);
    }, (err) => {
      errorActions.errorFetch(err);
    });
  }
};

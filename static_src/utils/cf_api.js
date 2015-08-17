
import http from 'axios';

import { orgActionTypes, errorActionTypes } from '../constants.js';

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

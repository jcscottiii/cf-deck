
import http from 'axios';

const APIV = '/v2';

var returnAuthStatus = function(response) {
  return response.data.status
};

export var cf = {
  getAuthStatus() {
    return http.get(APIV + '/authstatus')
      .then(returnAuthStatus, returnAuthStatus);
  }
};


import keymirror from 'keymirror';

var orgActionTypes = keymirror({
  ORGS_FETCH: null,
  ORGS_RECEIVED: null
});

var errorActionTypes = keymirror({
  FETCH: null
});

export { orgActionTypes, errorActionTypes };

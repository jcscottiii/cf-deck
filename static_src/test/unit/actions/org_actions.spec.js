
import '../../global_setup.js';

import AppDispatcher from '../../../dispatcher.js';
import cfApi from '../../../utils/cf_api.js';
import orgActions from '../../../actions/org_actions.js';
import { orgActionTypes } from '../../../constants.js';

describe('orgActions', () => {
  describe('fetchAll()', () => {
    it('should call apis fetch method', () => {
      var spy = sinon.spy(cfApi, 'fetchOrgs');

      orgActions.fetchAll();

      expect(spy).toHaveBeenCalledOnce();
    });

    it('should dispatch a view event of type orgs fetch', () => {
      var spy = sinon.spy(AppDispatcher, 'handleViewAction');

      orgActions.fetchAll();

      let arg = spy.getCall(0).args[0];
      expect(arg.type).toEqual(orgActionTypes.ORGS_FETCH);
    });
  });
});

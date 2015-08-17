
import '../../global_setup.js';

import AppDispatcher from '../../../dispatcher.js';
import cfApi from '../../../utils/cf_api.js';
import orgActions from '../../../actions/org_actions.js';
import { orgActionTypes } from '../../../constants.js';

describe('orgActions', () => {
  describe('fetch()', () => {
    it('should call apis fetch method', () => {
      var spy = sinon.spy(cfApi, 'fetchOrgs');

      orgActions.fetch();

      expect(spy).toHaveBeenCalledOnce();
    });

    it('should dispatch a view event of type orgs fetch', () => {
      var spy = sinon.spy(AppDispatcher, 'handleViewAction');

      orgActions.fetch();

      let arg = spy.getCall(0).args[0];
      expect(arg.type).toEqual(orgActionTypes.ORGS_FETCH);
    });
  });
});


import '../../global_setup.js';

import * as helpers from '../../helpers.js';
import AppDispatcher from '../../../dispatcher.js';
import OrgStore from '../../../stores/org_store.js';
import orgActions from '../../../actions/org_actions.js';
import { orgActionTypes } from '../../../constants';
        
describe('OrgStore', () => {
  var sandbox;

  beforeEach(() => {
    OrgStore._data = [];
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('getAll()', () => {
    it('should return object when no state', () => {
      expect(OrgStore.getAll()).toBeArray();
    });
  });

  xdescribe('get()', () => {
    it('should return the correct org based on guid', () => {
      var testOrgs = [
        { guid: '1xxa', name: 'testOrgA' },
        { guid: '1xxb', name: 'testOrgB' }
      ];

      orgActions.receivedOrgs(testOrgs);

      let actual = OrgStore.get(testOrgs[0].guid);

      expect(actual).toEqual(testOrgs[0]);
    });
  });

  describe('on orgs received', () => {
    it('should set data to passed in orgs', () => {
      var expected = helpers.wrapOrgs([{t: 1}, {t: 2}]);
      expect(OrgStore.getAll()).toBeArray();

      AppDispatcher.handleViewAction({
        type: orgActionTypes.ORGS_RECEIVED,
        orgs: expected
      });

      expect(OrgStore.getAll()).toEqual(helpers.unwrapOrgs(expected));
    });
    
    it('should emit a change event', () => {
      var spy = sinon.spy(OrgStore, 'emitChange');

      AppDispatcher.handleViewAction({
        type: orgActionTypes.ORGS_RECEIVED,
        orgs: []
      });

      expect(spy).toHaveBeenCalledOnce();
    });
  });
});

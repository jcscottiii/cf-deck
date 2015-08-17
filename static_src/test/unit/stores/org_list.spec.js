
import '../../global_setup.js';

import AppDispatcher from '../../../dispatcher.js';
import OrgStore from '../../../stores/org_store.js';
import { orgActionTypes } from '../../../constants';
        
describe('OrgStore', () => {
  beforeEach(() => {
    OrgStore.data = {};
  });

  describe('getAll()', () => {
    it('should return object when no state', () => {
      expect(OrgStore.getAll()).toBeObject();
    });
  });

  describe('on orgs received', () => {
    it('should set data to passed in orgs', () => {
      var expected = [{t: 1}, {t: 2}];
      expect(OrgStore.getAll()).toBeObject();


      AppDispatcher.handleViewAction({
        type: orgActionTypes.ORGS_RECEIVED,
        orgs: expected
      });

      expect(OrgStore.getAll()).toEqual(expected);
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

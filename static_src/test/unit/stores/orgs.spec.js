
import '../../global_setup.js';

import OrgStore from '../../../stores/orgs';

describe('OrgStore', () => {
  describe('getState()', () => {
    it('should return object when no state', () => {
      expect(OrgStore.getState()).toBeObject();
    });
  });
});

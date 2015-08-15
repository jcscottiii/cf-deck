
import '../../global_setup.js';

import OrgStore from '../../../stores/org_store.js';

describe('OrgStore', () => {
  describe('getAll()', () => {
    it('should return object when no state', () => {
      expect(OrgStore.getAll()).toBeObject();
    });
  });
});

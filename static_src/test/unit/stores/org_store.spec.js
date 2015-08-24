
import '../../global_setup.js';

import * as helpers from '../../helpers.js';
import AppDispatcher from '../../../dispatcher.js';
import OrgStore from '../../../stores/org_store.js';
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

  describe('constructor()', () => {
    it('should set _data to empty array', () => {
      expect(OrgStore._data).toBeEmptyArray();
    });
  });

  describe('getAll()', () => {
    it('should return object when no state', () => {
      expect(OrgStore.getAll()).toBeArray();
    });
  });

  describe('get()', () => {
    it('should return the correct org based on guid', () => {
      var testOrgs = [
        { guid: '1xxa', name: 'testOrgA' },
        { guid: '1xxb', name: 'testOrgB' }
      ];

      OrgStore._data = testOrgs;

      let actual = OrgStore.get(testOrgs[0].guid);

      expect(actual).toEqual(testOrgs[0]);
    });
  });

  describe('on org received', () => {
    it('should ensure org passed in has data added to it', () => {
      var testGuid = 'xaaddf',
          expected = {
            guid: testGuid,
            name: 'orgA',
            spaces: [
              { guid: 'xaaddf1', name: 'spaceA'},
              { guid: 'xaaddf2', name: 'spaceB'}
            ]
          };

      OrgStore._data = [
        { guid: testGuid, spaceUrl: 'https://space' }
      ];
      expect(OrgStore.get(testGuid)).toBeObject();

      AppDispatcher.handleViewAction({
        type: orgActionTypes.ORG_RECEIVED,
        org: expected
      });

      expect(OrgStore._data[0].guid).toEqual(expected.guid);
      expect(OrgStore._data[0].spaces).toEqual(expected.spaces);
    });

    it('should add the org if it\'s not in the data yet', () => {
      var testGuid = 'vvvsas',
          expected = {
            guid: testGuid,
            name: 'orgA'
          };

      AppDispatcher.handleViewAction({
        type: orgActionTypes.ORG_RECEIVED,
        org: expected
      });

      expect(OrgStore._data[0].guid).toEqual(expected.guid);
    });

    it('should emit a change event', () => {
      var spy = sandbox.spy(OrgStore, 'emitChange');

      AppDispatcher.handleViewAction({
        type: orgActionTypes.ORG_RECEIVED,
        orgs: []
      });

      expect(spy).toHaveBeenCalledOnce();
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
      var spy = sandbox.spy(OrgStore, 'emitChange');

      AppDispatcher.handleViewAction({
        type: orgActionTypes.ORGS_RECEIVED,
        orgs: []
      });

      expect(spy).toHaveBeenCalledOnce();
    });
  });
});

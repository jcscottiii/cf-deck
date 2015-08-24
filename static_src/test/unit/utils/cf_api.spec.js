
import '../../global_setup.js';

import http from 'axios';

import cfApi from '../../../utils/cf_api.js';
import orgActions from '../../../actions/org_actions.js';

describe('cfApi', () => {
  var sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('fetchOrg()', () => {
    it('returns a promise', () => {
      var actual = cfApi.fetchOrg('xxaa');

      expect(actual.then).toBeTruthy();
    });

    it('calls http get request with guid', () => {
      var spy = sandbox.spy(http, 'get'),
          expected = 'xxxaa2';

      cfApi.fetchOrg(expected);

      let actual = spy.getCall(0).args[0];

      expect(actual).toMatch(new RegExp(expected));
    });

    xit('calls received org action with response data on success', () => {
      var testRes = {
        data: {
          guid: 'xxaa',
          name: 'testOrgA'
        }
      };

      let spy = sandbox.spy(orgActions, 'receivedOrg');
      sandbox.stub(http, 'get').returns(new Promise(testRes));

      cfApi.fetchOrg('xxaa');

      expect(spy).toHaveBeenCalledOnce();
    });

    it('calls error actions with error on failure', () => {

    });
  });
});

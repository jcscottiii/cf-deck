
import '../../global_setup.js';

import http from 'axios';

import cfApi from '../../../utils/cf_api.js';
import orgActions from '../../../actions/org_actions.js';
import spaceActions from '../../../actions/space_actions.js';
import errorActions from '../../../actions/error_actions.js';

function createPromise(res, err) {
  //return new Promise((resolve, reject) => {
  //  if (!shouldFail) {
  //    resolve(res);
  //  } else {
  //    reject(Error('Promise failed'));
  //  }
  //});
  return {
    then: function(cb, errCb) {
      if (!err) {
        cb(res);
      } else {
        errCb(err);
      }
    }
  }
};

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

      expect(spy).toHaveBeenCalledOnce();
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
  });

  describe('fetchSpace()', () => {
    it('calls http get request for space with guid', () => {
      var spy = sandbox.spy(http, 'get'),
          expected = 'yyyybba1';

      cfApi.fetchSpace(expected);

      expect(spy).toHaveBeenCalledOnce();
      let actual = spy.getCall(0).args[0];
      expect(actual).toMatch(new RegExp(expected));
    });

    it('calls received action with space from response on success', () => {
      var expectedGuid = 'ttba',
          expected = { data: { guid: expectedGuid } },
          stub = sandbox.stub(http, 'get'),
          spy = sandbox.spy(spaceActions, 'receivedSpace');

      let testPromise = createPromise(expected);

      stub.returns(testPromise);

      cfApi.fetchSpace(expectedGuid);
      expect(spy).toHaveBeenCalledOnce();
      expect(spy).toHaveBeenCalledWith(expected.data);
    });

    it('calls errorActions fetch error on failure', () => {
      var stub = sandbox.stub(http, 'get'),
          spy = sandbox.spy(errorActions, 'errorFetch'),
          expected = { message: 'error' };

      let testPromise = createPromise(true, expected);

      stub.returns(testPromise);

      let actual = cfApi.fetchSpace();
      expect(spy).toHaveBeenCalledOnce();
      expect(spy).toHaveBeenCalledWith(expected);
    });
  });
});

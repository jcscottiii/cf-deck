
import '../../global_setup.js';

import * as helpers from '../../helpers.js';
import AppDispatcher from '../../../dispatcher.js';
import SpaceStore from '../../../stores/space_store.js';
import { spaceActionTypes } from '../../../constants';

describe('SpaceStore', () => {
  var sandbox;

  beforeEach(() => {
    SpaceStore._data = [];
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('constructor()', () => {
    it('should set _data to empty array', () => {
      expect(SpaceStore._data).toBeEmptyArray();
    });
  });

  describe('get()', () => {
    it('should return the correct space based on guid', () => {
      var testSpaces = [
        { guid: 'sp1xxa', name: 'testSpaceA', apps: [] },
        { guid: 'sp1xxb', name: 'testSpaceB', apps: [] }
      ];

      SpaceStore._data = testSpaces;

      let actual = SpaceStore.get(testSpaces[0].guid);

      expect(actual).toEqual(testSpaces[0]);
    });
  });

  describe('on space received', () => {
    it('should emit a change event', () => {
      var spy = sinon.spy();

      SpaceStore.addChangeListener(spy);
      AppDispatcher.handleServerAction({
        type: spaceActionTypes.SPACE_RECEIVED,
        space: {}
      });

      expect(spy).toHaveBeenCalledOnce();
    });

    it('should add space to data if not already there', () => {
      var testGuid = 'spmmaax';

      let expected = {
        guid: testGuid,
        name: 'testSpaceA'
      }

      AppDispatcher.handleServerAction({
        type: spaceActionTypes.SPACE_RECEIVED,
        space: expected
      });

      expect(SpaceStore._data.length).toBeGreaterThan(0);
      expect(SpaceStore.get(testGuid)).toEqual(expected);
    });
    
    it('should augment the existing space with new data', () => {
      var testGuid = 'spmmaax';

      let expected = {
        guid: testGuid,
        name: 'testSpaceA'
      }
      let updated = {
        guid: testGuid,
        name: 'testSpaceA',
        apps: [{guid: 'bba', name: 'testAppA'}]
      }

      SpaceStore._data.push(expected);
      expect(SpaceStore.get(testGuid)).toEqual(expected);
      AppDispatcher.handleServerAction({
        type: spaceActionTypes.SPACE_RECEIVED,
        space: updated
      });

      expect(SpaceStore.get(testGuid)).toEqual(updated);
    });
  });
});

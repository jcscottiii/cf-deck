
import '../../global_setup.js';

import React from 'react';
import Reactable from 'reactable';
import TestUtils from 'react/lib/ReactTestUtils';

import Space from '../../../components/space.jsx';
import SpaceStore from '../../../stores/space_store.js';
import spaceActions from '../../../actions/space_actions.js';

describe('Space', () => {
  var sandbox,
      space,
      Table;

  beforeEach(() => {
    SpaceStore._data = [];
    sandbox = sinon.sandbox.create();
    Table = sandbox.stub(Reactable, 'Table');
  });

  afterEach(() => {
    if (space) {
      let spaceDom = React.findDOMNode(space);

      if (spaceDom) {
        React.unmountComponentAtNode(spaceDom.parentNode);
      }
    }
    sandbox.restore();
  });

  describe('constructor()', () => {
    it('should set state rows to SpaceStore', () => {
      var testGuid = 'spabbbs',
          testSpace = { guid: testGuid, name: 'testSpaceB' };

      SpaceStore._data = [testSpace];
      space = TestUtils.renderIntoDocument(<Space spaceGuid={ testGuid }/>)

      expect(space.state).toEqual(testSpace);
    });
  });
  
  describe('componentDidMount()', () => {
    it('should add change listener on space store', () => {
      var stub = sandbox.stub(SpaceStore, 'addChangeListener')

      space = TestUtils.renderIntoDocument(<Space spaceGuid={ 'spaabsf' } />);

      expect(stub).toHaveBeenCalledOnce();
      expect(stub).toHaveBeenCalledWith(space._onChange);
    });

    it('should call the fetch space action with guid prop', () => {
      var stub = sandbox.stub(spaceActions, 'fetch'),
          expected = 'sp889ssz';

      space = TestUtils.renderIntoDocument(<Space spaceGuid={ expected } />);

      expect(stub).toHaveBeenCalledOnce();
      expect(stub).toHaveBeenCalledWith(expected);
    });
  });

  describe('render()', () => {

  });
});

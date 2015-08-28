
import '../../global_setup.js';

import React from 'react';
import Reactable from 'reactable';
import TestUtils from 'react/lib/ReactTestUtils';

import Space from '../../../components/space.jsx';
import SpaceStore from '../../../stores/space_store.js';
import spaceActions from '../../../actions/space_actions.js';

class TestTable extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    var rows = this.props.data;
    return (
      <table>
      {rows.map(function(row, i) {
        return (
          <tr key={i}>
            {row.length && row.map(function(col, j) {
              return <td key={j}>{col}</td>;
            })}
          </tr>
        );
      })}
      </table>
    );
  }
}

describe('Space', () => {
  var sandbox,
      space,
      Table;

  beforeEach(() => {
    SpaceStore._data = [];
    sandbox = sinon.sandbox.create();
    Space.Table = TestTable;
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
    it('should render message if no spaces', () => {
      space = TestUtils.renderIntoDocument(<Space spaceGuid={ 'spaabsf' } />);

      let message = TestUtils.findRenderedDOMComponentWithClass(
            space, 'test-none_message');

      expect(message.getDOMNode().textContent).toBeTruthy();
    });

    it('should render a row for each app', () => {
      var testGuid = 'sp787sdf';
      
      let testSpace = {
        guid: testGuid,
        apps: [{ name: 'test1', guid: 'apadf'}, { name: 'test2', guid: 'apadf'}]
      };
      SpaceStore._data = [testSpace];
      Space.Table = TestTable;

      space = TestUtils.renderIntoDocument(<Space spaceGuid={ testGuid }/>)

      let items = TestUtils.scryRenderedDOMComponentsWithTag(
          space, 'tr');

      expect(items).toBeArrayOfSize(2);
    });
  });
});

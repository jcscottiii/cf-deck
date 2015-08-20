
import '../../global_setup.js';

import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';

import Spaces from '../../../components/spaces.jsx';
import OrgStore from '../../../stores/org_store.js';
import orgActions from '../../../actions/org_actions.js';

function setupSpaces(testSpaces) {
  var spaces = TestUtils.renderIntoDocument(<Spaces/>);
  spacesActions.receivedSpaces(testSpaces);

  return spaces;
}

describe('Spaces', () => {
  var sandbox,
      spaces;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    spaces = TestUtils.renderIntoDocument(<Spaces/>);
  });

  afterEach(() => {
    React.unmountComponentAtNode(React.findDOMNode(spaces).parentNode);
    sandbox.restore();
  });

  describe('render()', () => {
    // TODO this test can't be run because the browser breaks when trying to
    // stub the OrgStore.get method.
    xit('should render each space', () => {
      var testGuid = 'xxaa1',
          testSpaces = {
            guid: testGuid,
            spaces: [
              { guid: 'aai', name: 'testspace1' },
              { guid: 'bba', name: 'testspace2' }
            ]
          };
      
      sandbox.stub(OrgStore, 'get').returns(testSpaces);

      spaces = TestUtils.renderIntoDocument(<Spaces orgGuid={ testGuid }/>)

      let items = TestUtils.scryRenderedDOMComponentsWithTag(
          spaces, 'tr');

      expect(items).toBeArrayOfSize(2);
    });

    it('should render message if no spaces', () => {
      spaces = TestUtils.renderIntoDocument(<Spaces/>);

      let message = TestUtils.findRenderedDOMComponentWithClass(
            spaces, 'test-none_message');

      expect(message.getDOMNode().textContent).toBeTruthy();
    });

    // TODO this test can't be run because theres an error when receivedOrg
    // is called, probably related to router.
    xit('should link to the space page', () => {
      spaces = TestUtils.renderIntoDocument(<Spaces/>),
      var testSpaces = {
            spaces: [
              { guid: '1aaxx', name: 'testspace1' }
            ]
          };

      orgActions.receivedOrg(testSpaces);

      let items = TestUtils.scryRenderedDOMComponentsWithClass(
          spaces, 'test-space');
      let links = TestUtils.scryRenderedDOMComponentsWithTag(
          items, 'a');

      expect(a.attributes.href).toContain(testSpaces[0].guid);
    });
  });
});


import '../../global_setup.js';

import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';

// Spaces
// SpacesStore
// Spaces Action

function setupSpaces(testSpaces) {
  var spaces = TestUtils.renderIntoDocument(<Spaces/>);
  spacesActions.receivedSpaces(testSpaces);

  return spaces;
}

xdescribe('Spaces', () => {
  describe('render()', () => {
    xit('should render each space', () => {
      var spaces = TestUtils.renderIntoDocument(<Spaces/>),
          testSpaces = {
            spaces: [
              { guid: 1, name: 'testspace1' },
              { guid: 2, name: 'testspace2' }
            ]
          };

      orgActions.receivedOrg(testSpaces);

      let items = TestUtils.scryRenderedDOMComponentsWithClass(
          spaces, 'test-space');

      expect(items).toBeArrayOfSize(2);
    });

    it('should render message if no spaces', () => {
      var spaces = TestUtils.renderIntoDocument(<Spaces/>);

      let message = TestUtils.scryRenderedDOMComponentsWithClass(
            spaces, 'test-none_message');

      expect(message).toBeEl();
      expect(message).toHaveText(); 
    });

    it('should link to the space page', () => {
      var spaces = TestUtils.renderIntoDocument(<Spaces/>),
          testSpaces = {
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

  xdescribe('sortBy', () => {
    it('should sort the elements by field passed', () => {
      var testSpaces = [
            { guid: 1, name: 'testspace1', app_count: 2 },
            { guid: 2, name: 'testspace2', app_count: 1 }
          ],
          spaces = setupSpaces(testSpaces);

      let items = TestUtils.scryRenderedDOMComponentsWithClass(
          spaces, 'test-space');

      let actual = items[0].innerHTML();
      expected = new RegExp(name);

      expect(expected.test(actual)).toBe(true);

      spaces.sortBy('app_count');
      actual = items[1].innerHTML();

      expect(expected.test(actual)).toBe(true);
    });
  });
});

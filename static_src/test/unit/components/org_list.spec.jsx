
import '../../global_setup.js';

import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';

import * as helpers from '../../helpers.js';
import OrgList from '../../../components/org_list.jsx';
import orgActions from '../../../actions/org_actions.js';

describe('OrgList', () => {
  describe('render()', () => {
    it('renders', () => {
      var orgList = TestUtils.renderIntoDocument(<OrgList/>);
      expect(orgList).toBeDefined();
    });

    it('renders a list element for each org', () => {
      var testOrgs = [
        {id: 1, name: 'test1'},
        {id: 2, name: 'test2'}
      ],
          orgList = TestUtils.renderIntoDocument(<OrgList />);

      orgActions.receivedOrgs(helpers.wrapOrgs(testOrgs));

      let lis = TestUtils.scryRenderedDOMComponentsWithTag(
         orgList, 'li');
      expect(lis).toBeArrayOfSize(2);
    });
  });
});

import '../../global_setup.js';

import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';

import * as helpers from '../../helpers.js';
import OrgList from '../../../components/org_list.jsx';
import orgActions from '../../../actions/org_actions.js';

describe('OrgList', () => {
  var orgList;

  beforeEach(() => {
    orgList = TestUtils.renderIntoDocument(<OrgList/>);
  });

  afterEach(() => {
    React.unmountComponentAtNode(React.findDOMNode(orgList).parentNode);
  });

  describe('render()', () => {
    it('renders', () => {
      expect(orgList).toBeDefined();
    });

    // TODO this can't be tested because the Link element breaks without the
    // router context
    xit('renders a list element for each org', () => {
      var testOrgs = [
        {metadata: {guid: 'bbx'}, entity:{ name: 'test1a'}},
        {metadata: {guid: 'bbz'}, entity:{ name: 'test2a'}},
      ];

      orgActions.receivedOrgs(testOrgs);

      let lis = TestUtils.scryRenderedDOMComponentsWithTag(
         orgList, 'li');
      expect(lis).toBeArrayOfSize(2);
    });
  });
});

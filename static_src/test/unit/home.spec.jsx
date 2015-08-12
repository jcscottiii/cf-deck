
Function.prototype.bind = Function.prototype.bind || function (thisp) {
  var fn = this;
  return function () {
    return fn.apply(thisp, arguments);
  };
};

import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';

import Home from '../../views/home.jsx';
import { cf } from '../../cloud_foundry';

describe('Home', () => {
  describe('render()', () => {
    it('renders', () => {
      var home = TestUtils.renderIntoDocument(<Home/>);
      expect(home).toBeDefined();
    });

    it('includes a welcome', () => {
      var home = TestUtils.renderIntoDocument(<Home/>);

      let h1 = TestUtils.findRenderedDOMComponentWithTag(
         home, 'h1');

      expect(h1.getDOMNode().textContent).toEqual('Welcome to cf-deck');
    });

    it('includes a link to contribute', () => {
      var home = TestUtils.renderIntoDocument(<Home/>);

      let link = TestUtils.findRenderedDOMComponentWithClass(
          home, 'test-contribute_link');

      expect(link.getDOMNode().getAttribute('href')).toEqual(
          'https://github.com/18F/cf-deck');
    });

    it('should render the login interface if not logged in', () => {
      var home = TestUtils.renderIntoDocument(<Home/>);

      home.setState({authorized: 'unauthorized'});

      let login = TestUtils.findRenderedDOMComponentWithClass(
          home, 'test-login');

      expect(login.getDOMNode()).toBeDefined();
    });

    it('should render navigation and not login if not logged in', () => {
      var home = TestUtils.renderIntoDocument(<Home/>);

      home.setState({authorized: 'authorized'});

      let login = TestUtils.scryRenderedDOMComponentsWithClass(
          home, 'test-login');
      let navigation = TestUtils.findRenderedDOMComponentWithClass(
          home, 'test-navigation');

      expect(login).toBeEmptyArray();
      expect(navigation.getDOMNode()).toBeDefined();
    });
  });

  describe('login()', () => {
    xit('navigations to /handshake page', () => {
      var home = TestUtils.renderIntoDocument(<Home/>);
      home.login();
      expect(window.location.href).toEqual('/handshake');
    });
  });

  describe('componentDidMount()', () => {
    it('should get auth status from cf and set authorized state', () => {
      var expected = 'unauthorized';
      var stub = sinon.stub(cf, 'getAuthStatus');

      stub.onFirstCall().returns({
        then(cb) {
          return cb(expected);
        }
      });
      stub.onSecondCall().returns({
        then(cb) {
          return cb(expected);
        }
      });

      let home = TestUtils.renderIntoDocument(<Home/>);
      let actual = home.state.authorized;
      expect(actual).toEqual(expected);

      expected = 'authorized';
      home = TestUtils.renderIntoDocument(<Home/>);
      actual = home.state.authorized;
      expect(actual).toEqual(expected)
    });
  });
});

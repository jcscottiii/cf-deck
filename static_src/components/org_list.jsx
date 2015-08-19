
import React from 'react';
import Router from 'react-router';

import orgActions from '../actions/org_actions';
import AppDispatcher from '../dispatcher';
import OrgStore from '../stores/org_store';

var Link = Router.Link;

export default class OrgList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orgs: OrgStore.getAll()
    };
    
    // TODO parent class
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    OrgStore.addChangeListener(this._onChange);
    orgActions.fetchAll();
  }

  gotoOrg(orgGuid) {
    window.location.href = '/org/' + orgGuid;
  }

  render() {
    return (
      <ul>
        { this.state.orgs.map((org) => {
          return ( 
            <li key={ org.guid }>
              <Link to="org" params={{orgGuid: org.guid}}>{ org.name }</Link>
            </li>
          );
        })}
      </ul>
    );
  }

  _onChange() {
    this.setState({
      orgs: OrgStore.getAll()
    });
  }
}

OrgList.propTypes = { initialOrgs: React.PropTypes.array };
OrgList.defaultProps = { initialOrgs: [] };

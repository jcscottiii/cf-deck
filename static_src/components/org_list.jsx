
import React from 'react';

import orgActions from '../actions/org_actions';
import AppDispatcher from '../dispatcher';
import OrgStore from '../stores/org_store';

export default class OrgList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orgs: OrgStore.getAll()
    };
  }

  componentDidMount() {
    orgActions.fetch();
    OrgStore.addChangeListener(this._onChange);
  }

  render() {
    return (
      <ul>
        { this.state.orgs.map((org) => {
          return <li key={ org.id }>{ org.name }</li>;
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

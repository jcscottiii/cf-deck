
import React from 'react';

import orgActions from '../actions/org_actions';
import AppDispatcher from '../dispatcher';
import OrgStore from '../stores/org_store';

export default class OrgList extends React.Component {
  constructor(props) {
    super(props);
    this._onChange = this._onChange.bind(this);
    this.state = {
      orgs: OrgStore.getAll()
    };
  }

  componentDidMount() {
    OrgStore.addChangeListener(this._onChange);
    orgActions.fetch();
  }

  render() {
    return (
      <ul>
        { this.state.orgs.map((org) => {
          return <li key={ org.guid }>{ org.name }</li>;
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

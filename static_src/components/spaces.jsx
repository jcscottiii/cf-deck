
import React from 'react';
import Reactable from 'reactable';

import orgActions from '../actions/org_actions';
import AppDispatcher from '../dispatcher';
import OrgStore from '../stores/org_store';

var Table = Reactable.Table;

function stateSetter(orgGuid) {
  var org = OrgStore.get(orgGuid);
  return { 
    rows: (org && org.spaces) || []
  };
}

export default class Spaces extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = stateSetter(this.props.orgGuid);

    // TODO parent class
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    OrgStore.addChangeListener(this._onChange);
    orgActions.fetch(this.props.orgGuid);
  }

  _renderHeader(label, cellDataKey) {
    return (
      <a onClick={this._sortRowsBy.bind(null, cellDataKey)}>{label}</a>
    );
  }

  _onChange() {
    this.setState(stateSetter(this.props.orgGuid));
  }

  render() {
    var columns = [
      { label: 'Name', key: 'name' },
      { label: 'Number of Apps', key: 'app_count' },
      { label: 'Total Development Memory', key: 'mem_dev_total' },
      { label: 'Total Production Memory', key: 'mem_prod_total' }
    ];

    let rows = this.state.rows;

    return (
      <div className="tableWrapper">
        <Table data={ rows } columns={ columns } sortable={ true } />
      </div>
    );
  }

}
Spaces.propTypes = { orgGuid: React.PropTypes.string.isRequired };
Spaces.defaultProps = {};

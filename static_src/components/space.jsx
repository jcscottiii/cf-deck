
import React from 'react';
import Reactable from 'reactable';

import spaceActions from '../actions/space_actions.js';
import AppDispatcher from '../dispatcher.js';
import SpaceStore from '../stores/space_store.js';

var Table = Reactable.Table;

function stateSetter(guid) {
  return SpaceStore.get(guid) || {};
}

export default class Space extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = stateSetter(this.props.spaceGuid);

    // TODO parent class
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    SpaceStore.addChangeListener(this._onChange);
    spaceActions.fetch(this.props.spaceGuid);
  }

  _onChange() {
    this.state = stateSetter(this.props.spaceGuid);
  }

  render() {
    var columns = [
      { label: 'Name', key: 'name' },
      { label: 'Buildpack', key: 'buildpack' },
      { label: 'Memory', key: 'memory' },
      { label: 'Instances', key: 'instances' },
      { label: 'State', key: 'state' },
      { label: 'Disk Quota', key: 'disk_quota' }
    ];

    let rows = this.state.apps || [];

    return (
      <div className="tableWrapper">
        { rows.length > 0 ? (
          <Space.Table data={ rows } columns={ columns } sortable={ true } />
        ) : (
          <h3 className="test-none_message">No apps found</h3>
        )}
      </div>
    );
  }

}
Space.propTypes = { spaceGuid: React.PropTypes.string.isRequired };
Space.Table = Table;

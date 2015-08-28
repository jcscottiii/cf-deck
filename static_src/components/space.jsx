
import React from 'react';
import Reactable from 'reactable';

import spaceActions from '../actions/space_actions.js';
import AppDispatcher from '../dispatcher.js';
import SpaceStore from '../stores/space_store.js';

var Table = Reactable.Table;

export default class Space extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = SpaceStore.get(this.props.spaceGuid);

    // TODO parent class
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    SpaceStore.addChangeListener(this._onChange);
    spaceActions.fetch(this.props.spaceGuid);
  }

  _onChange() {
    this.state = SpaceStore.get(this.props.spaceGuid);
  }

  render() {
    return (
      <div>
      
      </div>
    );
  }

}
Space.propTypes = { spaceGuid: React.PropTypes.string.isRequired };

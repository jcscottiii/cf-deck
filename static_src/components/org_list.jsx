
import React from 'react';

export default class OrgList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { orgs: props.initialOrgs };
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
}

OrgList.propTypes = { initialOrgs: React.PropTypes.array };
OrgList.defaultProps = { initialOrgs: [] };

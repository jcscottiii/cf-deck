
import React from 'react';

export default class TestTable extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    var rows = this.props.data,
        cols = this.props.cols;

    return (
      <table>
        <tbody>
          {rows.map(function(row, i) {
            return (
              <tr key={i}>
                {row.length && row.map(function(col, j) {
                  return <td key={j}>{col}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

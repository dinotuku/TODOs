import React, { Component } from 'react';

class ToggleAll extends Component {
  render() {
    const checked = this.props.itemCount ? false : true;
    return (
      <div>
        <input
          className="toggle-all"
          type="checkbox"
          checked={ checked }
          onChange={ this.props.onCheckClick }
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
      </div>
    );
  }
}

export default ToggleAll;

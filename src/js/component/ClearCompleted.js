import React, { Component } from 'react';

class ClearCompleted extends Component {
  render() {
    return (
      <button 
        className="clear-completed"
        onClick={ this.props.onButtonClick }
      >Clear completed</button>
    );
  }
}

export default ClearCompleted;

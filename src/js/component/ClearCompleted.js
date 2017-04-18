import React, { Component } from 'react';

class ClearCompleted extends Component {
  render() {
    let clearButton = null;

    if (this.props.itemCount > 0) {
      clearButton = (
        <button 
          className="clear-completed"
          onClick={ this.props.onButtonClick }
        >Clear</button>
      );
    }

    return (
      <div>
        { clearButton }
      </div>
    );
  }
}

export default ClearCompleted;

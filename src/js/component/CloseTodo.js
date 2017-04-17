import React, { Component } from 'react';

class CloseTodo extends Component {
  render() {
    return (
      <div>
        <input
          className="close-todo"
          type="button"
          value="⤫"
          onClick={ this.props.onButtonClick }
        />
      </div>
    );
  }
}

export default CloseTodo;

import React, { Component } from 'react';

class CountDisplay extends Component {
  calculateCount = (count) => {
    if (count) {
      return <span className="todo-count"><strong>{count}</strong> items left</span>;
    } else {
      return <span className="todo-count">no item</span>;
    }
  }
  render() {
    return (
      <div>
	      {this.calculateCount(this.props.itemCount)}
      </div>
    );
  }
}

export default CountDisplay;

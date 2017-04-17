import React, { Component } from 'react';

class TodoItem extends Component {
  render() {
    return (
      <li className={ this.props.done ? "completed" : "" }>
        <input 
          className="toggle"
          type="checkbox"
          checked={ this.props.done }
          onChange={ this.props.onCheckClick }
        />
        <label>{ this.props.content }</label>
        <button
          className="destroy"
          onClick={ this.props.onButtonClick }
        />
      </li>
    );
  }
}

export default TodoItem;

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

class TodoItem extends Component {
  handleChange = (ev) => {
    this.props.onChange(ev.target.value);
  }

  handleKeyDown = (ev) => {
    this.props.onKeySave(ev);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.editing && this.props.editing) {
      const node = ReactDOM.findDOMNode(this.refs.editField);
      node.focus();
      node.setSelectionRange(node.value.length, node.value.length);
    }
  }

  render() {
    return (
      <li className={ classNames({
        completed: this.props.done,
        editing: this.props.editing,
      }) }>
        <div className="view">
          <input 
            className="toggle"
            type="checkbox"
            checked={ this.props.done }
            onChange={ this.props.onCheckClick }
          />
          <label
            onDoubleClick={ this.props.onEdit }
          >{ this.props.content }</label>
          <button
            className="destroy"
            onClick={ this.props.onButtonClick }
          />
        </div>
        <input
          ref="editField"
          className="edit"
          value={ this.props.content }
          onBlur={ this.props.onSave }
          onChange={ this.handleChange }
          onKeyDown={ this.handleKeyDown }
				/>
      </li>
    );
  }
}

export default TodoItem;

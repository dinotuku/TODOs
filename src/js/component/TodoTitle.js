import React, { Component } from 'react';

class TodoTitle extends Component {
  handleTitleChange = (ev) => {
    this.props.onTitleChange(ev.target.value);
  }

  handleTitleSubmit = (ev) => {
    this.props.onTitleSubmit(ev);
  }

  handleUnFocus = () => {
    this.props.onUnFocus();
  }

  render() {
    return (
      <input
        value={ this.props.inputText }
        ref={ this.props.refItem }
        onChange={ this.handleTitleChange }
        onKeyDown={ this.handleTitleSubmit }
        onBlur={ this.handleUnFocus }
      />
    );
  }
}

export default TodoTitle;

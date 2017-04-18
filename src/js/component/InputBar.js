import React, { Component } from 'react';

class InputBar extends Component {
  handleInputBarChange = (ev) => {
    this.props.onInputChange(ev.target.value);
  }

  handleInputBarSubmit = (ev) => {
    this.props.onInputSubmit(ev);
  }

  render() {
    return (
      <input
        className={ this.props.className }
        value={ this.props.inputText }
        placeholder="Something to be done?"
        onChange={ this.handleInputBarChange }
        onKeyDown={ this.handleInputBarSubmit }
      />
    );
  }
}

export default InputBar;

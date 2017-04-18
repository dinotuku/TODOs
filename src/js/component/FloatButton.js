import React, { Component } from 'react';

class FloatButton extends Component {
  render() {
    const value = this.props.value;
    return (
      <input 
        className={ this.props.className }
        type="button"
        value={ value }
        onClick={ this.props.onButtonCLick }
      />
    );
  }
}

export default FloatButton;

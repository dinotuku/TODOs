import React, { Component } from 'react';
import classNames from 'classnames';

class LocalFilter extends Component {
  handleAllClick = () => {
    this.props.onFilterClick('all');
  }

  handleActiveClick = () => {
    this.props.onFilterClick('active');
  }

  handleCompletedClick = () => {
    this.props.onFilterClick('completed');
  }

  render() {
    return (
      <ul className="filters">
        <li>
          <a
            className={ classNames({ selected: this.props.nowShowing === 'all' }) }
            onClick={ this.handleAllClick }
          >
            All
          </a>
        </li>
        {' '}
        <li>
          <a
            className={ classNames({ selected: this.props.nowShowing === 'active' }) }
            onClick={ this.handleActiveClick }
          >
            Active
          </a>
        </li>
        {' '}
        <li>
          <a
            className={ classNames({ selected: this.props.nowShowing === 'completed' }) }
            onClick={ this.handleCompletedClick }
          >
            Completed
          </a>
        </li>
      </ul>
    );
  }
}

export default LocalFilter;

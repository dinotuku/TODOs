import React, { Component } from 'react';
import DynamicFont from 'react-dynamic-font';
import TodoTitle from './TodoTitle';
import InputBar from './InputBar';
import ToggleAll from './ToggleAll';
import CloseTodo from './CloseTodo';
import TodoItem from './TodoItem';
import CountDisplay from './CountDisplay';
import LocalFilter from './LocalFilter';
import ClearCompleted from './ClearCompleted';

class TodoList extends Component {
  handleTitle = (text) => {
    this.props.onTitleChange(text);
  }

  handleTitleSubmit = (ev) => {
    if (ev.which === 13 || ev.keyCode === 13) {
      this.props.onTitleSubmit(true);
    }
  }

  handleTitleUnFocus = () => {
    this.props.onTitleSubmit(true);
  }

  handleTitleState = () => {
    this.props.onTitleSubmit(false);
  }

  handleInput = (text) => {
    this.props.onInputChange(text);
  }

  handleSubmit = (ev) => {
    let todos = this.props.todos;
    const inputText = this.props.inputText;
    if ((ev.which === 13 || ev.keyCode === 13) && inputText.trim() !== '') {
      todos.splice(0, 0, {
        value: inputText,
        done: false,
      });
      this.props.onTodosChange(todos);
      this.props.onInputChange('');
    }
  }

  handleCheck = (idx) => {
    let todos = this.props.todos;
    const checkedItem = todos[idx]
    todos.splice(idx, 1, {
      value: checkedItem.value,
      done: !checkedItem.done,
    });
    this.props.onTodosChange(todos);
  }

  handleButton = (idx) => {
    let todos = this.props.todos;
    todos.splice(idx, 1);
    this.props.onTodosChange(todos);
  }

  handleItemEdit = (idx) => {
    let todos = this.props.todos;
    todos[idx].editing = true;
    this.props.onTodosChange(todos);
  }

  handleItemSave = (idx) => {
    let todos = this.props.todos;
    todos[idx].editing = false;
    this.props.onTodosChange(todos);
  }

  handleItemChange = (value, idx) => {
    let todos = this.props.todos;
    todos[idx].value = value;
    this.props.onTodosChange(todos);
  }

  handleItemKeySave = (ev, idx) => {
    if (ev.which === 13 || ev.keyCode === 13) {
      let todos = this.props.todos;
      todos[idx].editing = false;
      this.props.onTodosChange(todos);
      ev.preventDefault();
    }
  }

  handleToggleAllCheck = (count) => {
    let todos = this.props.todos;
    const done = count ? true : false;
    todos.forEach((element, index, array) => {
      element.done = done;
      array[index] = element;
    });
    this.props.onTodosChange(todos);
  }

  handleCloseButton = () => {
    this.props.onCloseTodo(this.props.listIdx);
  }

  handleFilterClick = (type) => {
    this.props.onFilterChange(type);
  }

  handleClearCompleted = () => {
    let todos = this.props.todos;
    todos = todos.filter((t) => !t.done);
    this.props.onTodosChange(todos);
  }

  renderTodoTitle = (done) => {
    if (done) {
      return (
        <div 
          className="todo-title"
          onClick={ this.handleTitleState }
        >
          <DynamicFont content={ this.props.title } />
        </div>
      );
    } else {
      return (
        <div className="todo-title-input">
          <TodoTitle
            inputText={ this.props.title }
            refItem={ (input) => { this.nameInput = input; } }
            onTitleChange={ this.handleTitle }
            onTitleSubmit={ this.handleTitleSubmit }
            onUnFocus={ this.handleTitleUnFocus }
          />
        </div>
      );
    }
  }

  renderTodoItem = (input, idx) => {
    return (
      <TodoItem
        key={ `todo-item-${idx}` }
        content={ input.value }
        done={ input.done }
        editing={ input.editing }
        onCheckClick={ () => this.handleCheck(idx) }
        onButtonClick={ () => this.handleButton(idx) }
        onEdit={ () => this.handleItemEdit(idx) }
        onSave={ () => this.handleItemSave(idx) }
        onChange={ (value) => this.handleItemChange(value, idx) }
        onKeySave={ (ev) => this.handleItemKeySave(ev, idx) }
      />
    );
  }

  componentDidMount() {
    if (!this.props.titleDone) {
      this.nameInput.focus();
      this.nameInput.select();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.props.titleDone) {
      this.nameInput.focus();
      if (prevProps.titleDone) this.nameInput.select();
    }
  }
  
  render() {
    const unDoneCount = this.props.todos.filter((t) => !t.done).length;
    const doneCount = this.props.todos.filter((t) => t.done).length;
    const inputText = this.props.inputText;
    const nowShowing = this.props.nowShowing;
    let todos = this.props.todos;
    if (nowShowing === 'active') todos = todos.filter((t) => !t.done);
    else if (nowShowing === 'completed') todos = todos.filter((t) => t.done);
    return (
      <li className="todoapp">
        
        <header className="header">
          { this.renderTodoTitle(this.props.titleDone) }
          <InputBar 
            className="new-todo"
            inputText={ inputText }
            onInputChange={ this.handleInput }
            onInputSubmit={ this.handleSubmit }
          />
        </header>

        <section className="main">
          <ToggleAll 
            itemCount={ unDoneCount }
            onCheckClick={ () => this.handleToggleAllCheck(unDoneCount) }
          />
          <CloseTodo 
            onButtonClick={ this.handleCloseButton }
          />
          <ul className="todo-list">
            { todos.map((item, idx) => this.renderTodoItem(item, idx)) }
          </ul>
        </section>

        <footer className="footer">
          <CountDisplay 
            itemCount={ unDoneCount }
          />
          <LocalFilter
            nowShowing={ nowShowing }
            onFilterClick={ (type) => this.handleFilterClick(type) }
          />
          <ClearCompleted 
            itemCount={ doneCount }
            onButtonClick={ () => this.handleClearCompleted() }
          />
        </footer>

      </li>
    );
  }
}

export default TodoList;

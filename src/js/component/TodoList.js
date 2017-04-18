import React, { Component } from 'react';
import DynamicFont from 'react-dynamic-font';
import TodoTitle from './TodoTitle';
import InputBar from './InputBar';
import ToggleAll from './ToggleAll';
import CloseTodo from './CloseTodo';
import TodoItem from './TodoItem';
import CountDisplay from './CountDisplay';
import ClearCompleted from './ClearCompleted';

class TodoList extends Component {
  handleTitle = (text) => {
    this.props.onPropsChange(text, this.props.todos, this.props.inputText, this.props.titleDone, this.props.listIdx);
  }

  handleTitleSubmit = (ev) => {
    if (ev.which === 13 || ev.keyCode === 13) {
      this.props.onPropsChange(this.props.title, this.props.todos, this.props.inputText, true, this.props.listIdx);
    }
  }

  handleTitleUnFocus = () => {
    this.props.onPropsChange(this.props.title, this.props.todos, this.props.inputText, true, this.props.listIdx);
  }

  handleTitleState = () => {
    this.props.onPropsChange(this.props.title, this.props.todos, this.props.inputText, false, this.props.listIdx);
  }

  handleInput = (text) => {
    this.props.onPropsChange(this.props.title, this.props.todos, text, this.props.titleDone, this.props.listIdx);
  }

  handleSubmit = (ev) => {
    let todos = this.props.todos;
    const inputText = this.props.inputText;
    if ((ev.which === 13 || ev.keyCode === 13) && inputText.trim() !== '') {
      todos.splice(0, 0, {
        value: inputText,
        done: false,
      });
      this.props.onPropsChange(this.props.title, todos, '', this.props.titleDone, this.props.listIdx);
    }
  }

  handleCheck = (idx) => {
    let todos = this.props.todos;
    const checkedItem = todos[idx]
    todos.splice(idx, 1, {
      value: checkedItem.value,
      done: !checkedItem.done,
    });
    this.props.onPropsChange(this.props.title, todos, this.props.inputText, this.props.titleDone, this.props.listIdx);
  }

  handleButton = (idx) => {
    let todos = this.props.todos;
    todos.splice(idx, 1);
    this.props.onPropsChange(this.props.title, todos, this.props.inputText, this.props.titleDone, this.props.listIdx);
  }

  handleToggleAllCheck = (count) => {
    let todos = this.props.todos;
    const done = count ? true : false;
    todos.forEach((element, index, array) => {
      element.done = done;
      array[index] = element;
    });
    this.props.onPropsChange(this.props.title, todos, this.props.inputText, this.props.titleDone, this.props.listIdx);
  }

  handleCloseButton = () => {
    this.props.onCloseTodo(this.props.listIdx);
  }

  handleClearCompleted = () => {
    let todos = this.props.todos;
    todos = todos.filter((t) => !t.done);
    this.props.onPropsChange(this.props.title, todos, this.props.inputText, this.props.titleDone, this.props.listIdx);
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
        content={ input.value }
        done={ input.done }
        key={ idx }
        onCheckClick={ () => this.handleCheck(idx) }
        onButtonClick={ () => this.handleButton(idx) }
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
    const todos = this.props.todos;
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

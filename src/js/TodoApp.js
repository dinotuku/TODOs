import React, { Component } from 'react';
import FlipMove from 'react-flip-move';
import ReactTooltip from 'react-tooltip'
import cookie from 'react-cookie'
import TodoList from './component/TodoList';
import '../css/todo.css';

class TodoApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists : [
        { 
          title: 'Welcome',
          todos: [
            { value: '☝︎ Add new item', done: false, editing: false },
            { value: '☜ Click to complete', done: false, editing: false },
            { value: 'Delete by clicking ☞', done: false, editing: false },
          ],
          inputText: '',
          titleDone: true,
        },
        { 
          title: 'School',
          todos: [
            { value: 'Midterm', done: false, editing: false },
            { value: 'Web Programming HW1', done: true, editing: false },
          ],
          inputText: '',
          titleDone: true,
        },
      ]
    };
  }

  handleAddClick = () => {
    const lists = this.state.lists;

    lists.push({
      title: 'New list',
      todos: [],
      inputText: '',
      titleDone: false,
    });

    this.setState({ lists });
  }

  handleClearAllClick = () => {
    const lists = this.state.lists;

    lists.forEach((list) => {
      let todos = list.todos;
      todos = todos.filter((t) => !t.done);
      list.todos = todos;
      return list;
    });

    this.setState({ lists });
  }

  handlePropsChange = (title, todos, inputText, titleDone, idx) => {
    const lists = this.state.lists;
    lists[idx] = { 
      title,
      todos,
      inputText,
      titleDone,
    };
    this.setState({ lists });
  }

  handelCloseTodo = (idx) => {
    let lists = this.state.lists;
    lists.splice(idx, 1);
    this.setState({ lists });
  }

  renderTodoList = (list, idx) => {
    return (
      <TodoList
        title={ list.title }
        todos={ list.todos }
        inputText={ list.inputText }
        titleDone={ list.titleDone }
        key={ idx }
        listIdx={ idx }
        onPropsChange={ this.handlePropsChange }
        onCloseTodo={ this.handelCloseTodo }
      />
    );
  }

  saveCookie = (d) => {
    const date = new Date();
    const days = d || 365;

    date.setTime(+ date + (days * 86400000));

    cookie.save('lists', this.state.lists, { 
      path: '/',
      expires: date,
    });
  }

  componentWillMount() {
    if (cookie.load('lists')) this.state = { lists: cookie.load('lists') };
  }

  componentDidMount() {
    this.saveCookie(24);
  }

  componentDidUpdate() {
    this.saveCookie(24);
  }

  render() {
    let doneCount = 0;
    this.state.lists.forEach((list) => {
      doneCount += list.todos.filter((t) => t.done).length;
    });
    let notDoneCount = 0;
    this.state.lists.forEach((list) => {
      notDoneCount += list.todos.filter((t) => !t.done).length;
    });
    const doneStyle = {
      color: 'limegreen',
    };
    const notDoneStyle = {
      color: 'lightcoral',
    };
    return (
      <div className="todos">

        <h1>TODOS</h1>
        <div className="buttons-left">
          <input 
            className="clouds-flat-button"
            type="button"
            value={ `✔︎ ${ doneCount }` }
            style={ doneStyle }
          />
          <input 
            className="clouds-flat-button"
            type="button"
            value={ `✖︎ ${ notDoneCount }` }
            style={ notDoneStyle }
          />
        </div>
        <div className="buttons-right">
          <input 
            className="clouds-flat-button"
            type="button"
            value="+"
            onClick={ this.handleAddClick }
            data-tip="New List"
            data-for="add"
          />
          <ReactTooltip 
            id="add"
            class="extra-class"
            place="left"
            type="dark"
            effect="solid"
          />

          <input 
            className="clouds-flat-button" 
            type="button" 
            value="⊘"
            onClick={ this.handleClearAllClick }
            data-tip="Clear All<br>Completed"
            data-for="clear"
          />
          <ReactTooltip
            id="clear"
            class="extra-class"
            place="left"
            type="dark"
            effect="solid"
            multiline={ true }
          />
        </div>

        <ul className="todo-lists-ul">
          <FlipMove
            className="todo-lists"
            duration={400}
            staggerDelayBy={80}
            easing="ease-out"
            appearAnimation="elevator">
            { this.state.lists.map((list, idx) => this.renderTodoList(list, idx)) }
          </FlipMove>
        </ul>

      </div>
    );
  }
}

export default TodoApp;

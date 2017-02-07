import React, { Component } from 'react';
import logo                 from './logo.svg';
import './App.css';
import {TodoForm}           from './components/TodoForm';
import {TodoList}           from './components/TodoList';
import {Footer}             from './components/Footer';
import {
  loadTodos, createTodo, saveTodo,
  destroyTodo
} from './lib/todoService';
import {
  addTodo, generateId, findById,
  toggleTodo, updateTodo, removeTodo,
  filterTodos
} from './lib/todoHelpers'


class App extends Component {
  constructor() {
    super()
    this.state = {
      todos: [],
      currentTodo: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleEmptySubmit = this.handleEmptySubmit.bind(this)
  }

  static contextTypes = {
    route: React.PropTypes.string
  }

  componentDidMount() {
    loadTodos().then(todos => this.setState({todos}))
  }

  handleToggle = (id) => {
  // why does handleToggle(id) {} get todos of undefined for line 29?
    const todo = findById(id, this.state.todos)
    const toggled = toggleTodo(todo)
    const updatedTodos = updateTodo(this.state.todos, toggled)
    this.setState({
      todos: updatedTodos
    })
    saveTodo(toggled)
      .then(() => this.showMessage('Todo Updated'))
  }

  handleRemove = (id, e) => {
    e.preventDefault()
    const updatedTodos = removeTodo(this.state.todos, id)
    this.setState({
      todos: updatedTodos
    })
    destroyTodo(id)
      .then(() => this.showMessage('Todo Removed'))
  }

  handleInputChange(e) {
    this.setState({
      currentTodo: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    const newId = generateId()
    const newTodo={id: newId, name: this.state.currentTodo, isComplete: false}
    const updatedTodos = addTodo(this.state.todos, newTodo)
    this.setState({
      todos: updatedTodos,
      currentTodo: '',
      errorMessage: ''
    })
    createTodo(newTodo)
      .then(() => this.showMessage('Todo added'))
  }

  handleEmptySubmit(e) {
    e.preventDefault()
    this.setState({
      errorMessage: "Please enter a list item."
    })
  }

  showMessage = (msg) => {
    this.setState({message: msg})
    setTimeout(() => this.setState({message: ''}), 2500)
  }

  render() {
    const submitHandler = this.state.currentTodo ? this.handleSubmit : this.handleEmptySubmit
    const displayTodos = filterTodos(this.state.todos, this.context.route)
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React Todos</h2>
        </div>
        <div className="todo-app">
          {this.state.errorMessage && <span className="error">{this.state.errorMessage}</span>}
          {this.state.message && <span className="success">{this.state.message}</span>}
          <TodoForm 
            handleInputChange={this.handleInputChange} 
            handleSubmit={submitHandler}
            currentTodo={this.state.currentTodo}/>
          <TodoList 
            handleToggle={this.handleToggle} 
            handleRemove={this.handleRemove} 
            todos={displayTodos}/>
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;

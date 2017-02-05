import React, { Component } from 'react';
import logo                 from './logo.svg';
import './App.css';
import {TodoForm}           from './components/TodoForm';
import {TodoList}           from './components/TodoList';
import {
  addTodo, generateId, findById,
  toggleTodo, updateTodo, removeTodo
} from './lib/todoHelpers'

class App extends Component {
  constructor() {
    super()
    this.state = {
      todos: [
      {id: 1, name:"one", isComplete: false},
      {id: 2, name:"two", isComplete: false},

      ],
      currentTodo: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleEmptySubmit = this.handleEmptySubmit.bind(this)
  }

  handleToggle = (id) => {
  // why does handleToggle(id) {} get todos of undefined for line 29?
    const todo = findById(id, this.state.todos)
    const toggled = toggleTodo(todo)
    const updatedTodos = updateTodo(this.state.todos, toggled)
    this.setState({
      todos: updatedTodos
    })
  }

  handleRemove = (id, e) => {
    const updatedTodos = removeTodo(this.state.todos, id)
    this.setState({
      todos: updatedTodos
    })
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
  }

  handleEmptySubmit(e) {
    e.preventDefault()
    this.setState({
      errorMessage: "Please enter a list item."
    })
  }

  render() {
    const submitHandler = this.state.currentTodo ? this.handleSubmit : this.handleEmptySubmit
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React Todos</h2>
        </div>
        <div className="todo-app">
          {this.state.errorMessage && <span className="error">{this.state.errorMessage}</span>}
          <TodoForm 
            handleInputChange={this.handleInputChange} 
            handleSubmit={submitHandler}
            currentTodo={this.state.currentTodo}/>
          <TodoList 
            handleToggle={this.handleToggle} 
            handleRemove={this.handleRemove} 
            todos={this.state.todos}/>
        </div>
      </div>
    );
  }
}

export default App;

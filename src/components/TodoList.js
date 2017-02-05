import React from 'react';
import {TodoItem} from './TodoItem';

export const TodoList = (props) => {
	return (
		<div className="todo-list">
      <ul>
        {props.todos.map(todo => 
        	<TodoItem 
        	handleToggle={props.handleToggle}
        	handleRemove={props.handleRemove}
        	key={todo.id} {...todo}/>
        	// same as <TodoItem id={todo.id} name={todo.name} />
          )}
      </ul>
    </div>
	)
}

TodoList.propTypes = {
	todos: React.PropTypes.array.isRequired
}

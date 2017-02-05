import React from 'react';

export const TodoItem = (props) => {
	const handleToggle = () => props.handleToggle(props.id)
	const handleRemove = () => props.handleRemove(props.id)
	return (
	    <li>
	    	<span className="delete-item">
		    	<a href="#" onClick={handleRemove}>x</a>
	    	</span>
	    	<input type="checkbox" 
	      	onChange={handleToggle}
	      	checked={props.isComplete}/>
	      {props.name}
	  	</li>
	)
}

TodoItem.propTypes = {
	name: React.PropTypes.string,
	isComplete: React.PropTypes.bool,
	id: React.PropTypes.number.isRequired
}
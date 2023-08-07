// Set up
import React from 'react'
// Self style
import '../../TodoSCSS/BoardSection/BoardComponent.scss'
// Import Component
import ListComponent from './ListComponent.js'; 

export default function BoardComponent(props) {
    return (<React.Fragment>
        <div className='App-body__board'>
            <ListComponent
                TasksList = {props.TasksList}
                TodoPage_updateTaskAttribute = {props.TodoPage_updateTaskAttribute}
                TodoPage_deleteTask = {props.TodoPage_deleteTask}
                validateClick = {props.validateClick}
            />
        </div>
    </React.Fragment>)
}
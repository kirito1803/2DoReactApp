// Setup
import React from 'react'
// Self-style
import '../../TodoSCSS/AddSection/CommandComponent.scss'
// Import Component
import AddNewComponent from './AddNewComponent'
import SortComponent from './SortComponent.js'

export default function CommandComponent(props) {
    return(<React.Fragment>
        <div className='App-body__command'>
            <AddNewComponent
                TodoPage_addTask = {props.TodoPage_addTask}
                validateClick = {props.validateClick}
            />

            <SortComponent
                functionClick = {props.functionClick}
            />
        </div>
    </React.Fragment>)
}
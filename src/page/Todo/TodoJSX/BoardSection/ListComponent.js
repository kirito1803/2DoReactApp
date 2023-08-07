 // Setup
import React from "react";
// Self style
import '../../TodoSCSS/BoardSection/List&TaskComponent.scss'
// Import component
import TaskComponent from "./TaskComponent";

export default function ListComponent(props) {
    const checkingProps = () => {
        if(props.TasksList) {

            console.log('yes')
        }
        else {
            return (
                <div>Nothing</div>
            )
        }
    }

    return (<React.Fragment>
        <ul className="App-board__list">
            {
                props.TasksList.map((task)=>{
                    return(
                        <TaskComponent
                            task = {task}
                            key = {task.id}
                            TodoPage_updateTaskAttribute = {props.TodoPage_updateTaskAttribute}
                            TodoPage_deleteTask = {props.TodoPage_deleteTask}
                            validateClick = {props.validateClick}
                        />
                    )
                })
            }
        </ul>
    </React.Fragment>)
}
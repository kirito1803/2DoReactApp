// Set up
import React, {useState, useEffect} from "react";
// import axios from "axios";
import CounterComponent from './CounterComponent';
// import ToDoAPI from "../API.js";

// declare const
const dayOfWeek = ['Chủ Nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy']
const taskTypes = { // selection of icons for the task
    pending: {
        icon: "fa-solid fa-circle-check"
    },

    finished: {
        icon: "fa-solid fa-face-smile-beam"
    },

    missed: {
        icon: "fa-solid fa-face-sad-tear"
    }
}

export default function TaskComponent(props) {
    // validate the task
    const validateTask = () => {
        if(!props.task.timeOut) { // if time is out
            if(props.task.checked) { // and checked
                return {
                    tag: "App-board__item finished",
                    type: "finished"
                }
            }
            else { // but not checked
                return {
                    tag: "App-board__item pending",
                    type: "pending"
                }
            }
        }
        else { // time is on
            if(props.task.checked) { // and checked
                return {
                    tag: "App-board__item finished",
                    type: "finished"
                }
            }
            else { // but not checked
                return {
                    tag: "App-board__item missed",
                    type: "missed"
                }
            }
        }
    }

    // declare state
    const [taskTag, setTaskTag] = useState(validateTask().tag)
    const [taskType, setTaskType] = useState(validateTask().type)

    // delete click logic
    const onDeleteClick = () => {
        props.TodoPage_deleteTask(props.task.id)
        const deleteId = (Math.round(Math.random()*1) + 1)
        props.validateClick.getClick(`delete_${taskType}_${deleteId}`)
    }

    // check task click logic
    const onCheckClick = () => {
        // get task
        const task = document.getElementById(props.task.id)
        if(task.classList.contains('pending')) {
            task.classList.remove('pending')
            task.classList.add('finished')
            
            const finishedId = (Math.round(Math.random()*2) + 1)
            props.validateClick.getClick(`finished_${finishedId}`)
            // Replace icon
            const icon = task.querySelectorAll('i')[1]
            if(icon) {
                const newClass = taskTypes.finished.icon
                icon.setAttribute('class', "")
                icon.classList.add(...newClass.split(' '))
            }
            // Change data
            props.TodoPage_updateTaskAttribute(props.task.id, "checked", true)
        }
    }

    // mark task logic
    const onPriorityClick = () => {
        // get task
        const task = document.getElementById(props.task.id)
        const prioritySection = task.querySelector('.TodoPriority')

        // case unmarked
        if(prioritySection.classList[1] === 'unmarked') {
            // Change marked/ unmarked className
            prioritySection.classList.remove('unmarked')
            prioritySection.classList.add('marked')
            //  Change icon
            prioritySection.removeChild(prioritySection.querySelector('i'))
            prioritySection.innerHTML = `<i class="fa-solid fa-star"></i>`
            // Send messages
            props.validateClick.getClick(`marked`)
            // Change data
            props.TodoPage_updateTaskAttribute(props.task.id, "priority", true)
        }
        else if(prioritySection.classList[1] === 'marked') { // case marked
            // Change marked/ unmarked className
            prioritySection.classList.remove('marked')
            prioritySection.classList.add('unmarked')
            //  Change icon
            prioritySection.removeChild(prioritySection.querySelector('i'))
            prioritySection.innerHTML = `<i class="fa-regular fa-star"></i>`
            // Change data
            props.TodoPage_updateTaskAttribute(props.task.id, "priority", false)
        }
    }

    // convert the deadline and represent it
    const convertDeadline = (deadLineJSON)=>{
        let time = new Date(deadLineJSON)
        // Get the date parts (year, month, day)
        let year = time.getFullYear()
        let month = time.getMonth() + 1
        let date = time.getDate()
        let day = dayOfWeek[time.getDay()]
        // Get the time parts (hours, minutes, seconds)
        let hours = time.getHours()
        let minutes = time.getMinutes()
        return(<>
            <div className="TodoTime-deadline">
                <p className="TodoTime-deadline__date">{day}, {date}/{month}/{year}</p>
                <p className="TodoTime-deadline__time">{hours} giờ {minutes} phút</p>
            </div>
        </>)
    }

    // update the tag when attribute is change
    useEffect(() => {
        const result = validateTask()
        setTaskTag(result.tag)
        setTaskType(result.type)
    }, [props.task])

    return (<React.Fragment>
        <li id={props.task.id} key={props.task.id} className={taskTag}>
            {/* Information Section */}
            <div className="TodoWrap"> 
                {/* Name Section */}
                <div className="TodoNameSection">
                    <div className={props.task.priority?"TodoPriority marked":"TodoPriority unmarked"} onClick={()=>onPriorityClick()}>
                        {props.task.priority?<i className="fa-solid fa-star"></i>:<i className="fa-regular fa-star"></i>}
                        
                    </div>
                    <h2 className="TodoName">{props.task.name}</h2>
                </div>
                <p className="TodoDescribe">{props.task.describe}</p>
                {/* Time section */}
                <div className="TodoTime">
                    {convertDeadline(props.task.deadline)}
                    <CounterComponent
                            id = {props.task.id}
                            timeout={props.task.timeout}
                            deadline={props.task.deadline}
                            TodoPage_updateTaskAttribute = {props.TodoPage_updateTaskAttribute}
                    />
                </div>
            </div>
            {/* Buttons section */}
            <div className="TodoButton">
                <div className="StatusTodo" onClick={()=>onCheckClick()}>
                    <i className={taskTypes[taskType].icon}></i>
                </div>
                {/* Delete button */}
                <div className="DeleteTodo" onClick={()=>onDeleteClick()}>
                    <i className="fa-solid fa-trash"></i>
                </div>
            </div>
        </li>
    </React.Fragment>)
}
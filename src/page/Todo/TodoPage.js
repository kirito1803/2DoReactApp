// Set up
import React, {useState, useEffect} from 'react';
// Self-styling
import './TodoPage.scss'
// Import requirements & components
import * as DatabaseCRUD from '../../database/Methods.js'
import BoardComponent from './TodoJSX/BoardSection/BoardComponent';
import CommandComponent from './TodoJSX/AddSection/CommandComponent';
import ToastMessageComponent from './TodoJSX/ToastMessageSection/ToastMessageComponent.js';

export default function TodoPage(props) {
    // Declare properties
    const UserId = props.userId // User Id
    const [tasksList, setTasksList] = useState(props.userList) // User todo list
    const [clickType, setClickType] = useState("") // click name (type)

    // Sorted the list: increasing deadline --> default mode
    const SortArrayDefault = (list) => {
      if (list.length <= 1) { // Stop condition
        return list;
      }

      // Create less, greater, outdated arrays and length and pivot
      const less = [];
      const greater = [];
      const outdated = [];
      const length = list.length
      let pivot
    
      for (let i = 0; i < length; i++) {
        // Validate task
        if (list[i].timeOut) {
          outdated.push(list[i]); // Place outdated items in the 'outdated' array
        }
        else {
          if (pivot !== undefined) { // If already has pivot
            if (new Date(list[i].deadline).getTime() >= new Date(pivot.deadline).getTime()) {
              greater.push(list[i]); // Place outdated items in the 'greater' array
            } else {
              less.push(list[i]); // Place outdated items in the 'less' array
            }
          }
          else {
            pivot = list[i] // Get pivot
          }
        }
      }

      // Recursive calls for less and greater arrays
      const sortedArray = [...SortArrayDefault(less), ...[pivot], ...SortArrayDefault(greater), ...outdated]
      return sortedArray
    }

    // Update the list timeOut attribute
    const UpdateArrayTimeOut = (list) => {
      list.forEach(async (task) => { // Loop through every task
        const taskTimeOut = new Date(task.deadline).getTime() <= new Date().getTime(); // Check whether the time of task is out or not
        if (task.timeOut !== taskTimeOut) { // Check whether update timeout attribute is necessary or not
          try {
            const result = DatabaseCRUD.Data_ChangeTodo(UserId, task.id, "timeOut", true) // Update timeout attribute for the LocalStorage data
            task.timeOut = taskTimeOut // Update timeout attribute for the data offline
            if (!result.data) {
              console.warn(result.message) // Return error message
            }
          }
          catch (err) {
            console.warn(err)
          }
        }
      })
      return list
    }

    // Update the task attributes
    const TodoPage_updateTaskAttribute = (taskId, attribute, value) => {
      const returnData = DatabaseCRUD.Data_ChangeTodo(UserId, taskId, attribute, value)
      if (returnData) {
        setTasksList(SortArrayDefault(returnData.data))
      }
      else {
        console.warn(returnData.message)
      }
    }

    // Add new task (page's block)
    const TodoPage_addTask = (task)=>{
      const returnData = DatabaseCRUD.Data_AddTodo(UserId, task)
      if (returnData) {
        setTasksList(SortArrayDefault(returnData.data))
      }
      else {
        console.warn(returnData.message)
      }
    }

    // Delete task (page's block)
    const TodoPage_deleteTask = (taskId)=>{
      const returnData = DatabaseCRUD.Data_DeleteTodo(UserId, taskId)
      if (returnData) {
        setTasksList(SortArrayDefault(returnData.data))
      }
      else {
        console.warn(returnData.message)
      }
    }

    // // const getDataDefault = async () => {
    // //   await axios.get(ToDoAPI, { headers: { 'Access-Control-Allow-Origin': '*' } })
    // //     .then((response)=>reviewingArray(response.data))
    // //     .then(data =>{setArray(data)})
    // //     .catch(err => console.warn(err));
    // // }

    // // render data
    // const renderData = () => {
    //   const returnData = DatabaseCRUD.Data_GetTodo(UserId)
    //   if (returnData) {
    //     const result = SortArrayDefault(UpdateArrayTimeOut(returnData.data))
    //     setTasksList(result)
    //   }
    //   else {
    //     console.warn(returnData.message)
    //   }
    // }
  
    // Render first time
    useEffect(() => {
      async function fetchData() {
        const returnData = DatabaseCRUD.Data_GetTodo(UserId)
        if (returnData) {
          const result = await SortArrayDefault(UpdateArrayTimeOut(returnData.data))
          setTasksList(result)
        }
        else {
          console.warn(returnData.message)
        }
      }
      fetchData()
    }, []);

    // click validation as object
    const validateClick = {
      getClick: (type) => {
        setClickType(type)
      },

      resetClick: () => {
        setClickType("")
      }
    }
  
    return (<React.Fragment>
        <div className="Todo"> {/* return todo page */}
          <div className="Todo-body">
              <CommandComponent
                TodoPage_addTask = {TodoPage_addTask}
                validateClick = {validateClick}
              />

              <BoardComponent
                TasksList = {tasksList}
                TodoPage_updateTaskAttribute = {TodoPage_updateTaskAttribute}
                TodoPage_deleteTask = {TodoPage_deleteTask}
                validateClick = {validateClick}
              />

              <ToastMessageComponent
                clickType = {clickType}
                validateClick = {validateClick}
              />
          </div>
        </div>
    </React.Fragment>)
}
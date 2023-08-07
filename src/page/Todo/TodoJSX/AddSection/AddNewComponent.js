// Setup
import React from "react";
// Self-style
import '../../TodoSCSS/AddSection/AddNewComponent.scss'

export default function AddNewComponent(props) {
    // clear inputs 
    const clearInput = ()=>{
        document.querySelectorAll('.attribute__input').forEach((item)=>{
            item.value = ''
        })
    }

    // add new task logic
    const onAddClick = ()=>{
        // get inputs
        const InputNodes = document.querySelector('.addNew').querySelectorAll('input')
        // create foo task
        let task = { 
            checked: false,
            priority: false
        }
        Array.from(InputNodes).forEach((attribute)=>{ // extract nodes -> object
            task[attribute.id] = attribute.value
        })
        let timeout = !((new Date(task.deadline).getTime()) > (new Date().getTime())) // check and add timeOut attribute
        task.timeOut = timeout
        // CRUD
        props.TodoPage_addTask(task)
        clearInput()
        const addId = (Math.round(Math.random()*2) + 1)
        props.validateClick.getClick(`add_${addId}`)
    }

    return(<React.Fragment>
        <div className='addNew'>
            <div className='addNew__info'>
                <div className="attribute-wrap">
                    <div className="attribute todoName">
                        <h3 className="attribute__tag">Tên công việc:</h3>
                        <input id="name" className="attribute__input" type='text'></input>
                    </div>
                    <div className="attribute todoTime">
                        <div className="attribute__tag">Thời gian deadline:</div>
                        <input id="deadline" className="attribute__input" type='datetime-local'></input>
                    </div>
                </div>
                <div className="attribute-wrap">
                    <div className="attribute todoNote">
                        <div className="attribute__tag">Nội dung:</div>
                        <input id="describe" className="attribute__input" type='text'></input>
                    </div>
                </div>
            </div>
            <div className='addNew__add'>
                <button className="addNew__add-btn" onClick={()=>onAddClick()}>Thêm</button>
            </div>
        </div>
    </React.Fragment>)
}
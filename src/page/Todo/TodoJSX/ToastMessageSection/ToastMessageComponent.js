// Set up
import React, { useEffect } from "react";
// Self style
import '../../TodoSCSS/ToastMessageSection/ToastMessageComponent.scss'
// get the message data
import messageType from "../../../../database/MessageType.js";

export default function ToastMessageComponent(props) {
    const messageSection = document.querySelector('.Message-section')

    const renderMessage = (type)=>{
        // create message
        const toast = document.createElement('div')
        toast.classList.add(`Toast-message`, `${type}`, `appear`) // Add tag
        
        // structure of message
        toast.innerHTML = `
            <span class="Toast-message__icon">
                <i class="${messageType[type].icon}"></i>
            </span>
            <div class="Toast-message__content">
                <div class="Toast-message__title">${messageType[type].title}</div>
                <div class="message">${messageType[type].message}</div>
            </div>
            <div class="Toast-message__delete">
                <i class="fa-solid fa-xmark"></i>
            </div>
        `

        // Add message into section
        messageSection.appendChild(toast)

        // Add delete button
        toast.querySelector('.Toast-message__delete').addEventListener('click', ()=>{
            messageSection.removeChild(toast)
        })

        // set time to automatic change the message's tag
        setTimeout(()=>{
            // check whether the message still exist
            const message = document.querySelector('.Toast-message')
            if (message) {
                message.classList.remove('appear')
                message.classList.add('disappear')
            }
        }, 3500)

        // set time to automatic remove the message
        setTimeout(()=>{
            const message = document.querySelector('.Toast-message')
            if (message) {
                messageSection.removeChild(message)
            }
            }, 4000)
    }

    // tracking on click type
    useEffect(()=>{
        if(props.clickType) {
            renderMessage(props.clickType) // render message according to click type
        }
        props.validateClick.resetClick() // reset the click for the next time
    }, [props.clickType])
    
    return (<React.Fragment>
          <div className="Message-section">
          </div>
        </React.Fragment>
    );    
}
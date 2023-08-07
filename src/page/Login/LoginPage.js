// Set-up
import React from "react";
// Self style
import './LoginPage.scss'
// import requirements & component
import FormComponent from "./LoginJSX/FormComponent.js";
import video from '../../asset/videos/loginVideo.mp4'
import * as DatabaseCRUD from '../../database/Methods'

export default function LoginPage(props) {
    // crude login logic
    const LoginPage_login = (userInfo) => {
        const returnData = DatabaseCRUD.Data_GetUserId(userInfo.account, userInfo.password)
        if (returnData) {
            props.loggedIn(returnData.data.UserId, returnData.data.UserList)
        }
        else {
            console.warn(returnData.message)
        }
    }

    return (<React.Fragment>
        <video autoPlay muted loop id="background-video">
            <source src={video} type="video/mp4" />
        </video>

        <div className="LoginPage">
            <FormComponent
                LoginPage_login = {LoginPage_login}
            />
        </div>
    </React.Fragment>)
}
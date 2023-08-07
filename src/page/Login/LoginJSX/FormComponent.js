// set up
import React, { useEffect, useState } from "react";
// self style
import '../LoginSCSS/FormComponent.scss'
// import components
import LoginComponent from "./LoginComponent";
import RegisterComponent from "./RegisterComponent";
import SliderComponent from "./SliderComponent";


export default function FormComponent(props) {
    const [formType, SetFormType] = useState("login")

    const FormSection_onChangeFormClick = (type) => {
        SetFormType(type)
        const FormSection = document.querySelector(".FormSection")
        if (type === 'login') {
            FormSection.classList.remove('register')
            FormSection.classList.add('login')
        }
        else {
            FormSection.classList.remove('login')
            FormSection.classList.add('register')
        }
    }

    return (<React.Fragment>
        <div className="FormSection login">
            <SliderComponent
                type = {formType}
                FormSection_onChangeFormClick = {FormSection_onChangeFormClick}
            />

            {formType === "login" ?
                <LoginComponent
                    LoginPage_login = {props.LoginPage_login}
                />
            :
                <RegisterComponent/>
            }
        </div>
    </React.Fragment>)
}
// set up
import React from "react";

export default function LoginComponent(props) {
    // on login click logic
    const onLoginClick = () => {
        // get inputs
        const InputNodes = document.querySelector('.login-form').querySelectorAll('input')
        let userInfo = {}
        // get user info
        Array.from(InputNodes).forEach((info) => {
            userInfo[info.id] = info.value
        })
        props.LoginPage_login(userInfo)
    }

    return (<React.Fragment>
        <div className="login-form form floatIn">
            <div className="form__header">
                <p className="content">USER LOGIN</p>
                <p className="paragraph">Please enter your account and password</p>
            </div>

            <div className="form__body">
                <div className="form__attribute">
                    <i class="fa-solid fa-user"></i>
                    <input id="account" type="text" placeholder="User Account"></input>
                    <span></span>
                </div>

                <div className="form__attribute">
                    <i class="fa-solid fa-lock"></i>
                    <input id="password" type="password" placeholder="Password"></input>
                    <span></span>
                </div>
            </div>

            <div className="form__footer">
                <button className="form__btn" onClick={()=>onLoginClick()}>Log in</button>
            </div>
        </div>
    </React.Fragment>)
}
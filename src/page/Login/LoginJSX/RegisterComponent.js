// set up
import React from "react";

export default function RegisterComponent(props) {
    // on register click logic
    // const onLoginClick = () => {
    //     // get inputs
    //     const InputNodes = document.querySelector('.login-form').querySelectorAll('input')
    //     let userInfo = {}
    //     // get user info
    //     Array.from(InputNodes).forEach((info) => {
    //         userInfo[info.id] = info.value
    //     })
    //     props.LoginPage_login(userInfo)
    // }

    return (<React.Fragment>
        <div className="register-form form floatIn">
            <div className="form__header">
                <p className="content">REGISTER</p>
                <p className="paragraph">Just a few information for a quick start</p>
            </div>

            <div className="form__body">
                <div className="form__attribute">
                    <i class="fa-solid fa-user-tie"></i>
                    <input id="name" type="text" placeholder="Your Name"></input>
                    <span></span>
                </div>

                <div className="form__attribute">
                    <i class="fa-solid fa-user"></i>
                    <input id="account" type="text" placeholder="Your Account"></input>
                    <span></span>
                </div>

                <div className="form__attribute">
                    <i class="fa-solid fa-lock"></i>
                    <input id="password" type="password" placeholder="Your Password"></input>
                    <span></span>
                </div>

                <div className="form__attribute">
                    <i class="fa-solid fa-key"></i>
                    <input id="confirm-password" type="password" placeholder="Confirm your Password"></input>
                    <span></span>
                </div>
            </div>

            <div className="form__footer">
                <button className="form__btn"
                    // onClick={()=>onLoginClick()}
                >Register</button>
            </div>
        </div>
    </React.Fragment>)
}
// set up
import React from "react";
// self style
import '../LoginSCSS/SliderComponent.scss'

export default function SliderComponent(props) {
    // handle change form logic
    const SliderSection_onChangeFormClick = () => {
        // get elements
        const picture = document.querySelector(".Slider__picture")
        const loginSection = document.querySelector(".Slider__content").querySelector(".login_section")
        const registerSection = document.querySelector(".Slider__content").querySelector(".register_section")
        if (props.type === "login") {
            // animate picture
            picture.classList.remove("changeToLogin")
            picture.classList.add("changeToRegister")
            // change picture content
            if (loginSection.classList.contains("scrollInLogin"))
                loginSection.classList.remove("scrollInLogin")
            loginSection.classList.add("scrollOutLogin")
            if (registerSection.classList.contains("scrollOutRegister"))
                registerSection.classList.remove("scrollOutRegister")
            registerSection.classList.add("scrollInRegister")
            // disappear login form
            document.querySelector(".login-form.form").classList.add("floatOut")
            // delay so that after all animation happen
            setTimeout(() => {
                // change form type
                props.FormSection_onChangeFormClick("register")
            }, 400)
        }
        else {
            picture.classList.remove("changeToRegister")
            picture.classList.add("changeToLogin")
            if (registerSection.classList.contains("scrollInRegister"))
                registerSection.classList.remove("scrollInRegister")
            registerSection.classList.add("scrollOutRegister")
            if (loginSection.classList.contains("scrollOutLogin"))
                loginSection.classList.remove("scrollOutLogin")
            loginSection.classList.add("scrollInLogin")
            document.querySelector(".register-form.form").classList.add("floatOut")
            
            setTimeout(() => {
                props.FormSection_onChangeFormClick("login")
            }, 400)
        }
    }

    return (<React.Fragment>
        <div className="Slider">
            {/* picture */}
            <div className="Slider__picture changeToLogin"></div>

            <div className="Slider__content">
                {/* content when the form is register */}
                <div className="register_section">
                    <div className="header">
                        <p>Welcome back</p>
                    </div>

                    <div className="message">
                        <p>If you already have an account, login here and have fun</p>
                    </div>

                    <div className="change-form">
                        <button onClick={() => {SliderSection_onChangeFormClick()}}>
                            Login now
                            <i className="fa-solid fa-arrow-right"/>
                        </button>
                    </div>
                </div>
                {/* content when the form is login */}
                <div className="login_section scrollInLogin">
                    <div className="header">
                        <p>Start your journey now</p>
                    </div>

                    <div className="message">
                        <p>If you don't have an account yet, join us and start your journey</p>
                    </div>

                    <div className="change-form">
                        <button onClick={() => {SliderSection_onChangeFormClick()}}>
                            Register now
                            <i className="fa-solid fa-arrow-left"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>)
}
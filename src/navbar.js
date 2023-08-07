// Set up
import React from 'react';
import { NavLink } from 'react-router-dom';
// Self styling
import './navbar.scss'

export default function NavComponent(props) {
    return (<React.Fragment>
        <div className="topnav"> {/* structure of navigation bar */}
            <div> {/* each div return a nav button */}
                <NavLink exact to="/" activeClassName="active">
                    Home
                </NavLink>
            </div>

            {!props.logged ? 
                <div>
                    <NavLink to="/login" activeClassName="active">
                        Login
                    </NavLink>
                </div>
            : null}
            
            {props.logged ?
                <div>
                    <NavLink to="/todo" activeClassName="active">
                        Todo
                    </NavLink>
                </div>
            : null}

            <div>
                <NavLink to="/descript" activeClassName="active">
                    Description
                </NavLink>
            </div>

            {props.logged ? 
                <div className="logout-btn" onClick={()=>props.loggedOut()}>
                    <NavLink exact to="/" activeClassName="active">
                        LogOut
                    </NavLink>
                </div>
            : null}
        </div>
    </React.Fragment>)
}
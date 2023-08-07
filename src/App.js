// Set up
import React, {useState, useEffect} from 'react';
import { // Import router
  BrowserRouter as Router,
  Switch,
  Route,
  // useHistory
} from 'react-router-dom';
// Self-styling
import './App.scss';
// Import components
import NavComponent from './navbar';
import HomePage from './page/Home/HomePage';
import TodoPage from './page/Todo/TodoPage';
import LoginPage from './page/Login/LoginPage';
import DescriptPage from './page/Descript/DescriptPage';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
// Import requirements
// import * as DataBase from './database/Methods.js'
// import ScratchData from './database/ScratchData';

export default function App() {
  const WorkingDuration = 900000 // 15mins
  const [logged, setLogged] = useState(false)

  // Store the user info
  const [userInfo, setUserInfo] = useState(() => {
    const currentUser = JSON.parse(localStorage.getItem("CurrentUser"))
    if(currentUser) { // if get success
      const currentTime = new Date().getTime()
      if(currentTime - currentUser.loginTime < 10000) { // if login under a duration of time
        setLogged(true)
        return {
          userId: currentUser.userId,
          userList: currentUser.userList
        }
      }
      else { // if login time exceed
        setLogged(false)
        return {
          userId: "",
          userList: ""
        }
      }
    }
    else { // case no CurrentUser
      setLogged(false)
      return {
        userId: "",
        userList: ""
      }
    }
  })

  // set user
  const loggedIn = (userId, userList) => {
    // set state
    setLogged(true)
    setUserInfo({
      userId: userId,
      userList: userList
    })

    // set current user on local storage
    const currentUserInfo = {
      userId: userId,
      userList: userList,
      loginTime: new Date().getTime()
    }
    localStorage.setItem("CurrentUser", JSON.stringify(currentUserInfo))
  }

  // clear user
  const loggedOut = () => {
    // clear state
    setLogged(false)
    setUserInfo({
      userId: "",
      userList: ""
    })
    // clear current user on local storage
    localStorage.removeItem("CurrentUser")
  }

  // handle userInfo by keeping track on every 1s
  useEffect(()=>{
    const intervalId = setInterval(() => {
      // get current user if it exist
      const currentUser = JSON.parse(localStorage.getItem("CurrentUser"))
      if(currentUser) { // if get success
        const currentTime = new Date().getTime()

        if(currentTime - currentUser.loginTime < WorkingDuration) { // if login under a duration of time
          setUserInfo({
            userId: currentUser.userId,
            userList: currentUser.userList
          })
        }
        else { // if login time exceed
          loggedOut()
        }
      }
    }, 1000)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <Router> {/* the router cover all of the App */}
      <div className='App'>
        <header>
          <NavComponent // return the navigation bar
            logged = {logged}
            loggedOut = {loggedOut}
          /> 
        </header>

        <Switch>
          <Route exact path='/'>
            <HomePage />
          </Route>

          {!logged ?
            <Route path='/login'> {/* each route return a page */}
              <LoginPage
                loggedIn = {loggedIn}
              />
            </Route>
          : null}

          {logged ? (<>
            <Route path='/todo'>
              <TodoPage
                userId = {userInfo.userId}
                userList = {userInfo.userList}
              />
            </Route>

            <Route path='/descript'>
              <DescriptPage/>
            </Route>

            <Redirect to="/todo" />
          </>)
          : (
            null
          )}

          <Route path='/descript'>
            <DescriptPage/>
          </Route>

          {/* Catch-all route for undefined paths */}
          <Route path='*'>
            <div>404 Not Found</div>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}
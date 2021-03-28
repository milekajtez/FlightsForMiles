import React, { useState } from 'react'
import Help from './help/Help'
import Login from './logging-in/Login'
import Registration from './registration/Registration'

function Navigation() {
    const [helpIsOpen, setHelpIsOpen] = useState(false)
    const [loginIsOpen, setLoginIsOpen] = useState(false)
    const [regIsOpen, setRegIsOpen] = useState(false)

    return (
        <span>
            <ul className="menu-bar">
                <li><i className="fas fa-plane-departure"></i> Flights</li>
                <div></div>
                <li onClick={() => setHelpIsOpen(true)}><i className="far fa-question-circle"></i> Help</li>
                <Help helpIsOpen={helpIsOpen} setHelpIsOpen={setHelpIsOpen}/>
                <div></div>
                <li><i className="fab fa-google"></i> Login with Google</li>
                <div></div>
                <li onClick={() => setLoginIsOpen(true)}><i className="fas fa-sign-in-alt"></i> Sign in</li>
                <Login loginIsOpen={loginIsOpen} setLoginIsOpen={setLoginIsOpen}/>
                <div></div>
                <li onClick={() => setRegIsOpen(true)}><i className="fas fa-user-plus"></i> Sign up</li>
                <Registration regIsOpen={regIsOpen} setRegIsOpen={setRegIsOpen}/>
            </ul>
        </span>
    )
}

export default Navigation

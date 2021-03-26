import React from 'react'
import { NavLink } from 'react-router-dom'

function Navigation() {
    return (
        <span>
            <ul className="menu-bar">
                <NavLink to="/flights"><li><i className="fas fa-plane-departure"></i> Flights</li></NavLink>
                <div></div>
                <NavLink to="/about"><li><i className="fas fa-info-circle"></i> About</li></NavLink>
                <div></div>
                <NavLink to="/help"><li><i className="far fa-question-circle"></i> Help</li></NavLink>
                <div></div>
                <NavLink to="/loginGoogle"><li><i className="fab fa-google"></i> Login with Google</li></NavLink>
                <div></div>
                <NavLink to="/singIn"><li><i className="fas fa-sign-in-alt"></i> Sign in</li></NavLink>
                <div></div>
                <NavLink to="/singUp"><li><i className="fas fa-user-plus"></i> Sign up</li></NavLink>
            </ul>
        </span>
    )
}

export default Navigation

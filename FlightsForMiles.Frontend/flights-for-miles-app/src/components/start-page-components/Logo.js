import React from 'react'
import { NavLink } from 'react-router-dom'

function Logo() {
    return (
        <span>
            <NavLink to="/">
                <img className="img" src="logo.png" alt=""></img>
            </NavLink>
        </span>
    )
}

export default Logo

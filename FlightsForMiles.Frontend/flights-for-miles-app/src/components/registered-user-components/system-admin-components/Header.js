import React from 'react'
import Navigation from './Navigation'
import Logo from '../../start-page-components/Logo'

function Header() {
    return (
        <div style={{ background: "#0b151c" }}>
            <Logo />
            <Navigation />
        </div>
    )
}

export default Header

import React from 'react'
import Navigation from './Navigation'
import Logo from '../../start-page-components/Logo'
import UserMenu from './UserMenu'

function Header() {
    return (
        <div style={{ background: "#0b151c" }}>
            <Logo />
            <Navigation />
            <UserMenu />
        </div>
    )
}

export default Header

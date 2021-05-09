import React from 'react'
import Logo from '../../start-page-components/Logo'
import Navigation from './Navigation'
import AvioAdminMenu from './AvioAdminMenu'

function Header() {
    return (
        <div style={{ background: "#0b151c" }}>
            <Logo />
            <Navigation />
            <AvioAdminMenu />
        </div>
    )
}

export default Header

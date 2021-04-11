import React from 'react'

function Navigation() {
    return (
        <span>
            <ul className="menu-bar">
                <li><i className="fas fa-user-plus"></i> Administrator registration</li>
                <div></div>
                <li><i className="fas fa-plane"></i> Airline registration</li>
                <div></div>
                <li><i className="fas fa-percentage"></i> Discounts settings</li>
            </ul>
        </span>
    )
}

export default Navigation

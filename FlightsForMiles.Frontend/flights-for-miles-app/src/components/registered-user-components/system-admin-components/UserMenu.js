import React from 'react'
import { Link, useParams } from 'react-router-dom';

function UserMenu() {
    const params = useParams()

    return (
        <span style={{marginLeft: "10%"}}>
            <div className="dropdown">
                <button className="dropbtn">{params.username}</button>
                <div className="dropdown-content">
                    <Link to="/"><i className="fas fa-sign-out-alt"></i> Log out</Link>
                </div>
            </div>
        </span>
    )
}

export default UserMenu

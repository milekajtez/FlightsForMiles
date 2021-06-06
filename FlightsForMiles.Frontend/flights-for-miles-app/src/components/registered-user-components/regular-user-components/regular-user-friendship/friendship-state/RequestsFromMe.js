import React from 'react'
import MyRequest from './MyRequest'

function RequestsFromMe() {
    return (
        <span style={{color: 'white', verticalAlign: 'middle', height: '100%'}}>
            <li className="nav-item dropdown">
                <h5 style={{color: 'white'}} className="nav-link dropdown-toggle mr-lg-2" id="contactsDropdown"
                    data-toggle="dropdown">My requests&nbsp; 
                    <i className='fas fa-user-friends fa-lg' style={{color: 'aqua'}}><sup> 3</sup></i>
                </h5>
                <div className="dropdown-menu dropdown-menu-right" style={{minWidth: '500px', backgroundColor: 'rgb(177, 214, 244)'}} 
                    aria-labelledby="contactsDropdown">
                    <h6 className="dropdown-header"><b>My requests:</b></h6>
                    <MyRequest />
                    <MyRequest />
                    <MyRequest />
                </div>
            </li>
        </span>
    )
}

export default RequestsFromMe

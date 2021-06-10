import React from 'react'

function YourRequest(props) {
    return (
        <div>
            <div className="dropdown-divider"></div>
            <div className="dropdown-item">
                <img src="https://orig00.deviantart.net/d7b0/f/2011/166/d/4/avatar_100x100_by_demonfox_zephz-d3iyw6a.png"
                    alt="" className="rounded-circle" style={{ width: '50px', height: '50px' }} />
                <div className="text-left user-item" style={{ display: 'inline-block', marginLeft: '10px', width: 'auto', marginRight: '10px' }}>
                    {props.request.firstname}<br></br>{props.request.lastname}
                </div>
                <span className="text-right" style={{ float: 'right', marginTop: "2%" }}>
                    <input type="button" className="btn btn-success btn-sm" value="Accept"/>&nbsp;
                    <input type="button" className="btn btn-danger btn-sm" value="Reject" />
                </span>
            </div>
        </div>
    )
}

export default YourRequest

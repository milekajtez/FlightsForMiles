import React from 'react'

function MyRequest() {
    return (
        <div>
            <div className="dropdown-divider"></div>
            <div className="dropdown-item">
                <img src="https://orig00.deviantart.net/d7b0/f/2011/166/d/4/avatar_100x100_by_demonfox_zephz-d3iyw6a.png"
                    alt="" className="rounded-circle" style={{ width: '50px', height: '50px' }} />
                <div className="text-left user-item" style={{ display: 'inline-block', marginLeft: '10px', width: 'auto', marginRight: '10px' }}>
                    Mile<br></br>Kajtez
                </div>
                <span className="text-right" style={{ float: 'right', marginTop: "2%" }}>
                    <input type="button" className="btn btn-danger btn-sm" value="Cancel request" />
                </span>
            </div>
        </div>
    )
}

export default MyRequest

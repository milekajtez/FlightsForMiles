import React from 'react'

function ConfirmRegYes() {
    console.log("Yes")
    return (
        <div style={{background: "#363638"}}>
            <div className="alert alert-success" style={{textAlign: "center", width: "100%", height: "100%"}}>
                <strong>Success!</strong> You have accepted the flight reservation request. Enjoy in flight. Thanks for using FlightsForMiles application.
            </div>
            <img style={{display: "block", margin: "2.4% auto", fontSize:"50%"}} src="../assets/images/registration-done.gif" alt=""/>
            <div>&nbsp;</div>
        </div>
    )
}

export default ConfirmRegYes

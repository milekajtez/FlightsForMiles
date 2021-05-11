import Modal from 'react-modal'
import React from 'react'

function FlightMoreInfo(props) {
    return (
        <Modal ariaHideApp={false} isOpen={props.moreInfoIsOpen} closeTimeoutMS={500}
            className="new-member-inner-reg" onRequestClose={() => props.setMoreInfoIsOpen(false)}
            style={{
                overlay: {
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.4)', backdropFilter: "blur(8px)"
                }
            }}>
            <div className="reg-box" style={{ color: "white" }}>
                <h2>FLIGHT MORE INFO</h2>
                <div style={{ textAlign: "center" }}>
                    <span className="user-box" style={{ display: "inline-block" }}>
                        <h5 style={{ color: "aqua" }}>Flight length (km)</h5>
                        <p>3</p>
                    </span>
                    <span className="user-box" style={{ display: "inline-block" }}>
                        <h5 style={{ color: "aqua" }}>Number of transfers</h5>
                        <p>3</p>
                    </span>
                    <span className="user-box" style={{ display: "inline-block" }}>
                        <h5 style={{ color: "aqua" }}>All transfers</h5>
                        <p>Belgrade - Budapest - Berlin</p>
                    </span>
                    <span className="user-box" style={{ display: "inline-block" }}>
                        <h5 style={{ color: "aqua" }}>Plane name</h5>
                        <p>Plane name test</p>
                    </span>
                    <span className="user-box" style={{ display: "inline-block" }}>
                        <h5 style={{ color: "aqua" }}>Lugage weight (kg)</h5>
                        <p>3</p>
                    </span>
                </div>
                <div style={{ textAlign: "center" }}>
                    <span className="user-box" style={{ display: "inline-block" }}>
                        <h5 style={{ color: "aqua" }}>Number of economic class seats</h5>
                        <p>3</p>
                    </span>
                    <span className="user-box" style={{ display: "inline-block" }}>
                        <h5 style={{ color: "aqua" }}>Number of first class seats</h5>
                        <p>3</p>
                    </span>
                    <span className="user-box" style={{ display: "inline-block" }}>
                        <h5 style={{ color: "aqua" }}>Number of business class seats</h5>
                        <p>3</p>
                    </span>
                </div>
            </div>
        </Modal>
    )
}

export default FlightMoreInfo

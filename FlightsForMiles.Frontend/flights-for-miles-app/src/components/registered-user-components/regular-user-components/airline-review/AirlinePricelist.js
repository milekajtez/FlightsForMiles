import React from 'react'
import Modal from 'react-modal'

function AirlinePricelist(props) {
    return (
        <Modal ariaHideApp={false} isOpen={props.pricelistIsOpen} closeTimeoutMS={500}
            className="new-member-inner-reg" onRequestClose={() => props.setPricelist(!props.pricelistIsOpen)}
            style={{
                overlay: {
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.4)', backdropFilter: "blur(8px)"
                }
            }}>
            <div className="reg-box" style={{ color: "white" }}>
                <h2>AIRLINE DESCRIPTION</h2>
                {
                    <div style={{ textAlign: "center" }}>
                        <span className="user-box" style={{ display: "inline-block" }}>
                            <p style={{ color: "aqua" }}>{props.pricelist}</p>
                        </span>
                    </div>
                }
            </div>
        </Modal>
    )
}

export default AirlinePricelist

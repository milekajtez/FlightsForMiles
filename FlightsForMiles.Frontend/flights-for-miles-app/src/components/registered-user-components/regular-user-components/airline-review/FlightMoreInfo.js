import React from "react";
import Modal from "react-modal";

function FlightMoreInfo(props) {
  return (
    <Modal
      ariaHideApp={false}
      isOpen={props.flightInfoIsOpen}
      closeTimeoutMS={500}
      className="new-member-inner-reg"
      onRequestClose={() => props.setFlightInfo(!props.flightInfoIsOpen)}
      style={{
        overlay: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)",
        },
      }}
    >
      <div
        className="reg-box"
        style={{ color: "white", backgroundColor: "#202932" }}
      >
        <h2>FLIGHT MORE INFO</h2>
        <div style={{ textAlign: "center" }}>
          <span className="user-box" style={{ display: "inline-block" }}>
            <h5 style={{ color: "white", fontSize: "25px" }}>
              Flight time (hours)
            </h5>
            <p style={{ fontSize: "20px" }}>{props.currentFlight.flightTime}</p>
          </span>
          <span className="user-box" style={{ display: "inline-block" }}>
            <h5 style={{ color: "white", fontSize: "25px" }}>
              Flight length (km)
            </h5>
            <p style={{ fontSize: "20px" }}>
              {props.currentFlight.flightLengthKM}
            </p>
          </span>
          <span className="user-box" style={{ display: "inline-block" }}>
            <h5 style={{ color: "white" }}>Number of transfers</h5>
            <p style={{ fontSize: "20px" }}>
              {props.currentFlight.numberOfTransfers}
            </p>
          </span>
          <span className="user-box" style={{ display: "inline-block" }}>
            <h5 style={{ color: "white", fontSize: "25px" }}>All transfers</h5>
            <p style={{ fontSize: "20px" }}>
              {props.currentFlight.allTransfers}
            </p>
          </span>
          <span className="user-box" style={{ display: "inline-block" }}>
            <h5 style={{ color: "white", fontSize: "25px" }}>Plane name</h5>
            <p style={{ fontSize: "20px" }}>{props.currentFlight.planeName}</p>
          </span>
          <span className="user-box" style={{ display: "inline-block" }}>
            <h5 style={{ color: "white", fontSize: "25px" }}>
              Lugage weight (kg)
            </h5>
            <p style={{ fontSize: "20px" }}>
              {props.currentFlight.lugageWeight}
            </p>
          </span>
          <div>
            <span className="user-box" style={{ display: "inline-block" }}>
              <h5 style={{ color: "white", fontSize: "25px" }}>
                Additional informations
              </h5>
              <p style={{ fontSize: "20px" }}>
                {props.currentFlight.additionalInformation}
              </p>
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default FlightMoreInfo;

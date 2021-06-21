import Modal from "react-modal";
import React from "react";

function FlightMoreInfo(props) {
  return (
    <Modal
      ariaHideApp={false}
      isOpen={props.moreInfoIsOpen.isOpen}
      closeTimeoutMS={500}
      className="new-member-inner-reg"
      onRequestClose={() =>
        props.setMoreInfoIsOpen({
          isOpen: !props.moreInfoIsOpen.isOpen,
          currentFlight: props.moreInfoIsOpen.currentFlight,
        })
      }
      style={{
        overlay: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          backdropFilter: "blur(8px)",
        },
      }}
    >
      <div className="reg-box" style={{ color: "white" }}>
        <h2>FLIGHT MORE INFO</h2>
        {props.moreInfoIsOpen.currentFlight.flightTime !== undefined ? (
          <div style={{ textAlign: "center" }}>
            <span className="user-box" style={{ display: "inline-block" }}>
              <h5 style={{ color: "aqua" }}>Flight time (hours)</h5>
              <p>{props.moreInfoIsOpen.currentFlight.flightTime}</p>
            </span>
            <span className="user-box" style={{ display: "inline-block" }}>
              <h5 style={{ color: "aqua" }}>Flight length (km)</h5>
              <p>{props.moreInfoIsOpen.currentFlight.flightLengthKM}</p>
            </span>
            <span className="user-box" style={{ display: "inline-block" }}>
              <h5 style={{ color: "aqua" }}>Number of transfers</h5>
              <p>{props.moreInfoIsOpen.currentFlight.numberOfTransfers}</p>
            </span>
            <span className="user-box" style={{ display: "inline-block" }}>
              <h5 style={{ color: "aqua" }}>All transfers</h5>
              <p>{props.moreInfoIsOpen.currentFlight.allTransfers}</p>
            </span>
            <span className="user-box" style={{ display: "inline-block" }}>
              <h5 style={{ color: "aqua" }}>Plane name</h5>
              <p>{props.moreInfoIsOpen.currentFlight.planeName}</p>
            </span>
            <span className="user-box" style={{ display: "inline-block" }}>
              <h5 style={{ color: "aqua" }}>Lugage weight (kg)</h5>
              <p>{props.moreInfoIsOpen.currentFlight.lugageWeight}</p>
            </span>
            <span className="user-box" style={{ display: "inline-block" }}>
              <h5 style={{ color: "aqua" }}>Sum of all grades</h5>
              <p>{props.moreInfoIsOpen.currentFlight.sumOfAllGrades}</p>
            </span>
            <span className="user-box" style={{ display: "inline-block" }}>
              <h5 style={{ color: "aqua" }}>Number of grades</h5>
              <p>{props.moreInfoIsOpen.currentFlight.numberOfGrades}</p>
            </span>
            <div>
              <span className="user-box" style={{ display: "inline-block" }}>
                <h5 style={{ color: "aqua" }}>Additional informations</h5>
                <p>
                  {props.moreInfoIsOpen.currentFlight.additionalInformation}
                </p>
              </span>
            </div>
          </div>
        ) : null}
      </div>
    </Modal>
  );
}

export default FlightMoreInfo;

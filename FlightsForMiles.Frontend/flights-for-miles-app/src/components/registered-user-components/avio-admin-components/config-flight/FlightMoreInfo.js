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
          <div style={{ textAlign: "center", fontSize: "25px" }}>
            <span className="user-box" style={{ display: "inline-block" }}>
              <h5 style={{ color: "white", fontSize: "25px" }}>
                Flight time (hours)
              </h5>
              <p style={{ fontSize: "20px" }}>
                {props.moreInfoIsOpen.currentFlight.flightTime}
              </p>
            </span>
            <span className="user-box" style={{ display: "inline-block" }}>
              <h5 style={{ color: "white", fontSize: "25px" }}>
                Flight length (km)
              </h5>
              <p style={{ fontSize: "20px" }}>
                {props.moreInfoIsOpen.currentFlight.flightLengthKM}
              </p>
            </span>
            <span className="user-box" style={{ display: "inline-block" }}>
              <h5 style={{ color: "white", fontSize: "25px" }}>
                Number of transfers
              </h5>
              <p style={{ fontSize: "20px" }}>
                {props.moreInfoIsOpen.currentFlight.numberOfTransfers}
              </p>
            </span>
            <span className="user-box" style={{ display: "inline-block" }}>
              <h5 style={{ color: "white", fontSize: "25px" }}>
                All transfers
              </h5>
              <p style={{ fontSize: "20px" }}>
                {props.moreInfoIsOpen.currentFlight.allTransfers}
              </p>
            </span>
            <span className="user-box" style={{ display: "inline-block" }}>
              <h5 style={{ color: "white", fontSize: "25px" }}>Plane name</h5>
              <p style={{ fontSize: "20px" }}>
                {props.moreInfoIsOpen.currentFlight.planeName}
              </p>
            </span>
            <span className="user-box" style={{ display: "inline-block" }}>
              <h5 style={{ color: "white", fontSize: "25px" }}>
                Lugage weight (kg)
              </h5>
              <p style={{ fontSize: "20px" }}>
                {props.moreInfoIsOpen.currentFlight.lugageWeight}
              </p>
            </span>
            <span className="user-box" style={{ display: "inline-block" }}>
              <h5 style={{ color: "white", fontSize: "25px" }}>
                Sum of all grades
              </h5>
              <p style={{ fontSize: "20px" }}>
                {props.moreInfoIsOpen.currentFlight.sumOfAllGrades}
              </p>
            </span>
            <span className="user-box" style={{ display: "inline-block" }}>
              <h5 style={{ color: "white", fontSize: "25px" }}>
                Number of grades
              </h5>
              <p style={{ fontSize: "20px" }}>
                {props.moreInfoIsOpen.currentFlight.numberOfGrades}
              </p>
            </span>
            <div>
              <span className="user-box" style={{ display: "inline-block" }}>
                <h5 style={{ color: "white", fontSize: "25px" }}>
                  Additional informations
                </h5>
                <p style={{ fontSize: "20px" }}>
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

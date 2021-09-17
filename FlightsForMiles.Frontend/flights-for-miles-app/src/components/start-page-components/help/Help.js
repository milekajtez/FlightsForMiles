import React from "react";
import Modal from "react-modal";
import DisplayAllQuestions from "./DisplayAllQuestions";
import DisplayAppDescription from "./DisplayAppDescription";

function Help(props) {
  return (
    <Modal
      ariaHideApp={false}
      isOpen={props.helpIsOpen}
      closeTimeoutMS={500}
      className="new-member-inner-help"
      onRequestClose={() => props.setHelpIsOpen(false)}
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
      <div
        style={{
          backgroundColor: "#1c5260",
          padding: "10px",
          color: "white",
          textAlign: "center",
        }}
      >
        <img
          src="../assets/images/help.png"
          alt=""
          width="80%"
          height="400px"
        />
        <h3 style={{ textAlign: "center", fontSize: "35px" }}>
          How FlightsForMiles works?
        </h3>
        <DisplayAppDescription />
        <DisplayAllQuestions />
      </div>
    </Modal>
  );
}

export default Help;

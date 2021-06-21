import React from "react";

function ConfirmRegNo() {
  return (
    <div style={{ background: "#363638" }}>
      <div
        className="alert alert-danger"
        style={{ textAlign: "center", width: "100%", height: "100%;" }}
      >
        <strong>Rejection!</strong> You have refused a flight reservation
        request.
      </div>
      <img
        style={{ display: "block", margin: "2.4% auto" }}
        src="../assets/images/refuse.gif"
        alt=""
      />
      <div>&nbsp;</div>
    </div>
  );
}

export default ConfirmRegNo;

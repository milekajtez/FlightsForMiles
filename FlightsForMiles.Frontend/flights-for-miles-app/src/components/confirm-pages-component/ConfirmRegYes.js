import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { confirmRegistration } from "../../redux/start-page/registration/registrationAction";

function ConfirmRegYes() {
  const dispatch = useDispatch();
  const alert = useAlert();
  let { username } = useParams();

  useEffect(() => {
    dispatch(confirmRegistration(username))
      .then((response) => {
        console.log(response);
        if (response.status === 204) {
          alert.show("Confirm registration successfully.", {
            type: "success",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        alert.show("Confirm registration unsuccessfully.", {
          type: "error",
        });
      });
  });

  return (
    <div style={{ background: "#363638" }}>
      <div
        className="alert alert-success"
        style={{ textAlign: "center", width: "100%", height: "100%" }}
      >
        <strong>Success!</strong> You have accepted the flight reservation
        request. Enjoy in flight. Thanks for using FlightsForMiles application.
      </div>
      <img
        style={{ display: "block", margin: "2.4% auto", fontSize: "50%" }}
        src="../assets/images/registration-done.gif"
        alt=""
      />
      <div>&nbsp;</div>
    </div>
  );
}

export default ConfirmRegYes;

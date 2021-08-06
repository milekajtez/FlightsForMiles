import React from "react";
import { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { refuseBooking } from "../../redux/regular-user/booking/bookingAction";

function ConfirmBookingNo() {
  const dispatch = useDispatch();
  const alert = useAlert();
  let { ticketID } = useParams();

  useEffect(() => {
    dispatch(refuseBooking(ticketID))
      .then((response) => {
        if (response.status === 204) {
          alert.show("Refuse booking successfully.", {
            type: "success",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        alert.show("Refuse booking unsuccessfully.", {
          type: "error",
        });
      });
  });

  return (
    <div style={{ background: "#363638" }}>
      <div
        className="alert alert-danger"
        style={{ textAlign: "center", width: "100%", height: "100%;" }}
      >
        <strong>Rejection!</strong> You have refused a booking reservation
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

export default ConfirmBookingNo;

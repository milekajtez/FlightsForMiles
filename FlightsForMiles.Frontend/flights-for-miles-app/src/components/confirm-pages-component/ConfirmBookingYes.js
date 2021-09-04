import React from "react";
import { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { confirmBooking } from "../../redux/regular-user/booking/bookingAction";
import { validateAndMineTransaction } from '../../utils/blockchainUtils';

function ConfirmBookingYes() {
  const dispatch = useDispatch();
  const alert = useAlert();
  let params = useParams();

  useEffect(() => {
    dispatch(confirmBooking(params.ticketID))
      .then((response) => {
        if (response.status === 200) {
          alert.show("Confirm booking successfully.", {
            type: "success",
          });
          
          validateAndMineTransaction({
            username: params.friendsUsername,
            flightID: params.flightID,
            ticketID: params.ticketID,
            transactionID: params.transactionID,
          }, dispatch, alert);
        }
      })
      .catch((error) => {
        console.log(error);
        alert.show("Confirm booking unsuccessfully.", {
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
        <strong>Success!</strong> You have accepted the booking reservation
        request. Enjoy in flight. Thanks for using FlightsForMiles application.
      </div>
      <img
        style={{ display: "block", margin: "2.4% auto", fontSize: "50%" }}
        src="/assets/images/registration-done.gif"
        alt=""
      />
      <div>&nbsp;</div>
    </div>
  );
}

export default ConfirmBookingYes;

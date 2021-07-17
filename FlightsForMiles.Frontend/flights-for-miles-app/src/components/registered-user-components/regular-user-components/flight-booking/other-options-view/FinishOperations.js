import React from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { bookingWithoutFriends } from "../../../../../redux/regular-user/booking/bookingAction";

function FinishOperations() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const params = useParams();
  const ticket = useSelector((state) => state.ticket);
  const flight = useSelector((state) => state.flight);
  const friendship = useSelector((state) => state.friendship);

  const bookingFlightWithoutFriends = () => {
    if (ticket.selectedTickets.length !== 1) {
      alert.show(
        "If you want to booking flight only for you, please choose only one ticket.",
        {
          type: "error",
        }
      );
    } else {
      dispatch(bookingWithoutFriends({
        username: params.username,
        flightID: flight.flightForBooking.flightID,
        ticketID: ticket.selectedTickets[0].ticketID
      }))
      .then(response => {

      })
      .catch(error => {
        console.log(error);
      })
    }
  };

  const bookingFlightWithFriends = () => {
    if (friendship.friendsSelectedForBooking.length > 0) {
      if (
        ticket.selectedTickets.length !==
        friendship.friendsSelectedForBooking.length + 1
      ) {
        alert.show(
          "Incorrect number of chosen tickets. Number of chosen tickets must me same as number of persons",
          {
            type: "error",
          }
        );
      } else {
        // poziv za booking - pravljanje transakcije...
      }
    } else {
      alert.show(
        "You didn't pick any friends",
        {
          type: "error",
        }
      );
    }
  };

  return (
    <div style={{ margin: "8px 0" }}>
      <span className="box">
        <button
          type="submit"
          style={{ backgroundColor: "#141e30" }}
          onClick={() => bookingFlightWithoutFriends()}
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          BOOKING FLIGHT WITHOUT FRIENDS
        </button>
      </span>
      <span className="box">
        <button
          type="submit"
          style={{ backgroundColor: "#141e30" }}
          onClick={() => bookingFlightWithFriends()}
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          BOOKING FLIGHT WITH FRIENDS
        </button>
      </span>
    </div>
  );
}

export default FinishOperations;

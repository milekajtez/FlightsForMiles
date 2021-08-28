import React from "react";
import { useEffect } from "react";
import { useAlert } from "react-alert";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { cancelBooking, loadActiveBookings } from "../../../../redux/regular-user/booking/bookingAction";

function ActiveFlightReservations() {
  const dispatch = useDispatch();
  const booking = useSelector((state) => state.booking);
  const params = useParams();
  const alert = useAlert();

  useEffect(() => {
    dispatch(loadActiveBookings(params.username));
  }, [dispatch, params.username]);

  const flightCancallation = (ticketID, discountBitcoinPrice, discountPrice) => {
    dispatch(cancelBooking({
      ticketID: ticketID,
      bitcoinPrice: discountBitcoinPrice,
      dollarPrice: discountPrice
    }))
      .then(response => {
        if (response.status === 204) {
          alert.show("Flight cancel successfully.", {
            type: "success",
          });
          dispatch(loadActiveBookings(params.username));
        } else {
          alert.show("Unknown error.", {
            type: "error",
          });
        }
      })
      .catch(error => {
        console.log(error);
        if (error.response.data.indexOf("(Booking with entered ID doesn't exsist.)") !== -1) {
          alert.show(
            "Cancelling booking unsuccessfully. Booking with entered ID doesn't exsist.",
            {
              type: "error",
            }
          );
        }
        else if(error.response.data.indexOf("(Balance doesn't exsist.)") !== -1){
          alert.show(
            "Cancelling booking unsuccessfully. Balance doesn't exsist.",
            {
              type: "error",
            }
          );
        }
        else if(error.response.data.indexOf("(Ticket with entered ID doesn't exsist.)") !== -1){
          alert.show(
            "Cancelling booking unsuccessfully. Ticket with entered ID doesn't exsist.",
            {
              type: "error",
            }
          );
        }
        else if(error.response.data.indexOf("(User doesn't exsist.)") !== -1){
          alert.show(
            "Cancelling booking unsuccessfully. User doesn't exsist.",
            {
              type: "error",
            }
          );
        } else {
          alert.show("Unknown error.", {
            type: "error",
          });
        }
      })
  }

  return (
    <span>
      <h2 style={{ color: "white", paddingTop: "8px" }}>MY ACTIVE BOOKINGS</h2>
      <table className="items-table">
        <thead>
          <tr>
            <th>Start/End location</th>
            <th>Start/End time</th>
            <th>Ticket number</th>
            <th>Original ticket price</th>
            <th>Discount ticket price</th>
            <th>Cancel operation</th>
          </tr>
        </thead>
        <tbody>
          {booking.activeBookings.map((activeBooking, index) => {
            return (
              <tr key={index}>
                <td>
                  From: {activeBooking.startLocation}
                  <br></br>To: {activeBooking.endLocation}
                </td>
                <td>
                  {activeBooking.startTime}
                  <br></br>
                  {activeBooking.endTime}
                </td>
                <td>{activeBooking.ticketNumber}</td>
                <td title={`${activeBooking.originalBitcoinPrice} ₿`}>
                  {activeBooking.originalPrice} $
                </td>
                <td title={`${activeBooking.discountBitcoinPrice} ₿`}>
                  {activeBooking.discountPrice} $
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() =>
                      flightCancallation(
                        activeBooking.ticketID,
                        activeBooking.discountBitcoinPrice,
                        activeBooking.discountPrice
                      )
                    }
                  ><i className="fas fa-ban">&nbsp;</i>
                    CANCEL BOOKING
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </span>
  );
}

export default ActiveFlightReservations;

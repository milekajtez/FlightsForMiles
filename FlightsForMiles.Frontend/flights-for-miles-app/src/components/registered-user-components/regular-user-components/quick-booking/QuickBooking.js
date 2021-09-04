import React from "react";
import { useEffect } from "react";
import { useAlert } from "react-alert";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import { bookingWithoutFriends, loadQuickBookings } from "../../../../redux/regular-user/booking/bookingAction";
import { validateAndMineTransaction } from '../../../../utils/blockchainUtils';

function QuickBooking() {
  const dispatch = useDispatch();
  const booking = useSelector((state) => state.booking);
  const params = useParams();
  const history = useHistory();
  const alert = useAlert();
  var transactionID = '';

  useEffect(() => {
    dispatch(loadQuickBookings(params.username));
  }, [dispatch, params.username]);

  const quickBookingReservation = (flightID, ticketID) => {
    dispatch(bookingWithoutFriends({
      username: params.username,
      flightID: flightID,
      ticketID: ticketID
    }))
    .then(response => {
      if (response.status === 200) {
        alert.show("Send request for booking successfully. You will get a message if your request for booking is valid.",
        {
          type: 'success'
        });
        transactionID = response.data;
        validateAndMineTransaction({
          username: params.username,
          flightID: flightID,
          ticketID: ticketID,
          transactionID: transactionID,
        }, dispatch, alert);
        transactionID = '';
        history.push(`/regular/${params.username}/airlineReview`);
      }
    })
    .catch(error => {
      console.log(error);
      if (
        error.response.data.indexOf("(Server not found user.)") !== -1
      ) {
        alert.show("Server not found user.", {
          type: "error",
        });
      } else if (
        error.response.data.indexOf("(Server not found flight.)") !== -1
      ) {
        alert.show("Server not found flight.", {
          type: "error",
        });
      }
      else if(error.response.data.indexOf("Server not found ticket.") !== -1) {
        alert.show("Server not found ticket.", {
          type: "error",
        });
      }
      else if(error.response.data.indexOf("User has already send request for booking for this flght and seat.") !== -1) {
        alert.show("User has already send request for booking for this flght and seat.", {
          type: "error",
        });
      }
      else {
        alert.show("Unknown error.", {
          type: "error",
        });
      }
    })
  };

  return (
    <>
      <h2 style={{ color: "white", paddingTop: "8px" }}>QUICK BOOKINGS</h2>
      <table className="items-table">
        <thead>
          <tr>
            <th>Start/End location</th>
            <th>Start/End time</th>
            <th>Ticket number</th>
            <th>Original ticket price</th>
            <th>Discount ticket price</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {booking.quickBookings.map((quickBooking, index) => {
            return (
              <tr key={index}>
                <td>
                  From: {quickBooking.startLocation}
                  <br></br>To: {quickBooking.endLocation}
                </td>
                <td>
                  {quickBooking.startTime}
                  <br></br>
                  {quickBooking.endTime}
                </td>
                <td>{quickBooking.ticketNumber}</td>
                <td title={`${quickBooking.originalBitcoinPrice} ₿`}>
                  {quickBooking.originalPrice} $
                </td>
                <td title={`${quickBooking.discountBitcoinPrice} ₿`}>
                  {quickBooking.discountPrice} $
                </td>
                <td>
                    <button
                      className="btn btn-success"
                      onClick={() => quickBookingReservation(quickBooking.flightID, quickBooking.ticketID)}
                    >
                      <img src="https://img.icons8.com/dusk/24/000000/airport.png" alt=""/> BOOKING
                    </button>
                  </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default QuickBooking;

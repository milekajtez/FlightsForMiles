import React from "react";
import { useEffect } from "react";
//import { useAlert } from "react-alert";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { /*useHistory,*/ useParams } from "react-router";
import { loadPreviousBookings } from "../../../../redux/regular-user/booking/bookingAction";

function PreviousFlightReservations() {
  const dispatch = useDispatch();
  const booking = useSelector((state) => state.booking);
  const params = useParams();
  /**const history = useHistory();*/
  /*const alert = useAlert();*/

  useEffect(() => {
    dispatch(loadPreviousBookings(params.username));
  }, [dispatch, params.username]);

  return (
    <span>
      <h2 style={{ color: "white", paddingTop: "8px" }}>MY PREVIOUS BOOKINGS</h2>
      <table className="items-table">
        <thead>
          <tr>
            <th>Start/End location</th>
            <th>Start/End time</th>
            <th>Ticket number</th>
            <th>Original ticket price</th>
            <th>Discount ticket price</th>
            <th>Rating operation</th>
          </tr>
        </thead>
        <tbody>
          {booking.previousBookings.map((previousBooking, index) => {
            return (
              <tr key={index}>
                <td>
                  From: {previousBooking.startLocation}
                  <br></br>To: {previousBooking.endLocation}
                </td>
                <td>
                  {previousBooking.startTime}
                  <br></br>
                  {previousBooking.endTime}
                </td>
                <td>{previousBooking.ticketNumber}</td>
                <td title={`${previousBooking.originalBitcoinPrice} ₿`}>
                  {previousBooking.originalPrice} $
                </td>
                <td title={`${previousBooking.discountBitcoinPrice} ₿`}>
                  {previousBooking.discountPrice} $
                </td>
                <td>
                  <button
                    className="btn btn-warning"
                    /*onClick={() =>
                      quickBookingReservation(
                        quickBooking.flightID,
                        quickBooking.ticketID
                      )
                    }*/
                  ><i className="fas fa-star-half-alt">&nbsp;</i>
                    RATING BOOKING
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

export default PreviousFlightReservations;

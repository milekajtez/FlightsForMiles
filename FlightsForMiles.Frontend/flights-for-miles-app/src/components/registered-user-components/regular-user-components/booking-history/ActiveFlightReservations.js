import React from "react";
import { useEffect } from "react";
//import { useAlert } from "react-alert";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { /*useHistory,*/ useParams } from "react-router";
import { loadActiveBookings } from "../../../../redux/regular-user/booking/bookingAction";

function ActiveFlightReservations() {
  const dispatch = useDispatch();
  const booking = useSelector((state) => state.booking);
  const params = useParams();
  //const history = useHistory();
  /*const alert = useAlert();*/

  useEffect(() => {
    dispatch(loadActiveBookings(params.username));
  }, [dispatch, params.username]);

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
                    /*onClick={() =>
                      quickBookingReservation(
                        quickBooking.flightID,
                        quickBooking.ticketID
                      )
                    }*/
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

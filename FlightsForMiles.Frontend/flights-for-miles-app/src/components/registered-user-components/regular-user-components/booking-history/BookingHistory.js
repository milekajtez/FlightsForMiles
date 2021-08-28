import React from "react";
import { useSelector } from "react-redux";
import ActiveFlightReservations from "./ActiveFlightReservations";
import PreviousFlightReservations from "./PreviousFlightReservations";

function BookingHistory() {
  const booking = useSelector((state) => state.booking);
  const array = [];
  booking.previousBookings.forEach(element => {
    array.push(0);
  });

  return (
    <div>
      <ActiveFlightReservations />
      <hr style={{backgroundColor: "aqua", margin: '0 5% 0'}}></hr>
      <PreviousFlightReservations array={array} booking={booking}/>
    </div>
  );
}

export default BookingHistory;

import React from "react";
import ActiveFlightReservations from "./ActiveFlightReservations";
import PreviousFlightReservations from "./PreviousFlightReservations";

function BookingHistory() {
  return (
    <div>
      <ActiveFlightReservations />
      <hr style={{backgroundColor: "aqua", margin: '0 5% 0'}}></hr>
      <PreviousFlightReservations />
    </div>
  );
}

export default BookingHistory;

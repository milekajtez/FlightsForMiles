import React from "react";
import AllFlights from "./AllFlights";
import SearchBookingFlightForm from "./SearchBookingFlightForm";

function FlightsView() {
  return (
    <>
      <SearchBookingFlightForm />
      <AllFlights />
    </>
  );
}

export default FlightsView;

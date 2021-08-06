import React from "react";
import { useSelector } from "react-redux";
import BookingFlightInfo from "../seats-view/BookingFlightInfo";
import FriendsConfig from "./FriendsConfig";
import SelectedTicketsPanel from "./SelectedTicketsPanel";

function OtherOptionsView() {
  const flights = useSelector((state) => state.flight);
  const ticket = useSelector((state) => state.ticket);

  return (
    <div>
      <BookingFlightInfo flight={flights.flightForBooking} />
      <SelectedTicketsPanel selectedTickets={ticket.selectedTickets} />
      <FriendsConfig />
    </div>
  );
}

export default OtherOptionsView;

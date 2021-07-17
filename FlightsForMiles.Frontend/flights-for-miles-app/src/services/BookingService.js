import API from "./api";

const bookingService = {
    bookingWithoutFriends: (newBooking) => {
        var body = {
          Username: newBooking.username,
          FlightID: newBooking.flightID,
          TicketID: newBooking.ticketID,
        };
    
        return API.post(`Bookings/BookingWithoutFriends`, body);
      },
}

export default bookingService;
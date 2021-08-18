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

    bookingForFriends: (newBookings) => {
      var friendsUsername = [];
      newBookings.friends.forEach(element => {
        friendsUsername.push(element.username);
      });

      var ticketsID = [];
      newBookings.tickets.forEach(element => {
        ticketsID.push(element.ticketID);
      });

      var body = {
        Username: newBookings.username,
        Friends: friendsUsername,
        Tickets: ticketsID,
        FlightID: newBookings.flightID,
      };
    
      return API.post(`Bookings/BookingForFriends`, body);
    },

    confirmBooking: (ticketID) => {
      return API.put(`Bookings/ConfirmBookingRequest/${ticketID}`);
    },

    refuseBooking: (ticketID) => {
      return API.delete(`Bookings/RefuseBookingRequest/${ticketID}`);
    },

    loadQuickBookings: (username) => {
      return API.get(`Bookings/LoadQuickBookings/${username}`);
    },

    loadActiveBookings: (username) => {
      return API.get(`Bookings/LoadMyBookings/${username}/active`);
    },

    loadPreviousBookings: (username) => {
      return API.get(`Bookings/LoadMyBookings/${username}/previous`);
    }
}

export default bookingService;
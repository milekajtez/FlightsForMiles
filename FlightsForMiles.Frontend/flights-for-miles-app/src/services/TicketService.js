import API from "./api";

const ticketService = {
  addTicket: (newTicket) => {
    var body = {
      Number: newTicket.number,
      Type: newTicket.type,
      Price: newTicket.price,
      IsQuickBooking: newTicket.isQuickBooking,
      FlightID: newTicket.flightID,
    };

    return API.post(`Tickets`, body);
  },

  loadTickets: (flightID) => {
    return API.get(`Tickets/LoadTickets/${flightID}`);
  },

  deleteTicket: (ticketID) => {
    return API.delete(`Tickets/${ticketID}`);
  },

  deleteAllTickets: (flightID) => {
    return API.delete(`Tickets/DeleteAllTickets/${flightID}`);
  },

  changeTicket: (changedTicket) => {
    var body = {
      Number: changedTicket.number,
      Type: changedTicket.type,
      Price: changedTicket.price,
      IsQuickBooking: changedTicket.isQuickBooking,
      FlightID: changedTicket.flightID,
    };

    return API.put(`Tickets/${changedTicket.ticketID}`, body);
  },
};

export default ticketService;

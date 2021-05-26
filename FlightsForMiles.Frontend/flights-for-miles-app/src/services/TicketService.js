import API from './api'

const ticketService = {
    addTicket: (newTicket) => {
        var body = {
            Number: newTicket.number,
            Type: newTicket.type,
            Price: newTicket.price,
            IsQuickBooking: newTicket.isQuickBooking,
            FlightID: newTicket.flightID
        }

        return API.post(`Tickets`, body)
    },

    loadTickets: (flightID) => {
        return API.get(`Tickets/LoadTickets/${flightID}`)
    },
}

export default ticketService
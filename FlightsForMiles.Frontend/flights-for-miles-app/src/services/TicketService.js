import API from './api'

const ticketService = {
    addTicket: (newTicket) => {
        var body = {
            Number: newTicket.number,
            Type: newTicket.type,
            Price: newTicket.price,
            TimePurchased: newTicket.timePurchased,
            IsPurchased: newTicket.isPurchased,
            IsQuickBooking: newTicket.isQuickBooking,
            FlightID: newTicket.flightID
        }

        return API.post(`Tickets`, body)
    }
}

export default ticketService
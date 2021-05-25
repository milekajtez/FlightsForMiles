import ticketService from "../../../services/TicketService"

export const addTicket = (newTicket) => () => 
    new Promise(function(resolve, reject){
        ticketService.addTicket(newTicket)
        .then(response => {
            resolve(response)
        })
        .catch(error => {
            reject(error)
        })
    })
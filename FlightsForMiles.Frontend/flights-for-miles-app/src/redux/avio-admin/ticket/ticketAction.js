import ticketService from "../../../services/TicketService"
import { LOADING_TICKETS } from './ticketTypes'

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

export const loadTicketsAction = (tickets) => {
    return {
        type: LOADING_TICKETS,
        payload: tickets
    }
}    
    
export const loadTickets = (flightID) => {
    return (dispatch) => {
        ticketService.loadTickets(flightID)
        .then(response => {
            if(response.status === 200){
                dispatch(loadTicketsAction(response.data))
            }
        })  
        .catch(error => {
            console.log(error)
        })
    }
}
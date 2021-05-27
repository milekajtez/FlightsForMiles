import React from 'react'
import Ticket from './Ticket'

function TicketPanel(props) {
    return (
        <div>
            {
                props.tickets.ticketsForOneFlight.map((ticket, index) => {
                    return <Ticket ticket={ticket} key={index}/>
                })
            }
        </div>
    )
}

export default TicketPanel

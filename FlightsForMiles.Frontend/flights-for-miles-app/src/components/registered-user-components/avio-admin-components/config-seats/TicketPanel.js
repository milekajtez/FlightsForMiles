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
            <div className="box" style={{ height: "20%" }}>
                <button type="submit" style={{ backgroundColor: "#141e30", margin:"1%" }}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                        Delete all tickets
                </button>
            </div>
        </div>
    )
}

export default TicketPanel

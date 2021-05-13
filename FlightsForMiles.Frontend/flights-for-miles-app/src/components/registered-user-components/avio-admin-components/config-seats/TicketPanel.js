import React from 'react'
import Ticket from './Ticket'

function TicketPanel() {
    return (
        <div>
            <Ticket />
            <Ticket />
            <Ticket />
            <Ticket />
            <Ticket />
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

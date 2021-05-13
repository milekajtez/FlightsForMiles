import React, { useState } from 'react'
import AddTicket from './AddTicket'
import TicketPanel from './TicketPanel'

function AllFlightsSeats() {
    const [showHideIndicator, setIndicator] = useState(0)
    const [addTicket, setAddTicket] = useState(false)
    // 0 - nema prikaza
    // != 0 - prikaz (id leta)

    const showTickets = (flightID) => {
        setIndicator(flightID)
    }

    /*const hideTickets = () => {
        setIndicator(0)
    }*/

    return (
        <div>
            <table className="items-table">
                <thead>
                    <tr>
                        <th>Flight ID</th>
                        <th>Start time</th>
                        <th>End time</th>
                        <th>Start location</th>
                        <th>End location</th>
                        <th>Airline ID + name</th>
                        <th>Operations</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>test1</td>
                        <td>test1</td>
                        <td>test1</td>
                        <td>test1</td>
                        <td>test1</td>
                        <td>test1</td>
                        <td>
                            <button className="btn btn-primary" onClick={() => showTickets(1)}><i className="far fa-eye"></i> VIEW TICKETS</button>&nbsp;
                            <button className="btn btn-secondary"><i className="fas fa-plus" onClick={() => setAddTicket(true)}></i> ADD NEW TICKET</button>
                        </td>
                    </tr>
                    <tr>
                        <td>test2</td>
                        <td>test2</td>
                        <td>test2</td>
                        <td>test2</td>
                        <td>test2</td>
                        <td>test2</td>
                        <td>
                            <button className="btn btn-primary" onClick={() => showTickets(2)}><i className="far fa-eye"></i> VIEW TICKETS</button>&nbsp;
                            <button className="btn btn-secondary"><i className="fas fa-plus" onClick={() => setAddTicket(true)}></i> ADD NEW TICKET</button>
                        </td>
                    </tr>
                    <tr>
                        <td>test3</td>
                        <td>test3</td>
                        <td>test3</td>
                        <td>test3</td>
                        <td>test3</td>
                        <td>test3</td>
                        <td>
                            <button className="btn btn-primary"  onClick={() => showTickets(3)}><i className="far fa-eye"></i> VIEW TICKETS</button>&nbsp;
                            <button className="btn btn-secondary"><i className="fas fa-plus" onClick={() => setAddTicket(true)}></i> ADD NEW TICKET</button>
                        </td>
                    </tr>
                    <tr>
                        <td>test4</td>
                        <td>test4</td>
                        <td>test4</td>
                        <td>test4</td>
                        <td>test4</td>
                        <td>test4</td>
                        <td>
                            <button className="btn btn-primary"  onClick={() => showTickets(4)}><i className="far fa-eye"></i> VIEW TICKETS</button>&nbsp;
                            <button className="btn btn-secondary"><i className="fas fa-plus" onClick={() => setAddTicket(true)}></i> ADD NEW TICKET</button>
                        </td>
                    </tr>
                    <tr>
                        <td>test5</td>
                        <td>test5</td>
                        <td>test5</td>
                        <td>test5</td>
                        <td>test5</td>
                        <td>test5</td>
                        <td>
                            <button className="btn btn-primary"  onClick={() => showTickets(5)}><i className="far fa-eye"></i> VIEW TICKETS</button>&nbsp;
                            <button className="btn btn-secondary"><i className="fas fa-plus" onClick={() => setAddTicket(true)}></i> ADD NEW TICKET</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            {showHideIndicator !== 0 ? <TicketPanel /> : null}
            <AddTicket addTicket={addTicket} setAddTicket={setAddTicket}/>
        </div>
    )
}

export default AllFlightsSeats

import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AddTicket from './AddTicket'
import TicketPanel from './TicketPanel'
import { loadFlights } from '../../../../redux/avio-admin/flight/flightAction'
import { useSelector } from 'react-redux'

function AllFlightsSeats() {
    const [showHideIndicator, setIndicator] = useState(0)   // 0 - nema prikaza // != 0 - prikaz (id leta)
    const [addTicket, setAddTicket] = useState({isOpen: false, flightID: ''})

    const dispatch = useDispatch()

    const flights = useSelector(
        state => state.flight
    )

    useEffect(() => {
        dispatch(loadFlights())
    }, [dispatch])


    const showTickets = (flightID) => {
        setIndicator(flightID)
    }

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
                    {
                        flights.allFlights.map((flight => {
                            return (
                                <tr key={flight.flightID}>
                                    <td>{flight.flightID}</td>
                                    <td>{flight.startTime}</td>
                                    <td>{flight.endTime}</td>
                                    <td>{flight.startLocation}</td>
                                    <td>{flight.endLocation}</td>
                                    <td>{flight.airlineID}</td>
                                    <td>
                                        <button className="btn btn-primary" onClick={() => showTickets(flight.flightID)}><i className="far fa-eye"></i> VIEW TICKETS</button>&nbsp;
                                        <button className="btn btn-secondary" onClick={() => setAddTicket({isOpen: true, flightID: flight.flightID})}><i className="fas fa-plus"></i> ADD NEW TICKET</button>
                                    </td>
                                </tr>
                            )
                        }))
                    }
                </tbody>
            </table>
            {showHideIndicator !== 0 ? <TicketPanel /> : null}
            <AddTicket addTicket={addTicket} setAddTicket={setAddTicket}/>
        </div>
    )
}

export default AllFlightsSeats

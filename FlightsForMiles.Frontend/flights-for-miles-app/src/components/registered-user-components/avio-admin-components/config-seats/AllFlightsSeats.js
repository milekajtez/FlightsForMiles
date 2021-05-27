import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AddTicket from './AddTicket'
import TicketPanel from './TicketPanel'
import { loadFlights } from '../../../../redux/avio-admin/flight/flightAction'
import { useSelector } from 'react-redux'
import { loadTickets, deleteAllTickets } from '../../../../redux/avio-admin/ticket/ticketAction'
import { useAlert } from 'react-alert'

function AllFlightsSeats() {
    const [showHideIndicator, setIndicator] = useState(0)   // 0 - nema prikaza // != 0 - prikaz (id leta)
    const [addTicket, setAddTicket] = useState({isOpen: false, flightID: ''})

    const dispatch = useDispatch()
    const alert = useAlert()

    const flights = useSelector(
        state => state.flight,
    )

    const tickets = useSelector(
        state => state.ticket,
    )

    useEffect(() => {
        dispatch(loadFlights())
    }, [dispatch])


    const showTickets = (flightID) => {
        dispatch(loadTickets(flightID))
        setIndicator(flightID)
    }

    const deleteAllCurrentTickets = (flightID) => {
        dispatch(deleteAllTickets(flightID))
        .then(response => {
            if (response.status === 204) {
                alert.show("Deleting all tickets successfully.", {
                    type: 'success'
                })

                dispatch(loadTickets(flightID))
            }
            else {
                alert.show("Unknown error.", {
                    type: 'error'
                })
            }
        })
        .catch(error => {
            console.log(error)
            if(error.response.data.indexOf("(Deleting unsuccessfully. Selected flight doesn't have any ticket or it dosn't exsist.)") !== -1){
                alert.show("Deleting unsuccessfully. Selected flight doesn't have any ticket or it dosn't exsist.", {
                    type: 'error'
                })
            }
            else {
                alert.show("Unknown error.", {
                    type: 'error'
                })  
            }
        })
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
                                        <button className="btn btn-secondary" onClick={() => setAddTicket({isOpen: true, flightID: flight.flightID})}><i className="fas fa-plus"></i> ADD NEW TICKET</button>&nbsp;
                                        <button className="btn btn-danger" onClick={() => deleteAllCurrentTickets(flight.flightID)}>
                                            <i className="fas fa-trash-alt"></i> DELETE ALL TICKETS</button>
                                    </td>
                                </tr>
                            )
                        }))
                    }
                </tbody>
            </table>
            {showHideIndicator !== 0 ? <TicketPanel tickets={tickets}/> : null}
            <AddTicket addTicket={addTicket} setAddTicket={setAddTicket}/>
        </div>
    )
}

export default AllFlightsSeats

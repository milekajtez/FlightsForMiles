import React from 'react'
import { useSelector } from 'react-redux';
import BookingFlightInfo from './BookingFlightInfo'
import PlaneConfiguration from './PlaneConfiguration'

function SeatsView() {
    const flights = useSelector((state) => state.flight);
    return (
        <div>
            <BookingFlightInfo flight={flights.flightForBooking}/>
            <PlaneConfiguration flightID={flights.flightForBooking.flightID}/>
        </div>
    )
}

export default SeatsView

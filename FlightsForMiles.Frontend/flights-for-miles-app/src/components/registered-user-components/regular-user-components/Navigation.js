import React from 'react'
import { useHistory, useParams } from 'react-router';

function Navigation() {
    const { username } = useParams();
    const history = useHistory();

    const airlineReview = () => {
        history.push(`/regular/${username}/airlineReview`)
    }

    const bookingHistory = () => {
        history.push(`/regular/${username}/bookingHistory`)
    }

    const flightBooking = () => {
        history.push(`/regular/${username}/flightBooking`)
    }

    const quickBooking = () => {
        history.push(`/regular/${username}/quickBooking`)
    }

    return (
        <span>
            <ul className="menu-bar">
                <li onClick={() => airlineReview()}><i className="fas fa-plane-departure"></i> Airline review</li>
                <div></div>
                <li onClick={() => bookingHistory()}><i className="fas fa-history"></i> Booking history</li>
                <div></div>
                <li onClick={() => flightBooking()}><i className="fas fa-plane"></i> Flight booking</li>
                <div></div>
                <li onClick={() => quickBooking()}><i className="fas fa-tachometer-alt"></i> Quick booking</li>
            </ul>
        </span>
    )
}

export default Navigation

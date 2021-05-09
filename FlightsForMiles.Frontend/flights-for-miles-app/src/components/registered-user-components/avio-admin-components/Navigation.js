import React from 'react'
import { useHistory, useParams } from 'react-router';

function Navigation() {
    const { username } = useParams();
    const history = useHistory();

    const destinationConfiguration = () => {
        history.push(`/avio/${username}/configD`)
    }

    const flightConfiguration = () => {
        history.push(`/avio/${username}/configF`)
    }

    const seatsConfiguration = () => {
        history.push(`/avio/${username}/configS`)
    }

    const modifyFlightSeats = () => {
        history.push(`/avio/${username}/configMFS`)
    }

    const airlineReview = () => {
        history.push(`/avio/${username}/airlineReview`)
    }

    const helpConfiguration = () => {
        history.push(`/avio/${username}/configH`)
    }
    return (
        <span>
            <ul className="menu-bar">
                <li onClick={() => destinationConfiguration()}><i className="fas fa-map-marked-alt"></i> Destination config</li>
                <div></div>
                <li onClick={() => flightConfiguration()}><i className="fas fa-plane"></i> Flight config</li>
                <div></div>
                <li onClick={() => seatsConfiguration()}><i className="fas fa-ticket-alt"></i> Seats config</li>
                <div></div>
                <li onClick={() => modifyFlightSeats()}><i className="fas fa-cog"></i> Modify flight seats</li>
                <div></div>
                <li onClick={() => airlineReview()}><i className="fas fa-plane-departure"></i> Airlines review</li>
                <div></div>
                <li onClick={() => helpConfiguration()}><i className="far fa-question-circle"></i> Help config</li>
            </ul>
        </span>
    )
}

export default Navigation

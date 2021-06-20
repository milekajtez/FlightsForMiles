import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { loadAirlines } from '../../../../redux/system-admin/airline-reg/airlineRegAction'
import OneAirline from './OneAirline'

function AirlineReview() {
    const dispatch = useDispatch()
    const airlines = useSelector(
        state => state.airline,
    )

    useEffect(() => {
        dispatch(loadAirlines())
    },[dispatch])

    return (
        <div>
            <table className="items-table">
                <thead>
                    <tr>
                        <th>Airline ID</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Promotion description</th>
                        <th>Pricelist</th>
                        <th>Rating</th>
                        <th>Destinations</th>
                        <th>Flights</th>
                        {/*<th>Change info</th> ovo ce trebati kod ispisa kod avio admin-a (kod reguar user ne treba)*/}
                    </tr>
                </thead>
                <tbody>
                    {
                        airlines.allAirlines.map((airline, index) => {
                            return (<OneAirline key={index} airline={airline}/>)
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default AirlineReview
